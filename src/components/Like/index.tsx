import React, { FC, useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user_info, user_likeMusicIds } from '@/recoil/user';
import { HeartFilled, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';
import { UserRequst } from '@/api/user';
import './index.less';

interface Props {
    id: number;
    size?: string;
    className?: string;
    likeColor?: string;
    notlikeColor?: string;
}

const Like: FC<Props> = ({
    id,
    size = '16px',
    className,
    likeColor = '#EC4141',
    notlikeColor = '#b7b7b7',
}) => {
    const [likeMusicIds, setLikeMusicIds] = useRecoilState(user_likeMusicIds);
    const useinfo = useRecoilValue(user_info);
    const [isLoading, setLoading] = useState(false);
    const isLike = useMemo((): boolean => {
        return likeMusicIds.some((value) => value === id);
    }, [likeMusicIds]);
    const asyncSetLike = useCallback(
        async (like: boolean) => {
            if (!useinfo) {
                message.warning('请先登录');
                return history.push('/login');
            }
            setLoading(true);
            const { code } = await UserRequst.isLikeMusic({ id, like });
            if (code !== 200)
                return message.error('好像有亿点问题，操作失败！！！');
            const { ids } = await UserRequst.getUserLikeMusicIds(
                useinfo.userId,
            );
            ids && setLikeMusicIds(ids);
            setLoading(false);
            like
                ? message.success('已添加到我喜欢的音乐！')
                : message.success('取消喜欢成功！');
        },
        [useinfo],
    );
    if (isLoading)
        return (
            <LoadingOutlined
                className={className}
                style={{ fontSize: size, color: '#EC4141' }}
                spin
            />
        );
    return isLike ? (
        <HeartFilled
            onClick={() => asyncSetLike(false)}
            style={{ fontSize: size, color: likeColor }}
            className={['like-common-hover', className].join(' ')}
        />
    ) : (
        <HeartOutlined
            onClick={() => asyncSetLike(true)}
            style={{ fontSize: size, color: notlikeColor }}
            className={['like-common-hover', className].join(' ')}
        />
    );
};

export default Like;
