import React, { FC } from 'react';
import './index.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { audio_isLyricsView, audio_musicDetails } from '@/recoil/audio';
import ControllerAndMusicDetails from '@/layouts/components/LyricsView/ControllerAndMusicDetails';
import { CaretLeftOutlined } from '@ant-design/icons';

const LyricsView: FC = () => {
    const musicDetails = useRecoilValue(audio_musicDetails);
    const setIsLyricsView = useSetRecoilState(audio_isLyricsView);
    return (
        <div
            className={'lyricsView'}
            style={{
                backgroundImage: `url(${
                    musicDetails?.coverPicture + '?param=1024y1024'
                })`,
            }}
        >
            <div className="lyricsView-maskLayer gaussianBlur">
                <ControllerAndMusicDetails />
                <div className={'lyricsView-lyrics'}>
                    <p>
                        难以忘记初次见你{' '}
                        <CaretLeftOutlined className={'lyricsView-playIcon'} />
                    </p>
                    <p>
                        一双迷人的眼睛{' '}
                        <CaretLeftOutlined className={'lyricsView-playIcon'} />
                    </p>
                    <p>在我脑海里</p>
                    <p>你的身影 挥散不去</p>
                    <p>握你的双手感觉你的温柔</p>
                    <p>真的有点透不过气</p>
                    <p>你的天真 我想珍惜</p>
                    <p className={'active'}>
                        看到你受委屈看到你受委屈看到你受委屈看到你受委屈看到你受委屈
                        我会伤心{' '}
                        <CaretLeftOutlined className={'lyricsView-playIcon'} />
                    </p>
                    <p>喔</p>
                    <p>只怕我自己会爱上你</p>
                    <p>不敢让自己靠的太近</p>
                    <p>怕我没什么能够给你</p>
                    <p>爱你也需要很大的勇气</p>
                    <p>只怕我自己会爱上你</p>
                    <p>也许有天会情不自禁</p>
                    <p>想念只让自己苦了自己</p>
                    <p>爱上你是我情非得已</p>
                    <p>难以忘记初次见你</p>
                    <p>一双迷人的眼睛一双迷人的眼睛</p>
                    <p>在我脑海里 你的身影 挥散不去</p>
                    <p>握你的双手感觉你的温柔</p>
                    <p>真的有点透不过气</p>
                    <p>你的天真 我想珍惜</p>
                    <p>看到你受委屈 我会伤心</p>
                    <p>喔 我会伤心</p>
                    <p>不敢让自己靠的太近</p>
                    <p>怕我没什么能够给你</p>
                    <p>爱你也需要很大的勇气</p>
                    <p>只怕我自己会爱上你</p>
                    <p>也许有天会情不自禁</p>
                    <p>想念只让自己苦了自己</p>
                </div>
                <i
                    onClick={() => setIsLyricsView(false)}
                    className="iconfont icon-rollback lyricsView-back"
                ></i>
            </div>
        </div>
    );
};

export default LyricsView;
