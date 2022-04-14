import React, { FC } from 'react';
import './index.less';
import Loading from '@/components/Loading';
import CommentInputBox from '@/components/Comment/CommentInputBox';

const Comment: FC = () => {
    return (
        <div className={'comment-container'}>
            <h1 className={'comment-title'}>
                评论<span>（已有12321条评论）</span>
            </h1>
            <Loading />
            <CommentInputBox />
        </div>
    );
};

export default Comment;
