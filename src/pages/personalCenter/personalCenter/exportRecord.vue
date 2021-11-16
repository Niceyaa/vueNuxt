<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">导出记录</div>
            <div @click="multipleDeleteHandle" v-show="deleteList.length>0" class="com-opt-wrapper">
                <el-button type="danger">删除</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    ref="multipleTable"
                    class="file-table"
                    :data="reportData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="名称"
                        min-width="300px">
                    <template v-slot="{row}">
                        <div class="type-wrapper">
                            <img src="../../../assets/personal2/personal_icon_word@2x.png" alt="">
                            <div class="file-name">{{row.exportTitle}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="exportStateName"
                        width="150px"
                        label="导出状态">
                </el-table-column>
                <el-table-column
                        prop="addTime"
                        width="200px"
                        label="导出时间">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="60px"
                        label="操作">
                    <template v-slot="{row}">
                        <el-dropdown class="opt-dropdown" @command="handleCommand($event,row)">
                            <img class="normal-icon" src="../../../assets/personal2/personal_more_normal@2x.png"
                                 alt="">
                            <img class="hover-icon" src="../../../assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="row.exportState === 202 && row.exportType===1" command="preview"
                                                  icon="el-icon-view">预览
                                </el-dropdown-item>
                                <el-dropdown-item command="download" icon="el-icon-star-off">下载</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </template>
                </el-table-column>
            </el-table>

            <div class="page-wrapper">
                <el-pagination
                        :hide-on-single-page="true"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>
    import defaultUrl from '../../../assets/personal2/personal_empty@2x.png'

    export default {
        name: 'empty-page',
        data() {
            return {
                deleteList: [],

                reportData: [],
                pageSize: 20,
                currentPage: 1,
                total: 0
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                const prm = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage
                }
                this.$axios[this.$apiURL.markDocApi.getExportData.method](this.$apiURL.markDocApi.getExportData.url, prm).then(res => {
                    this.reportData = res.data.result.list
                    this.total = res.data.result.total
                })

            },
            handleCommand(command, info) {
                if (command === 'download') {
                    if (info.exportState === 202 && info.exportFileUrl) {
                        location.href = info.exportFileUrl
                    }
                } else if (command === 'preview') {
                    if (info.exportState === 202) {
                        this.$router.push({
                            path: '/markDocManagement/markDocEdit',
                            query: {
                                bidDocId: info.bidDocId,
                                title: info.bidDocTitle
                            }
                        })
                    } else {
                        this.$message.warning('标书导出失败，不能预览')
                    }

                }
            },
            handleCurrentChange(v) {
                this.currentPage = v
                this.getList()
            },
            multipleDeleteHandle() {
                this.$confirm('此操作将删除选中的导出记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios[this.$apiURL.markDocApi.multiDelExpRecord.method](this.$apiURL.markDocApi.multiDelExpRecord.url, this.deleteList).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            handleSelectionChange(sel) {
                this.deleteList = []
                if (sel.length > 0) {
                    sel.forEach(item => {
                        this.deleteList.push(item.exportRecordId)
                    })
                }

            }

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

        .temp-material-content {
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

                        &:hover {
                            color: @activeColor;
                        }

                        .right-arrow {
                            margin: 0 4px;
                        }
                    }
                }
            }

            .file-table {
                margin-top: 25px;

                .type-wrapper {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-family: @fontMc;
                    color: #313748;
                    cursor: pointer;

                    img {
                        width: 25px;
                        height: 24px;
                        margin-right: 20px;

                        &.vip-sign {
                            width: 41px;
                            height: auto;
                            margin-left: 10px;
                        }
                    }

                }

                .opt-dropdown {
                    /* &:hover{
                         img{
                             &.hover-icon{
                                 display: block;
                             }
                             &.normal-icon{
                                 display: none;
                             }
                         }
                     }*/

                    img {
                        width: 23px;
                        height: 23px;
                        cursor: pointer;

                        &.hover-icon {
                            display: none;
                        }

                        &.normal-icon {
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
