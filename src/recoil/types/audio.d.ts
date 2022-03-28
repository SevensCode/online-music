export interface MusicDetails {
    // 名称
    name?: string;
    // 封面图
    coverPicture?: string;
    // 作者
    authors?: { name: string; id: number }[];
    // 音乐地址
    musicUrl?: string;
    // 专辑
    album?: {
        name: string;
        id: number;
    };
    // 时长
    duration?: number;
    id?: number;
}
