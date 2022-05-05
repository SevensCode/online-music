import React, { FC, useCallback, useState } from 'react'
import './index.less'
import ImageLazy from '@/components/ImageLazy'
import CustomButton from '@/components/CustomButton'
import CommentInputBox from '@/components/CommentInputBox'

export type CommentSize = 'default' | 'small'

interface CommentProps {
    avatar: string
    content: string
    time: string
    nickname: string
    // 被回复
    wasReplied?: {
        nickname: string
        content: string
    }
    like: boolean
    likeCount: number
    // 评论输入框是否可见
    commentInputBoxIsVisible?: boolean
    // 删除是否可见
    removeVisible?: boolean
    placeholder?: string
    value?: string
    size?: CommentSize

    // 点击昵称
    onClickNickName?(): void

    // 点赞
    onLike?(hideLoading: (isLoading: boolean) => void): void

    //点击评论icon
    onClickComment?(): void

    // 删除
    onRemove?(): void

    // 回复输入框 change 事件
    onReplyChange?(value: string): void

    // 回复提交
    onReplySubmit?(value: string, setLoading: (isLoading: boolean) => void): void
}

const Comment: FC<CommentProps> = ({
    avatar,
    content,
    time,
    nickname,
    wasReplied,
    like,
    likeCount,
    commentInputBoxIsVisible = false,
    onClickComment,
    removeVisible = false,
    onRemove,
    placeholder,
    onLike,
    onReplySubmit,
    onReplyChange,
    value,
    size = 'default'
}) => {
    const [likeLoading, setLikeLoading] = useState(false)
    const onClickLike = () => {
        onLike && onLike(setLikeLoading)
    }
    const onSubmit = useCallback(
        (content: string, setLoading) => {
            onReplySubmit && onReplySubmit(content, setLoading)
        },
        [onReplySubmit]
    )
    return (
        <div className={['comment', size].join(' ')}>
            <ImageLazy src={avatar} className={'comment-avatar'} />
            <div className='comment-contentContainer'>
                <p className={'comment-content'}>
                    <span>{nickname}：</span>
                    {content}
                </p>
                {wasReplied && (
                    <div className='comment-wasReplied'>
                        <span>{wasReplied.nickname}：</span>
                        {wasReplied.content}
                    </div>
                )}
                <div className='comment-action'>
                    <span className={'comment-time'}>{time}</span>
                    <div className={'comment-likeAndReply'}>
                        <CustomButton
                            size={'small'}
                            type={'text'}
                            onClick={onClickLike}
                            className={like ? 'like' : ''}
                            loading={likeLoading}
                            icon={like ? 'icon-dianzan' : 'icon-fabulous'}>
                            {likeCount}
                        </CustomButton>
                        <CustomButton onClick={onClickComment} size={'small'} type={'text'} icon={'icon-pinglun'} />
                        {removeVisible && <CustomButton onClick={onRemove} size={'small'} type={'text'} icon={'icon-top'} />}
                    </div>
                </div>
                {commentInputBoxIsVisible && (
                    <CommentInputBox value={value} onChange={onReplyChange} onSubmit={onSubmit} placeholder={placeholder} />
                )}
            </div>
        </div>
    )
}

export default Comment
