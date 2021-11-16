<template>
    <div class="message-page-container">
        <common-header></common-header>
        <div class="message-page-list-title">消息中心</div>
        <div class="message-page-list-wrapper">
            <div class="message-inner-wrapper">
                <div class="message-list-item" v-for="item in 8">
                    <div class="message-list-item-title-wrapper">
                        <div class="message-title-wrapper-left">
                            <img class="message-list-item-icon" src="../../assets/index/icon_news@2x.png" alt="">
                            <div class="message-list-item-title">限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣</div>
                        </div>
                        <div class="message-item-date">2020-23-23</div>
                    </div>
                    <div class="message-list-item-shortcut">
                        限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣限时折扣
                    </div>
                </div>
            </div>
            <div class="page-wrapper">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "messageList",
        data() {
            return {
                total: 1000,
                pageSize: 10,
                currentPage: 1
            }
        },
        methods: {
            handleSizeChange(size) {

            },
            handleCurrentChange(size) {

            },
        }
    }
</script>

<style scoped lang="less">
    .message-page-container {
        font-family: @fontFa;

        .message-page-list-title {
            width: 100%;
            text-align: center;
            height: 143px;
            background: #F4F7FD;
            line-height: 143px;
            font-size: 18px;
            font-weight: bold;
            color: #515151;
        }

        .message-page-list-wrapper {
            width: 800px;
            margin: 0 auto;
            .message-inner-wrapper{
                padding: 40px 0 0 0;
                margin-bottom: 70px;
                .message-list-item{
                    border-bottom: 1px solid #EEEEEE;
                    padding: 20px 10px;
                    &:hover{
                        background: #FCFCFC;
                        cursor: pointer;
                    }
                    .message-list-item-title-wrapper{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .message-title-wrapper-left{
                            display: flex;
                            align-items: center;
                            .message-list-item-icon{
                                width: 16px;
                                height: 15px;
                                margin-right: 12px;
                            }
                            .message-list-item-title{
                                width: 640px;
                                font-size: 14px;
                                font-weight: bold;
                                color: #333333;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                        .message-item-date{
                            font-size: 13px;
                            color: #666666;
                        }
                    }
                    .message-list-item-shortcut{
                        margin-top: 10px;
                        padding-left: 28px;
                        width: 640px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 13px;
                        color: #666666;
                    }
                }
            }
            .page-wrapper{
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 0 100px 0;
                /deep/.el-pager{
                    li{
                        &:hover{
                            color: @activeColor;
                        }
                        &.active{
                            color: @activeColor;
                        }
                    }
                }
            }
        }
    }
</style>
