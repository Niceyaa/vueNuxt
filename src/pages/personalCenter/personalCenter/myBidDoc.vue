<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">我的标书</div>
        </div>
        <div class="temp-material-content">
            <div class="create-wrapper">

                <div class="create-item" @click="$router.push({path:'/sysTemplate/1'})">
                    <div class="create-left">
                        <div class="create-label">依模板创建标书</div>
                        <div class="create-desc">10万+模板、素材快速生成标书</div>
                    </div>
                    <img src="~/assets/template/01.png" alt="">
                </div>
                <div class="create-item">
                    <el-upload
                            action="1"
                            accept=".doc,.docx,application/msword"
                            :auto-upload="false"
                            :limit="1"
                            :show-file-list="false"
                            :on-change="changeLocalDocFile">
                        <div class="create-left">
                            <div class="create-label">依招标文件创建标书</div>
                            <div class="create-desc">根据招标文件自动生成目录</div>
                        </div>
                        <img src="~/assets/template/02.png" alt="">
                    </el-upload>
                </div>
                <div class="create-item">
                    <el-upload
                            action="1"
                            accept=".doc,.docx,application/msword"
                            :auto-upload="false"
                            :limit="1"
                            :show-file-list="false"
                            :on-change="changeFile">
                        <div class="create-left">
                            <div class="create-label">本地上传标书创建</div>
                            <div class="create-desc">上传本地标书，快速生成新标书</div>
                        </div>
                        <img src="~/assets/template/03.png" alt="">
                    </el-upload>
                </div>
                <div class="create-item" @click="openCreateDialog('add')">
                    <div class="create-left">
                        <div class="create-label">新建空白标书</div>
                        <div class="create-desc">创建空白标书</div>
                    </div>
                    <img src="~/assets/template/04.png" alt="">
                </div>
            </div>
            <el-table
                    class="file-table"
                    :data="listData"
                    style="width: 100%">
                <el-table-column
                        prop="title"
                        label="标题"
                        min-width="300px">
                    <template v-slot="{row}">
                        <nuxt-link
                                :to="'/markDocManagement/markDocEdit?bidDocId='+row.bidDocId+'&title='+row.bidDocTitle"
                                target="_blank" class="type-wrapper">
                            <img src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                            <div class="file-name">{{row.bidDocTitle}}</div>
                        </nuxt-link>
                    </template>
                </el-table-column>
                <!--    <el-table-column
                            prop="projectName"
                            label="项目名称"
                            width="300px">
                    </el-table-column>-->
                <el-table-column
                        prop="bidDocStateName"
                        label="状态"
                        width="190px">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <div>{{row.bidDocStateName}}</div>
                            <i @click="getList" v-if="row.bidDocState===101" class="el-icon-refresh"
                               style="color: #3977FF;cursor: pointer;font-size:18px"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="bidDocStateName"
                        label="导出状态"
                        width="290px">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <div style="margin-right: 8px">{{row.bidDocExportStateName}}</div>
                            <el-tag @click="exportBidDoc(row)" v-if="row.bidDocState===102&&(row.bidDocExportState!==202&&row.bidDocExportState!==201)" size="mini" type="primary" style="cursor: pointer;">导出</el-tag>
                            <el-tag @click="handleBidCommand('download',row)" v-if="row.bidDocState===102&&row.bidDocExportState===202" size="mini" type="success" style="cursor: pointer;">下载</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="addUser"
                        label="创建人"
                        width="150px">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="创建时间"
                        width="140px">
                    <template v-slot="{row}">
                        {{$lcgFormatDate(row.addTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="60px"
                        fixed="right"
                        label="操作">
                    <template v-slot="{row}">
                        <el-dropdown class="opt-dropdown" @command="handleBidCommand($event,row)">
                            <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png" alt="">
                            <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="edit" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                                <!--<el-dropdown-item command="preview" icon="el-icon-view">预览</el-dropdown-item>-->
                                <!--<el-dropdown-item command="rename" icon="el-icon-edit">重命名</el-dropdown-item>-->
                                <el-dropdown-item command="download" icon="el-icon-download" divided>下载
                                </el-dropdown-item>
                                <el-dropdown-item command="updateBaseInfo" icon="el-icon-tickets">修改基本信息
                                </el-dropdown-item>
                                <!-- <el-dropdown-item command="memberManage" icon="el-icon-user" divided>项目成员管理
                                 </el-dropdown-item>-->
                                <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </template>
                </el-table-column>
            </el-table>
            <div class="page-wrapper">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <newMarkDocDialog :bidDocId="currentBidDocId" @reTriggerList="getList" :modalFlag.sync="docOptFlag"
                          :optType="optType"></newMarkDocDialog>
    </div>
</template>

<script>
    import defaultUrl from '~/assets/personal2/personal_empty@2x.png'
    import dragUpload from '~/components/dragUpload'
    import newMarkDocDialog from '~/components/newMarkDocDialog'
    import qs from 'qs'

    export default {
        name: 'empty-page',
        components: {dragUpload, newMarkDocDialog},
        data() {
            return {
                optType: 'add',
                docOptFlag: false,
                currentBidDocId: null,
                listData: [],
                pageSize: 10,
                currentPage: 1,
                total: 0
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            //导出标书
            exportBidDoc(info){
                const prm = qs.stringify({
                    bidDocId: info.bidDocId
                })
                this.$axios[this.$apiURL.markDocApi.generateMarkDoc.method](this.$apiURL.markDocApi.generateMarkDoc.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getList()
                   /* this.generateTimer = setInterval(async () => {
                        let generatePrm = qs.stringify({
                            bidDocId: this.markDocAllData.bidDocId,
                            noLoading: true
                        })
                        let content = await this.$axios[this.$apiURL.markDocApi.getBidDocGenerateStatus.method](this.$apiURL.markDocApi.getBidDocGenerateStatus.url, generatePrm)
                        if (content.data.result.id === 202) {
                            this.$message.success(content.data.result.name)
                            clearInterval(this.generateTimer)
                            this.generateTimer = null
                            this.generateBidDocFlag = false
                        } else if (content.data.result.id === 203) {
                            this.$message.error(content.data.result.name)
                            clearInterval(this.generateTimer)
                            this.generateTimer = null
                            this.generateBidDocFlag = false
                        }
                    }, 1200)*/
                })
            },
            //操作菜单
            handleBidCommand(command, info) {
                switch (command) {
                    case 'updateBaseInfo':
                        this.currentBidDocId = info.bidDocId
                        this.openCreateDialog('edit')
                        break
                    case 'delete':
                        this.deleteHandle(info)
                        break
                    case 'download':
                        if (info.bidDocUrl) {
                            location.href = info.bidDocUrl
                        } else {
                            this.$message.warning('该标书暂时没有导出记录，请先导出后再下载！')
                        }
                        break
                    case 'edit':
                        let tempRouter = this.$router.resolve({
                            // path:'/markDocManagement/markDocEdit',
                            name: 'markDocManagement-markDocEdit',
                            query: {
                                'bidDocId': info.bidDocId, 'title': info.bidDocTitle
                            }
                        })
                        window.open(tempRouter.href, '_blank')
                        break

                }
            },
            //删除标书
            deleteHandle(info) {
                this.$confirm('此操作将永久删除该标书信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        bidDocId: info.bidDocId
                    })
                    this.$axios[this.$apiURL.markDocApi.markDocDelete.method](this.$apiURL.markDocApi.markDocDelete.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //打开标书制作弹窗
            openCreateDialog(type) {
                this.optType = type
                this.docOptFlag = true
            },
            //本地上传标书
            changeFile(file) {
                const prm = new FormData()
                prm.append('file', file.raw)
                this.$axios[this.$apiURL.markDocApi.importMarkDocAndCreate.method](this.$apiURL.markDocApi.importMarkDocAndCreate.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.$router.push({
                        path: '/markDocManagement/markDocEdit',
                        query: {
                            bidDocId: res.data.result.bidDocId,
                            title: res.data.result.bidDocTitle,
                            formWord: true
                        }
                    })
                })
            },
            //根据招标文件创建标书
            changeLocalDocFile(file) {
                this.$store.commit("SET_MAKE_DOC_FLAG", false)
                const prm = new FormData()
                prm.append('file', file.raw)
                this.$axios[this.$apiURL.markDocApi.createDocByLocalDoc.method](this.$apiURL.markDocApi.createDocByLocalDoc.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.$router.push({
                        path: '/markDocManagement/markDocEdit',
                        query: {
                            bidDocId: res.data.result.bidDocId,
                            title: res.data.result.bidDocTitle,
                            formWord: true
                        }
                    })
                })
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getList()
            },
            getList() {
                let prm = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage
                }
                this.$axios[this.$apiURL.markDocApi.getMyMarkDocList.method](this.$apiURL.markDocApi.getMyMarkDocList.url, prm).then(res => {
                    const {list, total} = res.data.result
                    this.listData = list
                    this.total = total
                })
            }
        }
    }
</script>
<style lang="less">
    @import '../../../styles/infoUploadCommon.less';

    .template-or-material {
        width: 100%;
        min-height: 100%;
        background: #fff;
        padding: 60px 40px 40px 60px;
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
            padding: 0 0 0 27px;

            .create-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;

                .create-item {
                    min-width: 256px;
                    flex: .4;
                    -margin-right: 60px;
                    margin-right: 25px;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 137px;
                    background: #FFFFFF;
                    box-shadow: 0px 0px 21px 0px #F1F1F1;
                    border-radius: 8px;
                    font-size: 12px;
                    font-family: @fontMc;
                    color: #666666;
                    cursor: pointer;

                    div {
                        width: 100%;
                    }

                    &:last-child {
                        margin-right: 0;
                    }

                    .create-label {
                        font-size: 16px;
                        font-family: @fontBoldMc;
                        font-weight: bold;
                        color: #313748;
                        padding-bottom: 20px;
                    }

                    img {
                        width: 68px;
                        height: 68px;
                    }

                    .el-upload {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        text-align: left;
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
                    color: @activeColor;
                    cursor: pointer;
                    text-decoration: none;

                    img {
                        width: 25px;
                        height: 24px;
                        margin-right: 20px;
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
