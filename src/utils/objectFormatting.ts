import { SongListBasicInfo } from '@/types/songList'
import { MusicDetail } from '@/types/music'
import { SingerDetail } from '@/types/Singer'

/**
 * 音乐详情格式化
 * */
export const formatMusicDetail = (musicDeatils: any): MusicDetail => {
    const {
        id,
        name,
        picUrl,
        song: { album, artists, duration }
    } = musicDeatils
    return {
        id,
        name,
        coverPicture: picUrl,
        duration,
        album,
        authors: artists
    }
}
/**
 * 歌单基本信息格式化
 * */
export const formatSongListBasicInfo = (
    songListBasicInfo: any
): SongListBasicInfo => {
    const {
        id,
        name,
        coverImgUrl,
        description,
        commentCount,
        playCount,
        updateTime,
        tags,
        creator
    } = songListBasicInfo
    return {
        commentCount,
        coverPicture: coverImgUrl,
        introduce: description,
        name,
        playCount,
        tags,
        updateTime,
        id,
        createUser: creator
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
    const { albumSize, id, mvSize, musicSize, name, briefDesc, cover, picUrl } =
        singer
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
