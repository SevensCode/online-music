import React, { useEffect, useState } from 'react';
import { MvRequst } from '@/api/mv';
import MvCard from '@/components/MvCard';
// 获取独家放送
const getExclusiveBroadcast = async () => {
    const { result } = await MvRequst.exclusiveBroadcast();
    return result || [];
};
const ExclusiveBroadcast = () => {
    // 独家放送列表
    const [exclusiveBroadcastList, setExclusiveBroadcast] = useState<any[]>([]);
    useEffect(() => {
        getExclusiveBroadcast().then((value) => setExclusiveBroadcast(value));
    }, []);
    return (
        <div className="find-exclusiveBroadcast-container">
            {exclusiveBroadcastList.map(({ id, name, sPicUrl }) => (
                <MvCard title={name} key={id} src={sPicUrl} />
            ))}
        </div>
    );
};

export default ExclusiveBroadcast;
