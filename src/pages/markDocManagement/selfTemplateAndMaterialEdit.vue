<template>
    <div class="self-template-fodder">
        <common-nav-header></common-nav-header>
        <h3>{{currentTitle}}-{{currentType==='cus_material'?'自定义素材':'自定义模板'}}节点</h3>
        <el-container class="inner-container">
            <el-aside class="left-content" width="310px">
                <!--<el-button style="margin: 0 0 15px 0;" type="danger" plain @click="getCheckedNodes">删除节点</el-button>-->
                <el-tree
                        class="contentTree"
                        :data="treeData"
                        :props="defaultProps"
                        node-key="nodeId"
                        ref="tree"
                        current-node-key
                        default-expand-all
                        :expand-on-click-node="false"
                        @node-drop="handleDrop"
                        draggable
                        @node-click="handleNodeClick">
                    <div :class="{'custom-tree-node':true,'isActive':data.nodeId===currentNodeId}"
                         slot-scope="{ node, data }">
                        {{ data.nodeName }}
                        <i @click.stop="deleteHandle(data)" class="el-icon-delete delete-btn"></i>
                    </div>
                </el-tree>
            </el-aside>
            <el-main class="wps-container" id="wpsContainer">
            </el-main>
        </el-container>

    </div>

</template>
<script>
    import qs from "qs";

    export default {
        name: 'selfTemplateAndMaterialEdit',
        data() {
            return {
                wpsOption: null,

                currentRelatedId: null,
                currentType: null,
                currentTitle: null,

                wpsUrl: null,
                wpsToken: null,
                isDestroyWps: false,
                currentNodeId: null,

                treeData: [],
                loading: false,

                defaultProps: {
                    checkStrictly: true,
                    value: 'fileId',
                    label: 'nodeName',
                    children: 'sonNode',
                },

                nodeIdList: [],
            };
        },
        mounted() {
            //type  "用户自定义素材":cus_material "用户自定义模板":cus_template
            const {query} = this.$route
            this.currentRelatedId = query.id
            this.currentType = query.type
            this.currentTitle = query.title
            this.getNodeTreeByMaterialIdList();
        },
        methods: {
            createFodder() {
                console.log(this.$refs.tree.getCheckedNodes());
                let checkNodes = this.$refs.tree.getCheckedNodes()
                if (checkNodes.length > 0) {

                    this.$prompt('请输入素材名称', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /\S/,
                        inputValue: this.fileTitle + '-' + checkNodes[0].nodeName,
                        inputErrorMessage: '名称不能为空'
                    }).then(({value}) => {
                        let prm = {
                            materialName: value
                        }
                        let temp = checkNodes.map(item => {
                            return item.pid
                        })
                        temp = temp.concat(checkNodes.map(item => {
                            return item.nodeId
                        }))
                        prm.nodeIdList = temp
                        createMaterialByTemplate(prm).then(res => {
                            this.$message.success(res.data.msg)
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });


                } else {
                    this.$message.warning('请先选择需要合并为素材的节点！')
                }
            },
            getCheckedNodes() {
                this.nodeIdList = []
                if (this.$refs.tree.getCheckedNodes().length === 0) {
                    this.$message({
                        message: "请选择需要删除的数据"
                    })
                } else {
                    this.$refs.tree.getCheckedNodes().forEach(item => {
                        this.nodeIdList.push(item.nodeId)
                    })
                    this.$axios[this.$apiURL.templateApi.multiDeleteSelfFileNode.method](this.$apiURL.templateApi.multiDeleteSelfFileNode.url, this.nodeIdList).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功"
                            })
                            this.getNodeTreeByMaterialIdList();
                        }
                    })
                }
            },
            deleteHandle(info) {
                this.$axios[this.$apiURL.templateApi.multiDeleteSelfFileNode.method](this.$apiURL.templateApi.multiDeleteSelfFileNode.url, [info.nodeId]).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        })
                        this.getNodeTreeByMaterialIdList();
                    }
                })
            },

            handleDrop(draggingNode, dropNode, dropType, ev) {
                const prm = {
                    isInsert: false,
                    isNotMerge: dropType === 'inner',
                    keyId: draggingNode.data.nodeId,
                    moveKeyId: dropNode.data.nodeId
                }
                this.$axios[this.$apiURL.templateApi.sortSelfFileNode.method](this.$apiURL.templateApi.sortSelfFileNode.url, prm).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            type: "success",
                            message: "移动成功"
                        })
                        this.getNodeTreeByMaterialIdList();
                    }
                })
            },

            getNodeTreeByMaterialIdList() {
                const prm = qs.stringify({
                    relatedId: this.currentRelatedId,
                    type: this.currentType
                })
                this.$axios[this.$apiURL.fodderApi.getFodderOrTemplateTree.method](this.$apiURL.fodderApi.getFodderOrTemplateTree.url, prm).then(res => {
                    this.treeData = res.data.result
                    this.currentNodeId = this.treeData.length > 0 ? this.treeData[0].nodeId : null
                    if (this.treeData.length > 0 && this.treeData[0].nodeEnc.length > 0) {
                        this.getTokenByFileId(this.treeData[0].nodeEnc[0].fileId)
                    }
                })
            },

            handleNodeClick(data) {
                this.currentNodeId = data.nodeId
                if (data.nodeEnc.length > 0) {
                    this.getTokenByFileId(data.nodeEnc[0].fileId)
                } else {
                    this.isDestroyWps = true
                    this.$message.warning('该目录关联文档')
                }
            },

            getTokenByFileId(fileId) {
                const prm = {
                    fileId: fileId
                }
                this.$axios[this.$apiURL.commonApi.getFileUrlByFileId.method](this.$apiURL.commonApi.getFileUrlByFileId.url, {params: prm}).then(res => {
                    if (res.data.code === 200) {
                        const {result} = res.data
                        this.openWPS(result.wpsUrl, result.token)
                    }
                })
            },
            //打开wps
            async openWPS(url, token) {
                this.wpsOption = this.wps.config({
                    mode: 'normal',  //显示模式控制
                    mount: document.querySelector('#wpsContainer'),  //元素关联绑定
                    wpsUrl: url,  //wps文件地址
                    commonOptions: {
                        isIframeViewFullscreen: true,
                    },
                })
                this.wpsOption.setToken({
                    token: token,
                    timeout: 10 * 60 * 1000
                })
                await this.wpsOption.ready()
                const app = this.wpsOption.Application

                const HeaderHistoryMenuBtn = await app.CommandBars('HeaderHistoryMenuBtn')
                const MoreMenus = await app.CommandBars('MoreMenus')
                MoreMenus.Visible = false
                HeaderHistoryMenuBtn.Visible = false
                // 获取登录操作者信息
                // const operatorsInfo = await app.ActivePresentation.GetOperatorsInfo();
                // app.ActiveDocument.ActiveWindow.View.Zoom.Percentage = 50
            },
        }
    };
</script>
<style lang="less">
    .self-template-fodder {
        width: 100%;
        height: 100%;

        h3 {
            padding-left: 20px;
        }

        .inner-container {
            width: 100%;
            height: calc(100% - 144px);
            padding: 0 0 0 20px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: none;

            .left-content {
                background: none;
                height: 100%;
                padding: 0;
                overflow: hidden;

                .contentTree {
                    border-right: 1px solid #eee;
                    height: 100%;
                    width: 100%;
                    padding: 0 15px 0 0;
                    overflow: auto;
                    font-size: 14px;

                    &::-webkit-scrollbar {
                        width: 4px;
                        height: 1px;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background: #e3e5e6;
                    }

                    .el-tree-node {
                        &.is-current {
                            & > .el-tree-node__content {
                                color: @activeColor;
                                background: #FBF4F2;
                            }
                        }
                    }

                    .el-tree-node__label {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .custom-tree-node {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        position: relative;
                        width: 100%;

                        &.isActive{
                            color: @activeColor;
                        }

                        &:hover {
                            .delete-btn {
                                display: block;
                                color: @activeColor;
                            }
                        }

                        .delete-btn {
                            display: none;
                            position: absolute;
                            right: 0;
                            top: 3px;
                        }
                    }
                }
            }

            .wps-container {
                width: 100%;
                height: 100%;
                padding: 0;

                .web-office-iframe {
                    width: 100%;
                    height: 100%;
                    padding: 0;
                }
            }
        }
    }
</style>
