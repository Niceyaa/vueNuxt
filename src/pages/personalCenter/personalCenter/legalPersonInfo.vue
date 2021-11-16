<template>
    <div class="legal-person-info">
        <div class="legal-info-title">法人身份证明</div>
        <div class="legal-info-fill">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px" class="legal-form">
                <el-form-item label="身份证照片" prop="name">
                    <div class="license-wrapper">
                        <div class="license-item">
                            <input accept="image/*" class="hidden-input" ref="frontLicense" type="file" @change="changeFrontFile">
                            <img @click="trigFrontFileClick" :src="frontFileUrl" alt="">
                            <img src="~/assets/personal2/personal_id_example_positive@2x.png" alt="">
                        </div>
                        <div class="license-item">
                            <input class="hidden-input" ref="behindLicense" type="file" @change="changeBehindFile">
                            <img @click="trigBehindFileClick" :src="reverseFileUrl" alt="">
                            <img src="~/assets/personal2/personal_id_example_other@2x.png" alt="">
                        </div>
                        <div class="upload-description">请参照示例拍摄，请使用身份证原件拍摄，图片要清晰，最大5M</div>
                    </div>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="license">
                    <el-input v-model="ruleForm.idCardNum"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="现居住地" prop="address">
                    <el-input type="textarea" v-model="ruleForm.address"></el-input>
                </el-form-item>-->
                <el-form-item label="身份证有效期" prop="validDate">
                    <el-date-picker
                            v-model="ruleForm.startEndTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="isSubmit" :disabled="isSubmit" class="sub-btn" type="primary" @click="onSubmit('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

    import defaultFUrl from '@/assets/personal2/personal_upload_positive@2x.png'
    import defaultBUrl from '@/assets/personal2/personal_upload_other@2x.png'
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: "legalPersonInfo",
        data() {
            return {
                frontFileList: null,
                frontFileUrl: defaultFUrl,
                optType: 'add',
                reverseFileList: null,
                reverseFileUrl: defaultBUrl,
                isSubmit: false,
                ruleForm: {
                    idCardBFileId:null,
                    idCardFFileId:null,
                    name: '',
                    licenseUrl: '',
                    idCardNum: '',
                    sex: '',
                    address: null,
                    startEndTime: [],
                },
                rules: {
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    idCardNum: [
                        {required: true, message: '请填写身份证', trigger: 'blur'}
                    ],
                    address: [
                        { required: true, message: '请填写日期', trigger: 'blur'}
                    ],
                    startEndTime: [
                        {type: 'array', required: true, message: '请选择有效日期', trigger: 'change'}
                    ],
                }
            };
        },
        mounted(){
            this.getInfo()
        },
        methods: {
            trigFrontFileClick(){
                this.$refs['frontLicense'].click()
            },
            trigBehindFileClick(){
                this.$refs['behindLicense'].click()
            },
            //获取信息
            getInfo(){
                this.$axios[this.$apiURL.certification.getLegalRepresentative.method](this.$apiURL.certification.getLegalRepresentative.url).then(res => {
                    const { result } = res.data
                    if (result) {
                        this.optType = 'edit'
                        this.ruleForm.startEndTime = []
                        // this.ruleForm.idCardEndTime = result.idCardEndTime
                        this.ruleForm.idCardNum = result.idCardNum
                        result.idCardStartTime?this.ruleForm.startEndTime.push(result.idCardStartTime):""
                        result.idCardEndTime?this.ruleForm.startEndTime.push(result.idCardEndTime):""
                        this.ruleForm.name = result.name
                        this.ruleForm.sex = result.sex===0?1:result.sex
                        this.frontFileUrl = result.idCardFFileUrl?result.idCardFFileUrl:this.frontFileUrl
                        this.reverseFileUrl = result.idCardBFileUrl?result.idCardBFileUrl:this.reverseFileUrl
                        this.frontFileList = null
                        this.reverseFileList = null
                    }else{
                        this.optType = 'add'
                    }

                })
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
            onSubmit(formName) {
                this.$refs[formName].validate(valid=>{
                    if (valid) {

                        if (this.frontFileList&&this.reverseFileList) {
                            let prm = qs.stringify({
                                fileNum: 2,
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
                                        this.ruleForm.idCardFFileId = result.fileIds[0]
                                        const requestData = this.$returnUploadPrm(result.fileIds[1],result,this.reverseFileList)
                                        // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                        axios({
                                            url: result.host,
                                            method: 'post',
                                            data: requestData
                                        }).then((res) => {
                                            if (res.data.code === 200) {
                                                this.ruleForm.idCardBFileId = result.fileIds[1]
                                                this.submitHandle()
                                                // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                            }
                                        })
                                    }
                                })
                            })
                        } else if (this.frontFileList && !this.reverseFileList) {
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
                                        this.ruleForm.idCardFFileId = result.fileIds[0]
                                        // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                        this.submitHandle()
                                    }
                                })
                            })
                        }else if (!this.frontFileList && this.reverseFileList) {
                            let prm = qs.stringify({
                                fileNum: 1,
                                uploadType: 400
                            })
                            this.isSubmit = true
                            this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url,prm).then(res => {
                                const {result} = res.data
                                const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.reverseFileList)
                                axios({
                                    url: result.host,
                                    method: 'post',
                                    data: requestData
                                }).then((res) => {
                                    if (res.data.code === 200) {
                                        this.ruleForm.idCardBFileId = result.fileIds[0]
                                        // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                        this.submitHandle()
                                    }
                                })
                            })
                        }else{
                            this.submitHandle()
                        }

                    }
                })

            },
            submitHandle(){
                const prm = {
                    "idCardBFileId": this.ruleForm.idCardBFileId,
                    "idCardFFileId": this.ruleForm.idCardFFileId,
                    "idCardEndTime":  this.ruleForm.startEndTime.length>0?this.$lcgFormatDate(this.ruleForm.startEndTime[1]):null,
                    "idCardNum": this.ruleForm.idCardNum,
                    "idCardStartTime": this.ruleForm.startEndTime.length>0?this.$lcgFormatDate(this.ruleForm.startEndTime[0]):null,
                    "name": this.ruleForm.name,
                    "sex": this.ruleForm.sex,
                }
                this.isSubmit = true
                const fn = this.optType === 'add' ? this.$apiURL.certification.addLegalRepresentative : this.$apiURL.certification.updateLegalRepresentative
                this.$axios[fn.method](fn.url,prm).then(res => {
                    this.isSubmit = false
                    this.$message.success(res.data.msg)
                    this.getInfo()
                }).catch(err=>{
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
</style>
