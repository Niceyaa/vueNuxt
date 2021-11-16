<template>
    <div class="legal-person-info">
        <div class="legal-info-title">营业执照</div>
        <div class="legal-info-fill">
            <el-form :model="enterpriseForm" :rules="rules" ref="enterpriseForm" label-width="230px" class="legal-form">
                <el-form-item label="组织机构代码证/营业执照影印件" prop="name">
                    <div class="license-wrapper">
                        <div class="license-item">
                            <singlePicUpload :file-url.sync="frontFileUrl" :file-list.sync="frontFileList"></singlePicUpload>
                            <!--<singleFileUpload :file-list.sync="frontFileList"></singleFileUpload>-->
                            <img src="~/assets/personal2/personal_license_example@2x.png" alt="">
                        </div>
                        <div class="upload-description">请上传彩色扫描件或复印件，要求图片信息清晰可见，必须加盖红色公章，最大5M</div>
                    </div>
                </el-form-item>
                <el-form-item label="企业名称" prop="companyName">
                    <el-input v-model="enterpriseForm.companyName"></el-input>
                </el-form-item>
                <el-form-item label="统一信用代码" prop="creditCode">
                    <el-input v-model="enterpriseForm.creditCode"></el-input>
                </el-form-item>
                <el-form-item label="成立日期" prop="establishTime">
                    <el-date-picker
                            v-model="enterpriseForm.establishTime"
                            type="date"
                            placeholder="请选择成立日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="注册地址" prop="address">
                    <el-input type="textarea" v-model="enterpriseForm.registerAddress"></el-input>
                </el-form-item>
              <!--  <el-form-item label="办公地址" prop="address">
                    <el-input type="textarea" v-model="enterpriseForm.address"></el-input>
                </el-form-item>-->
                <el-form-item label="营业期限">
                    <div style="display: flex;">
                        <el-date-picker
                                style="width: 140px;"
                                v-model="enterpriseForm.businessLicStartTime"
                                type="date"
                                placeholder="开始日期">
                        </el-date-picker>
                        <div style="margin: 0 10px;">至</div>
                        <el-date-picker
                                style="width: 140px;"
                                v-model="enterpriseForm.businessLicEndTime"
                                type="date"
                                :disabled="enterpriseForm.businessLicFirFlag"
                                placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="是否长期">
                    <el-radio v-model="enterpriseForm.businessLicFirFlag" :label="true">是</el-radio>
                    <el-radio v-model="enterpriseForm.businessLicFirFlag" :label="false">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button class="sub-btn" type="primary" @click="submitForm('enterpriseForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import singleFileUpload from '~/components/singleFileUpload'
    import singlePicUpload from '~/components/singlePicUpload'
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: "legalPersonInfo",
        components: {singleFileUpload,singlePicUpload},
        data() {
            return {
                frontFileList: {},
                frontFileUrl: '',
                optType: 'add',
                isSubmit: false,
                enterpriseForm: {
                    businessLicEndTime: null,
                    businessLicFileId: null,
                    businessLicFirFlag: null,
                    businessLicStartTime: null,
                    companyId: null,
                    companyName: null,
                    creditCode: null,
                    establishTime: null,
                    legalPersonName: null,
                    mainUserUuid: null,
                    establishDate: null,
                    registerAddress: null,
                    startEndTime: []
                },
                rules: {
                    companyName: [
                        {required: true, message: '请填写企业名称', trigger: 'blur'},
                    ],
                    creditCode: [
                        {required: true, message: '请填写统一信用代码', trigger: 'blur'},
                        {pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/,message: '以数字或者大写字母开头的18位'}
                    ],
                    establishTime: [
                        {required: true, message: '请选择成立日期', trigger: 'change'}
                    ],
                }
            };
        },
        mounted(){
            this.getEnterpriseInfo()
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid=>{
                    if (valid) {

                        if (this.frontFileList.url||this.frontFileList.type) {
                            if (this.frontFileList.type) {
                                let prm = qs.stringify({
                                    fileNum: 1,
                                    uploadType: 400
                                })
                                this.isSubmit = true
                                this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                                    const {result} = res.data
                                    const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.frontFileList)
                                    axios({
                                        url: result.host,
                                        method: 'post',
                                        data: requestData
                                    }).then((res) => {
                                        if (res.data.code === 200) {
                                            this.enterpriseForm.businessLicFileId = result.fileIds[0]
                                            // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                            const prm = {
                                                "businessLicEndTime": this.enterpriseForm.businessLicEndTime?this.$lcgFormatDate(this.enterpriseForm.businessLicEndTime):this.enterpriseForm.businessLicEndTime,
                                                "businessLicFileId": this.enterpriseForm.businessLicFileId,
                                                "businessLicFirFlag": this.enterpriseForm.businessLicFirFlag,
                                                "businessLicStartTime": this.$lcgFormatDate(this.enterpriseForm.businessLicStartTime),
                                                "companyName": this.enterpriseForm.companyName,
                                                "creditCode": this.enterpriseForm.creditCode,
                                                "establishTime": this.enterpriseForm.establishTime,
                                                "legalPersonName": this.enterpriseForm.legalPersonName,
                                                "mainUserUuid": this.enterpriseForm.mainUserUuid,
                                                "registerAddress": this.enterpriseForm.registerAddress
                                            }
                                            console.log(prm)
                                            const fn = this.optType === 'add' ? this.$apiURL.certification.addEnterpriseBaseInfo : this.$apiURL.certification.updateEnterpriseBaseInfo
                                            this.isSubmit = true
                                            this.$axios[fn.method](fn.url,prm).then(res => {
                                                this.$message.success(res.data.msg)
                                                this.getEnterpriseInfo()
                                                this.isSubmit = false
                                            }).catch(err => {
                                                this.isSubmit = false
                                            })
                                        }
                                    })
                                })
                            } else {
                                const prm = {
                                    "businessLicEndTime": this.enterpriseForm.businessLicEndTime?this.$lcgFormatDate(this.enterpriseForm.businessLicEndTime):this.enterpriseForm.businessLicEndTime,
                                    "businessLicFileId": this.enterpriseForm.businessLicFileId,
                                    "businessLicFirFlag": this.enterpriseForm.businessLicFirFlag,
                                    "businessLicStartTime": this.$lcgFormatDate(this.enterpriseForm.businessLicStartTime),
                                    "companyName": this.enterpriseForm.companyName,
                                    "creditCode": this.enterpriseForm.creditCode,
                                    "establishTime": this.enterpriseForm.establishTime,
                                    "legalPersonName": this.enterpriseForm.legalPersonName,
                                    "mainUserUuid": this.enterpriseForm.mainUserUuid,
                                    "registerAddress": this.enterpriseForm.registerAddress
                                }
                                const fn = this.optType === 'add' ? this.$apiURL.certification.addEnterpriseBaseInfo : this.$apiURL.certification.updateEnterpriseBaseInfo
                                this.isSubmit = true
                                this.$axios[fn.method](fn.url,prm).then(res => {
                                    this.$message.success(res.data.msg)
                                    this.getEnterpriseInfo()
                                    this.isSubmit = false
                                }).catch(err => {
                                    this.isSubmit = false
                                })
                            }
                        } else {
                            this.$message.warning("请上传营业执照")
                            return
                        }
                    }
                })

            },
            //获取信息
            getEnterpriseInfo() {
                this.$axios[this.$apiURL.certification.getEnterpriseBaseInfo.method](this.$apiURL.certification.getEnterpriseBaseInfo.url).then(res => {
                    const {result} = res.data
                    if (result) {
                        this.optType = 'edit'
                        this.enterpriseForm.registerAddress = result.registerAddress
                        this.enterpriseForm.legalPersonName = result.legalPersonName
                        this.enterpriseForm.establishTime = result.establishTime
                        this.enterpriseForm.creditCode = result.creditCode
                        this.enterpriseForm.companyName = result.companyName
                        this.enterpriseForm.companyId = result.companyId
                        this.enterpriseForm.businessLicFirFlag = result.businessLicFirFlag
                        this.enterpriseForm.businessLicStartTime = result.businessLicStartTime
                        this.enterpriseForm.businessLicEndTime = result.businessLicEndTime
                        this.frontFileUrl = result.businessLicFileUrl
                        result.businessLicFileUrl ? this.frontFileList.url = result.businessLicFileUrl : () => {
                            this.frontFileList = {};
                        }
                    } else {
                        this.optType = 'add'
                        this.frontFileList = {};
                    }
                    console.log('imgUrl',this.frontFileList)
                })
            }
        }
    };
</script>

<style scoped lang="less">
    .legal-person-info {
        width: 100%;
        min-height: 100%;
        background: #fff;
        padding: 60px 40px 40px 60px;
        margin-top: -20px;

        .legal-info-title {
            font-size: 24px;
            font-weight: bold;
            color: #1E2738;
            margin-bottom: 40px;
        }
        .legal-info-fill{
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
                                width: 89px;
                                height: 130px;
                                margin: 0 50px 0 20px;
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
</style>
