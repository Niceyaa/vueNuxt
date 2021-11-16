<template>
    <div class="vip-container">
        <common-nav-header></common-nav-header>
        <div class="vip-header">
            <div class="inner-vip-header">
                <div class="vip-header-title">云标书VIP特权</div>
                <div class="vip-header-desc">开通VIP特权，优享更多丰富内容</div>
                <div class="vip-header-privilege">
                    <div class="privilege-item">
                        <img src="~/assets/newVip/vip_template@2x.png" alt="">
                        <div>10万+标书、素材模版</div>
                    </div>
                    <div class="privilege-item">
                        <img src="~/assets/newVip/vip_editingtools@2x.png" alt="">
                        <div>风靡全球的标书编辑工具</div>
                    </div>
                    <div class="privilege-item">
                        <img src="~/assets/newVip/vip_time@2x.png" alt="">
                        <div>1小时快速生成标书</div>
                    </div>
                    <div class="privilege-item">
                        <img src="~/assets/newVip/vip_cooperation@2x.png" alt="">
                        <div>多人协作，工作更高效</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="vip-main">
            <div class="vip-content">
                <div class="vip-type">
                    <div class="vip-type-header">
                        <div class="vip-type-title">个人版会员</div>
                        <div>高端商务人士都在用</div>
                    </div>
                    <div class="vip-content-wrapper">
                        <div class="vip-tips">请选择时长</div>
                        <div class="vip-info">
                            <div @click="changePersonOrder(item)"
                                 :class="{'vip-info-item':true,'vipActive':item.memberPriceId===currentPersonOrderInfo.memberPriceId,'vipSuggest':idx===0}"
                                 v-for="(item,idx) in personalVipPrice" :key="item.memberPriceId">
                                <div class="vip-item-title">{{item.description}}</div>
                                <div class="vip-item-price">
                                    ¥<span>{{item.finalPrice}}</span>
                                </div>
                                <div class="vip-item-desc">每天仅需<span>{{item.priceOfDay}}</span>元</div>
                                <div class="vip-item-suggest">推荐</div>
                            </div>
                        </div>
                        <!--<div class="take-place"></div>-->

                        <div v-if="userVipInfo.memberFlag&&userVipInfo.purchaseNums===1" @click="openPersonDialog"
                             class="pay-btn">立即续费
                        </div>
                        <div v-if="userVipInfo.memberFlag&&userVipInfo.purchaseNums>1" class="pay-btn canNotBuy">
                            已购买企业版会员
                        </div>
                        <div v-if="!userVipInfo.memberFlag" @click="openPersonDialog" class="pay-btn">立即支付</div>

                        <div class="pay-after-tips">
                            <div>支付后可开发票</div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="vip-explain">会员说明</div>
                        </div>
                    </div>
                </div>
                <div class="vip-type">
                    <div class="vip-type-header">
                        <div class="vip-type-title">企业版会员</div>
                        <div>企业版价格更优惠</div>
                    </div>
                    <div class="vip-content-wrapper">
                        <div class="vip-tips">主账号可以管理子账号，解决人员流动问题</div>
                        <div class="vip-info">
                            <div @click="changeEnterpriseOrder(item)"
                                 :class="{'vip-info-item':true,'vipActive':item.memberPriceId===currentEnterpriseOrderInfo.memberPriceId,'vipSuggest':idx===0}"
                                 v-for="(item,idx) in enterpriseVipPrice" :key="item.memberPriceId">
                                <div class="vip-item-title">{{item.description}}</div>
                                <div class="vip-item-price">
                                    ¥<span>{{item.finalPrice}}</span>
                                </div>
                                <div class="vip-item-desc">/人/年</div>
                                <div class="vip-item-suggest">推荐</div>
                            </div>
                        </div>
                        <!-- <div class="vip-pay-info">
                             <div class="pay-info-item">
                                 <div>购买人数</div>
                                 <el-input-number v-model="currentVipMemberNum" @change="handleNumChange" :min="minNum"></el-input-number>
                             </div>
                             <div class="pay-info-item">
                                 <div>价格</div>
                                 <div class="coupon-info">
                                     <div class="coupon-desc">已优惠{{payInfo.originalPrice-payInfo.orderAmount}}元</div>
                                     <div>¥{{payInfo.orderAmount}}</div>
                                 </div>
                             </div>
                         </div>-->
                        <div class="pay-btn" @click="openEnterpriseDialog">立即支付</div>
                        <div class="pay-after-tips">
                            <div>支付后可开发票</div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="vip-explain">会员说明</div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="vip-spec-func">
                <div class="vip-func-text">VIP专属功能，让投标更高效</div>
            </div>
            <div class="vip-func-wrapper">
                <div class="func-item">
                    <img src="~/assets/newVip/vip_function_efficiency@2x.png" alt="">
                    <div>公司资质管理，提高工作效率</div>
                </div>
                <div class="func-item">
                    <img src="~/assets/newVip/vip_function_Import@2x.png" alt="">
                    <div>历史业绩管理和导入，多次使用</div>
                </div>
                <div class="func-item">
                    <img src="~/assets/newVip/vip_function_use@2x.png" alt="">
                    <div>自定义模版，素材管理和使用</div>
                </div>
                <div class="func-item">
                    <img src="~/assets/newVip/vip_function_setup@2x.png" alt="">
                    <div>格式设置，满足各种打印需求</div>
                </div>
            </div>
            <div class="vip-spec-func">
                <div class="vip-func-text">常见问题</div>
            </div>
            <div class="regular-question">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="1、个人版和企业版有什么区别？" name="1">
                        <div>个人版和企业版功能一样，区别在于个人版只能一个人使用，企业版可以同时多人使用，主帐号可以管理子帐号（增加，删除）子帐号</div>
                    </el-collapse-item>
                    <el-collapse-item title="2、可以申请发票吗？" name="2">
                        <div>登录后，点击右上角头像-“我的发票”-“勾选需要开发票的订单”，根据引导填写相关发票信息后提交，我们会在 3 个工作日内将电子发票发送至您的指定邮箱。</div>
                    </el-collapse-item>
                    <el-collapse-item title="3、我已经购买了个人版，可以升级成企业版吗？" name="3">
                        <div>可以。不论何时，已购买VIP服务的用户，可以再升级成企业版，支付差价即可。</div>
                    </el-collapse-item>
                    <el-collapse-item title="4、购买VIP后是否可以退款？" name="4">
                        <div>VIP服务属于虚拟产品，一经生效后不支持退款，请您谅解。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <common-footer></common-footer>


        <!--<enterpriseVipModal :enterprise-price-info="enterpriseVipPrice" :enterpriseVipFlag.sync="enterpriseVipFlag"
                            :order-info.sync="enterpriseOrderInfo"></enterpriseVipModal>-->
        <vipModal :vip-modal-flag.sync="vipModalFlag" :order-info.sync="currentOrderInfo"
                  :order-type.sync="orderType"></vipModal>

    </div>
</template>

<script>
    import vipModal from '~/components/vipModal'

    export default {
        name: "vip",
        head() {
            return {
                title: '会员中心-云标书'
            }
        },
        components: {vipModal},
        data() {
            return {
                activeName: '1',
                currentVipMemberNum: 5,
                minNum: 1,
                payInfo: {},
                orderType: null,
                currentOrderInfo: null,

                currentEnterpriseOrderInfo: {},
                currentPersonOrderInfo: {},

                personalVipPrice: [],
                enterpriseVipPrice: [],

                vipModalFlag: false,
            }
        },
        computed: {
            userVipInfo() {
                return this.$store.state.userVipInfo
            },
            userInfo() {
                return this.$store.state.userInfo
            },
        },
        mounted() {
            console.log('22222222222222222222', this.$store.state)
            this.getVipPrice()
            this.currentVipMemberNum = this.$store.state.userVipInfo.memberFlag ? this.$store.state.userVipInfo.purchaseNums : 1
            this.minNum = this.$store.state.userVipInfo.memberFlag ? this.$store.state.userVipInfo.purchaseNums : 1
        },
        methods: {
            //获取vip价格参数
            getVipPrice() {
                this.$axios[this.$apiURL.vip.getVipPrice.method](this.$apiURL.vip.getVipPrice.url).then(res => {
                    this.personalVipPrice = res.data.result.personMemberPrices
                    this.enterpriseVipPrice = res.data.result.companyMemberPrices
                    this.currentEnterpriseOrderInfo = res.data.result.companyMemberPrices[0]
                    this.currentPersonOrderInfo = res.data.result.personMemberPrices[0]
                    // this.getPrice()
                })
            },
            changePersonOrder(data) {
                this.currentPersonOrderInfo = data
            },
            changeEnterpriseOrder(data) {
                this.currentEnterpriseOrderInfo = data
                // this.getPrice()
            },
            openPersonDialog() {
                if (!this.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                this.orderType = 'personal'
                this.currentOrderInfo = this.currentPersonOrderInfo
                this.vipModalFlag = true

            },
            openEnterpriseDialog() {
                if (!this.userInfo.userName) {
                    this.$store.commit('SET_LOGIN', true)
                    return
                }
                this.orderType = 'enterprise'
                this.currentOrderInfo = this.currentEnterpriseOrderInfo
                this.vipModalFlag = true
            },
            handleNumChange() {
                this.getPrice()
            },
            //获取计算价格
            getPrice() {
                const prm = {
                    memberPriceId: this.currentEnterpriseOrderInfo.memberPriceId,
                    userNum: this.currentVipMemberNum
                }
                this.$axios[this.$apiURL.vip.getEnterpriseVipPrice.method](this.$apiURL.vip.getEnterpriseVipPrice.url, prm).then(res => {
                    this.payInfo = res.data.result
                })
            }
        }
    }
</script>


<style scoped lang="less">
    .vip-container {
        font-family: @fontMc;
        width: 100%;
        height: 100%;

        .vip-header {
            width: 100%;
            background: url("~/assets/newVip/vip_bj@2x.png") no-repeat;
            background-size: cover;
            height: 606px;

            .inner-vip-header {
                width: 1200px;
                min-width: 1200px;
                margin: 0 auto;
                padding: 160px 0 0 0;

                .vip-header-title {
                    font-size: 48px;
                    font-weight: bold;
                    color: #1F190F;
                }

                .vip-header-desc {
                    font-size: 24px;
                    font-weight: 400;
                    color: #333333;
                    margin: 40px 0 50px 0;
                }

                .vip-header-privilege {
                    display: flex;

                    .privilege-item {
                        display: flex;
                        align-items: center;
                        font-size: 15px;
                        font-weight: 400;
                        color: #000000;
                        margin-right: 100px;

                        img {
                            width: 30px;
                            height: 30px;
                            margin-right: 13px;
                        }
                    }
                }
            }
        }

        .vip-main {
            width: 1200px;
            margin: 0 auto;

            .vip-content {
                display: flex;
                margin-top: -204px;

                .vip-type {
                    width: 510px;
                    -height: 623px;
                    background: #FFFFFF;
                    box-shadow: 0px 4px 29px 3px rgba(208, 214, 217, 0.35);
                    border-radius: 14px;
                    margin-right: 70px;

                    &:last-child {
                        margin: 0;

                        .vip-type-header {
                            background: url("~/assets/newVip/vip_business@2x.png");
                            background-size: 100% 100%;
                            color: #BA9069;

                            .vip-type-title {
                                color: #EDC599;
                            }
                        }
                    }

                    .vip-type-header {
                        display: flex;
                        padding: 20px 48px 0 48px;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 16px;
                        font-weight: 400;
                        color: #996306;
                        height: 150px;
                        background: url("~/assets/newVip/vip_personal_bj@2x.png");
                        background-size: 100% 100%;

                        .vip-type-title {
                            font-size: 24px;
                            font-weight: 500;
                            color: #AC5000;
                        }
                    }

                    .vip-content-wrapper {
                        padding: 0 25px 20px 25px;

                        .vip-tips {
                            font-size: 16px;
                            font-weight: 400;
                            color: #333333;
                            margin-bottom: 15px;
                        }

                        .vip-info {
                            display: flex;
                            justify-content: space-between;

                            .vip-info-item {
                                width: 141px;
                                height: 157px;
                                background: #F9F9F9;
                                border: 1px solid #EFEFEF;
                                border-radius: 6px;
                                text-align: center;
                                position: relative;
                                cursor: pointer;

                                &.vipActive {
                                    background: url("~/assets/newVip/vip_select@2x.png");
                                    background-size: 100% 100%;

                                    .vip-item-title {
                                        color: #5A2E20;
                                    }

                                    .vip-item-price {
                                        color: #FF3D4A;
                                    }

                                    .vip-item-desc {
                                        color: #5A2E20;

                                        span {
                                            color: #FF3D4A;
                                        }
                                    }
                                }

                                &.vipSuggest {
                                    .vip-item-suggest {
                                        display: block;
                                    }
                                }

                                .vip-item-title {
                                    font-size: 16px;
                                    color: #9D9D9D;
                                    padding: 28px 0 10px 0;
                                }

                                .vip-item-price {
                                    font-size: 20px;
                                    font-family: DIN;
                                    font-weight: bold;
                                    color: #333333;

                                    span {
                                        font-size: 36px;
                                    }
                                }

                                .vip-item-desc {
                                    font-size: 12px;
                                    font-weight: 400;
                                    color: #9D9D9D;
                                }

                                .vip-item-suggest {
                                    display: none;
                                    position: absolute;
                                    left: -1px;
                                    top: -1px;
                                    width: 50px;
                                    height: 24px;
                                    line-height: 24px;
                                    text-align: center;
                                    background: url("~/assets/newVip/vip_label@2x.png");
                                    background-size: 100% 100%;
                                    font-size: 12px;
                                    color: #FFFFFF;
                                }
                            }
                        }

                        .take-place {
                            margin-top: 13px;
                            height: 101px;
                        }

                        .vip-pay-info {
                            margin-top: 13px;
                            height: 101px;
                            background: #F9F9F9;
                            border-radius: 8px;
                            padding: 0 24px;

                            .pay-info-item {
                                display: flex;
                                justify-content: space-between;
                                padding: 20px 0 0 0;
                                font-size: 15px;
                                color: #333333;

                                .el-input-number {
                                    width: 121px;
                                    height: 25px;

                                    line-height: 23px;

                                    /deep/ .el-input__inner {
                                        height: 25px;
                                        line-height: 25px;
                                    }
                                }

                                .coupon-info {
                                    display: flex;
                                    align-items: center;
                                    font-size: 15px;
                                    color: #FF0000;

                                    .coupon-desc {
                                        height: 20px;
                                        line-height: 20px;
                                        background: #FF0000;
                                        border-radius: 10px;
                                        padding: 0 13px;
                                        font-size: 12px;
                                        color: #FFFFFF;
                                        margin-right: 10px;
                                    }
                                }
                            }
                        }

                        .pay-btn {
                            width: 380px;
                            height: 64px;
                            background: linear-gradient(-80deg, #ECB87B, #FFD7AE);
                            border-radius: 32px;
                            cursor: pointer;
                            line-height: 64px;
                            text-align: center;
                            margin: 35px auto 0 auto;
                            font-size: 24px;
                            color: #343330;

                            &:hover {
                                opacity: .8;
                            }

                            &.canNotBuy {
                                color: #FFFFFF;
                                background: #C8CDD0 !important;
                            }
                        }

                        .pay-after-tips {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px 0 0 0;
                            font-size: 16px;
                            color: #333333;

                            .vip-explain {
                                color: #156BFE;
                            }
                        }
                    }
                }
            }

            .vip-spec-func {
                margin-top: 90px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 36px;
                font-weight: bold;
                color: #333333;
            }

            .vip-func-wrapper {
                display: flex;
                margin-top: 40px;

                .func-item {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: #333333;
                    margin-right: 20px;

                    img {
                        width: 56px;
                        height: 56px;
                        margin-right: 8px;
                    }
                }
            }

            .regular-question {
                margin: 54px 0;

                .el-collapse {
                    border: none;

                    .el-collapse-item {
                        padding-left: 56px;

                        &.is-active {
                            background: linear-gradient(0deg, #F6F9FC, #E9EDF5);

                            /deep/ .el-collapse-item__header {
                                background: none;
                                font-size: 16px;
                                font-weight: bold;
                                color: #156BFE;
                                border: none;
                            }

                            /deep/ .el-collapse-item__wrap {
                                background: none;
                                border: none;
                            }
                        }

                        /deep/ .el-collapse-item__header {
                            border: none;
                            font-size: 16px;
                            font-weight: bold;
                            color: #333333;
                        }

                        /deep/ .el-collapse-item__wrap {
                            border: none;
                        }
                    }
                }
            }
        }

    }
</style>
