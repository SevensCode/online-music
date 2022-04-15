import React, { FC, useCallback, useState, KeyboardEvent, useRef } from 'react';
import { Button } from 'antd';
import './index.less';

interface Props {
    className?: string;
    maxLength?: string;
}

const CommentInputBox: FC<Props> = ({ className, maxLength = 10 }) => {
    const textArea = useRef<HTMLDivElement>(null);
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [value, setValue] = useState('');
    const onFocus = useCallback(() => {
        setPlaceholderVisible(false);
    }, []);
    const onBlur = useCallback(() => {
        setPlaceholderVisible(!value.length);
    }, [value]);
    const onChange = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        console.log((e.target as HTMLElement).innerText.length);
        setValue((e.target as HTMLElement).innerText);
    }, []);
    const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        const { innerText } = e.target as HTMLDivElement;
        console.log(
            (e.target as HTMLDivElement).ownerDocument.defaultView
                ?.getSelection()
                .getRangeAt(0),
        );
        let allowKey = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter',
            'Backspace',
        ]; // 上下左右 回车 删除
        if (innerText.length === maxLength && !allowKey.includes(e.code)) {
            e.preventDefault();
        }
    }, []);
    return (
        <div className={['commentInputBox', className].join(' ')}>
            <div className="commentInputBox-textArea-box">
                <div
                    ref={textArea}
                    suppressContentEditableWarning={true}
                    contentEditable
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onInput={onChange}
                    onKeyDown={onKeyDown}
                    className={'commentInputBox-textArea'}
                >
                    {placeholderVisible && (
                        <div className="commentInputBox-textArea-placeholder">
                            说说你的看法吧！
                        </div>
                    )}
                </div>
                <p className={'commentInputBox-count'}>
                    剩余<span>100</span>字
                </p>
            </div>
            <Button shape={'round'} className={'commentInputBox-button-submit'}>
                评论
            </Button>
        </div>
    );
};

export default CommentInputBox;
