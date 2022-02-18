import React, { FC } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'

const UserBasicInfo: FC = () => {
    const goLogin = () => {

    }
    return (
        <div className={ 'userBasicInfo' }>
            <Avatar className={ 'userBasicInfo-avatar' } size={ 'large' } icon={ <UserOutlined/> }/>
            <span onClick={ goLogin } className={ 'userBasicInfo-notLoggedIn' }>未登录</span>
        </div>
    )
}

export default UserBasicInfo