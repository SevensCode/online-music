import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import './index.less'

interface Props {
    placeholder?: string

    onSearch?(value: string): void

    onChange?(value: string): void

    onFocus?(): void

    onBlur?(): void
}

const SearchInput: FC<Props> = ({ onSearch, onBlur, onChange, onFocus, placeholder }) => {
    const [value, setValue] = useState('')
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onChange && onChange(e.target.value)
    }
    const search = () => {
        onSearch && onSearch(value)
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === 'Enter' && onSearch && onSearch(value)
    }
    return (
        <div className={'searchInput'}>
            <input
                type='text'
                onKeyDown={onKeyDown}
                onChange={change}
                onFocus={() => onFocus && onFocus()}
                placeholder={placeholder}
                className={'searchInput-input'}
                onBlur={() => onBlur && onBlur()}
            />
            <i onClick={search} className={'iconfont icon-sousuo searchInput-icon'} />
        </div>
    )
}

export default SearchInput
