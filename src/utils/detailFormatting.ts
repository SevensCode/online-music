import { SongListDetail } from '@/types/songList'
import { MusicDetail } from '@/types/music'
import { SingerDetail } from '@/types/singer'
import { AlbumDetail } from '@/types/album'

/**
 * 音乐详情格式化
 * */
export const formatMusicDetail = (musicDeatils: any): MusicDetail => {
    if (musicDeatils.al) {
        const { id, name, al, ar, dt, fee, noCopyrightRcmd } = musicDeatils
        return {
            id,
            name,
            coverPicture: al.picUrl,
            duration: dt,
            album: al,
            authors: ar,
            isVip: fee === 1,
            isCopyright: noCopyrightRcmd === null
        }
    }
    const {
        id,
        name,
        picUrl,
        song: { album, artists, duration, fee, noCopyrightRcmd }
    } = musicDeatils
    return {
        id,
        name,
        coverPicture: picUrl,
        duration,
        album,
        authors: artists,
        isVip: fee === 1,
        isCopyright: noCopyrightRcmd === null
    }
}
/**
 * 歌单基本信息格式化
 * */
export const formatSongListDetail = (songListBasicInfo: any): SongListDetail => {
    const {
        id,
        name,
        coverImgUrl,
        description,
        commentCount,
        playCount,
        updateTime,
        tags,
        creator,
        trackCount,
        trackIds,
        subscribed,
        subscribedCount
    } = songListBasicInfo
    return {
        musicCount: trackCount,
        subscribed,
        subscribedCount,
        commentCount,
        coverPicture: coverImgUrl,
        introduce: description,
        name,
        playCount,
        tags,
        updateTime,
        id,
        createUser: creator,
        musicId: trackIds && trackIds.map((item: any) => item.id)
    }
}

/**
 * 歌手信息格式化
 * */
export const formatSingerDetail = (singerDetail: any): SingerDetail => {
    let singer: any = {}
    if (singerDetail.artist) {
        singer = singerDetail.artist
    } else {
        singer = singerDetail
    }
    const { albumSize, id, mvSize, musicSize, name, briefDesc, cover, picUrl } = singer
    return {
        albumSize,
        id,
        introduction: briefDesc,
        musicSize,
        mvSize,
        name,
        avatar: picUrl || cover
    }
}

// 格式化专辑
export const formatAlbumDetail = (albumDetail: any): AlbumDetail => {
    const { alias, artist, blurPicUrl, description, id, name, publishTime, subType, type } = albumDetail
    return {
        alias,
        auther: artist,
        coverPicture: blurPicUrl,
        description,
        id,
        name,
        publishTime,
        subType,
        type
    }
}
