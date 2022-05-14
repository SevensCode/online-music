import { extend } from 'umi-request'
import { message } from 'antd'
import { whetherAndLastTimeStringSame } from '@/utils/tool'
import { history } from 'umi'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const isSystemErrorMessageSame = whetherAndLastTimeStringSame()
const isBusinessErrorMessageSame = whetherAndLastTimeStringSame()
console.log(process.env.REQUEST_BASE_API)
const request = extend({
    prefix: process.env.REQUEST_BASE_API,
    timeout: 10000,
    credentials: 'same-origin',
    errorHandler(error) {
        if (error.response?.status === 301) return { code: 500 }
        !isSystemErrorMessageSame(error.message) &&
            message.error(error.type === 'Timeout' ? '接口请求超时' : '服务端异常，请稍后重试').then(() => isSystemErrorMessageSame())
        return { code: 500 }
    }
})

/** 请求拦截器 */
request.interceptors.request.use((url, options) => {
    NProgress.start()
    // 加时间戳 防止 api 缓存
    const timestamp = new Date().getTime()
    options.method === 'post' ? (url += '/' + timestamp) : (options.params = { ...options.params, timestamp })
    return { url, options }
})
/**
 * 301 未登录
 * 503 访问太频繁
 * */
/** 响应拦截器 */
request.interceptors.response.use(async (response, options) => {
    NProgress.done()
    const { code } = await response.clone().json()
    switch (code) {
        case 301:
            !isBusinessErrorMessageSame('登录后可操作!') && message.error('登录后可操作!').then(() => isBusinessErrorMessageSame())
            const { pathname, search } = location
            history.push({
                pathname: '/login',
                query: { redirect: pathname + search }
            })
            break
        case 503:
            !isBusinessErrorMessageSame('系统繁忙，请稍后重试!') &&
                message.error('系统繁忙，请稍后重试!').then(() => isBusinessErrorMessageSame())
            break
    }
    return response
})
export default request
