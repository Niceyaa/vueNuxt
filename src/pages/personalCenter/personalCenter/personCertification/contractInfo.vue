<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">合同信息</div>
        </div>
        <div class="temp-material-content">
            <div class="router-nav-wrapper">
                <nuxt-link to="/personalCenter/personalCenter/members" class="back-wrapper">
                    <img src="~/assets/personal2/lastGrade.png" alt="">
                    <div class="back-text">返回上一级</div>
                </nuxt-link> <div class="separator-line"></div>
                <div class="nav-wrapper">
                    <router-link to="/personalCenter/personalCenter/members" class="nav-item">
                        <span>人员管理</span>
                        <span class="right-arrow">></span>
                    </router-link>
                    <div class="nav-item">
                        <span>合同信息</span>
                    </div>
                </div>
            </div>
            <div class="module-label">
               {{currentName}}<span>合同信息</span>
            </div>
            <div class="desc-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="legal-form">
                    <el-form-item label="上传合同" prop="name">
                        <singleFileUpload></singleFileUpload>
                    </el-form-item>
                    <el-form-item label="签订日期" prop="license">
                        <el-date-picker
                                v-model="ruleForm.license"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="签订年限" prop="name">
                        <div style="display: flex;">
                            <el-date-picker
                                    style="width: 140px;"
                                    v-model="ruleForm.businessLicStartTime"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                            <div style="margin: 0 10px;">至</div>
                            <el-date-picker
                                    style="width: 140px;"
                                    v-model="ruleForm.businessLicEndTime"
                                    type="date"
                                    :disabled="ruleForm.businessLicFirFlag"
                                    placeholder="结束日期">
                            </el-date-picker>
                            <el-checkbox style="margin-left: 20px" v-model="ruleForm.license">备选项</el-checkbox>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="sub-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import defaultUrl from '~/assets/personal2/personal_empty@2x.png'
    import singleFileUpload from '~/components/singleFileUpload'

    export default {
        name: 'educationInfo',
        components: {singleFileUpload},
        data() {
            return {
                ruleForm: {
                    name: '',
                    licenseUrl: '',
                    license: '',
                    sex: '',
                    address: null,
                    validDate: [],
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
            }
        },
        props: {},
        methods: {
            goToUrl() {
                this.$router.push({
                    path: this.$props.toUrl
                })
            },

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
