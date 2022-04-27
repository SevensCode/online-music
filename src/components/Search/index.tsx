import React, { ChangeEvent, FC } from 'react'
import './index.less'

interface Props {
    placeholder?: string

    onSearch?(): void

    onChange?(value: string): void

    onFocus?(): void

    onBlur?(): void
}

const SearchInput: FC<Props> = ({ onSearch, onBlur, onChange, onFocus, placeholder }) => {
    return (
        <div className={'searchInput'}>
            <input
                type='text'
                onKeyDown={e => e.code === 'Enter' && onSearch && onSearch()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
                onFocus={() => onFocus && onFocus()}
                placeholder={placeholder}
                className={'searchInput-input'}
                onBlur={() => onBlur && onBlur()}
            />
            <i onClick={onSearch} className={'iconfont icon-sousuo searchInput-icon'} />
        </div>
    )
}

export default SearchInput
