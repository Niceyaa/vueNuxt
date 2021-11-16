<template>
    <div id="app">
        <!--<div v-show="$store.state.globalLoading" class="app-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>-->
        <div v-show="$store.state.globalLoading" class="loading-gif">
            <img src="./assets/index/loading1.gif" alt="">
        </div>
        <router-view/>
    </div>
</template>

<style lang="less">
    html, body {
        width: 100%;
        height: 100%;
    }

    #app {
        height: 100%;

        .loading-gif{
            width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: calc(50% - 100px);
            top: calc(50% - 100px);
            -z-index: 99999999;
            img{
                width: 50px;
                height: 50px;
            }
        }

        .app-loading {
            position: fixed;
            width: 42px;
            height: 42px;
            left: calc(50% - 21px);
            top: calc(50% - 21px);
            animation: rotate1 4s infinite ease-in-out;

            div {
                width: 20px;
                height: 20px;
                position: absolute;
                background: pink;
                display: block;
                border-radius: 10px;

                animation: div1 1s infinite ease-in-out;

                &:nth-child(1) {
                    background: #2ecc71;
                    animation-delay: 0s;
                }

                &:nth-child(2) {
                    left: 22px;
                    background: #9b59b6;
                    animation-delay: .2s;
                }

                &:nth-child(3) {
                    top: 22px;
                    background: #3498db;
                    animation-delay: .4s;
                }

                &:nth-child(4) {
                    top: 22px;
                    left: 22px;
                    background: red;
                    animation-delay: .6s;
                }
            }
        }
    }

    @keyframes rotate1 {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes div1 {
        0% {
            transform: scale(1);
        }
        50% {
            -webkit-transform: scale(.5);
            -moz-transform: scale(.5);
            -ms-transform: scale(.5);
            -o-transform: scale(.5);
            transform: scale(.5);
        }
        100% {
            transform: scale(1);
        }
    }

    body {
        font-family: @fontFa;

        .portrait-dropdown-menu {
            padding: 0;

            a {
                text-decoration: none;
            }

            .router-link-active {
                display: block;
                text-decoration: none;
                color: red;
                text-align: center;

                &:first-child {
                    .el-dropdown-menu__item--divided {
                        border-top: none;
                    }
                }

                .el-dropdown-menu__item {
                    padding: 0;
                    margin: 0;
                    height: 40px;
                    line-height: 40px !important;
                    color: #202020;

                    &.el-dropdown-menu__item--divided {
                        &:before {
                            height: 0;
                        }
                    }
                }
            }

            .el-dropdown-menu__item {
                height: 40px;
                line-height: 40px;
                margin: 0;
                color: #202020;
                font-size: 12px;

                &:hover {
                    color: #FF652D;
                    background: none;
                }

                &.el-dropdown-menu__item--divided {
                    &:before {
                        height: 0;
                    }
                }
            }
        }

        .function-popover {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100px;
            padding: 10px 0;

            .popper-item {
                height: 29px;
                line-height: 29px;
                text-align: center;
                cursor: pointer;
                font-size: 12px;
                font-family: @fontFa;

                &:hover {
                    background: #FBF4F2;
                    color: @activeColor;
                }
            }
        }

        .message-popper {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 2px 10px 0 10px;

            .message-wrapper {
                width: 100%;

                .message-header {
                    height: 45px;
                    border-bottom: 1px solid #D8D8D8;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .message-label {
                        position: relative;
                        text-align: center;
                        height: 45px;
                        line-height: 45px;
                        width: 87px;
                        border-bottom: 2px solid #FF652D;
                        font-size: 15px;
                        color: #333333;

                        .has-new-message {
                            position: absolute;
                            top: 12px;
                            right: 16px;
                            width: 6px;
                            height: 6px;
                            background: #FF652D;
                            border-radius: 50%;
                        }
                    }

                    .clear-message-btn {
                        width: 12px;
                        height: 10px;
                        cursor: pointer;
                        margin-right: 8px;
                    }
                }

                .message-content-wrapper {
                    padding: 14px 0 0 0;

                    .message-content-item {
                        padding: 12px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        cursor: pointer;

                        &.alreadyRead {
                            .message-title {
                                color: #C8CDD1 !important;
                            }

                            .message-shortcut {
                                color: #C8CDD1 !important;
                            }
                        }

                        &:hover {
                            background: #FCFCFC;
                        }

                        .message-title-wrapper {
                            display: flex;
                            align-items: center;
                            padding-bottom: 7px;

                            .message-icon {
                                width: 16px;
                                height: 15px;
                                margin: 0 12px 0 0;
                            }

                            .message-title {
                                font-size: 14px;
                                color: #333333;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }

                        .message-shortcut {
                            padding-left: 28px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: 13px;
                            color: #666666;
                            line-height: 24px;
                        }
                    }

                    .history-message {
                        margin: 30px 0 0 0;
                        border-top: 1px solid #EFEFEF;
                        height: 55px;
                        line-height: 55px;
                        text-align: right;

                        .history-message-a {
                            font-size: 14px;
                            color: #515151;
                            text-decoration: none;
                        }
                    }
                }
            }
        }


        .classify-menu {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 8px 0;

            .popper-item {
                height: 29px;
                line-height: 29px;
                text-align: center;
                cursor: pointer;
                font-size: 12px;
                font-family: @fontFa;

                &:hover {
                    background: #FBF4F2;
                    color: @activeColor;
                }
            }
        }

        .el-message {
            &.is-closable {
                top: 40px !important;
                width: 200px !important;
                font-size: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: none;
                border: none;
                color: #0084ff;

                .el-message__closeBtn {
                    display: none;
                }

                .el-icon-loading {
                    color: #eee;
                }
            }
        }
    }


</style>
