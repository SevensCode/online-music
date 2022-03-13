export default {
    'POST /test': (req, res) => {
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        setTimeout(() => {
            res.end('ok');
        }, 4000);
    },
};
