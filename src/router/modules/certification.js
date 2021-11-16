const certification = {
    path: '/certification',
    name: 'certification',
    redirect: '/certification/index',
    component:()=>import('@/pages/qualificationManagement/index'),
    children:[
        {
            path: 'index',
            name: 'legalRepresentative',
            component: ()=>import('@/pages/qualificationManagement/legalRepresentative'),
            meta: { title: '资质管理' }
        },
        {
            path: 'businessLicense',
            name: 'businessLicense',
            component: ()=>import('@/pages/qualificationManagement/businessLicense'),
            meta: { title: '营业执照管理' }
        },
        {
            path: 'judgementDoc',
            name: 'judgementDoc',
            component: ()=>import('@/pages/qualificationManagement/judgementDoc'),
            meta: { title: '裁判文书' }
        },
        {
            path: 'openAccountLicense',
            name: 'openAccountLicense',
            component: ()=>import('@/pages/qualificationManagement/openAccountLicense'),
            meta: { title: '开户许可证' }
        },
        {
            path: 'memberList',
            name: 'memberList',
            component: ()=>import('@/pages/qualificationManagement/memberList'),
            meta: { title: '人员列表' }
        },
        {
            path: 'certificationClassify',
            name: 'certificationClassify',
            component: ()=>import('@/pages/qualificationManagement/certificationClassify'),
            meta: { title: '人员资质分类' }
        },
        {
            path: 'memberCerClassify',
            name: 'memberCerClassify',
            component: ()=>import('@/pages/qualificationManagement/memberCerClassify'),
            meta: { title: '人员资质管理' },
            redirect: '/certification/memberCerClassify/license',
            children: [
                {
                    path: 'license',
                    name: 'license',
                    component: ()=>import('@/pages/qualificationManagement/sys/license'),
                    meta: { title: '身份信息' }
                },
                {
                    path: 'education',
                    name: 'education',
                    component: ()=>import('@/pages/qualificationManagement/sys/education'),
                    meta: { title: '学历信息' }
                },
                {
                    path: 'position',
                    name: 'position',
                    component: ()=>import('@/pages/qualificationManagement/sys/position'),
                    meta: { title: '职称信息' }
                },
                {
                    path: 'socialSecurity',
                    name: 'socialSecurity',
                    component: ()=>import('@/pages/qualificationManagement/sys/socialSecurity'),
                    meta: { title: '社保信息' }
                },
                {
                    path: 'selfCertificationFile/:pId/:tId',
                    name: 'selfCertificationFile',
                    component: ()=>import('@/pages/qualificationManagement/sys/selfCertificationFile'),
                    meta: { title: '自定义资质分类' }
                },
            ]
        },
        {
            path: 'financialStatement',
            name: 'financialStatement',
            component: ()=>import('@/pages/qualificationManagement/financialStatement'),
            meta: { title: '财务报表管理' }
        },
        {
            path: 'financialStatementFile',
            name: 'financialStatementFile',
            component: ()=>import('@/pages/qualificationManagement/financialStatementFile'),
            meta: { title: '财务报表附件管理' }
        },
        {
            path: 'performance',
            name: 'performance',
            component: ()=>import('@/pages/qualificationManagement/performance'),
            meta: { title: '业绩管理' }
        },
        {
            path: 'performanceType',
            name: 'performanceType',
            component: ()=>import('@/pages/qualificationManagement/performanceType'),
            meta: { title: '业绩类型管理' }
        },
        {
            path: 'performanceFile',
            name: 'performance',
            component: ()=>import('@/pages/qualificationManagement/performanceFile'),
            meta: { title: '业绩附件管理' }
        },
        {
            path: 'selfCompanyCerTypeFile',
            name: 'selfCompanyCerTypeFile',
            component: ()=>import('@/pages/qualificationManagement/selfCompanyCerTypeFile'),
            meta: { title: '公司自定义附件管理' }
        },
    ]
}
export default certification

