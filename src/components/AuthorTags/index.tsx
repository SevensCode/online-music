import React, { FC } from 'react'
import './index.less'

interface Props {
    tags: { name: string; id: number }[]
    className?: string
}

const Tags: FC<Props> = ({ tags, className }) => {
    return (
        <>
            {tags.map(({ name, id }, i) => {
                return tags.length - 1 === i ? (
                    <span className={['tags', className].join(' ')} key={id}>
                        <span className={'tags-name'}>{name}</span>
                    </span>
                ) : (
                    <span className={['tags', className].join(' ')} key={id}>
                        <span className={'tags-name'}>{name}</span>
                        <span className={'tags-slash'}>/</span>
                    </span>
                )
            })}
        </>
    )
}

export default Tags
