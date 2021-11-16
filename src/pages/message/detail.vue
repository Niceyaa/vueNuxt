<template>
    <div class="message-detail-container">
        <common-header></common-header>
        <div class="message-detail-title">消息中心</div>
        <div class="message-detail-wrapper">
            <div class="message-detail-title-wrapper">
                <div class="message-detail-label">限时折扣</div>
                <div class="message-detail-date">2020-20-20</div>
            </div>
            <div class="message-content">
                爱上的看法垃圾啊斯科拉积分卡
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "messageDetail",
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="less">
    .message-detail-container {
        font-family: @fontFa;

        .message-detail-title {
            width: 100%;
            text-align: center;
            height: 143px;
            background: #F4F7FD;
            line-height: 143px;
            font-size: 18px;
            font-weight: bold;
            color: #515151;
        }

        .message-detail-wrapper {
            width: 800px;
            margin: 0 auto;
            .message-detail-title-wrapper{
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                padding: 32px 0 36px 0;
                margin-bottom: 15px;
                .message-detail-label{
                    width: 640px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333333;
                }
                .message-detail-date{
                    font-size: 12px;
                    color: #A8A8A8;
                }
            }
        }
    }
</style>
