<template>
    <div class="error-container">
        <common-nav-header></common-nav-header>
        <div class="inner-error">
            <div v-if="error.statusCode === 404" class="error-wrapper">
                <img src="~/assets/newIndex/404.png" alt="">
                <div class="error-text">
                    <div class="error-title">页面不存在</div>
                    <div class="try-text">您可以尝试：</div>
                    <div class="error-opt">
                        <span @click="refreshPage">刷新重试</span>
                        或者
                        <span @click="toHome">返回首页</span>
                    </div>
                </div>
            </div>
            <div v-else-if="error.statusCode === 500" class="error-wrapper">
                <img src="~/assets/newIndex/requestError.png" alt="">
                <div class="error-text">
                    <div class="error-title">数据请求出错</div>
                    <div class="try-text">您可以尝试：</div>
                    <div class="error-opt">
                        <span @click="refreshPage">刷新重试</span>
                        或者
                        <span @click="toHome">返回首页</span>
                    </div>
                </div>
            </div>
            <div v-else-if="error.statusCode === 501" class="error-wrapper">
                <img src="~/assets/newIndex/requestError.png" alt="">
                <div class="error-text">
                    <div class="error-title">数据查询出错</div>
                    <div class="try-text">您可以尝试：</div>
                    <div class="error-opt">
                        <span>联系客服</span>
                        或者
                        <span @click="toHome">返回首页</span>
                    </div>
                </div>
            </div>
            <div v-else-if="error.statusCode == 502" class="error-wrapper">
                <img src="~/assets/newIndex/requestError.png" alt="">
                <div class="error-text">
                    <div class="error-title">数据不存在或已删除</div>
                    <div class="try-text">您可以尝试：</div>
                    <div class="error-opt">
                        <span @click="refreshPage">刷新重试</span>
                        或者
                        <span @click="toHome">返回首页</span>
                    </div>
                </div>
            </div>
            <div v-else class="error-wrapper">
                <img src="~/assets/newIndex/systemError.png" alt="">
                <div class="error-text">
                    <div class="error-title">系统错误</div>
                    <div class="try-text">您可以尝试：</div>
                    <div class="error-opt">
                        <span @click="refreshPage">刷新重试</span>
                        或者
                        <span @click="toHome">返回首页</span>
                    </div>
                </div>
            </div>
        </div>
        <common-footer></common-footer>
    </div>
</template>

<script>
    export default {
        name: "error",
        props:['error'],
        methods:{
            refreshPage(){
                location.reload()
            },
            toHome(){
                this.$router.push({
                    path:'/home'
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .error-container{
        width: 100%;
        height: 100%;
        font-family: Source Han Sans CN;
        background: #F7F7F7;
        .inner-error{
            -height: calc(100% - 83px);
            height: calc(100% - 278px);
            display: flex;
            padding-top: 50px;
            -align-items: center;
            justify-content: center;
            .error-wrapper{
                display: flex;
                align-items: center;
                height: 304px;
                img{
                    width: 200px;
                    height: 200px;
                }
                .error-text{
                    font-size: 16px;
                    font-weight: 400;
                    color: #999999;
                    .error-title{
                        font-size: 16px;
                        font-weight: bold;
                        color: #333333;
                    }
                    .try-text{
                        margin: 10px 0;
                    }
                    .error-opt{
                        span{
                            cursor: pointer;
                            color: @activeColor;
                        }
                    }
                }
            }
        }
    }
</style>
