import React, { FC } from 'react'
import { Button } from 'antd'
import './index.less'
import { Size } from '@/types/common'

interface Props {
    className?: string
    icon?: string
    size?: Size

    onClick?(): void
}

const IconButton: FC<Props> = ({
    onClick,
    className,
    icon,
    children,
    size = 'middle'
}) => {
    return (
        <Button
            type={'text'}
            onClick={onClick}
            size={size}
            className={['iconButton', className].join(' ')}
        >
            <i
                className={['iconButton-icon', 'iconfont', icon, size].join(
                    ' '
                )}
            ></i>
            <span className={['iconButton-text', size].join(' ')}>
                {children}
            </span>
        </Button>
    )
}

export default IconButton
