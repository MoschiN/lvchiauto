import Widget from 'eros-widget'
import apis from './apis'
import routes from './routes'
import './push'

new Widget({
    router: {
        /**
         * 路由配置表
         */
        routes
    },
    ajax: {
        baseUrl: 'http://10.120.8.187:7766',
        /**
         * 接口别名
         */
        apis,
        // 接口超时时间
        timeout: 30000,

        /**
         * 请求发送统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * next
         */
        requestHandler(options, next) {
            if (options.method === 'POST') {
                console.log('request-参数Content-Type')
                // options.data = stringify(options.data)
                if (typeof options.header !== 'undefined') {
                    options.header['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

                } else {
                    options.header = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
                }
            }
            console.log('request-opts', options)
            next()
        },

        /**
         * 请求返回统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * resData 服务器端返回的所有数据
         * resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
         * reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
         */
        responseHandler(options, resData, resolve, reject) {
            const { status, errorMsg, data } = resData
            if (status !== 200) {
                console.log(`invoke error status: ${status}`)
                console.log(`invoke error message: ${errorMsg}`)
                reject(resData)
            } else {
                // 自定义请求逻辑
                resolve(data)
            }
        },


    }
})
