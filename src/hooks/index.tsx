import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'

/**
 * 点击空白取隐藏元素
 * */
export const useClickOnBlankHiddenElement = <E extends HTMLElement>(): [RefObject<E>, boolean, ((value: (((prevState: boolean) => boolean) | boolean)) => void)] => {
    const [isShow, handle] = useState(false)
    const elementRef = useRef<E>(null)
    const elementCallback = useCallback((e: MouseEvent) => {
        handle(!!elementRef.current?.contains(e.target as Node))
    }, [])
    useEffect(() => {
        isShow ?
            document.body.addEventListener('click', elementCallback) :
            document.body.removeEventListener('click', elementCallback)
    }, [isShow])

    return [elementRef, isShow, handle]
}