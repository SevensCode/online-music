import { defineConfig } from 'umi'
import routes from './routes'

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
    }
})


