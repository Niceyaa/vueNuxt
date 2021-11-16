import {MessageBox, Message} from 'element-ui'
import qs from 'qs'

export default (app) => {
    const service = app.$axios
    service.defaults.timeout = 60000
    service.onRequest((config) => {
        let data = {}
        if (config.method === 'get') {
            data = config.params || {}
            config.params = data
        }
        if (app.$cookies.get('smdToken')) {
            config.headers['token'] = app.$cookies.get('smdToken')
        }
        try {
            let prmData = qs.parse(config.data)
            if (!prmData.noLoading) {
                app.store.commit('SET_LOADING', true)
            }
        }catch (e) {

        }

        // console.log('请求进入',qs.parse(config.data))
    })
    service.onResponse(response => {
        // console.log('响应进入----------------------',response.data)
        app.store.commit('SET_LOADING', false)
        if (!response.data.code) {
            return response
        }
        const res = response.data
        // console.log('响应进入',res)
        // console.log(22222222222222222222222,response.config.data.showStatusCode)
        // console.log('requestData.showStatusCode',requestData.showStatusCode)
        if (res.code !== 200) {
            Message({
                message: res.msg || 'error',
                type: 'error',
                duration: 5 * 1000
            })
            if (res.code === 401 || res.code === 402) {
                // to re-login
                app.store.commit('SET_LOGIN', true)
                app.$cookies.set('loginStatus', false)
                /* MessageBox.confirm('登录身份已过期，请重新登录', '登录过期', {
                     confirmButtonText: '确定',
                     cancelButtonText: '停留',
                     type: 'warning'
                 }).then(() => {
                     app.store.dispatch('resetToken').then(() => {
                         location.reload()
                     })
                 })*/
            }/*else if ((res.code === 502 || res.code===501)) {
                app.error({
                    statusCode: res.code
                })
            }*/

           /* let requestData = qs.parse(response.config.data)
            try {
                if (requestData.showStatusCode) {
                    console.log(1111, requestData.showStatusCode)
                    app.error({
                        statusCode: res.code
                    })
                }
            } catch (e) {
                return Promise.reject(new Error(res.message || 'error'))
            }*/
            return Promise.reject(new Error(res.message || 'error'))
            // return response

        } else {
            return response
        }
    })
    service.onError(error => {
        console.log('错误进入', error.message)
        app.store.commit('SET_LOADING', false)
        // global?selfMsg.close():()=>{}
        /* if (error.code===500||error.message.indexOf('500')!==-1){
             app.redirect('/error/systemError')
         }else if (error.code==='ECONNREFUSED'||error.message.indexOf('ECONNREFUSED')!==-1){
             app.redirect('/error/systemError')
         } else */
        if ((error.code === 'ECONNABORTED' && error.message.indexOf('timeout') > -1)||error.code==='ETIMEDOUT') {
            Message({
                message: '当前请求时间较长，网络运行超时，请刷新页面',
                type: 'error',
                duration: 5 * 1000
            })
            app.error({
                statusCode: 'timeout'
            })
        } else if (error.message.indexOf('Network Error') !== -1||error.message.indexOf('ECONNREFUSED') !== -1) {
            Message({
                message: '网络错误',
                type: 'error',
                duration: 5 * 1000
            })
            app.error({
                statusCode: 'Network Error'
            })
        }
    })
}


