import React, { FC } from 'react';
import { Button, Input } from 'antd';
import './index.less';

const { TextArea } = Input;

interface Props {
    className?: string;
}

const CommentInputBox: FC<Props> = ({ className }) => {
    return (
        <div className={['commentInputBox', className].join(' ')}>
            <TextArea
                className={'commentInputBox-textArea'}
                maxLength={140}
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder={'发表评论'}
            />
            <Button color={'#ec4141'}>评论</Button>
        </div>
    );
};

export default CommentInputBox;
