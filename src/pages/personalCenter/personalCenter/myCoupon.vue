<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">我的优惠券</div>
        </div>
        <el-tabs class="temp-material-tab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="可使用" name="viableCoupon">
                <div class="coupon-list">
                    <div class="coupon-item" v-for="item in 9" :key="item">
                        <div class="coupon-left">
                            <div class="left-wrapper">
                                <div class="coupon-price">¥<span>20</span></div>
                                <div class="coupon-desc">满99元可用</div>
                            </div>

                        </div>
                        <div class="coupon-right">
                            <div class="coupon-title">原表述满减券</div>
                            <div class="valid-date">有效期至：2020-20-40</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已使用" name="usedCoupon">
                <div class="coupon-list">
                    <div class="coupon-item overdueItem usedItem" v-for="item in 9" :key="item">
                        <div class="coupon-left">
                            <div class="left-wrapper">
                                <div class="coupon-price">¥<span>20</span></div>
                                <div class="coupon-desc">满99元可用</div>
                            </div>

                        </div>
                        <div class="coupon-right">
                            <div class="coupon-title">原表述满减券</div>
                            <div class="valid-date">有效期至：2020-20-40</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已过期" name="overdueCoupon">
                <div class="coupon-list">
                    <div class="coupon-item overdueItem" v-for="item in 9" :key="item">
                        <div class="coupon-left">
                            <div class="left-wrapper">
                                <div class="coupon-price">¥<span>20</span></div>
                                <div class="coupon-desc">满99元可用</div>
                            </div>

                        </div>
                        <div class="coupon-right">
                            <div class="coupon-title">原表述满减券</div>
                            <div class="valid-date">有效期至：2020-20-40</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import defaultUrl from '~/assets/personal2/personal_empty@2x.png'

    export default {
        name: 'empty-page',
        data() {
            return {
                activeName: 'viableCoupon',
                reportData: [
                    {status: true, title: '贵阳医学院实训采购院实训采购投标书院', type: '标书', date: '2021-01-01'},
                    {status: false, title: '贵阳医学院实训采购院实训采购投标书院', type: '标书', date: '2021-01-01'},
                    {status: false, title: '贵阳医学院实训采购院实训采购投标书院', type: '目录', date: '2021-01-01'},
                    {status: true, title: '贵阳医学院实训采购院实训采购投标书院', type: '标书', date: '2021-01-01'},
                ],
            }
        },
        props: {},
        methods: {
            goToUrl() {
                this.$router.push({
                    path: this.$props.toUrl
                })
            },
            setHeaderGray(rowInfo) {
                return 'font-weight: bold;color: #333333;'
            },

        }
    }
</script>
<style lang="less" scoped>
    .template-or-material {
        width: 100%;
        min-height: 100%;
        background: #fff;
        padding: 30px;
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

        .temp-material-tab {
            padding: 0 0 0 27px;
            height: 100%;

            .coupon-list {
                border: 1px solid #EEEEEE;
                width: 100%;
                height: 100%;
                background: #FAFAFA;
                padding-left: 26px;
                display: flex;
                flex-wrap: wrap;
                .coupon-item{
                    flex: 0 339px;
                    min-width: 339px;
                    height: 118px;
                    background: url("~/assets/personal2/pic_coupon_normal@2x.png");
                    background-size: 100% 100%;
                    margin: 26px 30px 0 0;
                    display: flex;

                    &.overdueItem{
                        background: url("~/assets/personal2/pic_coupon_overdue@2x.png");
                        background-size: 100% 100%;
                        .coupon-price{
                            color: #fff!important;
                            span{
                                color: #fff!important;
                            }
                        }
                        .coupon-desc{
                            color: #fff!important;
                        }
                        .coupon-right{
                            color: #A1A1A1!important;
                            .coupon-title{
                                color: #8C8C8C!important;
                            }
                        }
                    }
                    &.usedItem{
                        background: url("~/assets/personal2/pic_coupon_used@2x.png");
                        background-size: 100% 100%;
                    }

                    .coupon-left{
                        width: 126px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        .left-wrapper{
                            width: 100%;
                        }
                        .coupon-price{
                            width: 100%;
                            text-align: center;
                            font-size: 16px;
                            font-family: @fontMc;
                            color: #593D0D;
                            span{
                                font-size: 34px;
                                font-family: @fontBoldMc;
                                font-weight: bold;
                                color: #593D0D;
                            }
                        }
                        .coupon-desc{
                            width: 100%;
                            text-align: center;
                            font-size: 12px;
                            font-family: @fontMc;
                            color: #593D0D;
                        }
                    }
                    .coupon-right{
                        font-size: 12px;
                        font-family: @fontMc;
                        color: #596177;
                        .coupon-title{
                            height: 86px;
                            padding: 29px 0 0 0;
                            font-size: 16px;
                            font-family: @fontBoldMc;
                            font-weight: bold;
                            color: #1E2738;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
    }
</style>
