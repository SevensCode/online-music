import React, { FC } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'
import { useRecoilValue } from 'recoil'
import { user_basicInfo } from '@/recoil/user'
import { Link } from 'umi'

const UserBasicInfo: FC = () => {
    const userinfo = useRecoilValue(user_basicInfo)
    return (
        <div className={'userBasicInfo'}>
            <Avatar className={'userBasicInfo-avatar'} size={'large'} src={userinfo?.avatarUrl} icon={<UserOutlined />} />
            {userinfo ? (
                <Link to={'/user'} className={'userBasicInfo-notLoggedIn'}>
                    {userinfo.nickname}
                </Link>
            ) : (
                <Link to={'/login'} className={'userBasicInfo-notLoggedIn'}>
                    未登录
                </Link>
            )}
        </div>
    )
}

export default UserBasicInfo
