import React, { FC, useEffect, useRef } from 'react'
import './index.less'
import { Button, Tag } from 'antd'
import { computeLineCount } from '@/utils'

const SongListDetail: FC = () => {
    const introductionRef = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        console.log(computeLineCount(introductionRef.current))
    }, [])
    return (
        <div className={'songListDetail app-container'}>
            <div className='songListDetail-infoContainer'>
                <img
                    className={'songListDetail-coverPicture'}
                    src='https://p1.music.126.net/AUyBRdgFleg_hvfsjmok9g==/109951167338184606.jpg?param=250y250'
                    alt=''
                />
                <div className='songListDetail-info'>
                    <h1 className='songListDetail-info-title'>
                        <Tag color='volcano'>volcano</Tag>☾ 治愈心灵 |
                        月亮在向你招手 悄悄说晚安
                    </h1>
                    <div className='songListDetail-info-user'>
                        <img
                            className={'songListDetail-info-user-avatar'}
                            src='https://p1.music.126.net/AUyBRdgFleg_hvfsjmok9g==/109951167338184606.jpg?param=250y250'
                            alt=''
                        />
                        <span
                            className={'songListDetail-info-user-nickname'}
                        ></span>
                        <span
                            className={'songListDetail-info-user-createTime'}
                        ></span>
                    </div>
                    <div className={'songListDetail-info-action'}>
                        <Button>播放全部</Button>
                    </div>
                    <div className='songListDetail-info-tags'>
                        <span className={'songListDetail-info-tags-label'}>
                            标签：
                        </span>
                        <span className='songListDetail-info-tag'>华语</span>
                        <span className='songListDetail-info-tag'>/夜晚/</span>
                        <span className='songListDetail-info-tag'>治愈</span>
                    </div>
                    <div className='songListDetail-info-count'>
                        <span>歌曲：22</span>
                        <span>播放：33</span>
                    </div>
                    <div className='songListDetail-info-introduction'>
                        简介：
                        <span style={{ padding: '30px' }} ref={introductionRef}>
                            阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦阿斯顿阿斯顿阿斯顿阿斯顿阿萨大厦大厦阿萨得到阿斯顿阿萨大厦的撒大厦
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongListDetail
