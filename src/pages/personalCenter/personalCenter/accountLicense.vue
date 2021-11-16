<template>
    <div class="legal-person-info">
        <div class="legal-info-title">开户许可证</div>
        <div class="legal-info-fill">
            <el-form :model="form" :rules="rules" ref="form" label-width="230px" class="legal-form">
                <el-form-item label="开户银行许可证" prop="name">
                    <div class="license-wrapper">
                        <div class="license-item">
                            <singlePicUpload :file-url.sync="frontFileUrl"
                                             :file-list.sync="frontFileList"></singlePicUpload>
                            <img src="~/assets/personal2/personal_account_example@2x.png" alt="">
                        </div>
                        <div class="upload-description">请上传彩色扫描件或复印件，要求图片信息清晰可见，必须加盖红色公章，最大5M</div>
                    </div>
                </el-form-item>
                <el-form-item label="开户银行" prop="bankName">
                    <el-input v-model="form.bankName"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="accountNum">
                    <el-input v-model="form.accountNum"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="isSubmit" class="sub-btn" type="primary" @click="saveHandle('form')">提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    import axios from 'axios'
    import singleFileUpload from '~/components/singleFileUpload'
    import singlePicUpload from '~/components/singlePicUpload'


    export default {
        name: "legalPersonInfo",
        components: {singleFileUpload, singlePicUpload},
        data() {
            return {
                form: {
                    "accountNum": null,
                    "accountPerId": null,
                    "bankName": null,
                    "licFileId": null
                },
                isSubmit: false,
                btnName: '点击上传',
                frontFileList: {},
                frontFileUrl: '',
                optType: 'add',
                rules: {
                    bankName: [
                        {required: true, message: '请填写开户银行', trigger: 'blur'},
                    ],
                    accountNum: [
                        {required: true, message: '请填写账号', trigger: 'blur'}
                    ],
                }
            };
        },
        mounted() {
            console.log('开户许可证')
            this.getInfo()
        },
        methods: {
            getInfo() {
                this.$axios[this.$apiURL.certification.getOpenAccountLicense.method](this.$apiURL.certification.getOpenAccountLicense.url).then(res => {
                    const {result} = res.data
                    if (result) {
                        this.form.accountNum = result.accountNum
                        this.form.accountPerId = result.accountPerId
                        this.form.bankName = result.bankName
                        this.form.frontFileUrl = result.licFileUrl
                        if (result.licFileUrl) {
                            this.frontFileUrl = result.licFileUrl
                            this.frontFileList.url = result.licFileUrl
                        } else {
                            this.frontFileList = {}
                        }
                        this.optType = 'edit'
                    } else {
                        this.optType = 'add'
                        this.frontFileUrl = ''
                        this.frontFileList = {}
                    }
                })
            },
            saveHandle(formname) {
                this.$refs[formname].validate(valid => {
                    if (valid) {
                        console.log('111', this.frontFileList)
                        if (this.frontFileList.url || this.frontFileList.type) {
                            if (this.frontFileList.type) {
                                let prm = qs.stringify({
                                    fileNum: 1,
                                    uploadType: 400
                                })
                                this.isSubmit = true
                                this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url, prm).then(res => {
                                    const {result} = res.data
                                    const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.frontFileList)
                                    axios({
                                        url: result.host,
                                        method: 'post',
                                        data: requestData
                                    }).then((res) => {
                                        if (res.data.code === 200) {
                                            this.form.licFileId = result.fileIds[0]
                                            // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                            this.submitHandle()
                                        }else{
                                            this.$message.error('图片上传失败')
                                            this.isSubmit = false
                                        }
                                    })
                                })
                            } else {
                                this.submitHandle()
                            }
                        } else {
                            this.submitHandle()
                        }
                    }
                })
            },
            submitHandle() {
                const prm = {
                    "accountNum": this.form.accountNum,
                    "bankName": this.form.bankName,
                    "licFileId": this.form.licFileId,
                    "accountPerId": this.form.accountPerId,
                }
                this.isSubmit = true
                const fn = this.optType === 'add' ? this.$apiURL.certification.addOpenAccountLicense : this.$apiURL.certification.updateOpenAccountLicense
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getInfo()
                    this.isSubmit = false
                }).catch(err => {
                    this.isSubmit = false
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

        .legal-info-fill {
            .legal-form {
                .el-form-item {
                    margin-bottom: 40px;

                    .el-input {
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
                                width: 184px;
                                height: 130px;
                                margin: 0 50px 0 20px;
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
</style>
