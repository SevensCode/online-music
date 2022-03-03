import { extend } from 'umi-request'
import { message } from 'antd'

type errorType = null | string
/** 上次业务错误信息 */
let lastBusinessErrorMessage: errorType = null
/** 上次系统错误信息 */
let lastSystemErrorMessage: errorType = null
const request = extend({
    prefix: 'http://localhost:8000',
    timeout: 3000,
    credentials: 'same-origin',
    errorHandler(error) {
        if (lastSystemErrorMessage !== error.message) {
            message.error(error.type === 'Timeout' ? '接口请求超时' : '系统错误').then(() => lastSystemErrorMessage = null)
            lastSystemErrorMessage = error.message
        }
    }
})

/** 请求拦截器 */
request.interceptors.request.use((url, options) => {
    // 加时间戳 防止 api 缓存
    // 全部接口都用post请求方式
    // url += '/' + new Date().getTime()
    return {
        url, options
    }
})
/** 响应拦截器 */
request.interceptors.response.use(async (response, options) => {
    const data = await response.clone().json()

    return response
})
export default request