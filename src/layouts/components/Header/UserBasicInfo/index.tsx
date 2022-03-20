import React, { FC } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less';
import { useRecoilValue } from 'recoil';
import { atom_user_info } from '@/recoil/user';
import { Link } from 'umi';

const UserBasicInfo: FC = () => {
    const userinfo = useRecoilValue(atom_user_info);

    return (
        <div className={'userBasicInfo'}>
            <Avatar
                className={'userBasicInfo-avatar'}
                size={'large'}
                src={userinfo?.avatarUrl}
                icon={<UserOutlined />}
            />
            {userinfo ? (
                <span className={'userBasicInfo-notLoggedIn'}>
                    {userinfo.nickname}
                </span>
            ) : (
                <Link to={'/login'} className={'userBasicInfo-notLoggedIn'}>
                    未登录
                </Link>
            )}
        </div>
    );
};

export default UserBasicInfo;
