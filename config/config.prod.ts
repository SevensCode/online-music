import { defineConfig } from 'umi'

export default defineConfig({
    define: {
        // dvl 环境的请求基础地址
        'process.env.REQUEST_BASE_API': 'http://localhost:3000'
    }
})
