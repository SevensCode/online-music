import React, { FC, useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import './index.less';

const { TextArea } = Input;

interface Props {
    className?: string;
    maxLength?: number;

    onChange?(value: string): void;

    onSubmit?(value: string): void;
}

const CommentInputBox: FC<Props> = ({
    className,
    maxLength = 140,
    onChange,
    onSubmit,
}) => {
    const [value, setValue] = useState('');
    const onTextAreaChange = useCallback((e) => {
        setValue(e.target.value);
        onChange && onChange(e.target.value);
    }, []);
    const onTextAreaSubmit = useCallback(() => {
        onSubmit && onSubmit(value);
    }, [value]);
    return (
        <div className={['commentInputBox', className].join(' ')}>
            <div className="commentInputBox-textArea-box">
                <TextArea
                    onChange={onTextAreaChange}
                    autoSize
                    maxLength={maxLength}
                    placeholder={'说说你的看法吧！'}
                    className={'commentInputBox-textArea'}
                ></TextArea>
                <p className={'commentInputBox-count'}>
                    剩余<span>{maxLength - value.length}</span>字
                </p>
            </div>
            <Button
                shape={'round'}
                className={'commentInputBox-button-submit'}
                onClick={onTextAreaSubmit}
            >
                评论
            </Button>
        </div>
    );
};

export default CommentInputBox;
