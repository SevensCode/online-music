import React, { FC, MouseEvent } from 'react'
import Like from '@/components/Like'
import { Table } from 'antd'
import { MusicDetail } from '@/types/music'
import './index.less'
import { useRecoilValue } from 'recoil'
import { music_detail } from '@/recoil/muisc'
import { useAudio } from '@/hooks/audio'
import ImageLazy from '@/components/ImageLazy'
import { zeroPadding } from '@/utils'
import Tags from '@/components/AuthorTags'
import dateTool from '@/utils/dateTool'

interface Props {
    songList: MusicDetail[]
    loading?: boolean
}

const MusicTable: FC<Props> = ({ songList, loading }) => {
    const musicDetail = useRecoilValue(music_detail)
    const { audioPlay } = useAudio()
    const rowClassName = (record: MusicDetail) => {
        if (musicDetail === null) return ''
        return record.id === musicDetail.id ? 'tableRowActive' : ''
    }
    const onRow = (record: MusicDetail) => ({
        // 双击播放
        onDoubleClick: (event: MouseEvent<HTMLElement>) => {
            if (record.id === musicDetail?.id) return
            audioPlay(record)
        }
    })
    return (
        <Table
            rowClassName={rowClassName}
            onRow={onRow}
            loading={loading}
            pagination={{ position: ['bottomCenter'] }}
            dataSource={songList}
            columns={[
                {
                    title: '序号',
                    dataIndex: 'index',
                    render(value, data, index) {
                        return zeroPadding(index + 1)
                    },
                    width: 80
                },
                {
                    title: '音乐',
                    dataIndex: 'muisc',
                    sorter: true,
                    render(value, data: MusicDetail) {
                        return (
                            <div className={'muiscTable-coverImageAndTitle'}>
                                <ImageLazy src={data.coverPicture + '?param=50y50'} />
                                {data.name}
                            </div>
                        )
                    }
                },
                {
                    title: '歌手',
                    sorter: true,
                    dataIndex: 'authors',
                    render(value) {
                        return <Tags tags={value} />
                    }
                },
                {
                    title: '专辑',
                    dataIndex: 'album',
                    sorter: true,
                    render(value) {
                        return <span>{value.name}</span>
                    }
                },
                {
                    title: '时长',
                    dataIndex: 'duration',
                    sorter: true,
                    render(value) {
                        return dateTool(value).format('mm:ss')
                    },
                    width: 100
                },
                {
                    title: 'Like',
                    dataIndex: 'id',
                    width: 80,
                    render: value => <Like id={value}></Like>
                }
            ]}
        />
    )
}

export default MusicTable
