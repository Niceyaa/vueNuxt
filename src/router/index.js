import Vue from 'vue'
import VueRouter from 'vue-router'
// import index from '../pages/index/index'
import index from '../pages/Home'

import homePage from './modules/homePage'
import markDocEdit from './modules/markDocEdit'
import totalMessage from './modules/message'
import certification from './modules/certification'
import personal from './modules/personal'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'index',
    component: index
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('@/pages/register')
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: ()=>import('@/pages/forgetPwd')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/pages/login')
  },
  {
    path: '/accountSetting',
    name: 'accountSetting',
    component: ()=>import('@/pages/index/accountSetting')
  },
  {
    path: '/modelClassify/modelManagement',
    name: 'modelManagement',
    component: ()=>import('@/pages/modelManagement/modelManagement')
  },
  {
    path: '/modelClassify',
    name: 'modelClassify',
    component: ()=>import('@/pages/modelManagement/modelClassify')
  },
  {
    path:'/markDoc',
    name:'markDoc',
    component:()=>import('@/pages/markDocManagement/list'),
    meta:{title:'标书列表'},
  },
  {
    path:'/markDoc/markDocEdit',
    name:'markDocEdit',
    component:()=>import('@/pages/markDocManagement/markDocEdit'),
    meta:{title:'标书编辑'},
  },
  {
    path:'/fodderClassify/fodder',
    name:'fodder',
    component:()=>import('@/pages/fodder/fodder'),
    meta:{title:'素材管理'},
  },
  {
    path:'/fodderClassify',
    name:'fodderClassify',
    component:()=>import('@/pages/fodder/fodderClassify'),
    meta:{title:'素材管理'},
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/pages/Home'),
    meta:{title:'素材管理'},
  },
  {
    path:'/userCenter/myOrder',
    name:'myOrder',
    component:()=>import('@/pages/userCenter/myOrder'),
    meta:{title:'我的订单'},
  },
  {
    path:'/userCenter/exportRecord',
    name:'exportRecord',
    component:()=>import('@/pages/userCenter/exportRecord'),
    meta:{title:'导出记录'},
  },
  {
    path:'/userCenter/myInvoice',
    name:'myInvoice',
    component:()=>import('@/pages/userCenter/myInvoice'),
    meta:{title:'我的发票'},
  },
  {
    path:'/userCenter/personCertification',
    name:'personCertification',
    component:()=>import('@/pages/userCenter/personCertification'),
    meta:{title:'成员管理'},
  },
  {
    path:'/vip',
    name:'vip',
    component:()=>import('@/pages/vip'),
    meta:{title:'会员中心'},
  },
  {
    path:'/enterpriseVip',
    name:'enterpriseVip',
    component:()=>import('@/pages/enterpriseVip'),
    meta:{title:'企业VIP'},
  },
  {
    path:'/templateDoc',
    name:'templateDoc',
    component:()=>import('@/pages/templateDoc'),
    meta:{title:'模板标书'},
  },
  {
    path:'/myOrder',
    name:'myOrder',
    component:()=>import('@/pages/myOrder'),
    meta:{title:'我的订单'},
  },
  {
    path:'/test',
    name:'test',
    component:()=>import('@/pages/test/test'),
    meta:{title:'测试'},
    children: [
      {
        path:'child',
        name:'child',
        component:()=>import('@/pages/test/test/child'),
        meta:{title:'测试'},
      }
    ]
  },
  homePage,
  personal,
  // markDocEdit,
  totalMessage,
  certification
]

/*const router = new VueRouter({
  routes,
  // mode:'hash',
  mode:'history',
})

export default router*/
export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes
  })

}
