import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { user_basicInfo } from '@/recoil/user'
import { Redirect } from 'umi'

const Auth: FC = ({ children }) => {
    const userinfo = useRecoilValue(user_basicInfo)
    if (userinfo) return <>{children}</>
    return <Redirect to={'/login'} />
}

export default Auth
