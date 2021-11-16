<template>
    <el-container class="personal-center">
        <el-header style="padding: 0;height: 83px;">
            <commonNavHeader></commonNavHeader>
        </el-header>
        <el-container class="personal-center-container">
            <el-aside width="260px" class="personal-menu">
                <el-menu
                        :unique-opened="true"
                        :default-active="activeIndex"
                        class="el-menu-vertical-demo"
                        router>
                    <el-menu-item index="/personalCenter/personalCenter/personalInfo">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_home@2x.png" alt="">
                            <span>首页</span>
                        </template>
                    </el-menu-item>
                    <div class="group-title">标书编辑</div>
                    <el-menu-item index="/personalCenter/personalCenter/myBidDoc">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_document@2x.png" alt="">
                            <span>我的标书</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="template">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_template@2x.png" alt="">
                            <span>我的模板</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/enterpriseTemplate">公司模板</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/myTemplate">个人模板</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="fodder">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_template@2x(1).png" alt="">
                            <span>我的素材</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/enterpriseFodder">公司素材</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/myFodder">个人素材</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="enterpriseInfo">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_company@2x.png" alt="">
                            <span>公司信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/legalPersonInfo">法人身份证明</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/businessPic">营业执照</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/accountLicense">开户许可证</el-menu-item>
                            <!--<el-menu-item index="/personalCenter/personalCenter/businessInfo">工商查询信息</el-menu-item>-->
                            <!--<el-menu-item index="/personalCenter/personalCenter/judiciaryIns">司法机关查询信息</el-menu-item>-->
                            <el-menu-item index="/personalCenter/personalCenter/financeReport">财务报告</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/performanceList">业绩列表</el-menu-item>
                            <!--<el-menu-item index="/personalCenter/personalCenter/enterpriseHonor">企业荣誉</el-menu-item>-->
                            <!--<el-menu-item index="/personalCenter/personalCenter/creditStanding">资信证明及信用报告</el-menu-item>-->
                            <!--<el-menu-item index="/personalCenter/personalCenter/enterpriseCertification">企业资质</el-menu-item>-->
                            <el-menu-item index="/personalCenter/personalCenter/otherCertification">其他资质管理</el-menu-item>
                            <!--<el-menu-item index="/personalCenter/personalCenter/systemAuth">体系认证信息</el-menu-item>-->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="departments">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_staff@2x.png" alt="">
                            <span>人员信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/departments">部门管理</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/members">人员管理</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/certificationClassify">资质分类管理
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--<el-submenu index="performanceList">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_project@2x.png" alt="">
                            <span>项目信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/performanceList">业绩列表</el-menu-item>
                            &lt;!&ndash;<el-menu-item index="1-2">业绩附件管理</el-menu-item>&ndash;&gt;
                        </el-menu-item-group>
                    </el-submenu>-->
                    <div class="group-title">账号管理</div>
                    <el-submenu index="accountInfo">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_account@2x.png" alt="">
                            <span>我的账号</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/accountInfo">账号信息</el-menu-item>
                            <el-menu-item index="">我的会员</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/myOrder">我的订单</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/myInvoice">我的发票</el-menu-item>
                            <!--<el-menu-item index="/personalCenter/personalCenter/myCoupon">我的优惠券</el-menu-item>-->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/personalCenter/personalCenter/memberManagement">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_member@2x.png" alt="">
                            <span>成员管理</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="myRecord">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_record@2x.png" alt="">
                            <span>我的记录</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/personalCenter/personalCenter/myCollection">我的收藏</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/exportRecord">导出记录</el-menu-item>
                            <el-menu-item index="/personalCenter/personalCenter/browserRecord">浏览记录</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/personalCenter/personalCenter/messageList">
                        <template slot="title">
                            <img src="~/assets/personal2/personal_icon_news@2x.png" alt="">
                            <span>消息中心</span>
                        </template>
                    </el-menu-item>
                    <div @click="loginOut" class="login-out">退出</div>
                </el-menu>
            </el-aside>
            <el-main class="content-main">
                <nuxt/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import commonNavHeader from '@/components/commonNavHeader'

    export default {
        name: "index",
        head(){
          return {
              title:'个人中心-云标书'
          }
        },
        components: {commonNavHeader},
        data() {
            return {
                activeIndex: '/personalCenter/index'
            }
        },
        mounted() {
        },
        methods: {
            loginOut() {
                this.$axios[this.$apiURL.user.loginOut.method](this.$apiURL.user.loginOut.url).then(res => {
                    this.$message.success(res.data.msg)
                    this.$store.commit('SET_LOGIN', false)
                    this.$store.dispatch('resetToken')
                    this.$cookies.set('loginStatus', false)
                    this.$store.commit('SET_INFO', {})
                    this.$store.commit('SET_VIP_INFO', {})
                    this.$router.push({
                        path: '/'
                    })
                })

            }
        }
    }
</script>

<style scoped lang="less">
    .personal-center {
        width: 100%;
        height: 100%;
        font-size: @fontMc;
        overflow: auto;
        -background: #F5F5F5;

        .personal-center-container {
            height: calc(100% - 83px);

            .personal-menu {
                padding: 20px 0;
                height: 100%;
                background: #fff;
                border-right: 1px solid #eee;

                .el-menu {
                    max-height: 100%;
                    overflow: auto;
                    border-right: none;
                    color: #1E2738;

                    &::-webkit-scrollbar {
                        width: 4px;
                        height: 1px;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background: #E3E5E6;
                    }

                    img {
                        width: 24px;
                        height: 24px;
                        margin: 0 26px 0 20px;
                    }

                    .el-menu-item {
                        &.is-active {
                            font-weight: bold;
                            background-color: #F4F8FE;
                        }

                        &:hover {
                            color: @activeColor !important;
                        }
                    }

                    span {
                        &:hover {
                            color: @activeColor !important;
                        }
                    }


                    .el-menu-item-group {
                        .el-menu-item {
                            padding-left: 90px !important;
                        }

                        /deep/.el-menu-item-group__title {
                            padding: 0;
                        }
                    }

                    .group-title {
                        font-size: 14px;
                        color: #8D9AB0;
                        padding: 26px;
                    }

                    .login-out {
                        padding: 16px 0 16px 90px;
                        font-size: 14px;
                        color: #1E2738;
                        cursor: pointer;

                        &:hover {
                            color: @activeColor;
                            font-weight: bold;
                        }
                    }
                }
            }

            .content-main {
                padding: 0 20px 0 0;
            }
        }
    }
</style>
