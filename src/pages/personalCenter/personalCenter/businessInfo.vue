<template>
    <div class="legal-person-info">
        <div class="legal-info-title">工商查询信息</div>
        <div class="legal-info-fill">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px" class="legal-form">
                <el-form-item label="工商查询截图" prop="name">
                    <div class="license-wrapper">
                        <div class="license-item">
                            <singleFileUpload></singleFileUpload>
                            <img src="../../../assets/personal2/personal_account_example@2x.png" alt="">
                        </div>
                        <div class="upload-description">请上传彩色扫描件或复印件，要求图片信息清晰可见，必须加盖红色公章，最大5M</div>
                    </div>
                </el-form-item>
                <el-form-item label="查询时间" prop="name">
                    <el-date-picker
                            v-model="ruleForm.validDate"
                            type="date"
                            placeholder="请选择查询时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="sub-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import singleFileUpload from '../../../components/singleFileUpload'
    export default {
        name: "legalPersonInfo",
        components: {singleFileUpload},
        data() {
            return {
                ruleForm: {
                    name: '',
                    licenseUrl: '',
                    license: '',
                    sex: '',
                    address: null,
                    establishDate: null,
                    businessLicStartTime: null,
                    businessLicEndTime: null,
                    businessLicFirFlag: false,
                },
                rules: {
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    license: [
                        {required: true, message: '请填写身份证', trigger: 'blur'}
                    ],
                    address: [
                        { required: true, message: '请填写日期', trigger: 'blur'}
                    ],
                    validDate: [
                        {type: 'array', required: true, message: '请选择有效日期', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
            trigFrontFileClick(){
                this.$refs['frontLicense'].click()
            },
            trigBehindFileClick(){
                this.$refs['frontLicense'].click()
            },
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
                                width: 184px;
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
