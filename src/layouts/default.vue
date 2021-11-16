<template>
    <div id="app">
        <!--<div v-show="$store.state.globalLoading" class="app-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>-->
        <div v-if="loadingFlag" class="loading-gif">
            <img src="../assets/index/loading1.gif" alt="">
        </div>

        <el-dialog @close="closeHandle" width="1060px" :show-close="true" class="login-modal"
                   :visible.sync="loginStatusFlag">
            <div class="login-main">
                <div class="login-intro">
                    <div class="big-title">入全球5亿用户，即刻开启标书制作</div>
                    <div class="bracket-info">(标书制作神器 / 1小时做出好标书)</div>
                    <div class="intro-wrapper">
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>10万+模版、素材，每日更新</div>
                        </div>
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>上传素材，收藏模版、素材，提高工作效率</div>
                        </div>
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>公司资质管理，一次管理，永久使用</div>
                        </div>
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>上传素材，收藏模版、素材，轻松管理</div>
                        </div>
                    </div>

                    <div class="big-title">丰富的标书模版库</div>
                    <div class="bracket-info">(常见标书一键导入 / 常见标书一键导入)</div>

                    <div class="big-title">格式统一</div>
                    <div class="intro-wrapper">
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>标书格式统一配置，防止多人协作标书格式混乱</div>
                        </div>
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>打印格式统一设置，满足各种打印需求</div>
                        </div>
                        <div class="intro-item">
                            <div class="circle-point"></div>
                            <div>支持多人在线编辑，工作更高效</div>
                        </div>
                    </div>
                </div>
                <div class="login-info">
                    <div class="login-main-wrapper">
                        <!--密码登录-->
                        <div v-if="loginWay==='pwdLogin'" class="pwd-login-part">
                            <div class="part-name">密码登录</div>
                            <el-form ref="pwdForm" :model="form" :rules="rules">
                                <el-form-item prop="tel">
                                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.password" type="password" autocomplete="off"
                                              placeholder="请输入密码" @keydown.enter.native="loginHandle('pwdForm')"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="flex-wrapper">
                                        <el-checkbox v-model="form.rememberPwd">记住登录</el-checkbox>
                                        <div @click="changeLoginWay('forgetPwd')" class="forget-btn">忘记密码</div>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div class="gray-tips">*未注册的手机号或第三方账号验证后将自动创建账号</div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :loading="loginFlag" :disabled="loginFlag" class="login-btn"
                                               type="primary" @click="loginHandle('pwdForm')">登录
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <div class="login-way-text">
                                <div class="gray-line"></div>
                                <div class="login-txt">登录方式</div>
                                <div class="gray-line"></div>
                            </div>
                            <div class="login-type-choose">
                                <div @click="changeLoginWay('wxLogin')" class="choose-item">
                                    <img src="../assets/login/login_wx.png" alt="">
                                    <div>微信</div>
                                </div>
                                <div @click="changeLoginWay('codeLogin')" class="choose-item">
                                    <img src="../assets/login/login_code.png" alt="">
                                    <div>验证码登录</div>
                                </div>
                            </div>
                        </div>
                        <!--验证码登录-->
                        <div v-if="loginWay==='codeLogin'" class="pwd-login-part">
                            <div class="part-name">验证码登录</div>
                            <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
                                <el-form-item prop="tel">
                                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <div class="validate-code-wrapper">
                                        <el-input @keydown.enter.native="loginHandle('form')" v-model="form.code"
                                                  maxlength="4" minlength="4" autocomplete="off"
                                                  placeholder="请输入验证码"></el-input>
                                        <div @click="sendValidateCode('form')"
                                             :class="{'code-btn':true,'isSend':sendFlag}">{{validatorText}}
                                        </div>
                                    </div>
                                </el-form-item>

                                <el-form-item>
                                    <div class="gray-tips code-login-tips">*未注册的手机号或第三方账号验证后将自动创建账号</div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :loading="loginFlag" :disabled="loginFlag" class="login-btn"
                                               type="primary" @click="loginHandle('form')">登录
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <div class="login-way-text">
                                <div class="gray-line"></div>
                                <div class="login-txt">登录方式</div>
                                <div class="gray-line"></div>
                            </div>

                            <div class="login-type-choose">
                                <div @click="changeLoginWay('wxLogin')" class="choose-item">
                                    <img src="../assets/login/login_wx.png" alt="">
                                    <div>微信</div>
                                </div>
                                <div @click="changeLoginWay('pwdLogin')" class="choose-item">
                                    <img src="../assets/login/login_pwd.png" alt="">
                                    <div>密码登录</div>
                                </div>
                            </div>
                        </div>
                        <!--微信扫码登录/注册-->
                        <div v-if="loginWay==='wxLogin'" class="pwd-login-part">
                            <div class="part-name">微信扫码登录/注册</div>
                            <img class="wx-login-code"
                                 src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fandroid-artworks.25pp.com%2Ffs08%2F2019%2F02%2F26%2F7%2F110_8559bd4db400e4565c4baa228475ef4a_con.png&refer=http%3A%2F%2Fandroid-artworks.25pp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631945267&t=c6a9081640f9525e97921ac2fffb5594"
                                 alt="">
                            <div class="login-way-text">
                                <div class="gray-line"></div>
                                <div class="login-txt">登录方式</div>
                                <div class="gray-line"></div>
                            </div>

                            <div class="login-type-choose">
                                <div @click="changeLoginWay('pwdLogin')" class="choose-item">
                                    <img src="../assets/login/login_pwd.png" alt="">
                                    <div>密码登录</div>
                                </div>
                                <div @click="changeLoginWay('codeLogin')" class="choose-item">
                                    <img src="../assets/login/login_code.png" alt="">
                                    <div>验证码登录</div>
                                </div>
                            </div>
                        </div>
                        <!--忘记密码-->
                        <div v-if="loginWay==='forgetPwd'" class="pwd-login-part">
                            <div class="part-name">忘记密码</div>
                            <el-form :model="form" :rules="rules" ref="form">
                                <el-form-item prop="tel">
                                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="validate-code-wrapper">
                                        <el-input v-model="form.code" maxlength="4" minlength="4" autocomplete="off"
                                                  placeholder="请输入验证码"></el-input>
                                        <div @click="sendForPwdValidateCode('form')"
                                             :class="{'code-btn':true,'isSend':sendForPwdFlag}">
                                            {{validatorForPwdText}}
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-input @keydown.enter.native="forPwdHandle('form')" type="password" v-model="form.password" autocomplete="off"
                                              placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="back-login" @click="changeLoginWay('pwdLogin')">返回登录</div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :loading="forPwdFlag" :disabled="forPwdFlag"
                                               @click="forPwdHandle('form')" class="login-btn" type="primary">确定
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <!--注册-->
                        <div v-if="loginWay==='register'" class="pwd-login-part">
                            <div class="part-name">手机号注册</div>
                            <el-form :model="form" :rules="rules" ref="form">
                                <el-form-item prop="tel">
                                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="validate-code-wrapper">
                                        <el-input v-model="form.code" maxlength="4" minlength="4" autocomplete="off"
                                                  placeholder="请输入验证码"></el-input>
                                        <div @click="sendRegisterValidateCode('form')"
                                             :class="{'code-btn':true,'isSend':sendRegisterFlag}">
                                            {{validatorRegisterText}}
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-input @keydown.enter.native="registerHandle('form')" type="password" v-model="form.password" autocomplete="off"
                                              placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="back-login" @click="changeLoginWay('pwdLogin')">返回登录</div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :loading="registerFlag" :disabled="registerFlag"
                                               @click="registerHandle('form')" class="login-btn" type="primary">注册
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                    </div>
                    <div class="agreement-wrapper" v-if="loginWay!=='register'&&loginWay!=='forgetPwd'">
                        <div class="agreement">登录即同意
                            <nuxt-link :to="'/declarationPage/'+userPolicy.articleId+'?title='+userPolicy.title">
                                {{userPolicy.title}}
                            </nuxt-link>
                            和
                            <nuxt-link :to="'/declarationPage/'+privacyPolicy.articleId+'?title='+privacyPolicy.title">
                                {{privacyPolicy.title}}
                            </nuxt-link>
                        </div>
                        <div class="no-account">没有账号？<span @click="changeLoginWay('register')">手机注册</span></div>
                    </div>

                </div>
            </div>

        </el-dialog>

        <vipModal :vip-modal-flag.sync="vipModalFlag" :order-info="{}" :order-type.sync="orderType"></vipModal>

        <makeDocDialog :settingFlag.sync="makeDocModalFlag"></makeDocDialog>

        <nuxt/>
    </div>
</template>
<script>
    import makeDocDialog from '@/components/makeDocDialog'
    import vipModal from '@/components/vipModal'
    import {webCodeAppId, webLoginAppId} from '@/setting'

    export default {
        components: {vipModal, makeDocDialog},
        data() {
            return {
                // smsType 短信类型,1-验证码登录 2-找回登录密码 3-用户注册

                privacyPolicy: {},
                userPolicy: {},

                sendForPwdFlag: false,
                forPwdFlag: false,
                validatorForPwdText: '获取验证码',

                sendRegisterFlag: false,
                registerFlag: false,
                validatorRegisterText: '获取验证码',

                makeDocModalFlag: false,

                vipModalFlag: false,
                orderType: 'personal',

                sendFlag: false,
                validatorText: '获取验证码',
                loginFlag: false,
                loginWay: 'pwdLogin',
                loginStatusFlag: false,
                flag: false,
                // loginStatusFlag: false,
                form: {
                    tel: null,
                    password: null,
                    rememberPwd: false,
                    code: null
                },
                rules: {
                    tel: [
                        {required: true, length: 11, message: '请填写手机号'}
                    ],
                    code: [
                        {required: true, length: 4, message: '请填写验证码', type: 'number'}
                    ]
                }
            }
        },
        watch: {
            '$store.state.loginFlag': {
                handler(val) {
                    this.loginStatusFlag = val
                },
                deep: true
            },
            '$store.state.loginModule': {
                handler(val) {
                    this.loginWay = val
                },
                deep: true
            },
            '$store.state.vipFlag': {
                handler(val) {
                    this.vipModalFlag = val
                },
                deep: true
            },
            '$store.state.makeDocFlag': {
                handler(val) {
                    this.makeDocModalFlag = val
                },
                deep: true
            },
        },
        computed: {
            loadingFlag() {
                return this.$store.state.globalLoading
            }
        },
        mounted() {
            let aboutUsInfo = JSON.parse(JSON.stringify(this.$store.state.btmNavInfo.aboutUsList))
            aboutUsInfo.forEach(item => {
                if (item.title.indexOf('隐私') > -1) {
                    this.privacyPolicy = item
                } else if (item.title.indexOf('用户') > -1) {
                    this.userPolicy = item
                }
            })
            console.log("======store======", this.$store,webCodeAppId,webLoginAppId);
        },
        methods: {
            closeHandle() {
                this.form.password = null
                this.form.rememberPwd = null
                this.form.code = null
                this.$store.commit('SET_LOGIN', false)
                this.$store.commit('SET_LOGIN_MODULE', 'pwdLogin')
            },
            changeLoginWay(way) {
                this.form.tel = null
                this.form.password = null
                this.form.rememberPwd = null
                this.form.code = null
                this.$store.commit('SET_LOGIN_MODULE', way)
            },
            loginHandle(formname) {
                console.log('---登录了吗-----')
                this.$refs[formname].validate(async valid => {
                    if (valid) {

                        var captcha1 = new TencentCaptcha(webLoginAppId, (res) => {
                            if (res.ret === 0) {
                                console.log('票据======================',res)
                                // alert(res.ticket)   // 票据
                                const prm = this.loginWay === 'pwdLogin' ? {
                                    "userPhone": this.form.tel,
                                    "userPwd": this.form.password,
                                    randstr: res.randstr,
                                    ticket: res.ticket
                                } : {
                                    "userPhone": this.form.tel,
                                    "authCode": this.form.code,
                                    randstr: res.randstr,
                                    ticket: res.ticket
                                }
                                // const fn = this.loginWay === 'pwdLogin' ? loginPwd : loginCode
                                this.loginFlag = true

                                if (this.loginWay === 'pwdLogin') {
                                    this.$axios[this.$apiURL.user.loginPwd.method](this.$apiURL.user.loginPwd.url, prm).then(async res => {
                                        if (res.data.code === 200) {
                                            this.$message.success(res.data.msg)
                                            this.$store.dispatch('setToken', res.headers.token)
                                            this.loginFlag = false
                                            this.$store.commit('SET_LOGIN', false)
                                            this.setUserInfo()
                                            this.$cookies.set('loginStatus', true)
                                        }
                                    }).catch(err => {
                                        this.loginFlag = false
                                    })
                                } else {
                                    this.$axios[this.$apiURL.user.loginCode.method](this.$apiURL.user.loginCode.url, prm).then(res => {
                                        if (res.data.code === 200) {
                                            this.$message.success(res.data.msg)
                                            this.$store.dispatch('setToken', res.headers.token)
                                            this.loginFlag = false
                                            this.$store.commit('SET_LOGIN', false)
                                            this.setUserInfo()
                                            this.$cookies.set('loginStatus', true)
                                        }
                                    }).catch(err => {
                                        this.loginFlag = false
                                    })
                                }
                            }
                        });
                        captcha1.show();
                    }
                })
            },
            registerHandle(formname) {
                this.$refs[formname].validate(async valid => {
                    if (valid) {
                        const prm = {
                            "authCode": this.form.code,
                            "userPhone": this.form.tel,
                            "userPwd": this.form.password
                        }
                        this.registerFlag = true
                        this.$axios[this.$apiURL.user.register.method](this.$apiURL.user.register.url, prm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success(res.data.msg)
                                this.registerFlag = false
                                this.loginWay = 'pwdLogin'
                            }
                        }).catch(err => {
                            this.registerFlag = false
                        })
                    }

                })
            },
            forPwdHandle(formname) {
                this.$refs[formname].validate(async valid => {
                    if (valid) {
                        const prm = {
                            "code": this.form.code,
                            "userPhone": this.form.tel,
                            "newPwd": this.form.password
                        }
                        this.forPwdFlag = true
                        this.$axios[this.$apiURL.user.forgetPwd.method](this.$apiURL.user.forgetPwd.url, prm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success(res.data.msg)
                                this.forPwdFlag = false
                                this.loginWay = 'pwdLogin'
                            }
                        }).catch(err => {
                            this.forPwdFlag = false
                        })
                    }

                })
            },

            sendValidateCode(formname) {
                if (this.sendFlag) return
                this.$refs[formname].validateField('tel', valid => {
                    if (!valid) {


                        var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                            if (res.ret === 0) {
                                // alert(res.ticket)   // 票据
                                const prm = {
                                    "code": "",
                                    "smsType": 1,
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
                                                this.validatorText = `获取验证码`
                                                return
                                            }
                                            this.validatorText = `还剩${s}s`
                                        }, 1000)
                                    }

                                })
                            }
                        });
                        captcha1.show();

                    }
                })


            },
            sendRegisterValidateCode(formname) {
                if (this.sendRegisterFlag) return
                this.$refs[formname].validateField('tel', valid => {
                    if (!valid) {

                        var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                            if (res.ret === 0) {
                                // alert(res.ticket)   // 票据
                                const prm = {
                                    "code": "",
                                    "smsType": 3,
                                    "userPhone": this.form.tel,
                                    "userType": 200,
                                    randstr: res.randstr,
                                    ticket: res.ticket
                                }
                                this.$axios[this.$apiURL.user.sendCode.method](this.$apiURL.user.sendCode.url, prm).then(res => {
                                    if (res.data.code === 200) {
                                        this.$message.success(res.data.msg)
                                        let s = 60
                                        this.sendRegisterFlag = true
                                        let codeTimer = setInterval(() => {
                                            s--
                                            if (s === 0) {
                                                clearInterval(codeTimer)
                                                s = 60
                                                this.sendRegisterFlag = false
                                                this.validatorRegisterText = `获取验证码`
                                                return
                                            }
                                            this.validatorRegisterText = `还剩${s}s`
                                        }, 1000)
                                    }

                                })
                            }
                        });
                        captcha1.show();

                    }
                })


            },
            sendForPwdValidateCode(formname) {
                if (this.sendForPwdFlag) return
                this.$refs[formname].validateField('tel', valid => {
                    if (!valid) {
                        var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                            if (res.ret === 0) {
                                // alert(res.ticket)   // 票据
                                const prm = {
                                    "code": "",
                                    "smsType": 2,
                                    "userPhone": this.form.tel,
                                    "userType": 200,
                                    randstr: res.randstr,
                                    ticket: res.ticket
                                }
                                this.$axios[this.$apiURL.user.sendCode.method](this.$apiURL.user.sendCode.url, prm).then(res => {
                                    if (res.data.code === 200) {
                                        this.$message.success(res.data.msg)
                                        let s = 60
                                        this.sendForPwdFlag = true
                                        let codeTimer = setInterval(() => {
                                            s--
                                            if (s === 0) {
                                                clearInterval(codeTimer)
                                                s = 60
                                                this.sendForPwdFlag = false
                                                this.validatorForPwdText = `获取验证码`
                                                return
                                            }
                                            this.validatorForPwdText = `还剩${s}s`
                                        }, 1000)
                                    }

                                })
                            }
                        });
                        captcha1.show();
                    }
                })


            },
            async setUserInfo() {
                let userInfo = await this.$axios.post('/smartbiddoc-docUser/api/userBase/queryUserBaseInfo')
                let userVipInfo = await this.$axios.post('/smartbiddoc-docUser/api/companyAccount/queryCompanyAccount')
                // let userVipInfo = await $axios[user.getUserVipInfo.method](user.getUserVipInfo.url)
                const userInfoData = userInfo.data
                const userVipInfoData = userVipInfo.data

                this.$store.commit("SET_INFO", userInfoData.result.userBaseVO)
                this.$store.commit("SET_VIP_INFO", userVipInfoData.result)

            }
        }
    }
</script>
<style lang="less">
    #__nuxt {
        height: 100%;
    }

    #__layout {
        height: 100%;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    #app {
        height: 100%;
        font-family: @fontMc;

        .loading-gif {
            width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: calc(50% - 100px);
            top: calc(50% - 100px);
            z-index: 99999999;

            img {
                width: 50px;
                height: 50px;
            }
        }

        .app-loading {
            position: fixed;
            width: 42px;
            height: 42px;
            left: calc(50% - 21px);
            top: calc(50% - 21px);
            animation: rotate1 4s infinite ease-in-out;

            div {
                width: 20px;
                height: 20px;
                position: absolute;
                background: pink;
                display: block;
                border-radius: 10px;

                animation: div1 1s infinite ease-in-out;

                &:nth-child(1) {
                    background: #2ecc71;
                    animation-delay: 0s;
                }

                &:nth-child(2) {
                    left: 22px;
                    background: #9b59b6;
                    animation-delay: .2s;
                }

                &:nth-child(3) {
                    top: 22px;
                    background: #3498db;
                    animation-delay: .4s;
                }

                &:nth-child(4) {
                    top: 22px;
                    left: 22px;
                    background: red;
                    animation-delay: .6s;
                }
            }
        }

        .login-modal {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            .el-dialog {
                border-radius: 20px;
            }

            .el-dialog__header {
                padding: 0;
            }

            .el-dialog__body {
                padding: 0;
                height: 640px;

                .login-main {
                    height: 100%;
                    display: flex;

                    .login-intro {
                        border-radius: 20px 0 0 20px;
                        min-width: 530px;
                        background: url("../assets/login/login_bj@2x.png");
                        background-size: 100% 100%;
                        padding-left: 50px;
                        color: #FFFFFF;

                        .big-title {
                            margin: 71px 0 9px 0;
                            font-size: 24px;
                            font-weight: bold;
                        }

                        .bracket-info {
                            font-size: 13px;
                            font-weight: 500;
                        }

                        .intro-wrapper {
                            margin-top: 26px;

                            .intro-item {
                                display: flex;
                                align-items: center;
                                font-size: 13px;
                                color: #E4F0FF;
                                margin-bottom: 10px;

                                &:last-child {
                                    margin: 0;
                                }

                                .circle-point {
                                    width: 3px;
                                    height: 3px;
                                    background: #E4F0FF;
                                    border-radius: 50%;
                                    margin-right: 6px;
                                }
                            }
                        }
                    }

                    .login-info {
                        background: #FAFAFA;
                        width: 100%;
                        border-radius: 0px 20px 20px 0px;
                        padding: 65px 65px 0 65px;

                        .login-main-wrapper {
                            background: #FFFFFF;
                            box-shadow: 0px 13px 22px 2px rgba(196, 204, 212, 0.35);
                            border-radius: 10px;
                            width: 100%;
                            height: 510px;
                            padding: 0 50px;

                            .pwd-login-part {
                                .part-name {
                                    font-size: 24px;
                                    font-weight: bold;
                                    color: #333333;
                                    text-align: center;
                                    padding: 40px 0 30px 0;
                                }

                                .wx-login-code {
                                    width: 220px;
                                    height: 220px;
                                    margin: 15px 0 13px 40px;
                                }

                                .el-form-item__content {
                                    line-height: 1;

                                    .flex-wrapper {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;

                                        .el-checkbox {
                                            font-size: 14px;
                                            color: #333333;
                                        }

                                        .forget-btn {
                                            cursor: pointer;
                                            color: #156BFE;
                                        }
                                    }

                                    .gray-tips {
                                        font-size: 12px;
                                        font-weight: 400;
                                        color: #969696;
                                        text-align: center;
                                        margin-top: 10px;

                                        &.code-login-tips {
                                            margin-top: 50px;
                                        }
                                    }

                                    .login-btn {
                                        width: 289px;
                                        height: 46px;
                                        border-radius: 4px;
                                    }

                                    .back-login {
                                        cursor: pointer;
                                        font-size: 14px;
                                        font-weight: 400;
                                        color: #156BFE;
                                        text-align: right;
                                        margin-bottom: 14px;
                                    }

                                    /*发送验证码*/

                                    .validate-code-wrapper {
                                        position: relative;

                                        .code-btn {
                                            position: absolute;
                                            top: 14px;
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

                                .login-way-text {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 14px;
                                    color: #9D9D9D;
                                    margin: 30px 0 20px 0;

                                    .gray-line {
                                        width: 14px;
                                        height: 2px;
                                        background: #B8B8B8;
                                    }

                                    .login-txt {
                                        margin: 0 6px;
                                    }
                                }

                                .login-type-choose {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;

                                    .choose-item {
                                        cursor: pointer;
                                        text-align: center;
                                        width: 80px;
                                        font-size: 12px;
                                        font-weight: 400;
                                        color: #969696;

                                        &:hover {
                                            color: @activeColor;
                                        }

                                        img {
                                            width: 42px;
                                            height: 42px;
                                            margin-bottom: 6px;
                                        }
                                    }
                                }
                            }
                        }

                        .agreement-wrapper {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 23px 15px 0 15px;
                            font-size: 13px;
                            font-weight: 500;
                            color: #5E6673;

                            a {
                                color: #0076F7;
                                text-decoration: none;
                            }

                            span {
                                cursor: pointer;
                                color: #0076F7;
                            }
                        }
                    }
                }
            }
        }

    }

    @keyframes rotate1 {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes div1 {
        0% {
            transform: scale(1);
        }
        50% {
            -webkit-transform: scale(.5);
            -moz-transform: scale(.5);
            -ms-transform: scale(.5);
            -o-transform: scale(.5);
            transform: scale(.5);
        }
        100% {
            transform: scale(1);
        }
    }

    body {
        font-family: @fontMc;

        .portrait-dropdown-menu {
            padding: 0;

            a {
                text-decoration: none;
            }

            .router-link-active {
                display: block;
                text-decoration: none;
                color: red;
                text-align: center;

                &:first-child {
                    .el-dropdown-menu__item--divided {
                        border-top: none;
                    }
                }

                .el-dropdown-menu__item {
                    padding: 0;
                    margin: 0;
                    height: 40px;
                    line-height: 40px !important;
                    color: #202020;

                    &.el-dropdown-menu__item--divided {
                        &:before {
                            height: 0;
                        }
                    }
                }
            }

            .el-dropdown-menu__item {
                height: 40px;
                line-height: 40px;
                margin: 0;
                color: #202020;
                font-size: 12px;

                &:hover {
                    color: #FF652D;
                    background: none;
                }

                &.el-dropdown-menu__item--divided {
                    &:before {
                        height: 0;
                    }
                }
            }
        }

        .function-popover {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100px;
            padding: 10px 0;

            .popper-item {
                height: 29px;
                line-height: 29px;
                text-align: center;
                cursor: pointer;
                font-size: 12px;
                font-family: @fontFa;

                &:hover {
                    background: #FBF4F2;
                    color: @activeColor;
                }
            }
        }

        .message-popper {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 2px 10px 0 10px;

            .message-wrapper {
                width: 100%;

                .message-header {
                    height: 45px;
                    border-bottom: 1px solid #D8D8D8;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .message-label {
                        position: relative;
                        text-align: center;
                        height: 45px;
                        line-height: 45px;
                        width: 87px;
                        border-bottom: 2px solid #FF652D;
                        font-size: 15px;
                        color: #333333;

                        .has-new-message {
                            position: absolute;
                            top: 12px;
                            right: 16px;
                            width: 6px;
                            height: 6px;
                            background: #FF652D;
                            border-radius: 50%;
                        }
                    }

                    .clear-message-btn {
                        width: 12px;
                        height: 10px;
                        cursor: pointer;
                        margin-right: 8px;
                    }
                }

                .message-content-wrapper {
                    padding: 14px 0 0 0;

                    .message-content-item {
                        padding: 12px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        cursor: pointer;

                        &.alreadyRead {
                            .message-title {
                                color: #C8CDD1 !important;
                            }

                            .message-shortcut {
                                color: #C8CDD1 !important;
                            }
                        }

                        &:hover {
                            background: #FCFCFC;
                        }

                        .message-title-wrapper {
                            display: flex;
                            align-items: center;
                            padding-bottom: 7px;

                            .message-icon {
                                width: 16px;
                                height: 15px;
                                margin: 0 12px 0 0;
                            }

                            .message-title {
                                font-size: 14px;
                                color: #333333;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }

                        .message-shortcut {
                            padding-left: 28px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: 13px;
                            color: #666666;
                            line-height: 24px;
                        }
                    }

                    .history-message {
                        margin: 30px 0 0 0;
                        border-top: 1px solid #EFEFEF;
                        height: 55px;
                        line-height: 55px;
                        text-align: right;

                        .history-message-a {
                            font-size: 14px;
                            color: #515151;
                            text-decoration: none;
                        }
                    }
                }
            }
        }


        .classify-menu {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 8px 0;

            .popper-item {
                height: 29px;
                line-height: 29px;
                text-align: center;
                cursor: pointer;
                font-size: 12px;
                font-family: @fontFa;

                &:hover {
                    background: #FBF4F2;
                    color: @activeColor;
                }
            }
        }

        .el-message {
            &.is-closable {
                top: 40px !important;
                width: 200px !important;
                font-size: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: none;
                border: none;
                color: #0084ff;

                .el-message__closeBtn {
                    display: none;
                }

                .el-icon-loading {
                    color: #eee;
                }
            }
        }

        .user-popper-info {
            padding: 27px 21px;

            .down-content {
                .down-user-header {
                    display: flex;
                    align-items: center;
                    padding: 0 11px;

                    .down-user-icon {
                        width: 40px;
                        height: 40px;
                        margin-right: 18px;
                    }

                    .down-header-right {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .username-wrapper {
                            font-size: 12px;
                            font-weight: 400;
                            color: #545454;

                            .user-wrapper {
                                display: flex;
                                align-items: center;

                                img {
                                    width: 59px;
                                    height: 18px;
                                    margin-left: 10px;
                                }
                            }
                        }

                        .quit-btn {
                            font-size: 12px;
                            font-weight: 400;
                            color: #9D9D9D;
                            cursor: pointer;

                            &:hover {
                                color: @activeColor;
                            }
                        }
                    }
                }

                .down-vip-card {
                    position: relative;
                    margin: 26px 0;

                    img {
                        width: 100%;
                        height: auto;
                    }

                    .vip-btn {
                        text-decoration: none;
                        position: absolute;
                        right: 20px;
                        top: 13px;
                        width: 70px;
                        height: 24px;
                        background: linear-gradient(155deg, #F0D291, #E2BB78);
                        border-radius: 12px;
                        text-align: center;
                        font-size: 12px;
                        font-weight: 400;
                        color: #333333;
                        line-height: 24px;
                        cursor: pointer;

                        &:hover {
                            opacity: .8;
                        }
                    }
                }

                .info-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 18px;

                    .my-subscription {
                        width: 140px;
                        height: 62px;
                        background: #FFFFFF;
                        box-shadow: 0px 2px 7px 0px rgba(203, 209, 214, 0.35);
                        border-radius: 4px;
                        padding: 10px 24px 10px 10px;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;

                        img {
                            width: 28px;
                            height: 28px;
                        }

                        .subscription-left {
                            font-size: 13px;
                            font-weight: 500;
                            color: #333333;

                            .subscription-txt {
                                font-size: 12px;
                                font-weight: 400;
                                color: #9D9D9D;
                                margin-top: 5px;
                            }
                        }
                    }
                }

                .info-bottom {
                    display: flex;

                    .info-item {
                        text-decoration: none;
                        text-align: center;
                        font-size: 12px;
                        font-weight: 400;
                        color: #9D9D9D !important;
                        margin-right: 28px;

                        img {
                            width: 20px;
                            height: 22px;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
    }


</style>
