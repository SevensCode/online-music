import React from 'react'
import './index.less'
import SingerBasicInfo from '@/pages/Details/Singer/BasicInfo'
import { Tabs } from 'antd'
import Top50Musics from '@/pages/Details/Singer/Top50Musics'
import SingerDetailAlbumList from '@/pages/Details/Singer/Album'
import SingerDetailMvList from '@/pages/Details/Singer/Mv'
import SingerDetailDescription from '@/pages/Details/Singer/Description'

const { TabPane } = Tabs

const SingerDetailPage = () => {
    return (
        <div className={'app-container singerDetailPage'}>
            <SingerBasicInfo />
            <div className='singerDetailPage-tabs'>
                <Tabs defaultActiveKey='1'>
                    <TabPane tab='热门50首歌曲' key='1'>
                        <Top50Musics />
                    </TabPane>
                    <TabPane tab={'专辑'} key='2'>
                        <SingerDetailAlbumList />
                    </TabPane>
                    <TabPane tab={'Mv'} key='3'>
                        <SingerDetailMvList />
                    </TabPane>
                    <TabPane tab={'歌手描述'} key='4'>
                        <SingerDetailDescription />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default SingerDetailPage
