import React, { FC } from 'react'
import { Button } from 'antd'
import './index.less'
import { ButtonType, Size } from '@/types/common'

interface Props {
    className?: string
    icon?: string
    size?: Size
    type?: ButtonType
    loading?: boolean

    onClick?(): void
}

const CustomButton: FC<Props> = ({
    onClick,
    className,
    icon,
    children,
    size = 'middle',
    type = 'default',
    loading
}) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            size={size}
            loading={loading}
            className={['customButton', size, className].join(' ')}
        >
            {icon && (
                <i
                    className={[
                        'customButton-icon',
                        'iconfont',
                        icon,
                        size
                    ].join(' ')}
                ></i>
            )}
            {children && (
                <span className={['customButton-text', size].join(' ')}>
                    {children}
                </span>
            )}
        </Button>
    )
}

export default CustomButton
