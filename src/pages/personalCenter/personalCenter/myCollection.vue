<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">我的收藏</div>
            <div @click="multipleDeleteHandle" v-show="deleteList.length>0" class="com-opt-wrapper">
                <el-button type="danger">取消收藏</el-button>
            </div>
        </div>
        <el-tabs class="temp-material-tab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="模板" name="template">
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
                                <nuxt-link
                                        :to="row.collectionType===1?'/sysFodder/detail/'+row.relationId:'/sysTemplate/detail/'+row.relationId"
                                        class="type-wrapper">
                                    <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                                    <div class="file-name">{{row.titleName}}</div>
                                </nuxt-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="addTime"
                                width="350px"
                                label="收藏时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                width="60px"
                                label="操作">
                            <template v-slot="{row}">
                                <el-dropdown class="opt-dropdown" @command="templateCommand($event,row)">
                                    <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png"
                                         alt="">
                                    <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png"
                                         alt="">
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="preview" icon="el-icon-view">预览</el-dropdown-item>
                                        <el-dropdown-item command="cancel" icon="el-icon-star-off">取消收藏
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </el-tab-pane>
            <el-tab-pane label="素材" name="fodder">
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
                                <nuxt-link
                                        :to="row.collectionType===1?'/sysFodder/detail/'+row.relationId:'/sysTemplate/detail/'+row.relationId"
                                        class="type-wrapper">
                                    <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                                    <div class="file-name">{{row.titleName}}</div>
                                    <!-- <img class="vip-sign" src="~/assets/personal2/personal_label_member@2x.png"
                                          alt="">-->
                                </nuxt-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="addTime"
                                width="350px"
                                label="收藏时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                width="60px"
                                label="操作">
                            <template v-slot="{row}">
                                <el-dropdown class="opt-dropdown" @command="fodderCommand($event,row)">
                                    <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png"
                                         alt="">
                                    <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png"
                                         alt="">
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item commmand="preview" icon="el-icon-view">预览</el-dropdown-item>
                                        <el-dropdown-item command="cancel" icon="el-icon-star-off">取消收藏</el-dropdown-item>
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
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>

    export default {
        name: 'empty-page',
        data() {
            return {
                activeName: 'template',
                reportData: [],
                pageSize: 20,
                currentPage: 1,
                total: 0,
                deleteList: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                let prm = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    collectionType: this.activeName === 'template' ? 2 : 1
                }
                this.$axios[this.$apiURL.user.getCollectionData.method](this.$apiURL.user.getCollectionData.url, prm).then(res => {
                    this.reportData = res.data.result.list
                    this.total = res.data.result.total
                })
            },
            templateCommand(command, info) {
                if (command === 'preview') {
                    this.$router.push({
                        path: '/sysTemplate/detail/' + info.relationId
                    })
                } else if (command === 'cancel') {
                    this.$confirm('此操作将对选中的文件取消收藏, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios[this.$apiURL.user.multipleCancelCollect.method](this.$apiURL.user.multipleCancelCollect.url, [info.collectionId]).then(res => {
                            this.$message({
                                type: 'success',
                                message: '取消成功!'
                            });
                            this.getList()
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                    });
                }
            },
            fodderCommand(command, info) {
                if (command === 'preview') {
                    this.$router.push({
                        path: '/sysFodder/detail/' + info.relationId
                    })
                } else if (command === 'cancel') {
                    this.$confirm('此操作将对选中的文件取消收藏, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios[this.$apiURL.user.multipleCancelCollect.method](this.$apiURL.user.multipleCancelCollect.url, [info.collectionId]).then(res => {
                            this.$message({
                                type: 'success',
                                message: '取消成功!'
                            });
                            this.getList()
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                    });
                }
            },
            //批量删除
            multipleDeleteHandle() {
                this.$confirm('此操作将对选中的文件取消收藏, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios[this.$apiURL.user.multipleCancelCollect.method](this.$apiURL.user.multipleCancelCollect.url, this.deleteList).then(res => {
                        this.$message({
                            type: 'success',
                            message: '取消成功!'
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
            handleClick() {
                this.currentPage = 1
                this.deleteList = []
                this.getList()
            },
            handleCurrentChange(size) {
                this.currentPage = size
                this.getList()
            },
            handleSelectionChange(sel) {
                this.deleteList = []
                if (sel.length > 0) {
                    sel.forEach(item => {
                        this.deleteList.push(item.collectionId)
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

        .temp-material-tab {
            padding: 0 0 0 27px;

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
                        text-decoration: none;

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
    }
</style>
