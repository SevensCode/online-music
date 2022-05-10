import React, { FC } from 'react'
import './index.less'

interface Props {
    tags: { name: string; id: number }[]
    className?: string

    onClick?(name: string, id: number): void
}

const Tags: FC<Props> = ({ tags, className, onClick }) => {
    return (
        <>
            {tags.map(({ name, id }, i) => {
                return tags.length - 1 === i ? (
                    <span className={['tags', className].join(' ')} key={id + i}>
                        <span onClick={() => onClick && onClick(name, id)} className={'tags-name'}>
                            {name}
                        </span>
                    </span>
                ) : (
                    <span className={['tags', className].join(' ')} key={id + i}>
                        <span onClick={() => onClick && onClick(name, id)} className={'tags-name'}>
                            {name}
                        </span>
                        <span className={'tags-slash'}>/</span>
                    </span>
                )
            })}
        </>
    )
}

export default Tags
