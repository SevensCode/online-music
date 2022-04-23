import React, { FC, useEffect, useState } from 'react'
import { KeepAlive } from '@@/core/umiExports'
import './index.less'
import { SongListRequst } from '@/server/api/songList'
import { SongListBasicInfo } from '@/types/songList'
import { formatSongListBasicInfo } from '@/utils'

const getBoutiquePlaylist = async (
    limit: number
): Promise<SongListBasicInfo[]> => {
    const { playlists } = await SongListRequst.getBoutiquePlaylist({ limit })
    const list = playlists || []
    return list.map((item: any) => formatSongListBasicInfo(item))
}
const SongList: FC = () => {
    const [boutiquePlaylistCover, setBoutiquePlaylistCover] =
        useState<Nullable<SongListBasicInfo>>()
    useEffect(() => {
        getBoutiquePlaylist(1).then((songListInfo) => {
            console.log(songListInfo)
            setBoutiquePlaylistCover(songListInfo[0])
        })
    }, [])
    return (
        <div className={'songList app-container'}>
            <div className='songList-boutiqueSongListEntrance'>
                <div
                    className='songList-boutiqueSongListEntrance-maskLayer'
                    style={{
                        backgroundImage: `url(${
                            boutiquePlaylistCover?.coverPicture +
                            '?param=250y250 '
                        })`
                    }}
                ></div>
                <div className='songList-boutiqueSongListEntrance-main'>
                    <img
                        src={
                            boutiquePlaylistCover?.coverPicture +
                            '?param=250y250 '
                        }
                        className={'songList-CoverImage'}
                    />
                    <div className='songList-text'>
                        <p className={'songList-text-button'}>Go 精品歌单</p>
                        <p className={'songList-text-name'}>
                            {boutiquePlaylistCover?.name}
                        </p>
                    </div>
                </div>
            </div>
            <div className='songList-category'>
                <button className={'songList-category-button'}>
                    <i className={'iconfont icon-ico-'}></i>
                    全部歌单
                </button>
            </div>
        </div>
    )
}

// @ts-ignore
export default () => (
    <KeepAlive name={'songList'} when={true}>
        <SongList />
    </KeepAlive>
)
