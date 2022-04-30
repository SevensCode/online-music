import React, { FC, Ref, useCallback, useRef, useState } from 'react'
import { Button, Input } from 'antd'
import './index.less'

const { TextArea } = Input

interface Props {
    className?: string
    maxLength?: number
    inputBoxRef?: Ref<HTMLDivElement>
    placeholder?: string
    value?: string

    onChange?(value: string): void

    onSubmit?(value: string, setLoading: (isLoading: boolean) => void): void
}

const CommentInputBox: FC<Props> = ({
    className,
    maxLength = 140,
    onChange,
    onSubmit,
    inputBoxRef,
    placeholder = '说说你的看法吧！',
    value
}) => {
    const valueRef = useRef('')
    const [loading, setLoading] = useState(false)
    const onTextAreaChange = useCallback(e => {
        valueRef.current = e.target.value
        onChange && onChange(e.target.value)
    }, [])
    const onTextAreaSubmit = () => {
        onSubmit && onSubmit(valueRef.current, setLoading)
    }
    return (
        <div ref={inputBoxRef} className={['commentInputBox', className].join(' ')}>
            <div className='commentInputBox-textArea-box'>
                <TextArea
                    onChange={onTextAreaChange}
                    autoSize
                    value={value}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={'commentInputBox-textArea'}></TextArea>
                <p className={'commentInputBox-count'}>
                    剩余
                    <span>{maxLength - valueRef.current.length}</span>字
                </p>
            </div>
            <Button loading={loading} shape={'round'} className={'commentInputBox-button-submit'} onClick={onTextAreaSubmit}>
                评论
            </Button>
        </div>
    )
}

export default CommentInputBox
