<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">{{$route.query.name}}</div>
            <div class="com-opt-wrapper">
                <!--<el-button type="danger" icon="el-icon-delete">删除</el-button>-->
                <el-button type="primary" plain @click="openUpload">上传</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <div class="router-nav-wrapper">
                <div @click="$router.back()" class="back-wrapper">
                    <img src="~/assets/personal2/lastGrade.png" alt="">
                    <div class="back-text">返回上一级</div>
                </div>
                <div class="separator-line"></div>
                <div class="nav-wrapper">
                    <nuxt-link to="/personalCenter/personalCenter/financeReport" class="nav-item">
                        <span>财务报表</span>
                        <span class="right-arrow">></span>
                    </nuxt-link>
                    <div class="nav-item">
                        <span>{{$route.query.name}}</span>
                    </div>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    class="file-table"
                    :data="fileData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
               <!-- <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>-->
                <el-table-column
                        label="报表名称"
                        min-width="200px">
                    <template v-slot="{row}">
                        <div class="type-wrapper">
                            <img v-if="row.docType==='pdf'" src="~/assets/personal2/personal_icon_pdf@2x.png" alt="">
                            <img v-else-if="row.docType==='png'||row.docType==='jpg'||row.docType==='jpeg'" src="~/assets/personal2/personal_icon_png@2x.png" alt="">
                            <img v-else src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                            <div class="file-name">{{row.reportFormName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button @click.native="handleFoldCommand('preview',row)" :icon="'el-icon-download'"
                                           :btn-name="'下载'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native="deleteHandle(row)" :icon="'el-icon-delete'"
                                           :btn-name="'删除'"></common-button>
                        </div>
                        <!--<el-dropdown class="opt-dropdown" @command="handleFoldCommand($event,row)">
                            <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png" alt="">
                            <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="preview">下载</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--上传附件-->
        <el-dialog class="setFodderDialog" width="440px" title="上传附件" :visible.sync="newUploadFlag">
            <el-form :model="uploadForm" ref="uploadForm">
                <el-form-item label="附件：">
                    <upload-doc :file-name.sync="uploadForm.name" :file-list.sync="frontFileList" tipText="PDF、image、.doc和.docx格式文件" :accept-type="'.pdf,image/*,.doc,.docx,application/msword'"></upload-doc>
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input style="width: 300px;" v-model="uploadForm.name"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newUploadFlag = false">取 消</el-button>
                <el-button :loading="isSubmit" type="primary" @click="addSelfCerFileHandle">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import uploadDoc from '@/components/uploadDoc'
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: 'finance-report-file',
        components:{uploadDoc},
        data() {
            return {
                newUploadFlag: false,
                uploadForm: {
                    name: '',
                    id: null,
                    fileId: null
                },

                checkList: [],

                fileData: [],

                isSubmit: false,
                btnName: '点击上传',
                frontFileList: [],
                limit: 10,
                optType: 'add',
                currentRelated: null,
                currentName: null,
            }
        },
        mounted() {
            this.currentRelated = this.$route.query.id
            this.getInfo()
        },
        methods: {
            getInfo() {
                const prm = qs.stringify({
                    reportFormId: this.currentRelated,
                })
                this.$axios[this.$apiURL.certification.getFinancialStatementFile.method](this.$apiURL.certification.getFinancialStatementFile.url, prm).then(res => {
                    const {result} = res.data
                    this.fileData = result
                })
            },
            handleFoldCommand(command,info){
                switch(command){
                    case 'delete':
                        this.deleteHandle(info)
                        break
                    case 'preview':
                        location.href = info.reportFormFileUrl
                        break
                }
            },
            deleteHandle(item) {
                console.log(this.checkList)
                this.$confirm(`此操作将永久删除该附件(${item.reportFormName}), 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        reportFormEncId: item.reportFormEncId
                    })
                    this.$axios[this.$apiURL.certification.deleteFinancialStatementFile.method](this.$apiURL.certification.deleteFinancialStatementFile.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getInfo()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            openUpload() {
                this.newUploadFlag = true
                this.uploadForm.name = null
                this.uploadForm.fileId = null
                this.frontFileList = []
            },
            addSelfCerFileHandle() {
                if (this.frontFileList.length === 0) {
                    this.$message.warning('请选择需要上传的附件')
                    return
                }
                let tempList = []
                this.frontFileList.forEach(item => {
                    if (item.raw) {
                        tempList.push(item)
                    }
                })

                if (tempList.length > 0) {
                    let prm = qs.stringify({
                        fileNum: tempList.length,
                        uploadType: 400
                    })
                    this.isSubmit = true
                    this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url, prm).then(res => {
                        const {result} = res.data
                        const requestData = this.$returnUploadPrm(result.fileIds[0],result,tempList[0].raw)
                        axios({
                            url: result.host,
                            method: 'post',
                            data: requestData
                        }).then((res) => {
                            if (res.data.code === 200) {
                                this.uploadForm.fileId = result.fileIds[0]
                                // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                this.submitHandle()
                            }
                        })
                    })
                } else {
                    this.submitHandle()
                }
            },
            submitHandle() {
                const prm = {
                    "reportFormFileId": this.uploadForm.fileId,
                    "reportFormId": this.currentRelated,
                    "reportFormName": this.uploadForm.name,
                }
                this.isSubmit = true
                this.$axios[this.$apiURL.certification.addFinancialStatementFile.method](this.$apiURL.certification.addFinancialStatementFile.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getInfo()
                    this.newUploadFlag = false
                    this.isSubmit = false
                }).catch(err => {
                    this.isSubmit = false
                })
            }
        }
    }
</script>
<style lang="less" scoped>
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
                    display: flex;

                    .nav-item {
                        cursor: pointer;
                        color: #596177;
                        text-decoration: none;

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

        .setFodderDialog {
            .el-dialog__header {
                background: #FAFDFF;

                .el-dialog__title {
                    font-size: 15px;
                    color: #333333;
                }
            }

            .el-dialog__body {
                display: flex;
                justify-content: center;
                /*新增*/

                .inner-set-fodder {
                    width: 737px;
                    height: 345px;
                    border: 1px solid #E8E8E8;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 10px;
                    overflow: auto;

                    .custom-tree-node {
                        &.innerNodeActive {
                            background: #FBF4F2;

                            .file-name {
                                font-weight: bold;
                                color: @activeColor;
                            }
                        }
                    }
                }
            }

            /deep/ .el-dialog__footer {
                display: flex;
                align-items: center;
                justify-content: center;

                .el-button {
                    width: 130px;
                }
            }

            /deep/ .el-upload__tip {
                padding-left: 55px;
            }
        }

    }
</style>
