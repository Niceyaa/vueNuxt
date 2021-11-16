<template>
    <div class="special-function-container">
        <common-nav-header></common-nav-header>
        <div class="title-wrapper">
            <div class="spec-func-title">标书在线编辑，一小时完成<span>标书制作</span></div>
            <div class="spec-func-desc">
                标书编辑  在线编辑  在线印刷
            </div>
            <div class="begin-btn" @click="openMakeDialog">开始制作</div>
        </div>

        <div class="spec-func-main">
            <div class="why-title">
                <img src="~/assets/specialFunc/pic_title_left@2x.png" alt="">
                <div class="title-text">为什么选择<span>云标书？</span></div>
                <img src="~/assets/specialFunc/pic_title_right@2x.png" alt="">
            </div>
            <div class="func-content">
                <div class="desc-content">
                    <img class="desc-img" src="~/assets/specialFunc/icon_template@2x.png" alt="">
                    <div class="desc-title">模板素材</div>
                    <div class="description">10万+模板、素材任你挑选，模版素材库每日保持更新，在线编辑工具简单好上手，1小时就能做出好标书，告别繁琐工作流程。</div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>轻松上手，制作简单</div>
                    </div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>版权保证，放心商用</div>
                    </div>
                    <nuxt-link to="/sysTemplate/1" class="a-tag">查看模板</nuxt-link>
                </div>
                <img class="func-img" src="~/assets/specialFunc/pic_template@2x.png" alt="">
            </div>
            <div class="func-content">
                <img class="func-img" src="~/assets/specialFunc/pic_team@2x.png" alt="">
                <div class="desc-content">
                    <img class="desc-img" src="~/assets/specialFunc/icon_team@2x.png" alt="">
                    <div class="desc-title">团队协作</div>
                    <div class="description">支持多人在线合作，管理员可自定义组建团队成员，项目文档编辑实时更新减少工作沟通成本，提升团队工作效率。</div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>多人协作，效率翻倍</div>
                    </div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>账号管理，方便快捷</div>
                    </div>
                </div>
            </div>
            <div class="func-content">
                <div class="desc-content">
                    <img class="desc-img" src="~/assets/specialFunc/icon_operation@2x.png" alt="">
                    <div class="desc-title">操作便捷</div>
                    <div class="description">极简设计，操作便捷，简洁的界面设计，优秀的用户体验，让你的操作得心应手，小白也能快速编辑标书文档。</div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>极简设计，操作便捷</div>
                    </div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>小白入门，快速上手</div>
                    </div>
                </div>
                <img class="func-img" src="~/assets/specialFunc/pic_operation@2x.png" alt="">
            </div>
            <div class="func-content grayBgc">
                <img class="func-img" src="~/assets/specialFunc/pic_infor@2x.png" alt="">
                <div class="desc-content">
                    <img class="desc-img" src="~/assets/specialFunc/icon_infor@2x.png" alt="">
                    <div class="desc-title">信息管理</div>
                    <div class="description">可对公司信息、人员信息、业绩管理、资产管理文件进行上传，方便于标书编辑管理和使用，一次上传，即可永久使用。</div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>一次上传，永久使用</div>
                    </div>
                    <div class="desc-item">
                        <div class="blue-point"></div>
                        <div>云端保存，方便快捷</div>
                    </div>
                </div>
            </div>
            <div class="other-func-content">
                <div class="other-func-title">风靡全球的标书<span>编辑工具</span></div>
                <div class="other-func-desc">一站式标书编写体验，人人都是标书大师</div>
                <div class="img-wrapper">
                    <img src="~/assets/specialFunc/pic_tool@2x.png" alt="">
                </div>
            </div>
            <div class="btm-wrapper">
                <div class="btm-title">云标书，更好的标书编辑协作平台</div>
                <div class="btm-desc">在线标书编辑神器</div>
                <div class="begin-btn"  @click="openMakeDialog">开始制作</div>
            </div>
        </div>

        <common-footer></common-footer>

    </div>
</template>

<script>
    export default {
        name: "special-function",
        head() {
            return {
                title: '特色功能-云标书'
            }
        },
        methods:{
            openMakeDialog() {
                if (!this.$store.state.userInfo.userName) {
                    this.$store.commit('SET_LOGIN',true)
                    return
                }
                this.$store.commit("SET_MAKE_DOC_FLAG", true)
            },
        }

    }
</script>


<style scoped lang="less">
    .special-function-container {
        font-family: @fontMc;
        width: 100%;
        height: 100%;
        .title-wrapper{
            width: 100%;
            min-width: 1440px;
            height: 976px;
            background: url("~/assets/specialFunc/pic_head@2x.png");
            background-size: cover;
            -webkit-background-size: cover;
            -o-background-size: cover;
            background-position: center 0;
            background-repeat: no-repeat;
            text-align: center;
            .spec-func-title{
                font-size: 66px;
                font-family: @fontMc;
                font-weight: bold;
                color: #000000;
                padding: 80px 0 0 0;
                span{
                    font-weight: bold;
                    color: #000000;
                    line-height: 66px;
                    background: linear-gradient(90deg, #E58091 0%, #856EE0 22%, #4877F3 49%, #027FFE 64%, #069BFD 85%, #68D7EF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            .spec-func-desc{
                font-size: 20px;
                color: #000000;
                padding: 25px 0 40px 0;
            }
            .begin-btn{
                width: 224px;
                height: 63px;
                background: #2172FF;
                border-radius: 32px;
                font-size: 24px;
                color: #FFFFFF;
                text-align: center;
                line-height: 63px;
                cursor: pointer;
                margin: 0 auto;
                &:hover{
                    opacity: .8;
                }
            }
        }
        .spec-func-main{
            width: 1440px;
            min-width: 1440px;
            margin: 0 auto;
            .why-title{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 106px 0 50px 0;
                img{
                    width: 42px;
                    height: 19px;
                }
                .title-text{
                    margin: 0 18px;
                    font-size: 56px;
                    font-family: @fontBoldMc;
                    font-weight: bold;
                    color: #000000;
                    span{
                        color: #0070FF;
                    }
                }
            }
            .func-content{
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                &.grayBgc{
                    background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
                }
                .func-img{
                    min-width: 900px;
                    width: 900px;
                    height: 700px;
                }
                .desc-content{
                    padding: 0 36px;
                    .desc-img{
                        width: 80px;
                        height: 81px;
                    }
                    .desc-title{
                        font-size: 56px;
                        font-family: @fontBoldMc;
                        font-weight: bold;
                        color: #121212;
                        padding: 20px 0 35px 0;
                    }
                    .description{
                        font-size: 20px;
                        color: #545454;
                        line-height: 35px;
                        padding-bottom: 20px;
                    }
                    .desc-item{
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        color: #545454;
                        margin-bottom: 16px;
                        .blue-point{
                            width: 10px;
                            height: 10px;
                            background: #2172FF;
                            margin-right: 14px;
                            border-radius: 5px;
                        }
                    }
                    .a-tag{
                        display: block;
                        width: 140px;
                        height: 53px;
                        background: #2172FF;
                        border-radius: 31px;
                        text-decoration: none;
                        font-size: 16px;
                        color: #FFFFFF;
                        line-height: 53px;
                        text-align: center;
                        margin-top: 40px;
                    }
                }
            }
            .other-func-content{
                text-align: center;
                margin-top: 100px;
                .other-func-title{
                    font-size: 56px;
                    font-family: @fontBoldMc;
                    font-weight: bold;
                    color: #2C2C2C;
                    span{
                        background: linear-gradient(90deg, #E58091 0%, #856EE0 22%, #4877F3 49%, #027FFE 64%, #069BFD 85%, #68D7EF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }
                .other-func-desc{
                    margin: 29px 0 83px 0;
                    font-size: 23px;
                    color: #2C2C2C;
                }
                .img-wrapper{
                    width: 1100px;
                    margin: 0 auto;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
            }
            .btm-wrapper{
                width: 1300px;
                margin: 80px auto 100px auto;
                height: 295px;
                background: url("~/assets/specialFunc/pic_bottom@2x.png");
                background-size: 100% 100%;
                padding: 0 0 0 106px;
                .btm-title{
                    font-size: 36px;
                    font-family: @fontBoldMc;
                    font-weight: bold;
                    color: #2C2C2C;
                    padding-top: 40px;
                }
                .btm-desc{
                    font-size: 20px;
                    color: #2C2C2C;
                    margin: 28px 0 40px 0;
                }
                .begin-btn{
                    width: 186px;
                    height: 65px;
                    background: #2172FF;
                    border-radius: 33px;
                    text-align: center;
                    line-height: 65px;
                    font-size: 20px;
                    color: #FFFFFF;
                    cursor: pointer;
                }
            }
        }
    }
</style>
