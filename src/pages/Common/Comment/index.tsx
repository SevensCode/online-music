import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import CommentInputBox from '@/components/CommentInputBox'
import Comment, { CommentSize } from '@/components/Comment'
import { Comment_Like_Operation_Type, Comment_Operation_Type, Comment_Params, Comment_Resource_Type } from '@/server/api/other/params'
import { useRecoilValue } from 'recoil'
import { user_basicInfo } from '@/recoil/user'
import { message, Modal, Pagination } from 'antd'
import { scrollToElement } from '@/utils/tool'
import { OtherRequst } from '@/server/api/other'
import { CommentData } from '@/types/common'
import { Request_Comment_Params } from '@/server/api/common'

export type CommentResponseData = {
    // 热门评论
    hotComments: CommentData[]
    // 最新评论
    comments: CommentData[]
    // 评论总数
    total: number
}

interface Interface {
    // 资源id
    id: number
    // 资源类型
    resourceType: Comment_Resource_Type
    scrollContainer?: HTMLElement
    size?: CommentSize

    getComment(query: Request_Comment_Params): Promise<CommentResponseData>
}

const CommentPage: FC<Interface> = ({ id, resourceType, getComment, scrollContainer, size = 'default' }) => {
    const inputBoxRef = useRef<HTMLDivElement>(null)
    const commentRef = useRef<HTMLDivElement>(null)
    const latestCommentRef = useRef<HTMLHeadingElement>(null)
    const userinfo = useRecoilValue(user_basicInfo)
    const [placeholder, setPlaceholder] = useState('')
    const [query, setQuery] = useState<Request_Comment_Params>({
        before: undefined,
        id,
        limit: 30,
        page: 1
    })
    const [form, setForm] = useState<Comment_Params>({
        commentId: undefined,
        content: '',
        id,
        t: Comment_Operation_Type.send,
        type: resourceType
    })
    const [comment, setComment] = useState<CommentResponseData>({ comments: [], hotComments: [], total: 0 })
    //  回复 value
    const [replyValue, setReplyValue] = useState('')
    useEffect(() => {
        getComment(query).then(data => setComment(data))
    }, [query])
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        if (inputBoxRef.current === null) return
        scrollToElement(
            scrollContainer || ((commentRef.current as HTMLElement).parentElement as HTMLElement),
            inputBoxRef.current,
            550,
            inputBoxRef.current.offsetHeight
        )
    }
    const onClickComment = (commentId: number, nickname: string) => {
        setPlaceholder(`回复@${nickname}:`)
        setForm({ ...form, commentId })
    }
    // 发送评论
    const onSend = useCallback(
        async (content, setLoaidng) => {
            if (!content.trim().length) return message.warning('评论不能为空！')
            setLoaidng(true)
            const { code } = await OtherRequst.commentAction({
                ...form,
                content,
                t: Comment_Operation_Type.send
            }).finally(() => setLoaidng(false))
            if (code !== 200) return message.error('评论失败！')
            message.success('评论成功！')
            setQuery({ ...query, page: 1 })
            if (latestCommentRef.current === null) return
            scrollToElement(
                scrollContainer || ((commentRef.current as HTMLElement).parentElement as HTMLElement),
                latestCommentRef.current,
                550
            )
            setForm({ ...form, content: '' })
        },
        [form, query]
    )
    // 删除评论
    const onRemove = (commentId: number) => {
        Modal.confirm({
            title: '删除警告！',
            content: '您确定要删除这条评论吗？',
            cancelText: '取消',
            okText: '确定',
            async onOk() {
                const { code } = await OtherRequst.commentAction({
                    ...form,
                    t: Comment_Operation_Type.remove,
                    commentId: commentId
                })
                if (code !== 200) return message.error('删除失败！')
                message.success('删除成功！')
                setQuery({ ...query })
            }
        })
    }
    // 点赞
    const onLike = async (commentId: number, isLike: boolean, setLikeLoading: (isLike: boolean) => void) => {
        setLikeLoading(true)
        const { code } = await OtherRequst.like({
            id,
            cid: commentId,
            type: resourceType,
            t: isLike ? Comment_Like_Operation_Type.cancel : Comment_Like_Operation_Type.like
        }).finally(() => setLikeLoading(false))
        if (code !== 200) return message.error('点赞失败！')
        message.success('点赞成功！')
        setQuery({ ...query })
    }
    // 回复输入框 提交 事件
    const onReplySubmit = async (content: string, commentId: number, setLoading: (isLoading: boolean) => void) => {
        if (!content.trim().length) return message.warning('回复不能为空！')
        setLoading(true)

        const { code } = await OtherRequst.commentAction({
            ...form,
            content,
            t: Comment_Operation_Type.reply,
            commentId
        }).finally(() => setLoading(false))
        if (code !== 200) return message.error('回复失败！')
        message.success('回复成功！')
        setReplyValue('')
        setQuery({ ...query })
    }
    return (
        <div ref={commentRef}>
            <h3 className={'module-title'}>发表评论</h3>
            <CommentInputBox
                onSubmit={onSend}
                inputBoxRef={inputBoxRef}
                onChange={content => setForm({ ...form, content })}
                value={form.content}
            />
            {comment.hotComments.length > 0 && <h3 className={'module-title'}>热门评论</h3>}

            {comment.hotComments.map(
                ({ commentId, likedCount, liked, content, timeStr, beReplied, user: { avatarUrl, nickname, userId } }) => (
                    <Comment
                        onLike={hideLoading => onLike(commentId, liked, hideLoading)}
                        onRemove={() => onRemove(commentId)}
                        key={commentId}
                        like={liked}
                        size={size}
                        likeCount={likedCount}
                        wasReplied={
                            beReplied.length
                                ? {
                                      nickname: beReplied[0].user.nickname,
                                      content: beReplied[0].content
                                  }
                                : undefined
                        }
                        removeVisible={userId === userinfo?.userId}
                        avatar={avatarUrl}
                        content={content}
                        nickname={nickname}
                        time={timeStr}
                        value={replyValue}
                        placeholder={placeholder}
                        onReplyChange={value => setReplyValue(value)}
                        onReplySubmit={(value, setLoading) => onReplySubmit(value, commentId, setLoading)}
                        onClickComment={() => onClickComment(commentId, nickname)}
                        commentInputBoxIsVisible={form.commentId === commentId}
                    />
                )
            )}

            <h3 className={'module-title'} ref={latestCommentRef}>
                最新评论
            </h3>
            {comment.comments.map(
                ({ commentId, likedCount, liked, content, timeStr, beReplied, user: { avatarUrl, nickname, userId } }) => (
                    <Comment
                        onLike={hideLoading => onLike(commentId, liked, hideLoading)}
                        onRemove={() => onRemove(commentId)}
                        key={commentId}
                        size={size}
                        like={liked}
                        likeCount={likedCount}
                        wasReplied={
                            beReplied.length
                                ? {
                                      nickname: beReplied[0].user.nickname,
                                      content: beReplied[0].content
                                  }
                                : undefined
                        }
                        removeVisible={userId === userinfo?.userId}
                        avatar={avatarUrl}
                        content={content}
                        nickname={nickname}
                        time={timeStr}
                        value={replyValue}
                        placeholder={placeholder}
                        onReplyChange={value => setReplyValue(value)}
                        onReplySubmit={(value, setLoading) => onReplySubmit(value, commentId, setLoading)}
                        onClickComment={() => onClickComment(commentId, nickname)}
                        commentInputBoxIsVisible={form.commentId === commentId}
                    />
                )
            )}
            <div className='center-container'>
                <Pagination
                    hideOnSinglePage={true}
                    onChange={onPageChange}
                    current={query.page}
                    defaultCurrent={query.page}
                    pageSize={query.limit}
                    showSizeChanger={false}
                    total={comment.total}
                />
            </div>
        </div>
    )
}

export default CommentPage
