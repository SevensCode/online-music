// config/plugin.ts
import CompressionPlugin from 'compression-webpack-plugin'

const webpackPlugin = (config: any) => {
    config.merge({
        optimization: {
            minimize: true,
            splitChunks: {
                minSize: 30000,
                minChunks: 2,
                automaticNameDelimiter: '.',
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test: /(react|react-dom|react-dom-router|babel-polyfill)/,
                        chunks: 'all',
                        priority: 100
                    },
                    antd: {
                        name: 'antd',
                        test: /antd/,
                        chunks: 'async',
                        priority: 90
                    },
                    // '@antv/data-set': {
                    //     name: '@antv/data-set',
                    //     test: /data-set/,
                    //     chunks: 'async',
                    //     priority: 90
                    // },
                    commons: {
                        // 其余同步加载包
                        chunks: 'all',
                        minChunks: 2,
                        name: 'commons',
                        priority: 80,
                        // 这里需要注意下，webpack5会有问题， 需加上这个 enforce: true，
                        // refer: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257#issuecomment-432594711
                        enforce: true
                    }
                }
            }
        }
    })
    //gzip压缩
    config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
            test: /\.js$|\.ts$|\.html$|\.css$/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false //不删除源文件
        }
    ])
}
export default webpackPlugin
