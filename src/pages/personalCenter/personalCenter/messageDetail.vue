<template>
    <div class="message-center">
        <div class="temp-material-header">
            <div class="com-name">消息中心</div>
        </div>
        <div class="router-nav-wrapper">
            <!--<nuxt-link to="/personalCenter/personalCenter/messageList" class="back-wrapper">
                <img src="~/assets/personal2/lastGrade.png" alt="">
                <div class="back-text">返回上一级</div>
            </nuxt-link>-->
            <div @click="$router.back()" to="/personalCenter/personalCenter/messageList" class="back-wrapper">
                <img src="~/assets/personal2/lastGrade.png" alt="">
                <div class="back-text">返回上一级</div>
            </div>
        </div>
       <!-- <div class="message-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in messageType" :label="item.msgName" :name="(item.keyId).toString()"
                             :key="item.keyId">
                    <div class="router-nav-wrapper">
                        <nuxt-link to="/personalCenter/personalCenter/members" class="back-wrapper">
                            <img src="~/assets/personal2/lastGrade.png" alt="">
                            <div class="back-text">返回上一级</div>
                        </nuxt-link>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>-->
        <div class="detail-content">
            <div class="detail-title">{{detailContent.title}}</div>
            <div class="detail-date">{{$lcgFormatDate(detailContent.addTime)}}发布</div>
            <div class="detail-main" v-html="detailContent.content"></div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'messageList',
        data() {
            return {
                notReadId: [],
                activeName: 0,
                messageType: [],
                detailContent: {}
            }
        },
        mounted() {
            this.getMessageType()
            this.getContent()
        },
        methods: {
            handleClick(val) {
                this.currentPage = 1
                this.notReadId = []
                this.activeName = (val.name).toString()
                this.getContent()
            },
            getContent() {
                let prm = qs.stringify({
                    messageId: this.$route.query.id
                })
                this.$axios[this.$apiURL.commonApi.getMessageDetail.method](this.$apiURL.commonApi.getMessageDetail.url, prm).then(res => {
                    this.detailContent = res.data.result
                })
            },
            getMessageType() {
                this.$axios[this.$apiURL.commonApi.getMessageType.method](this.$apiURL.commonApi.getMessageType.url).then(res => {
                    this.messageType = res.data.result
                    this.messageType.unshift({
                        keyId: 0,
                        msgName: '全部消息'
                    })
                })
            },
        }
    }
</script>
<style lang="less">
    .message-center {
        width: 100%;
        min-height: 100%;
        background: #fff;
        padding: 60px 40px 40px 60px;
        margin-top: -20px;

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
        .message-content {
            padding: 0 0 0 27px;

            .el-tabs__item {
                font-size: 15px;
                &.is-active{
                    font-weight: bold;
                }
            }

        }
        .detail-content{
            font-family: @fontMc;
            .detail-title{
                text-align: center;
                font-size: 24px;
                color: #1E2738;
                line-height: 80px;
            }
            .detail-date{
                text-align: center;
                font-size: 13px;
                color: #767D87;
                line-height: 20px;
            }
            .detail-main{
                font-size: 15px;
                color: #1E2738;
                text-indent: 2em;
            }

        }
    }
</style>
