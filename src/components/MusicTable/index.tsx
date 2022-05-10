import React, { FC, MouseEvent, useCallback } from 'react'
import Like from '@/components/Like'
import { Table } from 'antd'
import { MusicDetail } from '@/types/music'
import './index.less'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { music_detail, music_songList } from '@/recoil/muisc'
import { useAudio } from '@/hooks/audio'
import ImageLazy from '@/components/ImageLazy'
import Tags from '@/components/Tags'
import dateTool from '@/utils/dateTool'
import { SongList } from '@/types/songList'
import { history } from 'umi'

interface Props {
    songList: SongList
    loading?: boolean
    total?: number
    pageSize?: number
    page?: number

    onChangePage?(page: number, size: number): void
}

const MusicTable: FC<Props> = ({ songList, loading, onChangePage, total, pageSize, page }) => {
    const musicDetail = useRecoilValue(music_detail)
    const { audioPlay } = useAudio()
    const setSongList = useSetRecoilState(music_songList)
    const rowClassName = (record: MusicDetail) => {
        if (record.isVip || !record.isCopyright) return 'notPlayable'
        return record.id === musicDetail?.id ? 'tableRowActive' : ''
    }
    const onRow = (record: MusicDetail) => ({
        // 双击播放
        onDoubleClick: (event: MouseEvent<HTMLElement>) => {
            if (record.id === musicDetail?.id) return
            setSongList(songList)
            audioPlay(record)
        }
    })
    const seeSingerDetail = useCallback((name, id) => {
        history.push({
            pathname: '/singerDetail',
            query: {
                id
            }
        })
    }, [])
    return (
        <Table
            rowClassName={rowClassName}
            onRow={onRow}
            loading={loading}
            pagination={{
                position: ['bottomCenter'],
                defaultPageSize: 50,
                pageSize,
                current: page,
                onChange: onChangePage,
                showSizeChanger: false,
                hideOnSinglePage: true,
                total
            }}
            dataSource={songList.list}
            rowKey={'id'}
            columns={[
                // {
                //     title: '序号',
                //     dataIndex: 'index',
                //     key: 'index',
                //     render(value, data, index) {
                //         return zeroPadding(index + 1)
                //     },
                //     width: 80
                // },
                {
                    title: '音乐',
                    dataIndex: 'name',
                    key: 'name',
                    render(value, data: MusicDetail) {
                        return (
                            <div className={'muiscTable-coverImageAndTitle'}>
                                {data.coverPicture && <ImageLazy src={data.coverPicture + '?param=50y50'} />}
                                <span className={'text-1LinesHide'}>{data.name}</span>
                            </div>
                        )
                    }
                },
                {
                    title: '歌手',
                    ellipsis: true,
                    dataIndex: 'authors',
                    key: 'authors',
                    render(value) {
                        return <Tags onClick={seeSingerDetail} tags={value} />
                    }
                },
                {
                    title: '专辑',
                    ellipsis: true,
                    dataIndex: 'album',
                    key: 'album',
                    width: 250,
                    render(value) {
                        return <span>{value.name}</span>
                    }
                },
                {
                    title: '时长',
                    dataIndex: 'duration',
                    key: 'duration',
                    render(value) {
                        return dateTool(value).format('mm:ss')
                    },
                    width: 100
                },
                {
                    title: 'Like',
                    dataIndex: 'id',
                    key: 'id',
                    width: 80,
                    render: value => <Like id={value}></Like>
                }
            ]}
        />
    )
}

export default MusicTable
