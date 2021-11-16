<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">身份证信息</div>
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
                        <span>身份证信息</span>
                    </div>
                </div>
            </div>
            <div class="module-label">
                {{$route.query.name}}<span>身份证信息</span>
            </div>
            <div class="desc-content">
                <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="legal-form">
                    <el-form-item label="身份证照片" prop="name">
                        <div class="license-wrapper">
                            <div class="license-item">
                                <input accept="image/*" class="hidden-input" ref="frontLicense" type="file"
                                       @change="changeFrontFile">
                                <img @click="trigFrontFileClick"
                                     :src="frontFileUrl" alt="">
                                <img src="~/assets/personal2/personal_id_example_positive@2x.png" alt="">
                            </div>
                            <div class="license-item">
                                <input class="hidden-input" ref="behindLicense" type="file" @change="changeBehindFile">
                                <img @click="trigBehindFileClick"
                                     :src="reverseFileUrl" alt="">
                                <img src="~/assets/personal2/personal_id_example_other@2x.png" alt="">
                            </div>
                            <div class="upload-description">请参照示例拍摄，请使用身份证原件拍摄，图片要清晰，最大5M</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="姓名" prop="personName">
                        <el-input v-model="form.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCardNum">
                        <el-input v-model="form.idCardNum"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.personSex" placeholder="请选择性别">
                            <el-option label="男" :value="1"></el-option>
                            <el-option label="女" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="签发机关">
                        <el-input type="textarea" v-model="form.signOrganization"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期">
                        <!--<el-date-picker
                                v-model="form.startEndTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>-->
                        <el-date-picker
                                v-model="form.personBirthday"
                                type="date"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
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
    import defaultFUrl from '~/assets/personal2/personal_upload_positive@2x.png'
    import defaultBUrl from '~/assets/personal2/personal_upload_other@2x.png'
    import qs from 'qs'
    import axios from 'axios'

    export default {
        name: 'workInfo',
        data() {
            return {
                form: {
                    startEndTime: [],
                    "cityId": null,
                    "idCardAddress": null,
                    "idCardNum": null,
                    "imgBFileId": null,
                    "imgFFileId": null,
                    "nationCode": null,
                    "nationName": null,
                    "personBirthday": null,
                    "personId": null,
                    "personIdentityId": null,
                    "personName": null,
                    "personSex": null,
                    "signOrganization": null
                },
                rules: {
                    personName: [
                        {required: true, message: '请填写人员姓名', trigger: 'blur'}
                    ],
                    idCardNum: [
                        {required: true, message: '请填写人员身份证', trigger: 'blur'},
                        {min: 18, max: 18, message: '身份证需为18位'}
                    ],
                },
                isSubmit: false,
                sexData: [
                    {value: 1, label: '男'},
                    {value: 2, label: '女'},
                ],
                btnName: '点击上传',
                frontFileList: [],
                frontFileUrl: defaultFUrl,
                optType: 'add',
                reverseFileList: [],
                reverseFileUrl: defaultBUrl,
                currentRelated: null
            }
        },
        async created() {
            this.currentRelated = this.$route.query.id ? this.$route.query.id : null
            this.form.personName = this.$route.query.name ? this.$route.query.name : null
            console.log('==================',this.form.personName,this.$route)
            await this.getBaseInfo()
            await this.getInfo()
        },
        methods: {
            trigFrontFileClick(){
                this.$refs['frontLicense'].click()
            },
            trigBehindFileClick(){
                this.$refs['behindLicense'].click()
            },
            //正面图片
            changeFrontFile(){
                let val = this.$refs.frontLicense.files
                this.frontFileUrl = URL.createObjectURL(val[0])
                this.frontFileList = val[0]
                console.log(URL.createObjectURL(val[0]),val)
            },
            //反面图片
            changeBehindFile(){
                let val = this.$refs.behindLicense.files
                this.reverseFileUrl = URL.createObjectURL(val[0])
                this.reverseFileList = val[0]
                console.log(URL.createObjectURL(val[0]),val)
            },
            getInfo() {
                const prm = qs.stringify({
                    personId: this.currentRelated
                })
                this.$axios[this.$apiURL.certification.getLicenseInfo.method](this.$apiURL.certification.getLicenseInfo.url,prm).then(res => {
                    const {result} = res.data
                    this.optType = result ? 'edit' : 'add'
                    if (result) {
                        console.log(1212)
                        this.form.startEndTime = []
                        // this.form.idCardEndTime = result.idCardEndTime
                        // result.idCardStartTime ? this.form.startEndTime.push(result.idCardStartTime) : ""
                        // result.idCardEndTime ? this.form.startEndTime.push(result.idCardEndTime) : ""
                        this.form.idCardAddress = result.idCardAddress
                        this.form.idCardNum = result.idCardNum
                        this.form.personSex = result.personSex === 0 ? 1 : result.personSex
                        this.frontFileUrl = result.imgFFileUrl?result.imgFFileUrl:this.frontFileUrl
                        this.reverseFileUrl = result.imgBFileUrl?result.imgBFileUrl:this.reverseFileUrl
                        this.form.nationCode = result.nationCode
                        this.form.nationName = result.nationName
                        this.form.personBirthday = result.personBirthday
                        this.form.personIdentityId = result.personIdentityId
                        this.form.personName = result.personName
                        this.form.signOrganization = result.signOrganization
                        this.frontFileList = null
                        this.reverseFileList = null
                    }

                })
            },
            getBaseInfo(){
                const prm = qs.stringify({
                    personId: this.currentRelated
                })
                this.$axios[this.$apiURL.certification.getUserBaseInfo.method](this.$apiURL.certification.getUserBaseInfo.url, prm).then(res => {
                    const {result} = res.data
                    this.form.idCardNum = result.idCardNum
                    this.form.personSex = result.personSex
                })
            },
            onSubmit() {
                if (this.frontFileList && this.reverseFileList) {
                    let prm = qs.stringify({
                        fileNum: 2,
                        uploadType: 400
                    })
                    this.isSubmit = true
                    this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                        const {result} = res.data
                        const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.frontFileList)
                        /*const idxSite = this.frontFileList.name.indexOf('.')
                        const nameSite = this.frontFileList.name.substring(idxSite)
                        const requestData = new FormData()
                        const fileIdSite = result.fileIds[0]
                        const fileKeySite = result.dir + fileIdSite + nameSite
                        requestData.append('policy', result.policy)
                        requestData.append('signature', result.signature)
                        requestData.append('ossaccessKeyId', result.accessid)
                        requestData.append('callback', result.callback)
                        requestData.append('companyid', result.companyid)
                        requestData.append('name', this.frontFileList.name)
                        requestData.append('key', fileKeySite)
                        requestData.append('dir', result.dir)
                        requestData.append('host', result.host)
                        requestData.append('file', this.frontFileList)*/
                        axios({
                            url: result.host,
                            method: 'post',
                            data: requestData
                        }).then((res) => {
                            if (res.data.code === 200) {
                                this.form.imgFFileId = result.fileIds[0]
                                // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                const requestData = this.$returnUploadPrm(result.fileIds[1],result,this.reverseFileList)
                                /* const idxSite = this.reverseFileList.name.indexOf('.')
                                 const nameSite = this.reverseFileList.name.substring(idxSite)
                                 const requestData = new FormData()
                                 const fileIdSite = result.fileIds[1]
                                 const fileKeySite = result.dir + fileIdSite + nameSite
                                 requestData.append('policy', result.policy)
                                 requestData.append('signature', result.signature)
                                 requestData.append('ossaccessKeyId', result.accessid)
                                 requestData.append('callback', result.callback)
                                 requestData.append('key', fileKeySite)
                                 requestData.append('dir', result.dir)
                                 requestData.append('host', result.host)
                                 requestData.append('file', this.reverseFileList)*/
                                axios({
                                    url: result.host,
                                    method: 'post',
                                    data: requestData
                                }).then((res) => {
                                    if (res.data.code === 200) {
                                        this.form.imgBFileId = result.fileIds[1]
                                        this.submitHandle()
                                        // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                    }
                                })
                            }
                        })
                    })
                } else if (this.frontFileList && !this.reverseFileList) {
                    let prm = qs.stringify({
                        fileNum: 2,
                        uploadType: 400
                    })
                    this.isSubmit = true
                    this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                        const {result} = res.data
                        const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.frontFileList)

                        /* const idxSite = this.frontFileList.name.indexOf('.')
                         const nameSite = this.frontFileList.name.substring(idxSite)
                         const requestData = new FormData()
                         const fileIdSite = result.fileIds[0]
                         const fileKeySite = result.dir + fileIdSite + nameSite
                         requestData.append('policy', result.policy)
                         requestData.append('signature', result.signature)
                         requestData.append('ossaccessKeyId', result.accessid)
                         requestData.append('key', fileKeySite)
                         requestData.append('dir', result.dir)
                         requestData.append('callback', result.callback)
                         requestData.append('host', result.host)
                         requestData.append('file', this.frontFileList)*/
                        axios({
                            url: result.host,
                            method: 'post',
                            data: requestData
                        }).then((res) => {
                            if (res.data.code === 200) {
                                this.form.imgFFileId = result.fileIds[0]
                                // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                this.submitHandle()
                            }
                        })
                    })
                } else if (!this.frontFileList && this.reverseFileList) {
                    let prm = qs.stringify({
                        fileNum: 1,
                        uploadType: 400
                    })
                    this.isSubmit = true
                    this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                        const {result} = res.data
                        const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.reverseFileList)
                        /*const idxSite = this.reverseFileList.name.indexOf('.')
                        const nameSite = this.reverseFileList.name.substring(idxSite)
                        const requestData = new FormData()
                        const fileIdSite = result.fileIds[0]
                        const fileKeySite = result.dir + fileIdSite + nameSite
                        requestData.append('policy', result.policy)
                        requestData.append('signature', result.signature)
                        requestData.append('ossaccessKeyId', result.accessid)
                        requestData.append('callback', result.callback)
                        requestData.append('key', fileKeySite)
                        requestData.append('dir', result.dir)
                        requestData.append('host', result.host)
                        requestData.append('file', this.reverseFileList)*/
                        axios({
                            url: result.host,
                            method: 'post',
                            data: requestData
                        }).then((res) => {
                            if (res.data.code === 200) {
                                this.form.imgBFileId = result.fileIds[0]
                                // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                this.submitHandle()
                            }
                        })
                    })
                } else {
                    this.submitHandle()
                }

            },
            submitHandle() {
                const prm = {
                    // "idCardEndTime": this.form.startEndTime.length > 0 ? this.$lcgFormatDate(this.form.startEndTime[1]) : null,
                    // "idCardStartTime": this.form.startEndTime.length > 0 ? this.$lcgFormatDate(this.form.startEndTime[0]) : null,
                    "idCardNum": this.form.idCardNum,
                    "cityId": this.form.cityId,
                    "idCardAddress": this.form.idCardAddress,
                    "imgBFileId": this.form.imgBFileId,
                    "imgFFileId": this.form.imgFFileId,
                    "nationName": this.form.nationName,
                    "personBirthday": this.$lcgFormatDate(this.form.personBirthday),
                    "personId": this.currentRelated,
                    "personIdentityId": this.form.personIdentityId,
                    "personName": this.form.personName,
                    "personSex": this.form.personSex,
                    "signOrganization": this.form.signOrganization,
                }
                this.isSubmit = true
                const fn = this.optType === 'add' ? this.$apiURL.certification.addLicenseInfo : this.$apiURL.certification.updateLicenseInfo
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

            .module-label {
                border-bottom: 1px solid #E8E8E8;
                padding: 50px 0 30px 0;
                text-align: center;
                font-size: 24px;
                font-family: @fontBoldMc;
                font-weight: bold;
                color: #1E2738;

                span {
                    color: #3272FF;
                }
            }

            .desc-content {
                display: flex;
                justify-content: center;
                padding-top: 50px;

                .legal-form {
                    .el-form-item {
                        margin-bottom: 40px;

                        .el-input {
                            width: 600px;
                        }

                        .el-textarea {
                            width: 600px;
                        }

                        .el-select {
                            width: 600px;
                        }

                        .sub-btn {
                            margin-left: 200px;
                            width: 130px;
                            height: 40px;
                        }

                        .license-wrapper {
                            .license-item {
                                display: flex;
                                align-items: center;
                                margin-top: 37px;

                                &:first-child {
                                    margin-top: 0;
                                }

                                .hidden-input {
                                    width: 1px;
                                    height: 1px;
                                    opacity: 0;
                                }

                                img {
                                    width: 200px;
                                    height: 130px;
                                    margin: 0 50px 0 0;
                                }
                            }

                            .upload-description {
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
