import React, { FC, MouseEvent, useCallback, useRef } from 'react'
import LazyLoad from 'react-lazyload'
import img_loading from '@/assets/svg/img_loading.svg'
import img_error from '@/assets/svg/img_error.svg'

interface Props {
    src: string
    defaultSrc?: string
    errorSrc?: string
    className?: string
    scrollContainer?: string

    onClick?(event: MouseEvent<HTMLImageElement>): void
}

const ImageLazy: FC<Props> = ({
    src,
    defaultSrc = img_loading,
    errorSrc = img_error,
    className,
    scrollContainer = '.layout',
    onClick
}) => {
    const imgRef = useRef<HTMLImageElement>(null)

    const onError = useCallback(
        ({ target }) => {
            target.src = errorSrc
        },
        [errorSrc]
    )

    return (
        <LazyLoad
            offset={100}
            throttle
            overflow
            scrollContainer={scrollContainer}
            className={className}
            scroll
            placeholder={<img className={className} src={defaultSrc} alt='' />}
        >
            <img
                onError={onError}
                ref={imgRef}
                className={className}
                src={src}
                alt=''
                onClick={onClick}
            />
        </LazyLoad>
    )
}

export default ImageLazy
