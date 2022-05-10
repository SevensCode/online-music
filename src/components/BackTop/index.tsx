import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react'
import './index.less'
import { useScroll } from '@/hooks'

type TargetType = HTMLElement | Document | Element

interface Props {
    visibilityHeight?: number

    target(): TargetType
}

const BackTop: FC<Props> = ({ target, visibilityHeight = 400 }) => {
    const targetRef = useRef<TargetType>()
    const toScroll = useScroll()
    const [visible, setVisible] = useState(false)
    const scroll = useCallback(e => {
        const { scrollTop } = e.target
        setVisible(scrollTop <= visibilityHeight)
    }, [])
    useLayoutEffect(() => {
        targetRef.current = target()
        targetRef.current?.addEventListener('scroll', scroll)
        return () => targetRef.current?.removeEventListener('scroll', scroll)
    }, [])
    const backTop = () => {
        toScroll(targetRef.current as HTMLElement, 0)
    }
    return (
        <img
            onClick={backTop}
            className={['backTop', visible ? 'visible' : ''].join(' ')}
            src={require('@/assets/images/backTop.png')}></img>
    )
}

export default BackTop
