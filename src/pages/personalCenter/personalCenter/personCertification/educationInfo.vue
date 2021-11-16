<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">学历信息</div>
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
                        <span>学历信息</span>
                    </div>
                </div>
            </div>
            <div class="module-label">
                {{$route.query.name}}<span>学历信息</span>
            </div>
            <div class="desc-content">
                <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="legal-form">
                    <!--<el-form-item label="毕业证" prop="name">
                        <singleFileUpload></singleFileUpload>
                    </el-form-item>-->
                    <el-form-item label="学位证" prop="name">
                        <singlePicUpload :file-url.sync="frontFileUrl" :file-list.sync="frontFileList"></singlePicUpload>
                    </el-form-item>
                    <el-form-item label="学历" prop="educationDegree">
                        <el-select v-model="form.educationDegree" placeholder="请选择学历">
                            <el-option
                                    v-for="item in educationData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="毕业院校">
                        <el-input v-model="form.graduatedUniversity"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业时间">
                        <el-date-picker
                                v-model="form.graduatedTime"
                                type="date">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="婚姻状态">
                        <el-select v-model="form.maritalState" placeholder="请选择婚姻状态">
                            <el-option
                                    v-for="item in maritalStates"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职业">
                        <el-input v-model="form.job" placeholder="请填写职业"></el-input>
                    </el-form-item>

                    <el-form-item label="职务">
                        <el-input v-model="form.post" placeholder="请填写职务"></el-input>
                    </el-form-item>

                    <el-form-item label="从业经验">
                        <el-input v-model="form.workExperience" placeholder="请填写从业经验"></el-input>
                    </el-form-item>

                    <el-form-item label="专业资质">
                        <el-input v-model="form.proQualify" placeholder="请填写专业资质"></el-input>
                    </el-form-item>
                    <el-form-item label="自我介绍">
                        <el-input resize="both" type="textarea" v-model="form.intro"
                                  placeholder="请填写自我介绍"></el-input>
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
    import singleFileUpload from '~/components/singleFileUpload'
    import singlePicUpload from '~/components/singlePicUpload'


    export default {
        name: 'educationInfo',
        components: {singleFileUpload,singlePicUpload},
        data() {
            return {
                educationData: [ // 0未知 1文盲 2小学 3初中 4高中 5大专 6本科 7硕士 8博士
                    {id: 0, name: '未知'},
                    {id: 1, name: '文盲'},
                    {id: 2, name: '小学'},
                    {id: 3, name: '初中'},
                    {id: 4, name: '高中'},
                    {id: 5, name: '大专'},
                    {id: 6, name: '本科'},
                    {id: 7, name: '硕士'},
                    {id: 8, name: '博士'},
                ],
                maritalStates: [
                    {id: 0, name: '未知'},
                    {id: 1, name: '未婚'},
                    {id: 2, name: '已婚'},
                    {id: 3, name: '离婚'},
                ],
                form: {
                    "educationDegree": null,
                    "fileIdList": [],
                    "graduatedTime": null,
                    "graduatedUniversity": null,
                    "intro": null,
                    "job": null,
                    "maritalState": null,
                    "personEduId": null,
                    "personId": null,
                    "post": null,
                    "proQualify": null,
                    "workExperience": null
                },
                rules: {
                    educationDegree: [
                        {required: true, message: '请选择学历', trigger: 'change'}
                    ]
                },
                isSubmit: false,
                sexData: [
                    {value: 1, label: '男'},
                    {value: 2, label: '女'},
                ],
                btnName: '点击上传',
                frontFileList: {},
                frontFileUrl: '',
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
                this.$axios[this.$apiURL.certification.getEducationInfo.method](this.$apiURL.certification.getEducationInfo.url, prm).then(res => {
                    const {result} = res.data
                    this.optType = result ? 'edit' : 'add'
                    this.form.fileIdList = []
                    this.frontFileList = {}
                    if (result) {
                        console.log(1212)
                        // this.form.idCardEndTime = result.idCardEndTime
                        // result.idCardStartTime ? this.form.startEndTime.push(result.idCardStartTime) : ""
                        // result.idCardEndTime ? this.form.startEndTime.push(result.idCardEndTime) : ""
                        this.form.educationDegree = result.educationDegree
                        this.form.graduatedTime = result.graduatedTime
                        this.form.personSex = result.personSex === 0 ? 1 : result.personSex
                        this.frontFileUrl = result.fileInfo ? result.fileInfo.url : null
                        this.form.graduatedUniversity = result.graduatedUniversity
                        this.form.intro = result.intro
                        this.form.job = result.job
                        this.form.maritalState = result.maritalState
                        this.form.personEduId = result.personEduId
                        this.form.post = result.post
                        this.form.proQualify = result.proQualify
                        this.form.workExperience = result.workExperience

                        this.frontFileList = result.fileInfo?result.fileInfo:{}
                        this.frontFileUrl = result.fileInfo?result.fileInfo.url:null
                    }

                })
            },
            onSubmit() {
                if (this.frontFileList.name) {
                    let prm = qs.stringify({
                        fileNum: 1,
                        uploadType: 400
                    })
                    this.isSubmit = true
                    this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url, prm).then(res => {
                        const {result} = res.data
                        const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.frontFileList)
                        /*const idxSite = this.frontFileList[0].raw.name.indexOf('.')
                        const nameSite = this.frontFileList[0].raw.name.substring(idxSite)
                        const requestData = new FormData()
                        const fileIdSite = result.fileIds[0]
                        const fileKeySite = result.dir + fileIdSite + nameSite
                        requestData.append('policy', result.policy)
                        requestData.append('signature', result.signature)
                        requestData.append('ossaccessKeyId', result.accessid)
                        requestData.append('callback', result.callback)
                        requestData.append('companyid', result.companyid)
                        requestData.append('name', this.frontFileList[0].raw.name)
                        requestData.append('key', fileKeySite)
                        requestData.append('dir', result.dir)
                        requestData.append('host', result.host)
                        requestData.append('file', this.frontFileList[0].raw)*/
                        axios({
                            url: result.host,
                            method: 'post',
                            data: requestData
                        }).then((res) => {
                            if (res.data.code === 200) {
                                this.form.imgFFileId = result.fileIds[0]
                                // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                this.form.fileIdList.push(result.fileIds[0])
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
                    "educationDegree": this.form.educationDegree,
                    "fileIdList": this.form.fileIdList,
                    "graduatedTime": this.$lcgFormatDate(this.form.graduatedTime),
                    "graduatedUniversity": this.form.graduatedUniversity,
                    "intro": this.form.intro,
                    "job": this.form.job,
                    "maritalState": this.form.maritalState,
                    "personEduId": this.form.personEduId,
                    "personId": this.currentRelated,
                    "post": this.form.post,
                    "proQualify": this.form.proQualify,
                    "workExperience": this.form.workExperience
                }
                this.isSubmit = true
                const fn = this.optType === 'add' ? this.$apiURL.certification.addEducationInfo : this.$apiURL.certification.updateEducationInfo
                this.$axios[fn.method](fn.url, prm).then(res => {
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
