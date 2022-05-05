import React, { FC, useCallback } from 'react'
import './index.less'
import { useRecoilState, useRecoilValue } from 'recoil'
import { music_detail, music_songList } from '@/recoil/muisc'
import Tags from '@/components/Tags'
import { millisecondTurnTime } from '@/utils/tool'
import CustomButton from '@/components/CustomButton'
import { useAudio } from '@/hooks/audio'
import { MusicDetail } from '@/types/music'

const CurrentlyPlaying: FC = () => {
    const [songList, setSongList] = useRecoilState(music_songList)
    const musicDetail = useRecoilValue(music_detail)
    const { audioPlay } = useAudio()

    const clearTheList = useCallback(() => {
        setSongList(null)
    }, [])
    const onDoubleClick = (detail: MusicDetail) => {
        detail.id !== musicDetail?.id && audioPlay(detail)
    }
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
                    songList.list.map(detail => {
                        const { minute, second } = millisecondTurnTime(detail.duration)
                        return (
                            <li
                                onDoubleClick={() => onDoubleClick(detail)}
                                className={['currentlyPlaying-li', detail.id === musicDetail?.id ? 'active' : ''].join(' ')}
                                key={detail.id}>
                                <p className='currentlyPlaying-name text-1LinesHide'>{detail.name}</p>
                                <p className='currentlyPlaying-author text-1LinesHide'>
                                    <Tags tags={detail.authors} />
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
