<template>
    <div class="message-center">
        <div class="temp-material-header">
            <div class="com-name">消息中心</div>
        </div>
        <div class="message-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in messageType" :label="item.msgName" :name="(item.keyId).toString()"
                             :key="item.keyId">
                    <div v-if="listData.length>0" class="message-list">
                        <div class="message-header">
                            <div class="total">共 {{total}} 条</div>
                            <el-button @click="setRead" :disabled="notReadId.length===0" type="primary" plain>全部标记已读
                            </el-button>
                        </div>
                        <div class="list-item">
                            <div @click="goToUrl(item)" class="message-item" v-for="item in listData" :key="item.messageId">
                                <img class="message-icon" src="../../../assets/personal2/pic_news_red@2x.png" alt="">
                                <div class="item-main">
                                    <div class="item-left">
                                        <div v-if="!item.readFlag" class="not-read"></div>
                                        <div class="item-title">{{item.title}}
                                        </div>
                                        <div class="item-desc">
                                            {{item.summary}}
                                        </div>
                                    </div>
                                    <div class="item-right">
                                        {{$lcgFormatDate(item.addTime)}}
                                    </div>
                                </div>
                                <div @click.stop.prevent="deleteHandle(item)" class="delete-message">
                                    <i class="el-icon-delete"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <empty-page description="暂时没有消息哦" v-else></empty-page>
                </el-tab-pane>
            </el-tabs>
            <div class="page-wrapper">
                <el-pagination
                        hide-on-single-page
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
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
                listData: [],
                pageSize: 10,
                currentPage: 1,
                total: 0
            }
        },
        mounted() {
            this.getMessageType()
            this.getList()
        },
        methods: {
            handleClick(val) {
                this.currentPage = 1
                this.notReadId = []
                this.activeName = (val.name).toString()
                this.getList()
            },
            goToUrl(val) {
                this.$router.push({
                    path: '/personalCenter/personalCenter/messageDetail',
                    query: {
                        id: val.messageId
                    }
                })
            },
            //删除标书
            deleteHandle(info) {
                this.$confirm('此操作会将该消息从列表移除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        messageId: info.messageId
                    })
                    this.$axios[this.$apiURL.commonApi.delMessage.method](this.$apiURL.commonApi.delMessage.url, prm).then(res => {
                        this.$message.success(res.data.msg);
                        this.getList()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getList()
            },
            getList() {
                let prm = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    messageType: this.activeName === '0' ? null : this.activeName
                }
                this.$axios[this.$apiURL.commonApi.getMessageList.method](this.$apiURL.commonApi.getMessageList.url, prm).then(res => {
                    const {list, total} = res.data.result
                    this.listData = list
                    if (list.length > 0) {
                        let temp = list.filter(item => {
                            return !item.readFlag
                        })
                        if (temp.length > 0) {
                            this.notReadId = temp.map(item => {
                                return item.messageId
                            })
                        }
                    }
                    this.total = total
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
            setRead() {
                this.$confirm('确定将全部消息标记为已读吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios[this.$apiURL.commonApi.setMessageReadStatus.method](this.$apiURL.commonApi.setMessageReadStatus.url, this.notReadId).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg)
                            this.notReadId = []
                            this.getList();
                        }
                    })
                }).catch(() => {
                    this.$message.info('取消操作')
                });
            }
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

        .message-content {
            padding: 0 0 0 27px;

            .el-tabs__item {
                font-size: 15px;
                &.is-active{
                    font-weight: bold;
                }
            }

            .message-list {
                .message-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 6px 0 20px 0;

                    .total {
                        font-size: 15px;
                        color: #596177;
                    }
                }

                .list-item {
                    .message-item {
                        cursor: pointer;
                        text-decoration: none;
                        display: flex;
                        -align-items: center;
                        height: 140px;
                        background: #FAFAFA;
                        border-radius: 10px;
                        margin-bottom: 24px;
                        padding: 4px 46px 4px 6px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        position: relative;
                        overflow: hidden;

                        &:hover {
                            .delete-message {
                                right: 0;
                                box-shadow: 1px 0px 8px #A6A6A6;
                            }
                        }

                        .message-icon {
                            flex: 0 118px;
                            min-width: 118px;
                            width: 118px;
                            height: 132px;
                            margin-right: 54px;
                        }

                        .item-main {
                            flex: 1;
                            display: flex;
                            justify-content: space-between;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;

                            .item-left {
                                flex: 1;
                                font-size: 18px;
                                font-family: @fontBoldMc;
                                font-weight: bold;
                                color: #1E2738;
                                position: relative;
                                margin-right: 40px;

                                .not-read {
                                    width: 10px;
                                    height: 10px;
                                    background: #E60113;
                                    border-radius: 50%;
                                    position: absolute;
                                    left: -15px;
                                    top: 25px;
                                }

                                .item-title {
                                    max-width: 600px;
                                    margin: 30px 0 20px 0;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }

                                .item-desc {
                                    max-width: 800px;
                                    font-size: 14px;
                                    font-weight: normal;
                                    color: #8D9AB0;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }
                            }

                            .item-right {
                                text-align: right;
                                flex: 0 100px;
                                width: 100px;
                                min-width: 100px;
                                margin: 32px 0 0 0;
                                font-size: 14px;
                                color: #8D9AB0;
                            }
                        }

                        .delete-message {
                            width: 40px;
                            height: 140px;
                            text-align: center;
                            line-height: 140px;
                            font-size: 18px;
                            color: #fff;
                            background: #E60113;
                            position: absolute;
                            right: -80px;
                            bottom: 0;
                            transition: all .3s linear;
                        }
                    }
                }
            }
        }
    }
</style>
