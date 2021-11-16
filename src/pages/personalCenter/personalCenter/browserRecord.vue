<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">浏览记录</div>
            <div @click="multipleDeleteHandle" v-show="deleteList.length>0" class="com-opt-wrapper">
                <el-button type="danger">删除记录</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    class="file-table"
                    :data="reportData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="titleName"
                        label="名称"
                        min-width="300px">
                    <template v-slot="{row}">
                        <nuxt-link :to="row.recordsType===2?'/sysTemplate/detail/'+row.relationId:'/sysFodder/detail/'+row.relationId" class="type-wrapper">
                            <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                            <div class="file-name">{{row.titleName}}</div>
                            <div v-if="row.recordsType===2" class="template-type">模板</div>
                            <div v-else class="material-type">素材</div>
                        </nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="addTime"
                        width="200px"
                        label="浏览时间">
                </el-table-column>
            </el-table>

            <div class="page-wrapper">
                <el-pagination
                        :hide-on-single-page="true"
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
        mounted(){
            this.getList()
        },
        methods: {
            getList() {
                const prm = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage
                }
                this.$axios[this.$apiURL.templateApi.getBrowserRecord.method](this.$apiURL.templateApi.getBrowserRecord.url, prm).then(res => {
                    this.reportData = res.data.result.list
                    this.total = res.data.result.total
                })

            },
            handleCurrentChange(v){
                this.currentPage = v
                this.getList()
            },
            //批量删除
            multipleDeleteHandle() {
                this.$confirm('此操作将对选中的文件取消收藏, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios[this.$apiURL.user.multipleDelBrowRecord.method](this.$apiURL.user.multipleDelBrowRecord.url, this.deleteList).then(res => {
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
            handleSelectionChange(sel) {
                this.deleteList = []
                if (sel.length > 0) {
                    sel.forEach(item => {
                        this.deleteList.push(item.recordsId)
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
                    .template-type{
                        width: 44px;
                        height: 19px;
                        background: #EAF2FF;
                        border-radius: 9px;
                        text-align: center;
                        line-height: 19px;
                        font-size: 12px;
                        color: #3272FF;
                    }
                    .material-type{
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
