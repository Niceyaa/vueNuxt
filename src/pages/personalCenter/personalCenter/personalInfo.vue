<template>
    <div class="personal-info">
        <div class="info-wrapper">
            <!--用户信息-->
            <div class="user-info-wrapper">
                <div class="portrait-wrapper">
                    <img class="portrait" src="~/assets/personal2/personal_icon_portrait@2x.png" alt="">
                    <div class="name-wrapper">
                        <div class="name">
                            <span class="user-name">{{$store.state.userInfo.userName}}</span>
                            <img v-if="!$store.state.userVipInfo.memberFlag"
                                 src="~/assets/personal2/personal_label_nonmember@2x.png" alt="">
                            <!--<span class="user-name">guigug</span>-->
                            <!--<img v-if="true" src="~/assets/personal2/personal_label_nonmember@2x.png" alt="">-->
                            <img v-else src="~/assets/personal2/personal_label_membered@2x.png" alt="">
                        </div>
                        <div class="enterprise-info">
                            <div v-if="true" class="enterprise-name">{{$store.state.userInfo.companyName}}</div>
                            <div v-else class="enterprise-name">
                                <span>完善公司信息，开始标书编辑</span>
                                <img src="~/assets/personal2/personal_icon_right_blue@2x.png" alt="">
                            </div>
                            <div @click="vipModalFlag = true" v-if="$store.state.userVipInfo.memberFlag"
                                 class="open-btn">续费会员
                            </div>
                            <!--<div v-if="true" class="open-btn">续费会员</div>-->
                            <div @click="vipModalFlag = true" v-else class="open-btn">开通会员</div>
                        </div>
                    </div>
                </div>
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-label">客服电话：</div>
                        <div class="contact-desc blue">{{serviceTel}}</div>
                    </div>
                    <div class="separator-line"></div>
                    <div class="contact-item">
                        <div class="contact-label">QQ客服：</div>
                        <div class="contact-desc">{{serviceQQ}}</div>
                    </div>
                    <!-- <div class="separator-line"></div>
                     <div class="contact-item">
                         <div class="contact-label">客服邮箱：</div>
                         <div class="contact-desc">12121221212</div>
                     </div>
                     <div class="separator-line"></div>
                     <div class="contact-item">
                         <div class="contact-label">微信客服：</div>
                         <div class="contact-desc">12121221212</div>
                     </div>-->
                </div>
            </div>
            <!--消息公告-->
            <div class="message-wrapper">
                <div class="message-header">
                    <div class="msg-header-left">
                        <img src="~/assets/personal2/personal_news@2x.png" alt="">
                        <span>消息公告</span>
                    </div>
                    <nuxt-link to="/personalCenter/personalCenter/messageList" class="msg-header-right">
                        <span>更多</span>
                        <img src="~/assets/personal2/personal_icon_right_red@2x.png" alt="">
                    </nuxt-link>
                </div>
                <div v-if="messageData.length>0" class="message-content">
                    <nuxt-link v-for="item in messageData"
                               :to="'/personalCenter/personalCenter/messageDetail?id='+item.messageId"
                               :key="item.messageId" class="message-item">
                        <div class="message-item-left">
                            <img v-if="!item.readFlag" src="~/assets/personal2/yellowSign.png" alt="">
                            <div v-else style="width: 10px;height: 10px;margin-right: 4px;"></div>
                            <span>{{item.title}}</span>
                        </div>
                        <div class="date">{{$lcgFormatDate(item.addTime)}}</div>
                    </nuxt-link>
                </div>
                <empty-page description="暂无消息" v-else :show-btn="false" :img-url="msgEmptyImg" img-h="84px"
                            img-w="72px"></empty-page>
            </div>
        </div>
        <!--我的标书-->
        <div class="browser-export-record">
            <div class="browser-record collect-record">
                <div class="record-header">
                    <div class="record-name">我的标书</div>
                    <nuxt-link to="/personalCenter/personalCenter/myBidDoc" class="more-record">
                        <span>更多</span>
                        <img src="~/assets/personal2/personal_icon_right_blue@2x.png" alt="">
                    </nuxt-link>
                </div>
                <div v-if="pre4BidDocData.length>0" class="collect-content">
                    <div class="record-content">
                        <nuxt-link target="_blank" v-for="item in pre4BidDocData" :key="item.bidDocId"
                                   :to="'/markDocManagement/markDocEdit?bidDocId='+item.bidDocId+'&title='+item.bidDocTitle"
                                   class="record-item">
                            <div class="record-item-left">
                                <img class="title-logo" src="~/assets/personal2/personal_document@2x.png" alt="">
                                <div class="item-title">{{item.bidDocTitle}}</div>
                            </div>
                            <div class="date">{{$lcgFormatDate(item.addTime)}}</div>
                        </nuxt-link>
                    </div>
                    <div class="record-content">
                        <nuxt-link v-for="item in last4BidDocData" :key="item.bidDocId"
                                   :to="'/markDocManagement/markDocEdit?bidDocId='+item.bidDocId+'&title='+item.bidDocTitle"
                                   class="record-item">
                            <div class="record-item-left">
                                <img class="title-logo" src="~/assets/personal2/personal_document@2x.png" alt="">
                                <div class="item-title">{{item.bidDocTitle}}</div>
                            </div>
                            <div class="date">{{$lcgFormatDate(item.addTime)}}</div>
                        </nuxt-link>
                    </div>
                </div>
                <empty-page v-else description="暂无数据" :show-btn="true"></empty-page>
            </div>
        </div>
        <!--最近浏览-导出记录-->
        <div class="browser-export-record">
            <div class="browser-record">
                <div class="record-header">
                    <div class="record-name">最近浏览</div>
                    <nuxt-link to="/personalCenter/personalCenter/browserRecord" class="more-record">
                        <span>更多</span>
                        <img src="~/assets/personal2/personal_icon_right_blue@2x.png" alt="">
                    </nuxt-link>
                </div>
                <div v-if="browserData.length>0" class="record-content">
                    <nuxt-link target="_blank" v-for="item in browserData" :key="item.relationId"
                               :to="item.recordsType===2?'/sysTemplate/detail/'+item.relationId:'/sysFodder/detail/'+item.relationId"
                               class="record-item">
                        <div class="record-item-left">
                            <img class="title-logo" src="~/assets/personal2/personal_document@2x.png" alt="">
                            <div class="item-title">{{item.titleName}}</div>
                            <!--<img class="vip-icon" src="~/assets/personal2/personal_label_member@2x.png" alt="">-->
                            <div v-if="item.recordsType===2" class="template-type">模板</div>
                            <div v-else class="material-type">素材</div>
                        </div>
                        <div class="date">{{$lcgFormatDate(item.addTime)}}</div>
                    </nuxt-link>
                </div>
                <empty-page v-else description="暂无数据" :show-btn="true"></empty-page>
            </div>
            <div class="browser-record">
                <div class="record-header">
                    <div class="record-name">导出记录</div>
                    <nuxt-link to="/personalCenter/personalCenter/exportRecord" class="more-record">
                        <span>更多</span>
                        <img src="~/assets/personal2/personal_icon_right_blue@2x.png" alt="">
                    </nuxt-link>
                </div>
                <div v-if="exportData.length>0" class="record-content export-content">
                    <el-table
                            class="export-table"
                            :data="exportData">
                        <el-table-column
                                label="导出状态"
                                align="center"
                                width="100px">
                            <template v-slot="{row}">
                                <el-tag size="mini" v-if="row.exportState!==202" type="warning">
                                    {{row.exportStateName}}
                                </el-tag>
                                <el-tag size="mini" v-else type="success">{{row.exportStateName}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="标题"
                                min-width="240px">
                            <template v-slot="{row}">
                                <div to="/" class="title-tag" style="color: #333333;">{{row.exportTitle}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="exportTypeName"
                                width="120px"
                                label="导出类型">
                        </el-table-column>
                        <el-table-column
                                width="80px"
                                label="操作">
                            <template v-slot="{row}">
                                <div class="td-opt-wrapper">
                                    <a v-if="row.exportFileUrl&&row.exportFileUrl.length>0&&row.exportState===202"
                                       class="download-tag" :href="row.exportFileUrl" target="_blank">下载</a>
                                    <!-- <span>|</span>
                                     <div class="delete-btn">删除</div>-->
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <empty-page v-else description="暂无数据" :show-btn="true"></empty-page>
            </div>
        </div>
        <!--我的收藏-->
        <div class="browser-export-record">
            <div class="browser-record collect-record">
                <div class="record-header">
                    <div class="record-name">我的收藏</div>
                    <nuxt-link to="/personalCenter/personalCenter/myCollection" class="more-record">
                        <span>更多</span>
                        <img src="~/assets/personal2/personal_icon_right_blue@2x.png" alt="">
                    </nuxt-link>
                </div>
                <div v-if="pre4CollectData.length>0" class="collect-content">
                    <div class="record-content">
                        <nuxt-link target="_blank" v-for="item in pre4CollectData" :key="item.collectionId"
                                   :to="item.collectionType===1?'/sysFodder/detail/'+item.relationId:'/sysTemplate/detail/'+item.relationId"
                                   class="record-item">
                            <div class="record-item-left">
                                <img class="title-logo" src="~/assets/personal2/personal_document@2x.png" alt="">
                                <div class="item-title">{{item.titleName}}</div>
                                <img class="vip-icon" src="~/assets/personal2/personal_label_member@2x.png" alt="">
                                <div v-if="item.collectionType===1" class="template-type">素材</div>
                                <div v-else class="material-type">模板</div>
                            </div>
                            <div class="date">{{$lcgFormatDate(item.addTime)}}</div>
                        </nuxt-link>
                    </div>
                    <div class="record-content">
                        <nuxt-link v-for="item in last4CollectData" :key="item.collectionId"
                                   :to="item.collectionType===1?'/sysFodder/detail/'+item.relationId:'/sysTemplate/detail/'+item.relationId"
                                   class="record-item">
                            <div class="record-item-left">
                                <img class="title-logo" src="~/assets/personal2/personal_document@2x.png" alt="">
                                <div class="item-title">{{item.titleName}}</div>
                                <img class="vip-icon" src="~/assets/personal2/personal_label_member@2x.png" alt="">
                                <div v-if="item.collectionType===1" class="template-type">素材</div>
                                <div v-else class="material-type">模板</div>
                            </div>
                            <div class="date">{{$lcgFormatDate(item.addTime)}}</div>
                        </nuxt-link>
                    </div>
                </div>
                <empty-page v-else description="暂无数据" :show-btn="true"></empty-page>
            </div>
        </div>
        <vipModal :vip-modal-flag.sync="vipModalFlag" :order-info="{}"></vipModal>
    </div>
</template>

<script>
    import msgEmptyImg from '~/assets/personal2/personal_news_empty@2x.png'
    import vipModal from '~/components/vipModal'
    import {serviceQQ, serviceTel} from '@/setting'

    export default {
        name: "personalInfo",
        components: {vipModal},
        data() {
            return {
                vipModalFlag: false,

                pre4CollectData: [],
                last4CollectData: [],
                pre4BidDocData: [],
                last4BidDocData: [],
                exportData: [],
                messageData: [],
                browserData: [],
                msgEmptyImg,
                pageSize: 4,
                collectionPageSize: 8,
                pageNum: 1,
                serviceQQ: serviceQQ,
                serviceTel: serviceTel,
            }
        },
        mounted() {
            this.getExportData()
            this.getBrowserList()
            this.getCollection()
            this.getMessageList()
            this.getList()
        },
        methods: {
            //我的标书
            getList() {
                let prm = {
                    pageSize: this.collectionPageSize,
                    pageNum: this.pageNum
                }
                this.$axios[this.$apiURL.markDocApi.getMyMarkDocList.method](this.$apiURL.markDocApi.getMyMarkDocList.url, prm).then(res => {
                    const {list, total} = res.data.result
                    if (list.length > 4) {
                        list.forEach((item, idx) => {
                            if (idx < 4) {
                                this.pre4BidDocData.push(item)
                            } else {
                                this.last4BidDocData.push(item)
                            }
                        })
                    } else {
                        this.pre4BidDocData = list
                    }
                })
            },
            //导出记录
            getExportData() {
                let prm = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
                this.$axios[this.$apiURL.markDocApi.getExportData.method](this.$apiURL.markDocApi.getExportData.url, prm).then(res => {
                    this.exportData = res.data.result.list
                })
            },
            //消息公告
            getMessageList() {
                let prm = {
                    pageNum: this.pageNum,
                    messageType: null,
                    pageSize: this.pageSize
                }
                this.$axios[this.$apiURL.commonApi.getMessageList.method](this.$apiURL.commonApi.getMessageList.url, prm).then(res => {
                    this.messageData = res.data.result.list
                })
            },
            //浏览记录
            getBrowserList() {
                let prm = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
                this.$axios[this.$apiURL.templateApi.getBrowserRecord.method](this.$apiURL.templateApi.getBrowserRecord.url, prm).then(res => {
                    this.browserData = res.data.result.list
                })
            },
            //我的收藏
            getCollection() {
                let prm = {
                    pageNum: this.pageNum,
                    pageSize: this.collectionPageSize
                }
                this.$axios[this.$apiURL.user.getCollectionData.method](this.$apiURL.user.getCollectionData.url, prm).then(res => {
                    const {list} = res.data.result
                    if (list.length > 4) {
                        list.forEach((item, idx) => {
                            if (idx < 4) {
                                this.pre4CollectData.push(item)
                            } else {
                                this.last4CollectData.push(item)
                            }
                        })
                    } else {
                        this.pre4CollectData = list
                    }

                })
            },
        }
    }
</script>

<style scoped lang="less">
    .personal-info {
        width: 100%;
        min-height: 100%;
        padding: 20px;
        background: #F5F5F5;

        .info-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .user-info-wrapper {
                background: url("~/assets/personal2/personal_pic_background@2x.png");
                background-size: 100% 100%;
                flex: .685;
                width: 1110px;
                height: 240px;
                padding: 50px 50px 64px 56px;
                margin-right: 20px;

                .portrait-wrapper {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 50px;

                    .portrait {
                        width: 60px;
                        height: 60px;
                        margin-right: 36px;
                    }

                    .name-wrapper {
                        width: 100%;

                        .name {
                            display: flex;
                            align-items: center;
                            font-size: 20px;
                            font-family: @fontBoldMc;
                            font-weight: bold;
                            color: #1E2738;

                            img {
                                width: 59px;
                                height: 18px;
                                margin-left: 18px;
                            }
                        }

                        .enterprise-info {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-top: 5px;

                            .enterprise-name {
                                height: 26px;
                                background: #EAF2FF;
                                border-radius: 13px;
                                line-height: 26px;
                                padding: 0 17px;
                                color: @activeColor;

                                img {
                                    width: 6px;
                                    height: 10px;
                                    margin-left: 13px;
                                }
                            }

                            .open-btn {
                                width: 189px;
                                height: 42px;
                                background: linear-gradient(180deg, #FEE3CA 0%, #F9D0AD 100%);
                                border-radius: 21px;
                                text-align: center;
                                line-height: 42px;
                                font-size: 16px;
                                color: #560D0C;
                                cursor: pointer;
                            }
                        }
                    }
                }

                .contact-info {
                    display: flex;
                    align-items: center;

                    .contact-item {
                        display: flex;
                        align-items: center;
                        font-size: 15px;
                        color: #313748;

                        .blue {
                            color: @activeColor;
                        }
                    }

                    .separator-line {
                        width: 1px;
                        height: 17px;
                        background: #EEEEEE;
                        margin: 0 30px;
                    }
                }
            }

            .message-wrapper {
                flex: .315;
                height: 240px;
                width: 490px;
                padding: 20px 20px 33px 33px;
                background: url("~/assets/personal2/personal_pic_news_background@2x.png");
                background-size: 100% 100%;

                .message-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 24px;

                    .msg-header-left {
                        display: flex;
                        align-items: center;
                        font-family: @fontBoldMc;
                        font-weight: bold;
                        color: #FFFFFF;
                        font-size: 18px;

                        img {
                            margin: 0 13px 0 3px;
                            width: 15px;
                            height: 18px;
                        }
                    }

                    .msg-header-right {
                        display: flex;
                        align-items: center;
                        width: 98px;
                        height: 32px;
                        background: #FFFFFF;
                        border-radius: 16px;
                        text-decoration: none;
                        justify-content: center;
                        color: @yellowColor;

                        img {
                            width: 6px;
                            height: 10px;
                            margin-left: 6px;
                        }
                    }
                }

                .message-content {
                    .message-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        text-decoration: none;
                        font-size: 14px;
                        color: #FFFFFF;
                        margin-bottom: 25px;

                        .message-item-left {
                            display: flex;
                            align-items: center;

                            &:last-child {
                                margin: 0;
                            }

                            img {
                                width: 10px;
                                height: 10px;
                                margin-right: 4px;
                            }
                        }
                    }
                }
            }
        }

        .browser-export-record {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0;

            .browser-record {
                flex: .9;
                background: #fff;
                margin-right: 20px;
                -min-width: 800px;
                height: 340px;

                &:last-child {
                    margin-right: 0;
                }

                /*我的收藏*/

                &.collect-record {
                    flex: 1 !important;
                    width: 100%;
                    margin-right: 0;

                    .collect-content {
                        display: flex;
                        -align-items: center;

                        .record-content {
                            flex: .5;
                            border-right: 1px solid #EEEEEE;

                            &:last-child {
                                border-right: none;
                            }
                        }
                    }
                }

                .record-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 70px;
                    border-bottom: 1px solid #EEEEEE;
                    padding: 0 26px;
                    font-family: @fontBoldMc;
                    font-weight: bold;
                    color: #1E2738;

                    .more-record {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 98px;
                        height: 32px;
                        border-radius: 16px;
                        border: 1px solid #0084FF;
                        font-size: 14px;
                        font-family: @fontMc;
                        color: #0084FF;
                        text-decoration: none;

                        img {
                            width: 6px;
                            height: 10px;
                            margin-left: 5px;
                        }
                    }
                }

                .record-content {
                    padding: 0 26px 53px 26px;

                    &.export-content {
                        padding: 18px 20px;
                    }

                    .record-item {
                        padding-top: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        text-decoration: none;

                        &:hover {
                            .item-title {
                                color: @activeColor !important;
                            }
                        }

                        .record-item-left {
                            display: flex;
                            align-items: center;

                            .title-logo {
                                width: 24px;
                                height: 24px;
                                margin-right: 7px;
                            }

                            .item-title {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 14px;
                                color: #313748;
                                max-width: 300px;
                            }

                            .vip-icon {
                                margin: 0 10px;
                                width: 44px;
                                height: 19px;
                            }

                            .template-type {
                                width: 44px;
                                height: 19px;
                                background: #EAF2FF;
                                border-radius: 9px;
                                text-align: center;
                                line-height: 19px;
                                font-size: 12px;
                                color: #3272FF;
                            }

                            .material-type {
                                width: 44px;
                                height: 19px;
                                background: #FDF3EC;
                                border-radius: 9px;
                                text-align: center;
                                line-height: 19px;
                                font-size: 12px;
                                color: @yellowColor;
                            }
                        }

                        .date {
                            min-width: 90px;
                            font-size: 14px;
                            color: #8D9AB0;
                        }
                    }

                    .export-table {
                        .title-tag {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            text-decoration: none;
                            overflow: hidden;
                            color: @activeColor;
                        }

                        .td-opt-wrapper {
                            display: flex;
                            align-items: center;

                            .download-tag {
                                font-size: 14px;
                                color: @activeColor;
                                text-decoration: none;
                            }

                            span {
                                margin: 0 8px;
                            }

                            .delete-btn {
                                font-size: 14px;
                                color: #FA1B1B;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
