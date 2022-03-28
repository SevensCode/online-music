import React, { FC } from 'react';
import './index.less';

interface Props {
    authors: { name: string; id: number }[];
}

const AuthorTags: FC<Props> = ({ authors }) => {
    return (
        <>
            {authors.map(({ name, id }, i) => {
                return authors.length - 1 === i ? (
                    <span className={'authorTags'} key={id}>
                        <span className={'authorTags-name'}>{name}</span>
                    </span>
                ) : (
                    <span className={'authorTags'} key={id}>
                        <span className={'authorTags-name'}>{name}</span>
                        <span className={'authorTags-slash'}>/</span>
                    </span>
                );
            })}
        </>
    );
};

export default AuthorTags;
