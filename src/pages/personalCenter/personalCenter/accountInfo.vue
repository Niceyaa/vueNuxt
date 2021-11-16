<template>
    <div class="legal-person-info">
        <div class="legal-info-title">账号信息</div>
        <div class="legal-info-fill">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px" class="legal-form">
                <el-form-item label="头像">
                    <img src="../../../assets/personal2/headPortrait.png" alt="">
                </el-form-item>
                <el-form-item label="昵称" prop="userNick">
                    <el-input v-model="ruleForm.userNick" placeholder="请填写昵称"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userSex">
                    <el-select v-model="ruleForm.userSex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
                        <el-option label="未知" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="ID">
                    <div>{{$store.state.userInfo.userCode}}</div>
                </el-form-item>
                <!--<el-form-item label="城市">
                    <el-select v-model="ruleForm.cityId" placeholder="请选择城市">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="行业信息">
                    <el-cascader
                            v-model="ruleForm.industryIds"
                            :options="industryData"
                            :props="industryProps"
                            collapse-tags
                            clearable>
                    </el-cascader>
                </el-form-item>
                <!--<el-form-item label="企业名称" prop="validDate">
                    <el-input v-model="ruleForm.companyName"></el-input>
                </el-form-item>-->
                <el-form-item label="手机号">
                    <div class="tel-wrapper" style="display: flex;align-items: center;">
                        <div style="margin-right: 80px">{{ruleForm.userPhone}}</div>
                        <i @click="openTelDialog" style="font-size: 16px;cursor:pointer;" class="el-icon-edit"></i>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="sub-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog :center="true" title="修改手机号" width="500px" :visible.sync="telFlag">
            <el-form :model="form" :rules="formRules" label-width="100px" ref="form">
                <el-form-item label="原手机号">
                    <div>{{ruleForm.userPhone}}</div>
                </el-form-item>
                <el-form-item label="新手机号" prop="tel">
                    <el-input style="width: 340px;" v-model="form.tel" autocomplete="off"
                              placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <div class="validate-code-wrapper">
                        <el-input style="width: 340px;" v-model.number="form.code" maxlength="4"
                                  autocomplete="off"
                                  placeholder="请输入验证码"></el-input>
                        <div @click="sendCode('form')"
                             :class="{'code-btn':true,'isSend':sendFlag}">
                            {{validateText}}
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="telFlag = false">取 消</el-button>
                <el-button type="primary" @click="saveHandle('form')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import qs from 'qs'
    import {webCodeAppId} from '@/setting'

    export default {
        name: "accountInfo",
        data() {
            return {
                industryData: [],
                industryProps: {
                    children: 'subIndustry',
                    label: 'industryName',
                    value: 'industryId',
                    checkStrictly: true,
                    emitPath: false,
                    multiple: true
                },
                ruleForm: {
                    cityId: null,
                    industryIds: '',
                    userNick: null,
                    userSex: null,
                    userPhone: null,
                    companyName: null
                },
                rules: {
                    userNick: [
                        {required: true, message: '请填写昵称', trigger: 'blur'},
                    ],
                    userSex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    industryIds: [
                        {required: true, message: '请选择所属行业', trigger: 'change'}
                    ],
                },
                validateText: '发送验证码',
                sendFlag: false,
                telFlag: false,
                form: {
                    tel: null,
                    code: null
                },
                formRules: {
                    tel: [
                        {required: true, length: 11, message: '请填写手机号'}
                    ],
                    code: [
                        {required: true, length: 4, message: '请填写验证码', type: 'number'}
                    ]
                }
            };
        },
        mounted() {
            this.getIndustryList()
            this.getInfo()
        },
        methods: {
            getIndustryList() {
                this.$axios[this.$apiURL.commonApi.getIndustryList.method](this.$apiURL.commonApi.getIndustryList.url).then(res => {
                    this.industryData = res.data.result
                })
            },
            getInfo() {
                this.$axios[this.$apiURL.user.getUserInfo.method](this.$apiURL.user.getUserInfo.url).then(res => {
                    const {userBaseVO} = res.data.result
                    this.ruleForm.industryIds = userBaseVO.industryInfoList.length > 0 ? userBaseVO.industryInfoList.map(item => {
                        return item.id
                    }) : []
                    this.ruleForm.companyName = userBaseVO.companyName
                    this.ruleForm.userNick = userBaseVO.userNick
                    this.ruleForm.userSex = userBaseVO.userSex
                    this.ruleForm.userPhone = userBaseVO.userPhone
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        const prm = {
                            "cityId": this.ruleForm.cityId,
                            "industryIds": this.ruleForm.industryIds.join(','),
                            "userNick": this.ruleForm.userNick,
                            "userSex": this.ruleForm.userSex
                        }
                        this.$axios[this.$apiURL.user.updateAccountInfo.method](this.$apiURL.user.updateAccountInfo.url, prm).then(res => {
                            this.$message.success(res.data.msg)
                            this.getInfo()
                        })
                    }
                })
            },
            openTelDialog() {
                this.telFlag = true
                this.$nextTick(() => {
                    this.$refs.form.resetFields()
                    this.form.tel = null
                    this.form.code = null
                    this.sendFlag = false
                    this.validateText = '发送验证码'
                })
            },
            sendCode(formname) {
                if (this.sendFlag) return
                this.$refs[formname].validateField('tel', valid => {
                    if (!valid) {
                        var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                            if (res.ret === 0) {
                                // alert(res.ticket)   // 票据
                                const prm = {
                                    "code": "",
                                    "smsType": 4,
                                    "userPhone": this.form.tel,
                                    "userType": 200,
                                    randstr: res.randstr,
                                    ticket: res.ticket
                                }
                                this.$axios[this.$apiURL.user.sendCode.method](this.$apiURL.user.sendCode.url, prm).then(res => {
                                    if (res.data.code === 200) {
                                        this.$message.success(res.data.msg)
                                        let s = 60
                                        this.sendFlag = true
                                        let codeTimer = setInterval(() => {
                                            s--
                                            if (s === 0) {
                                                clearInterval(codeTimer)
                                                s = 60
                                                this.sendFlag = false
                                                this.validateText = `获取验证码`
                                                return
                                            }
                                            this.validateText = `还剩${s}s`
                                        }, 1000)
                                    }
                                })
                            }
                        });
                        captcha1.show();
                    }
                })


            },
            saveHandle(formname) {
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        const prm = qs.stringify({
                            code: this.form.code,
                            userPhone: this.form.tel
                        })
                        this.$axios[this.$apiURL.user.updateUserPhone.method](this.$apiURL.user.updateUserPhone.url, prm).then(res => {
                            this.$message.success(res.data.msg)
                            this.telFlag = false
                            this.getInfo()
                        })

                    }
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
                    img {
                        width: 60px;
                        height: 60px;
                    }

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
                                width: 89px;
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

        /*发送验证码*/

        .validate-code-wrapper {
            position: relative;

            .code-btn {
                height: 40px;
                line-height: 40px;
                position: absolute;
                top: 0;
                right: 21px;
                cursor: pointer;
                font-size: 14px;
                color: #156BFE;
                border-left: 1px solid #B8B8B8;
                padding-left: 14px;

                &.isSend {
                    color: #A9A9A9 !important;
                }
            }
        }
    }
</style>
