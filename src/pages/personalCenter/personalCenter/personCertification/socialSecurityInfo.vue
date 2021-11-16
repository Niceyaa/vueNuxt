<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">社保证明信息</div>
        </div>
        <div class="temp-material-content">
            <div class="router-nav-wrapper">
                <nuxt-link to="/personalCenter/personalCenter/members" class="back-wrapper">
                    <img src="~/assets/personal2/lastGrade.png" alt="">
                    <div class="back-text">返回上一级</div>
                </nuxt-link>
                <div class="separator-line"></div>
                <div class="nav-wrapper">
                    <router-link to="/personalCenter/personalCenter/members" class="nav-item">
                        <span>人员管理</span>
                        <span class="right-arrow">></span>
                    </router-link>
                    <div class="nav-item">
                        <span>社保证明信息</span>
                    </div>
                </div>
            </div>
            <div class="module-label">
                {{$route.query.name}}<span>社保证明信息</span>
            </div>
            <div class="desc-content">
                <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="legal-form">
                    <el-form-item label="社保证件">
                        <upload-img :file-list.sync="frontFileList" :limit="limit"></upload-img>
                    </el-form-item>
                    <!--<el-form-item label="姓名" prop="name">-->
                        <!--<el-input v-model="form.name" placeholder="请填写姓名"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="社会保障号码" prop="socialSecurityNumber">
                        <el-input v-model="form.socialSecurityNumber" placeholder="请填写社会保障号码"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号">
                        <el-input v-model="form.cardNumber" placeholder="卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期">
                        <el-date-picker
                                v-model="form.validityDate"
                                type="date"
                                placeholder="有效期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="sub-btn" type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'
    import uploadImg from '@/components/uploadImg'

    export default {
        name: 'educationInfo',
        components: {uploadImg},
        data() {
            return {
                form: {
                    "cardNumber": null,
                    "fileId": [],
                    "name": null,
                    "personId": null,
                    "personSocialSecurityId": null,
                    "socialSecurityNumber": null,
                    "validityDate": null
                },
                rules:{
                    name:[
                        {required:true,message:'请填写姓名',trigger:'blur'}
                    ],
                    socialSecurityNumber:[
                        {required:true,message:'请填写社会保障号码',trigger:'blur'}
                    ],
                },
                isSubmit: false,
                frontFileList: [],
                limit: 1,
                optType: 'add',
                currentRelated: null
            }
        },
        mounted() {
            this.currentRelated = this.$route.query.id ? this.$route.query.id : null
            this.getInfo()
        },
        methods: {
            getInfo() {
                const prm = qs.stringify({
                    personId: this.currentRelated
                })
                this.$axios[this.$apiURL.certification.getSocialSecurityInfo.method](this.$apiURL.certification.getSocialSecurityInfo.url,prm).then(res => {
                    const {result} = res.data
                    this.optType = result ? 'edit' : 'add'
                    this.frontFileList = []
                    this.form.fileId = []
                    if (result) {
                        this.form.name = result.name
                        this.form.cardNumber = result.cardNumber
                        this.form.personId = result.personId
                        this.form.personSocialSecurityId = result.personSocialSecurityId
                        this.form.socialSecurityNumber = result.socialSecurityNumber
                        this.form.validityDate = result.validityDate
                        this.frontFileList = result.fileInfoList.length>0?result.fileInfoList:[]
                        console.log(111,this.frontFileList)
                    }
                })
            },
            onSubmit() {
                if (this.frontFileList.length === 0) {
                    this.$message.error('必须上传一张职称证件')
                    return
                }
                let tempList = []
                this.frontFileList.forEach(item => {
                    if (item.raw) {
                        tempList.push(item)
                    }
                })

                if (tempList.length > 0) {
                    let prm = qs.stringify({
                        fileNum: tempList.length,
                        uploadType: 400
                    })
                    this.isSubmit = true
                    this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                        const {result} = res.data
                        this.uploadOneByOne(result, tempList, 0)
                    })
                } else {
                    this.submitHandle()
                }

            },
            uploadOneByOne(uploadPrm, list, idx) {
                if (idx < uploadPrm.fileIds.length) {
                    const requestData = this.$returnUploadPrm(uploadPrm.fileIds[idx],uploadPrm,list[idx].raw)
                    /*const idxSite = list[idx].raw.name.indexOf('.')
                    const nameSite = list[idx].raw.name.substring(idxSite)
                    const requestData = new FormData()
                    const fileIdSite = uploadPrm.fileIds[idx]
                    const fileKeySite = uploadPrm.dir + fileIdSite + nameSite
                    requestData.append('policy', uploadPrm.policy)
                    requestData.append('signature', uploadPrm.signature)
                    requestData.append('ossaccessKeyId', uploadPrm.accessid)
                    requestData.append('callback', uploadPrm.callback)
                    requestData.append('key', fileKeySite)
                    requestData.append('companyid', uploadPrm.companyid)
                    requestData.append('name', list[idx].raw.name)
                    requestData.append('dir', uploadPrm.dir)
                    requestData.append('host', uploadPrm.host)
                    requestData.append('file', list[idx].raw)*/
                    axios({
                        url: uploadPrm.host,
                        method: 'post',
                        data: requestData
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.form.fileId.push(uploadPrm.fileIds[idx])
                            idx++
                            // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                            this.uploadOneByOne(uploadPrm,list,idx)
                        }
                    })
                } else {
                    this.submitHandle()
                }

            },
            submitHandle() {
                const prm = {
                    "cardNumber": this.form.cardNumber,
                    "fileId": this.form.fileId,
                    "name": this.form.name,
                    "socialSecurityNumber": this.form.socialSecurityNumber,
                    "personSocialSecurityId": this.form.personSocialSecurityId,
                    "validityDate": this.$lcgFormatDate(this.form.validityDate,1),
                    "personId": this.currentRelated,
                }
                this.isSubmit = true
                const fn = this.optType === 'add' ? this.$apiURL.certification.addSocialSecurityInfo : this.$apiURL.certification.updateSocialSecurityInfo
                this.$axios[fn.method](fn.url,prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getInfo()
                }).catch(err => {
                    this.isSubmit = false
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .template-or-material {
        width: 100%;
        min-height: 100%;
        background: #fff;

        .temp-material-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24px;
            font-family: @fontBoldMc;
            font-weight: bold;
            color: #1E2738;
            margin-bottom: 24px;

            .el-button {
                width: 120px;
                height: 40px;
            }
        }

        .temp-material-content {
            padding: 0 0 0 23px;
            .router-nav-wrapper {
                display: flex;
                margin-top: 15px;
                align-items: center;

                .back-wrapper {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 14px;
                    font-family: @fontMc;
                    color: #3272FF;
                    text-decoration: none;

                    img {
                        width: 12px;
                        height: 11px;
                        margin-right: 6px;
                    }
                }

                .separator-line {
                    width: 1px;
                    height: 13px;
                    background: @activeColor;
                    margin: 0 13px;
                }

                .nav-wrapper {
                    font-size: 14px;
                    font-family: @fontMc;
                    color: #596177;
                    display: flex;

                    .nav-item {
                        cursor: pointer;
                        text-decoration: none;
                        color: #596177;

                        &:hover {
                            color: @activeColor;
                        }

                        .right-arrow {
                            margin: 0 4px;
                        }
                    }
                }
            }
            .module-label{
                border-bottom: 1px solid #E8E8E8;
                padding: 50px 0 30px 0;
                text-align: center;
                font-size: 24px;
                font-family: @fontBoldMc;
                font-weight: bold;
                color: #1E2738;
                span{
                    color: #3272FF;
                }
            }
            .desc-content{
                display: flex;
                justify-content: center;
                padding-top: 50px;
                .legal-form{
                    .el-form-item{
                        margin-bottom: 40px;
                        .el-input{
                            width: 600px;
                        }
                        .el-textarea{
                            width: 600px;
                        }
                        .el-select{
                            width: 600px;
                        }
                        .sub-btn{
                            margin-left: 200px;
                            width: 130px;
                            height: 40px;
                        }
                        .license-wrapper{
                            .license-item{
                                display: flex;
                                align-items: center;
                                margin-top: 37px;
                                &:first-child{
                                    margin-top: 0;
                                }
                                .hidden-input{
                                    width: 1px;
                                    height: 1px;
                                    opacity: 0;
                                }
                                img{
                                    width: 200px;
                                    height: 130px;
                                    margin: 0 50px 0 0;
                                }
                            }
                            .upload-description{
                                font-size: 12px;
                                font-family: @fontMc;
                                color: #999999;
                            }
                        }
                    }
                }
            }
        }

    }
</style>
