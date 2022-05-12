import React, { FC } from 'react'
import './index.less'
import UserInfoCard from '@/pages/User/InfoCard'

const UserPage: FC = () => {
    return (
        <div className={'userPage app-container'}>
            <div className='userPage-grid'>
                <UserInfoCard />
            </div>
        </div>
    )
}

export default UserPage
