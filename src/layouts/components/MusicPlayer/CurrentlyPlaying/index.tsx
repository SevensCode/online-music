import React, { FC, useCallback } from 'react'
import './index.less'
import { useRecoilState, useRecoilValue } from 'recoil'
import { music_detail, music_songList } from '@/recoil/muisc'
import Tags from '@/components/Tags'
import { millisecondTurnTime } from '@/utils/tool'
import PlayOrPauseIcon from '@/components/Icon/PlayOrPause'
import CustomButton from '@/components/CustomButton'

const CurrentlyPlaying: FC = () => {
    const [songList, setSongList] = useRecoilState(music_songList)
    const musicDetail = useRecoilValue(music_detail)
    const type = useCallback(
        id => {
            if (musicDetail === null) return 'play'
            return musicDetail.id === id ? 'pause' : 'play'
        },
        [musicDetail]
    )
    const onPlay = useCallback(() => {}, [])
    const onPause = useCallback(() => {}, [])
    const clearTheList = useCallback(() => {
        setSongList(null)
    }, [])
    return (
        <div className={'currentlyPlaying'}>
            <h3 className={'module-title'}>当前播放</h3>
            <div className='currentlyPlaying-other'>
                <p className='currentlyPlaying-total'>总{songList?.list.length || 0}首</p>
                <CustomButton size={'small'} onClick={clearTheList} icon={'icon-top'}>
                    清空列表
                </CustomButton>
                {/*<p className="currentlyPlaying-clearTheList">*/}
                {/*    <i className={ 'iconfont icon-top' }></i>*/}

                {/*</p>*/}
            </div>
            <ul className='currentlyPlaying-ul'>
                {songList !== null &&
                    songList.list.map(({ name, authors, duration, id }) => {
                        const { minute, second } = millisecondTurnTime(duration)
                        return (
                            <li className='currentlyPlaying-li' key={id}>
                                <PlayOrPauseIcon
                                    onPlay={onPlay}
                                    onPause={onPause}
                                    type={type(id)}
                                    className={['currentlyPlaying-type', musicDetail?.id === id ? 'playing' : ''].join(' ')}
                                />
                                <p className='currentlyPlaying-name text-1LinesHide'>{name}</p>
                                <p className='currentlyPlaying-author text-1LinesHide'>
                                    <Tags tags={authors} />
                                </p>
                                <p className='currentlyPlaying-duration'>
                                    {minute}:{second}
                                </p>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default CurrentlyPlaying
