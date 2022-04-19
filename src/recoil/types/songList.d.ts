import { MusicDetail } from '@/recoil/types/music';

export interface SongList {
    id: number;
    originList: MusicDetail[];
    list: MusicDetail[];
}
