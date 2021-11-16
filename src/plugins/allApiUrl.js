import user from '@/apiUrl/user'
import vip from '@/apiUrl/vip'
import certification from '@/apiUrl/certification'
import commonApi from '@/apiUrl/commonApi'
import fodderApi from '@/apiUrl/fodderApi'
import markDocApi from '@/apiUrl/markDocApi'
import personal from '@/apiUrl/personal'
import templateApi from '@/apiUrl/templateApi'
import Vue from 'vue'

Vue.prototype.$apiURL = {
    user,
    vip,
    certification,
    commonApi,
    fodderApi,
    markDocApi,
    personal,
    templateApi
}



