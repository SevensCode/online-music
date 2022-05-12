import React, { useEffect, useMemo, useState } from 'react'
import { Gender } from '@/types/common'
import { useRecoilValue } from 'recoil'
import { user_basicInfo } from '@/recoil/user'
import dateTool from '@/utils/dateTool'
import { getAstro } from '@/utils/tool'
import city from '@/assets/js/city'
import './index.less'
import { Modal } from 'antd'
import { UserRequst } from '@/server/api/user'
import { UserDetail } from '@/types/user'
import { formatUserDetail } from '@/utils/detailFormatting'

const getUserDetail = async (id: number): Promise<Nullable<UserDetail>> => {
    const data = await UserRequst.getDetail(id)
    if (data.code !== 200) return null
    return formatUserDetail(data)
}
const UserInfoCard = () => {
    const userinfo = useRecoilValue(user_basicInfo)
    const [userDetail, setUserDetail] = useState<UserDetail>()
    useEffect(() => {
        if (!userinfo) return
        getUserDetail(userinfo.userId).then(value => value && setUserDetail(value))
    }, [])
    const birthdaysAndHoroscopes = useMemo(() => {
        if (!userDetail) return
        const birthday = dateTool(userDetail.birthday).toObject()
        if (!birthday) return undefined
        return {
            birthYear: birthday.years.toString().substring(2, 4),
            constellation: getAstro(birthday.months, birthday.date),
            villageAge: new Date().getFullYear() - dateTool(userDetail.createTime).year()
        }
    }, [userDetail?.birthday])
    const cityName = useMemo(() => {
        if (!userDetail) return
        let cityName = ''
        Object.keys(city).find(key => {
            const cityObj = city[key].find(item => item.id.includes(String(userDetail.city)))
            if (!cityObj) return false
            cityName = cityObj.name
            return true
        })
        return cityName
    }, [userDetail?.city])
    const seeProfile = () => {
        Modal.info({
            title: '简介',
            content: userDetail?.signature,
            onOk() {}
        })
    }
    return (
        <div className='userInfoCard'>
            <div className='userInfoCard-coverPicture' style={{ backgroundImage: `url(${userDetail?.backgroundUrl})` }}></div>
            <img src={userDetail?.avatarUrl} className='userInfoCard-avatar' />
            <div className='userInfoCard-nickname'>
                {userDetail?.nickname}
                <i className={['iconfont', userDetail?.gender === Gender.man ? 'icon-nansheng man' : 'icon-nvsheng girl'].join(' ')}></i>
            </div>
            <div className={'userInfoCard-count'}>
                <p>{userDetail?.likeCount} 关注</p>
                <p>{userDetail?.fanCount} 粉丝</p>
                <p>Lv.{userDetail?.grade}</p>
            </div>
            <div className='userInfoCard-tags'>
                <span className='userInfoCard-tag'>
                    {birthdaysAndHoroscopes?.birthYear}后 - {birthdaysAndHoroscopes?.constellation}座
                </span>
                <span className='userInfoCard-tag'>{cityName}</span>
                <span className='userInfoCard-tag'>村龄{birthdaysAndHoroscopes?.villageAge}年</span>
            </div>
            <div className='userInfoCard-briefIntroduction '>
                <p className={'text-2LinesHide'} onClick={seeProfile}>
                    {userDetail?.signature}
                </p>
            </div>
        </div>
    )
}

export default UserInfoCard
