import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
// import store from '@/store'
import {getToken} from "./auth";
import qs from 'qs'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 15000
})

service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['token'] = getToken()
        }
        /* const configData = qs.parse(config.data)
         global = configData.hasOwnProperty('loading')*/
        // store().commit('SET_LOADING',true)
        return config
    }, error => {
        console.log('err', error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {

        /*console.log('响应头',response.config.headers)
        console.log('响应数据',qs.parse(response.config.data))
        console.log('响应数据',JSON.parse(response.config.data))*/

        // console.log('响应参数',store().state)
        store().commit('SET_LOADING',false)
        try {
            if (!response.data.code) return response
        }catch{

        }


        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.msg || 'error',
                type: 'error',
                duration: 5 * 1000
            })
            if (response.data.code === 402) {
                console.log('我进来了吗',MessageBox.confirm())
                // to re-login
                MessageBox.confirm('登录身份已过期，请重新登录', '登录过期', {
                    confirmButtonText: '确定',
                    cancelButtonText: '停留',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({
                        path: '/login'
                    })
                    console.log(22222222222)
                    /*store().dispatch('resetToken').then(() => {
                        location.reload()
                    })*/
                }).catch(err=>{
                    console.log(333333333)
                })
            }
            // return Promise.reject(new Error(res.message || 'error'))
            return Promise.reject(new Error(res.message || 'error'))
        } else {
            return response
        }
    }, error => {
        // store().commit('SET_LOADING',false)
        // global?selfMsg.close():()=>{}
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') > -1) {
            Message({
                message: '当前请求时间较长，网络运行超时，请刷新页面',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }

        return Promise.reject(error)
    }
)

export default service
