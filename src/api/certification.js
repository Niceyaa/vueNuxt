import request from '@/utils/request'

//营业执照---查询公司基本信息
export function getEnterpriseBaseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/companyBase/queryCompanyBaseByToken',
        method: 'post',
        data
    })
}

//营业执照---添加公司基本信息
export function addEnterpriseBaseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/companyBase/addCompanyBase',
        method: 'post',
        data
    })
}

//营业执照---编辑公司基本信息
export function updateEnterpriseBaseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/companyBase/editCompanyBase',
        method: 'post',
        data
    })
}

//开户许可证---获取详情
export function getOpenAccountLicense(data){
    return request({
        url: '/smartbiddoc-qualify/api/accountPermission/queryAccPermissionByToken',
        method: 'post',
        data
    })
}

//开户许可证---编辑
export function addOpenAccountLicense(data){
    return request({
        url: '/smartbiddoc-qualify/api/accountPermission/addAccountPermission',
        method: 'post',
        data
    })
}

//开户许可证---添加
export function updateOpenAccountLicense(data){
    return request({
        url: '/smartbiddoc-qualify/api/accountPermission/editAccountPermission',
        method: 'post',
        data
    })
}

//法人信息---添加
export function addLegalRepresentative(data){
    return request({
        url: '/smartbiddoc-qualify/api/legalPerson/addLegalPerson',
        method: 'post',
        data
    })
}

//法人信息---编辑
export function updateLegalRepresentative(data){
    return request({
        url: '/smartbiddoc-qualify/api/legalPerson/editLegalPerson',
        method: 'post',
        data
    })
}

//法人信息---查看
export function getLegalRepresentative(data){
    return request({
        url: '/smartbiddoc-qualify/api/legalPerson/queryLegalPersonById',
        method: 'post',
        data
    })
}

//人员列表---查询
export function getMemberList(data){
    return request({
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonPageList',
        method: 'post',
        data
    })
}

//人员列表---基本信息---添加
export function addUserBaseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/addPerson',
        method: 'post',
        data
    })
}

//人员列表---基本信息---编辑
export function updateUserBaseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/editPersonInfo',
        method: 'post',
        data
    })
}

//人员列表---基本信息---删除
export function deleteUserBaseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/delPersonInfo',
        method: 'post',
        data
    })
}

//人员资质分类---自定义---添加
export function addUserSelfCerClassify(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/addPersonQualifyType',
        method: 'post',
        data
    })
}

//人员资质分类---自定义---查询
export function getUserSelfCerClassify(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryPersonQualifyTypeList',
        method: 'post',
        data
    })
}

//人员资质分类---自定义---编辑
export function updateUserSelfCerClassify(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/editPersonQualifyType',
        method: 'post',
        data
    })
}

//人员资质分类---自定义---删除
export function deleteUserSelfCerClassify(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/delPersonQualifyType',
        method: 'post',
        data
    })
}

//人员资质分类---自定义---树形查询
export function getSelfCerClassifyTree(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryPersonQualifyTree',
        method: 'post',
        data
    })
}

//人员资质分类---系统分类---身份信息---添加
export function addLicenseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/addPersonIdentity',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---身份信息---编辑
export function updateLicenseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/editPersonIdentity',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---身份信息---查询
export function getLicenseInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/queryPersonIdentity',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---学历信息---新增
export function addEducationInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/addPersonEdu',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---学历信息---编辑
export function updateEducationInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/editPersonEdu',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---学历信息---查询
export function getEducationInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/apiQueryPersonEdu',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---职称信息---新增
export function addPositionInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/addPersonPost',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---职称信息---编辑
export function updatePositionInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/editPersonPost',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---职称信息---查询
export function getPositionInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/apiQueryPersonPostList',
        method: 'post',
        data
    })
}


//人员资质分类---系统分类---职称信息---删除
export function deletePositionInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/delPersonPost',
        method: 'post',
        data
    })
}


//人员资质分类---社保信息---添加
export function addSocialSecurityInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/addPersonSocialSecurity',
        method: 'post',
        data
    })
}


//人员资质分类---社保信息---编辑
export function updateSocialSecurityInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/editPersonSocialSecurity',
        method: 'post',
        data
    })
}


//人员资质分类---社保信息---查询
export function getSocialSecurityInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/person/apiQueryPersonSocialSecurity',
        method: 'post',
        data
    })
}


//人员资质分类---自定义资质分类---添加附件
export function addSelfCerFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/addPersonQualifyEnc',
        method: 'post',
        data
    })
}


//人员资质分类---自定义资质分类---查询附件
export function getSelfCerFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryPersonQualifyEncList',
        method: 'post',
        data
    })
}


//人员资质分类---自定义资质分类---删除附件
export function deleteSelfCerFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/delPersonQualifyEnc',
        method: 'post',
        data
    })
}


//公司资质---财务报表---查询
export function getFinancialStatement(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/apiQueryReportFormListPage',
        method: 'post',
        data
    })
}


//公司资质---财务报表---添加
export function addFinancialStatement(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/addReportForm',
        method: 'post',
        data
    })
}


//公司资质---财务报表---编辑
export function updateFinancialStatement(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/editReportForm',
        method: 'post',
        data
    })
}


//公司资质---财务报表---删除
export function deleteFinancialStatement(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/delReportForm',
        method: 'post',
        data
    })
}


//公司资质---财务报表附件---添加
export function addFinancialStatementFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/addReportFormEnc',
        method: 'post',
        data
    })
}


//公司资质---财务报表附件---查询
export function getFinancialStatementFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/apiQueryReportFormEnc',
        method: 'post',
        data
    })
}


//公司资质---财务报表附件---删除
export function deleteFinancialStatementFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/reportForm/delReportFormEnc',
        method: 'post',
        data
    })
}


//公司资质---业绩管理---删除
export function deletePerformance(data){
    return request({
        url: '/smartbiddoc-qualify/api/perForm/delPerForm',
        method: 'post',
        data
    })
}


//公司资质---业绩管理---添加
export function addPerformance(data){
    return request({
        url: '/smartbiddoc-qualify/api/perForm/addPerForm',
        method: 'post',
        data
    })
}


//公司资质---业绩管理---删除
export function getPerformance(data){
    return request({
        url: '/smartbiddoc-qualify/api/perForm/queryPerFormPageList',
        method: 'post',
        data
    })
}


//公司资质---业绩管理---删除
export function updatePerformance(data){
    return request({
        url: '/smartbiddoc-qualify/api/perForm/editPerForm',
        method: 'post',
        data
    })
}


//公司资质---业绩类型---树形结构查询
export function getPerformanceTypeTree(data){
    return request({
        url: '/smartbiddoc-qualify/api/perFormType/apiQueryPerFormTypeTreeList',
        method: 'post',
        data
    })
}


//公司资质---业绩类型---添加
export function addPerformanceType(data){
    return request({
        url: '/smartbiddoc-qualify/api/perFormType/addPerFormType',
        method: 'post',
        data
    })
}


//公司资质---业绩类型---删除
export function deletePerformanceType(data){
    return request({
        url: '/smartbiddoc-qualify/api/perFormType/delPerFormType',
        method: 'post',
        data
    })
}


//公司资质---业绩类型---修改
export function updatePerformanceType(data){
    return request({
        url: '/smartbiddoc-qualify/api/perFormType/editPerFormType',
        method: 'post',
        data
    })
}


//公司资质---业绩类型---查询
export function getPerformanceType(data){
    return request({
        url: '/smartbiddoc-qualify/api/perFormType/queryPerFormTypeList',
        method: 'post',
        data
    })
}


//公司资质---业绩类型---查询
export function changePerformanceTypeStatus(data){
    return request({
        url: '/smartbiddoc-qualify/api/perFormType/isUseState',
        method: 'post',
        data
    })
}


//公司资质---业绩附件---查询
export function getPerformFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/prFormEnc/apiQueryPerFormEncList',
        method: 'post',
        data
    })
}


//公司资质---业绩附件---删除
export function deletePerformFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/prFormEnc/delPerFormEnc',
        method: 'post',
        data
    })
}


//公司资质---业绩附件---上传
export function uploadPerformFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/prFormEnc/addPerFormEnc',
        method: 'post',
        data
    })
}


//公司资质类型---新增
export function addCompanyCerType(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/addCompanyQualifyType',
        method: 'post',
        data
    })
}


//公司资质类型---查询
export function getCompanyCerTypeTree(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryCompanyQualifyTree',
        method: 'post',
        data
    })
}


//公司资质类型---编辑
export function updateCompanyCerType(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/editCompanyQualifyType',
        method: 'post',
        data
    })
}


//公司资质类型---删除
export function deleteCompanyCerType(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/delCompanyQualifyType',
        method: 'post',
        data
    })
}


//公司资质类型---附件管理---添加
export function addCompanyCerFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/addCompanyQualifyEnc',
        method: 'post',
        data
    })
}


//公司资质类型---附件管理---查询
export function getCompanyCerFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/queryCompanyQualifyEnc',
        method: 'post',
        data
    })
}


//公司资质类型---附件管理---添加
export function deleteCompanyCerFile(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/delCompanyQualifyEnc',
        method: 'post',
        data
    })
}


//公司资质类型---排序
export function sortApi(data){
    return request({
        url: '/smartbiddoc-qualify/api/personQualify/sortCompanyQualifyType',
        method: 'post',
        data
    })
}


//人员资质---查询人员信息表字段
export function getPersonField(data){
    return request({
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonField',
        method: 'post',
        data
    })
}


//人员资质---查询人员列表
export function getPersonList(data){
    return request({
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonPageList',
        method: 'post',
        data
    })
}


//人员资质---查询人员资质类别
export function getPersonCerType(data){
    return request({
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonalMaterialCategory',
        method: 'post',
        data
    })
}


//人员资质---插入资质信息，制作标书
export function insertCerInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/makingBids/apiMakingBidsInsertQualification',
        method: 'post',
        data
    })
}



//业绩---插入业绩信息，制作标书
export function insertPerformInfo(data){
    return request({
        url: '/smartbiddoc-qualify/api/makingBids/apiMakingBidsInsertPerformance',
        method: 'post',
        data
    })
}

