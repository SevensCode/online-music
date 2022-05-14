import { defineConfig } from 'umi'
import routes from './routes'
import webpackPlugin from './plugin'

export default defineConfig({
    nodeModulesTransform: {
        type: 'none'
    },
    routes,
    publicPath: ' ./',
    fastRefresh: {},
    lessLoader: {
        // 配置全局变量文件
        modifyVars: {
            hack: 'true; @import "~@/assets/styles/variable.less";'
        }
    },
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    },
    dva: false,
    chainWebpack: process.env.UMI_ENV === 'dev' ? undefined : webpackPlugin
})
