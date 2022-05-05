import React, { FC } from 'react'
import ImageLazy from '@/components/ImageLazy'
import { Gender } from '@/types/common'
import './index.less'

interface Props {
    src: string
    name: string
    width?: string
    gender?: Gender
}

const UserCard: FC<Props> = ({ src, name, width, gender }) => {
    return (
        <div className={'userCard'} style={{ width }}>
            <div className='userCard-avatar-box'>
                <ImageLazy src={src} className={'userCard-avatar'}></ImageLazy>
            </div>
            <p className='userCard-name'>
                {name}
                <i className={['iconfont', gender === Gender.man ? 'icon-nansheng' : 'icon-nvsheng'].join(' ')}></i>
            </p>
        </div>
    )
}

export default UserCard
