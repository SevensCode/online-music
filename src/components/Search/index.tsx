import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react'
import './index.less'

interface Props {
    placeholder?: string
    className?: string
    value?: string
    defaultValue?: string

    onSearch?(value: string): void

    onChange?(value: string): void

    onFocus?(): void

    onBlur?(): void
}

const SearchInput: FC<Props> = ({ onSearch, onBlur, onChange, onFocus, placeholder, className, value, defaultValue = '' }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const valueRef = useRef(value || '')
    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.value = defaultValue
        }
    }, [])
    useEffect(() => {
        valueRef.current = value || ''
    }, [value])
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        valueRef.current = e.target.value
        onChange && onChange(e.target.value)
    }
    const search = () => {
        onSearch && onSearch(valueRef.current)
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === 'Enter' && onSearch && onSearch(valueRef.current)
    }
    return (
        <div className={['searchInput', className].join(' ')}>
            <input
                ref={inputRef}
                type='text'
                value={value}
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
