import getCookie from '@/utils/get-cookie'
import user from '../apiUrl/user'

import {loginPwd, getUserInfo, loginOut, getUserVipInfo} from '@/api/user'

export default async function ({store, route, redirect, req, $axios, $cookies}) {
    // If the user is not authenticated
    // console.log('req',req)

    /*if (store.state.hotTags.length === 0) {
      store.dispatch('getHotTagList')
    }
  */

    // console.log('路由拦截')

    if ($cookies.get('loginStatus') && !store.state.userInfo.userName) {
        try {
            store.dispatch('getUserInfo')
            store.dispatch('getUserVipInfo')
        } catch (e) {
            // console.log('eee', e)
            // next({path: '/login'})
        }
    }
    //保存一些公共接口数据
    if (store.state.industryData.length === 0) {
        await store.dispatch('getIndustryList')
        await store.dispatch('getHotTagList')
        await store.dispatch('getBtmNavInfo')
        await store.dispatch('getSpecialTempFodder')
    }
    const {smdToken} = getCookie(req)
    // console.log('middle')
    // console.log(smdToken)
    if (smdToken) {
        store.commit('SET_TOKEN', smdToken)
    }
    /*const routePath = route.path
    const extraPath = ['/', '/en']
    if ((!store.state.auth) && extraPath.indexOf(routePath) === -1) {
      return redirect('/')
    }*/
}
