import React, { FC, useEffect, useMemo, useState } from 'react'
import { Search_Params, SearchType } from '@/server/api/search/params'
import { getSearchResults, SearchList, SearchProps } from '@/pages/Search'
import Tags from '@/components/Tags'
import './index.less'
import Like from '@/components/Like'
import dateTool from '../../../utils/dateTool'
import { history } from 'umi'
import { MusicRequest } from '@/server/api/music'
import { useAudio } from '@/hooks/audio'
import { formatMusicDetail } from '@/utils/detailFormatting'
import { music_detail } from '@/recoil/muisc'
import { useRecoilValue } from 'recoil'
import { Pagination } from 'antd'
import { useScroll } from '@/hooks'

const SearchPageMuisc: FC<SearchProps> = ({ keywords }) => {
    const audio = useAudio()
    const musicDetail = useRecoilValue(music_detail)
    const [query, setQuery] = useState<Search_Params>({
        keywords,
        limit: 50,
        page: 1,
        type: SearchType.music
    })
    const [result, setResult] = useState<SearchList>({ list: [], total: 0 })
    useEffect(() => {
        getSearchResults(query).then(r => r && setResult(r))
    }, [query])
    useMemo(() => {
        setQuery({
            keywords,
            limit: 50,
            page: 1,
            type: SearchType.music
        })
    }, [keywords])

    const doubleTapToPlay = async (id: number) => {
        if (musicDetail?.id === id) return
        const { code, songs } = await MusicRequest.getDetails(String(id))
        if (code !== 200) return
        audio.audioPlay(formatMusicDetail(songs[0]))
    }
    const toScroll = useScroll()
    const onPageChange = (page: number) => {
        setQuery({ ...query, page })
        toScroll(document.querySelector('.layout') as HTMLElement, 0)
    }
    return (
        <>
            <ul className={'searchPageMuisc'}>
                {result.list.map(item => (
                    <li onDoubleClick={() => doubleTapToPlay(item.id)} key={item.id} className={['searchPageMuisc-item'].join(' ')}>
                        <span className={'searchPageMuisc-name'}>{item.name}</span>
                        <span className={'searchPageMuisc-auther'}>
                            <Tags
                                tags={item.artists}
                                onClick={(name, id) =>
                                    history.push({
                                        pathname: '/singerDetail',
                                        query: { id: String(id) }
                                    })
                                }
                            />
                        </span>
                        <span className={'searchPageMuisc-album'}>《{item.album.name}》</span>
                        <span className={'searchPageMuisc-duration'}>{dateTool(item.duration).format('mm:ss')}</span>
                        <Like id={item.id} />
                    </li>
                ))}
            </ul>
            <div className='center-container'>
                <Pagination
                    hideOnSinglePage={true}
                    onChange={onPageChange}
                    current={query.page}
                    defaultCurrent={query.page}
                    pageSize={query.limit}
                    showSizeChanger={false}
                    total={result.total}
                />
            </div>
        </>
    )
}

export default SearchPageMuisc
