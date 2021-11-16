<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">其他资质管理</div>
            <div class="com-opt-wrapper">
                <el-button @click="multipleDeleteHandle" v-if="deleteList.length>0" type="danger" icon="el-icon-delete">删除</el-button>
                <el-button type="primary" plain @click="createFold">新建资质分类</el-button>
                <el-button v-show="currentRelated" type="primary" plain icon="el-icon-upload" @click="uploadFile">上传
                </el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <div class="router-nav-wrapper" v-if="alreadyExistClassify.length>1">
                <div class="nav-wrapper">
                    <div @click="goToInnerClassifyData(item)" v-for="(item,idx) in alreadyExistClassify"
                         :key="idx" class="nav-item">
                        <span>{{item.name}}</span>
                        <span class="right-arrow" v-if="idx!==alreadyExistClassify.length-1">></span>
                    </div>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    class="file-table"
                    :data="allData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="名称"
                        min-width="200px">
                    <template v-slot="{row}">
                        <div v-if="row.coQualifyTypeId" class="type-wrapper" @click="getInnerClassifyData(row)">
                            <img src="~/assets/personal2/personal_icon_file@2x.png" alt="">
                            <div class="file-name">{{row.coQualifyTypeName}}</div>
                        </div>
                        <div v-else class="type-wrapper">
                            <img v-if="row.docType==='pdf'" src="~/assets/personal2/personal_icon_pdf@2x.png" alt="">
                            <img v-else-if="row.docType==='png'||row.docType==='jpg'||row.docType==='jpeg'" src="~/assets/personal2/personal_icon_png@2x.png" alt="">
                            <img v-else src="~/assets/personal2/personal_icon_word@2x.png" alt="">
                            <div class="file-name">{{row.fileName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button v-if="row.coQualifyTypeId" @click.native="renameOpen(row)" :icon="'el-icon-edit-outline'"
                                           :btn-name="'重命名'"></common-button>
                            <common-button v-else @click.native="handleCommand('download',row)" :icon="'el-icon-view'"
                                           :btn-name="'预览'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button v-if="!row.coQualifyTypeId" @click.native="deleteDocHandle(row)" :icon="'el-icon-delete'"
                                           :btn-name="'删除'"></common-button>
                            <common-button v-else @click.native="deleteHandle(row)" :icon="'el-icon-delete'"
                                           :btn-name="'删除'"></common-button>
                        </div>
                        <!--<el-dropdown class="opt-dropdown" @command="handleCommand($event,row)">
                            <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png"
                                 alt="">
                            <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="row.coQualifyTypeId" command="rename">重命名</el-dropdown-item>
                                <el-dropdown-item v-else command="download">预览</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->

                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--新建自定义模板-->
        <el-dialog class="setFodderDialog" width="440px" title="上传资质文件" :visible.sync="newFodderFlag">
            <el-form :model="setFodderForm" ref="setFodderForm">
                <el-form-item label="文件：">
                    <upload-doc :file-name.sync="setFodderForm.cusMaterialName" :file-list.sync="fileList"   tipText="PDF、image、.doc和.docx格式文件" :accept-type="'.pdf,image/*,.doc,.docx,application/msword'"></upload-doc>
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input style="width: 300px;" v-model="setFodderForm.cusMaterialName"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newFodderFlag = false">取 消</el-button>
                <el-button type="primary" @click="addSelfFodderHandle">保 存</el-button>
            </div>
        </el-dialog>

        <!--新建自定义模板-->
        <el-dialog  width="440px" :visible.sync="previewFlag">
            <img :src="previewImgUrl" alt="" style="width: 400px;">
        </el-dialog>

    </div>
</template>

<script>
    import defaultUrl from '~/assets/personal2/personal_empty@2x.png'
    import qs from 'qs'
    import axios from 'axios'
    import uploadDoc from '~/components/uploadDoc'

    export default {
        name: 'empty-page',
        components: {uploadDoc},
        data() {
            return {
                previewFlag: false,
                previewImgUrl: null,

                deleteList: [],

                fileData: [],
                typeData: [],

                currentRelated: null,
                currentFileType: null,
                allData: [],
                isDocData: [],
                notDocData: [],
                alreadyExistClassify: [],

                setFodderForm: {
                    cusMaterialName: '',
                    cusResTypeId: null,
                    file: null
                },
                fileList: [],
                currentFileId: null,

                newFodderFlag: false,

                isDelete: false,

                currentPage: 1,
                pageSize: 12,
                total: 0,
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                this.currentRelated = null
                this.deleteList = []
                this.getData()
                this.alreadyExistClassify = [
                    {
                        coQualifyTypeId: null,
                        name: '其他资质管理',
                    }
                ]
            },
            //获取分类数据
            getData() {
                this.isDocData = []
                this.notDocData = []
                const prm = qs.stringify({
                    "keyId": this.currentRelated,
                })
                this.$axios[this.$apiURL.certification.getSelfCertification.method](this.$apiURL.certification.getSelfCertification.url, prm).then(res => {
                    const {result} = res.data
                    this.allData = result.typeList.concat(result.encList)
                    // this.allData = result.typeList
                })
            },
            //新建自定义素材
            addSelfFodderHandle() {
                if (this.fileList.length === 0) {
                    this.$message.warning('必须上传附件')
                    return
                }

                const policyPrm = qs.stringify({
                    fileNum: 1,
                    uploadType: 400
                })
                this.$axios[this.$apiURL.commonApi.getUploadParams.method](this.$apiURL.commonApi.getUploadParams.url, policyPrm).then(res => {
                    const {result} = res.data
                    const requestData = this.$returnUploadPrm(result.fileIds[0],result,this.fileList[0].raw)
                    axios({
                        url: result.host,
                        method: 'post',
                        data: requestData
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.currentFileId = result.fileIds[0]
                            const filePrm = {
                                "coQualifyTypeId": this.currentRelated,
                                "fileId": this.currentFileId,
                                "fileName": this.setFodderForm.cusMaterialName
                            }
                            this.$axios[this.$apiURL.certification.addCompanyCerFile.method](this.$apiURL.certification.addCompanyCerFile.url, filePrm).then(fileRes => {
                                this.$message.success(fileRes.data.msg)
                                this.getData()
                                this.newFodderFlag = false
                            })

                        }
                    })
                })

            },
            //上传
            uploadFile() {
                this.newFodderFlag = true
                this.fileList = []
                this.currentFileId = null
                this.setFodderForm.cusMaterialName = ''
            },
            //新建文件夹
            createFold() {
                this.$prompt('请输入文件夹名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    const prm = {
                        coQualifyTypeName: value,
                        pid: this.currentRelated ? this.currentRelated : 0,
                    }
                    this.$axios[this.$apiURL.certification.addCompanyCerType.method](this.$apiURL.certification.addCompanyCerType.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            //获取小分类下面的数据
            getInnerClassifyData(info) {
                this.currentRelated = info.coQualifyTypeId
                this.alreadyExistClassify.push({
                    coQualifyTypeId: info.coQualifyTypeId,
                    name: info.coQualifyTypeName
                })
                this.getData()
            },
            //点击面包屑获取数据
            goToInnerClassifyData(info) {
                if (info.coQualifyTypeId === this.currentRelated) return
                let idx1 = 0
                this.alreadyExistClassify.forEach((item, idx) => {
                    if (item.coQualifyTypeId === info.coQualifyTypeId) {
                        idx1 = idx
                    }
                })
                this.alreadyExistClassify.splice(idx1 + 1)
                this.currentRelated = info.coQualifyTypeId
                this.getData()
            },
            //操作目录
            handleCommand(command, info) {
                switch (command) {
                    case 'delete':
                        if (!info.coQualifyTypeId) {
                            this.deleteDocHandle(info)
                        } else {
                            this.deleteHandle(info)
                        }
                        break
                    case 'rename':
                        this.renameOpen(info)
                        break
                    case 'download':
                        if (info.docType === 'png' || info.docType === 'jpg' || info.docType === 'jpeg') {
                            this.previewFlag = true
                            this.previewImgUrl = info.fileUrl
                            return
                        }
                        location.href = info.fileUrl
                        break
                }
            },
            //批量删除
            multipleDeleteHandle() {
                this.$confirm('此操作将永久删除该文件夹和文件夹下面的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios[this.$apiURL.certification.multipleDeleteCer.method](this.$apiURL.certification.multipleDeleteCer.url, this.deleteList).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除小分类
            deleteHandle(info) {
                this.$confirm('此操作将永久删除该文件夹和文件夹下面的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        coQualifyTypeId: info.coQualifyTypeId
                    })
                    this.$axios[this.$apiURL.certification.deleteCompanyCerType.method](this.$apiURL.certification.deleteCompanyCerType.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除文档
            deleteDocHandle(info) {
                this.$confirm('此操作将永久删除该文档信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        companyQualifyEncId: info.coQualifyEncId
                    })
                    this.$axios[this.$apiURL.certification.deleteCompanyCerFile.method](this.$apiURL.certification.deleteCompanyCerFile.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //重命名
            renameOpen(info) {
                this.$prompt('请输入文件夹名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputValue: info.coQualifyTypeName,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    const prm = {
                        coQualifyTypeName: value,
                        coQualifyTypeId: info.coQualifyTypeId,
                        pid: this.currentRelated
                    }
                    this.$axios[this.$apiURL.certification.updateCompanyCerType.method](this.$apiURL.certification.updateCompanyCerType.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.getData()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            handleSelectionChange(sel) {
                console.log(sel)
                this.deleteList = []
                if (sel.length > 0) {
                    sel.forEach(item => {
                        this.deleteList.push({
                            keyId:item.coQualifyEncId?item.coQualifyEncId:item.coQualifyTypeId,
                            typeName:item.typeName
                        })
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
            padding: 0 0 0 27px;

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

            .page-wrapper {
                margin: 15px 0;
            }
        }
    }
</style>
