import React, { FC, useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { user_info, user_likeMusicIds } from '@/recoil/user'
import { message } from 'antd'
import { history } from 'umi'
import { UserRequst } from '@/server/api/user'
import './index.less'
import IconButton from '@/components/Icon/Button'
import { Size } from '@/types/common'

interface Props {
    id: number
    className?: string
    size?: Size
}

const Like: FC<Props> = ({ id, className, size }) => {
    const [likeMusicIds, setLikeMusicIds] = useRecoilState(user_likeMusicIds)
    const useinfo = useRecoilValue(user_info)
    const [isLoading, setLoading] = useState(false)
    const isLike = useMemo((): boolean => {
        return likeMusicIds.some((value) => value === id)
    }, [likeMusicIds])
    const asyncSetLike = useCallback(
        async (like: boolean) => {
            if (isLoading) return
            if (!useinfo) {
                message.warning('请先登录')
                return history.push('/login')
            }
            setLoading(true)
            const { code, msg } = await UserRequst.isLikeMusic({
                id,
                like
            }).catch(() => {
                setLoading(false)
            })
            if (code !== 200)
                return message.error(msg || '好像有亿点问题，操作失败！！！')
            const { ids } = await UserRequst.getUserLikeMusicIds(
                useinfo.userId
            ).finally(() => {
                setLoading(false)
            })
            ids && setLikeMusicIds(ids)
            setLoading(false)
            like
                ? message.success('已添加到我喜欢的音乐！')
                : message.success('取消喜欢成功！')
        },
        [useinfo, isLoading]
    )
    return isLike ? (
        <IconButton
            className={['like', className].join(' ')}
            onClick={() => asyncSetLike(false)}
            icon={'icon-aixin1'}
            size={size}
        />
    ) : (
        <IconButton
            onClick={() => asyncSetLike(true)}
            size={size}
            className={className}
            icon={'icon-xin'}
        />
    )
}

export default Like
