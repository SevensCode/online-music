export interface MusicDetails {
    // 名称
    name: string;
    // 封面图
    coverPicture: string;
    // 作者
    authors: { name: string; id: number }[];
    // 专辑
    album: {
        name: string;
        id: number;
    };
    // 时长
    duration: number;
    id: number;
}

export interface PlaybackProgress {
    minute: number;
    second: number;
}
