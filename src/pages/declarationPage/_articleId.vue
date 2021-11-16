<template>
    <div class="declare-container">
        <common-nav-header></common-nav-header>

        <div class="declare-content">
            <div class="declare-banner">
                <div class="banner-title">快速生成标书神器</div>
                <div class="banner-desc">在线标书快速生成，1小时快速生成</div>
            </div>
            <div class="declare-main">
                <div class="left-nav">
                    <nuxt-link v-for="item in navItems" :to="'/declarationPage/'+item.articleId+'?title='+item.title" :key="item.articleId"
                               :class="{'nav-item':true,'navActive':item.articleId===currentId}">
                        <div class="blue-sign"></div>
                        <div class="nav-title">{{item.title}}</div>
                        <img class="default-icon" src="~/assets/newIndex/left_menu_default@2x.png" alt="">
                        <img class="hover-icon" src="~/assets/newIndex/left_menu_select@2x.png" alt="">
                    </nuxt-link>
                </div>
                <div class="right-detail">
                    <commonDeclare :article-id="currentId" :article-name="currentName"></commonDeclare>
                </div>
            </div>
        </div>

        <common-footer></common-footer>
        <el-backtop></el-backtop>
    </div>
</template>
<script>
    import commonDeclare from '@/components/commonDeclare'
    import {mapState} from 'vuex'

    export default {
        components: {commonDeclare},
        data() {
            return {
                // navItems: [],
                currentId: null,
                currentName: null,
            }
        },
        computed:mapState({
            navItems:state=>state.btmNavInfo.aboutUsList
        }),
        mounted() {
            this.$store.commit('SET_LOGIN', false)
            this.$store.commit('SET_LOGIN_MODULE', 'pwdLogin')
            this.currentId = parseInt(this.$route.params.articleId)
            this.currentName = this.$route.query.title
            // this.getData()
        },
        methods: {
            getData() {
                this.$axios[this.$apiURL.commonApi.getBtmNavInfo.method](this.$apiURL.commonApi.getBtmNavInfo.url).then(res => {
                    this.navItems = res.data.result.aboutUsList
                })
            }
        }
    };
</script>

<style scoped lang="less">
    .declare-container {
        font-family: @fontMc;
        width: 100%;
        min-height: 100%;
        overflow: auto;
        padding: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        .declare-content {
            background: #F4F4F4;
            width: 100%;
            min-height: 100%;
            padding-bottom: 100px;

            .declare-banner {
                width: 100%;
                min-width: 1440px;
                height: 400px;
                text-align: center;
                background: url("~/assets/newIndex/nav_bj@2x.png");
                background-size: cover;
                color: #FFFFFF;
                padding-top: 138px;

                .banner-title {
                    font-weight: bold;
                    font-size: 60px;
                    margin: 0 0 10px 0;
                }

                .banner-desc {
                    font-size: 24px;
                }
            }

            .declare-main {
                margin: 0 auto;
                min-width: 1440px;
                width: 1440px;
                padding-top: 40px;
                display: flex;

                .left-nav {
                    width: 220px;
                    height: 252px;
                    background: #FFFFFF;
                    border-radius: 4px;
                    padding: 10px 0;
                    margin-right: 40px;

                    .nav-item {
                        display: block;
                        height: 57px;
                        line-height: 57px;
                        position: relative;
                        text-decoration: none;
                        font-size: 14px;
                        color: #333333;
                        padding-left: 45px;
                        border-bottom: 1px solid #F4F4F4;

                        &:last-child {
                            border: none;
                        }

                        &.navActive {
                            color: #2172FF;

                            .blue-sign {
                                display: block;
                            }

                            img {
                                &.default-icon {
                                    display: none;
                                }

                                &.hover-icon {
                                    display: block;
                                }
                            }
                        }

                        .blue-sign {
                            display: none;
                            position: absolute;
                            left: 0;
                            top: 17.5px;
                            width: 3px;
                            height: 22px;
                            background: #2172FF;
                        }

                        img {
                            width: 10px;
                            height: 10px;
                            position: absolute;
                            right: 42px;
                            top: 23.5px;

                            &.default-icon {
                                display: block;
                            }

                            &.hover-icon {
                                display: none;
                            }
                        }
                    }
                }

                .right-detail {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
