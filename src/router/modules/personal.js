const personal = {
    path: '/personalCenter',
    name: 'personalCenter',
    redirect: '/personalCenter/index',
    component:()=>import('@/views/personalCenter/personalCenter'),
    children:[
        {
            path: 'index',
            name: 'personalCenterIndex',
            component: ()=>import('@/views/personalCenter/personalCenter/personalInfo'),
            meta: { title: '个人中心' }
        },
        {
            path: 'myTemplate',
            name: 'myTemplate',
            component: ()=>import('@/views/personalCenter/personalCenter/myTemplate'),
            meta: { title: '个人模板' }
        },
        {
            path: 'enterpriseTemplate',
            name: 'enterpriseTemplate',
            component: ()=>import('@/views/personalCenter/personalCenter/enterpriseTemplate'),
            meta: { title: '公司模板' }
        },
        {
            path: 'myFodder',
            name: 'myFodder',
            component: ()=>import('@/views/personalCenter/personalCenter/myFodder'),
            meta: { title: '个人素材' }
        },
        {
            path: 'enterpriseFodder',
            name: 'enterpriseFodder',
            component: ()=>import('@/views/personalCenter/personalCenter/enterpriseFodder'),
            meta: { title: '公司素材' }
        },
        {
            path: 'legalPersonInfo',
            name: 'legalPersonInfo',
            component: ()=>import('@/views/personalCenter/personalCenter/legalPersonInfo'),
            meta: { title: '法人身份证明' }
        },
        {
            path: 'businessPic',
            name: 'businessPic',
            component: ()=>import('@/views/personalCenter/personalCenter/businessPic'),
            meta: { title: '营业执照' }
        },
        {
            path: 'accountLicense',
            name: 'accountLicense',
            component: ()=>import('@/views/personalCenter/personalCenter/accountLicense'),
            meta: { title: '开户银行许可证' }
        },
      /*  {
            path: 'accountLicense',
            name: 'accountLicense',
            component: ()=>import('@/views/personalCenter/personalCenter/accountLicense'),
            meta: { title: '财务报告' }
        },*/
        {
            path: 'otherCertification',
            name: 'otherCertification',
            component: ()=>import('@/views/personalCenter/personalCenter/otherCertification'),
            meta: { title: '其他资质' }
        },
        {
            path: 'judiciaryIns',
            name: 'judiciaryIns',
            component: ()=>import('@/views/personalCenter/personalCenter/judiciaryIns'),
            meta: { title: '司法机关查询信息' }
        },
        {
            path: 'businessInfo',
            name: 'businessInfo',
            component: ()=>import('@/views/personalCenter/personalCenter/businessInfo'),
            meta: { title: '工商查询信息' }
        },
        {
            path: 'enterpriseHonor',
            name: 'enterpriseHonor',
            component: ()=>import('@/views/personalCenter/personalCenter/enterpriseHonor'),
            meta: { title: '企业荣誉' }
        },
        {
            path: 'financeReport',
            name: 'financeReport',
            component: ()=>import('@/views/personalCenter/personalCenter/financeReport'),
            meta: { title: '财务报告' }
        },
        {
            path: 'financeReportFile',
            name: 'financeReportFile',
            component: ()=>import('@/views/personalCenter/personalCenter/financeReportFile'),
            meta: { title: '财务报告附件' }
        },
        {
            path: 'creditStanding',
            name: 'creditStanding',
            component: ()=>import('@/views/personalCenter/personalCenter/creditStanding'),
            meta: { title: '资信证明及信用报告' }
        },
        {
            path: 'enterpriseCertification',
            name: 'enterpriseCertification',
            component: ()=>import('@/views/personalCenter/personalCenter/enterpriseCertification'),
            meta: { title: '企业资质' }
        },
        {
            path: 'systemAuth',
            name: 'systemAuth',
            component: ()=>import('@/views/personalCenter/personalCenter/systemAuth'),
            meta: { title: '体系认证' }
        },
        {
            path: 'myBidDoc',
            name: 'myBidDoc',
            component: ()=>import('@/views/personalCenter/personalCenter/myBidDoc'),
            meta: { title: '我的标书' }
        },
        {
            path: 'departments',
            name: 'departments',
            component: ()=>import('@/views/personalCenter/personalCenter/departments'),
            meta: { title: '部门管理' }
        },
        {
            path: 'members',
            name: 'members',
            component: ()=>import('@/views/personalCenter/personalCenter/members'),
            meta: { title: '人员管理' }
        },
        {
            path: 'certificationClassify',
            name: 'certificationClassify',
            component: ()=>import('@/views/personalCenter/personalCenter/certificationClassify'),
            meta: { title: '资质分类管理' }
        },
        {
            path: 'performanceList',
            name: 'performanceList',
            component: ()=>import('@/views/personalCenter/personalCenter/performanceList'),
            meta: { title: '业绩列表' }
        },
        {
            path: 'personCertification',
            name: 'personCertification',
            component: ()=>import('@/views/personalCenter/personalCenter/personCertification'),
            meta: { title: '人员管理信息' },
            children: [
                {
                    path: 'workInfo',
                    name: 'workInfo',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/workInfo'),
                    meta: { title: '工作信息' },
                },
                {
                    path: 'licenseInfo',
                    name: 'licenseInfo',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/licenseInfo'),
                    meta: { title: '身份证信息' },
                },
                {
                    path: 'educationInfo',
                    name: 'educationInfo',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/educationInfo'),
                    meta: { title: '学历信息' },
                },
                {
                    path: 'socialSecurityInfo',
                    name: 'socialSecurityInfo',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/socialSecurityInfo'),
                    meta: { title: '社保证明信息' },
                },
                {
                    path: 'professionalTitleInfo',
                    name: 'professionalTitleInfo',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/professionalTitleInfo'),
                    meta: { title: '职称信息' },
                },
                {
                    path: 'contractInfo',
                    name: 'contractInfo',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/contractInfo'),
                    meta: { title: '合同信息' },
                },
                {
                    path: '_defineCertification/:pId/:tId',
                    name: '_defineCertification',
                    component: ()=>import('@/views/personalCenter/personalCenter/personCertification/_defineCertification'),
                    meta: { title: '自定义资质管理' },
                },
            ]
        },
        {
            path: 'accountInfo',
            name: 'accountInfo',
            component: ()=>import('@/views/personalCenter/personalCenter/accountInfo'),
            meta: { title: '账号管理' },
        },
        {
            path: 'myOrder',
            name: 'myOrder',
            component: ()=>import('@/views/personalCenter/personalCenter/myOrder'),
            meta: { title: '我的订单' },
        },
        {
            path: 'myInvoice',
            name: 'myInvoice',
            component: ()=>import('@/views/personalCenter/personalCenter/myInvoice'),
            meta: { title: '我的发票' },
        },
        {
            path: 'myCoupon',
            name: 'myCoupon',
            component: ()=>import('@/views/personalCenter/personalCenter/myCoupon'),
            meta: { title: '我的优惠券' },
        },
        {
            path: 'personCertification',
            name: 'personCertification',
            component: ()=>import('@/views/personalCenter/personalCenter/personCertification'),
            meta: { title: '成员管理' },
        },
        {
            path: 'myCollection',
            name: 'myCollection',
            component: ()=>import('@/views/personalCenter/personalCenter/myCollection'),
            meta: { title: '我的收藏' },
        },
        {
            path: 'browserRecord',
            name: 'browserRecord',
            component: ()=>import('@/views/personalCenter/personalCenter/browserRecord'),
            meta: { title: '浏览记录' },
        },
        {
            path: 'exportRecord',
            name: 'exportRecord',
            component: ()=>import('@/views/personalCenter/personalCenter/exportRecord'),
            meta: { title: '导出记录' },
        },
    ]
}
export default personal

