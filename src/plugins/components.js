import Vue from 'vue'
import {lcgFormatDate,getDateBeforeDay,clipContent,returnUploadPrm} from "../utils/commonFn";

//引入wps
// import * as WPS from './assets/wps/jwps.es6'
// import * as WPS from '@/assets/wps/web-office-sdk-v1.1.12.es'
//引入公共组件
import asideTree from '@/components/asideTree/asideTree'
import emptyPage from '@/components/emptyPage'
import commonNavHeader from '@/components/commonNavHeader'
import commonFooter from '@/components/commonFooter'
import commonButton from '@/components/commonButton'

Vue.component('common-nav-header',commonNavHeader)
Vue.component('common-footer',commonFooter)
Vue.component('empty-page',emptyPage)
Vue.component('aside-tree',asideTree)
Vue.component('common-button',commonButton)

Vue.prototype.$lcgFormatDate = lcgFormatDate
Vue.prototype.$getDateBeforeDay = getDateBeforeDay
Vue.prototype.$clipContent = clipContent
Vue.prototype.$returnUploadPrm = returnUploadPrm
// Vue.prototype.wps = WPS

