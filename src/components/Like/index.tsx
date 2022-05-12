import React, { FC, useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { user_basicInfo, user_likeMusicIds } from '@/recoil/user'
import { message } from 'antd'
import { history } from 'umi'
import { UserRequst } from '@/server/api/user'
import './index.less'
import CustomButton from '@/components/CustomButton'
import { Size } from '@/types/common'

interface Props {
    id: number
    className?: string
    size?: Size
}

const Like: FC<Props> = ({ id, className, size }) => {
    const [likeMusicIds, setLikeMusicIds] = useRecoilState(user_likeMusicIds)
    const useinfo = useRecoilValue(user_basicInfo)
    const [isLoading, setLoading] = useState(false)
    const isLike = useMemo((): boolean => {
        return likeMusicIds.some(value => value === id)
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
            if (code !== 200) return message.error(msg || '好像有亿点问题，操作失败！！！')
            const { ids } = await UserRequst.getUserLikeMusicIds(useinfo.userId).finally(() => {
                setLoading(false)
            })
            ids && setLikeMusicIds(ids)
            setLoading(false)
            like ? message.success('已添加到我喜欢的音乐！') : message.success('取消喜欢成功！')
        },
        [useinfo, isLoading]
    )
    return isLike ? (
        <CustomButton
            className={['like', className].join(' ')}
            onClick={() => asyncSetLike(false)}
            icon={'icon-aixin1'}
            type={'text'}
            size={size}
        />
    ) : (
        <CustomButton onClick={() => asyncSetLike(true)} size={size} type={'text'} className={className} icon={'icon-xin'} />
    )
}

export default Like
