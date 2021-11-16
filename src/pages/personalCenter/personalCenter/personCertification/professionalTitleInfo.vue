<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">职称信息</div>
            <el-button @click="addOpen" size="mini" type="primary">增加职称</el-button>
        </div>
        <div class="temp-material-content">
            <div class="router-nav-wrapper">
                <nuxt-link to="/personalCenter/personalCenter/members" class="back-wrapper">
                    <img src="~/assets/personal2/lastGrade.png" alt="">
                    <div class="back-text">返回上一级</div>
                </nuxt-link>
                <div class="separator-line"></div>
                <div class="nav-wrapper">
                    <router-link to="/personalCenter/personalCenter/members" class="nav-item">
                        <span>人员管理</span>
                        <span class="right-arrow">></span>
                    </router-link>
                    <div class="nav-item">
                        <span>职称信息</span>
                    </div>
                </div>
            </div>
            <div class="module-label">
                {{$route.query.name}}<span>职称信息</span>
            </div>
            <div class="desc-content">
                <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="legal-form">
                    <el-form-item label="职称证明" prop="name">
                        <singleFileUpload></singleFileUpload>
                    </el-form-item>
                    <el-form-item label="评定单位" prop="license">
                        <el-input v-model="ruleForm.license"></el-input>
                    </el-form-item>
                    <el-form-item label="职称级别" prop="name">
                        <el-select v-model="ruleForm.sex" placeholder="请选择学历">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职称名称" prop="license">
                        <el-input v-model="ruleForm.license"></el-input>
                    </el-form-item>
                    <el-form-item label="职称号" prop="license">
                        <el-input v-model="ruleForm.license"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="sub-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>-->
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="postName"
                            label="序号"
                            align="center"
                            width="80">
                        <template v-slot="row">{{row.$index+1}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="postName"
                            label="名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="certificateNo"
                            label="证书编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="titleCategory"
                            width="120"
                            label="职称类别">
                    </el-table-column>
                    <el-table-column
                            prop="acquisitionForm"
                            width="120"
                            label="取得形式">
                    </el-table-column>
                    <el-table-column
                            prop="acquisitionTime"
                            width="120"
                            label="取得时间">
                    </el-table-column>
                    <el-table-column
                            min-width="120"
                            label="操作">
                        <template v-slot="{row}">
                            <el-button size="mini" type="primary" @click="editOpen(row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteHandle(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                        :title="optTitle"
                        :visible.sync="addFlag"
                        width="70%"
                        center>
                    <el-form class="self-info-form" :label-position="labelPosition" ref="form" label-width="80px"
                             :model="form" :rules="rules">
                        <div class="form-part-wrapper">职称信息</div>
                        <div class="fill-item">
                            <el-form-item label="职称名称" prop="postName">
                                <el-input v-model="form.postName" placeholder="请填写职称名称"></el-input>
                            </el-form-item>
                            <el-form-item label="证书编号" prop="certificateNo">
                                <el-input v-model="form.certificateNo" placeholder="请填写证书编号"></el-input>
                            </el-form-item>
                            <el-form-item label="职称类别">
                                <el-input v-model="form.titleCategory" placeholder="请填写职称类别"></el-input>
                            </el-form-item>
                            <el-form-item label="取得形式">
                                <el-input v-model="form.acquisitionForm" placeholder="取得形式"></el-input>
                            </el-form-item>
                            <el-form-item label="取得时间">
                                <el-date-picker
                                        v-model="form.acquisitionTime"
                                        type="date"
                                        placeholder="取得时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="从事专业">
                                <el-input v-model="form.professional" placeholder="请填写从事专业"></el-input>
                            </el-form-item>
                            <el-form-item label="评定时工作年限">
                                <el-input type="number" v-model="form.workingYears" placeholder="请填写评定时工作年限">
                                    <template slot="append">年</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-part-wrapper">上传证件</div>
                        <div class="pic-flex-wrapper">
                            <div class="pic-example-item">
                                <div class="pic-label">样例</div>
                                <img class="license-pic" src="@/assets/certification/positionIcon.png" alt="">

                                <div class="license-tip">图片应清晰不模糊</div>
                            </div>
                        </div>
                        <div class="upload-pic-wrapper">
                            <upload-img :file-list.sync="frontFileList" :limit="limit"></upload-img>
                        </div>
                        <div class="separator-line"></div>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addFlag = false">取 消</el-button>
                        <el-button :loading="isSubmit" type="primary" @click="onSubmit('form')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import uploadImg from '@/components/uploadImg'
    import qs from 'qs'
    import axios from 'axios'

    export default {
        name: 'educationInfo',
        components: {uploadImg},
        data() {
            return {
                labelPosition: 'top',
                tableData: [],
                form: {
                    "fileIdList": [],
                    "personPostId": null,
                    "acquisitionForm": null,
                    "acquisitionTime": null,
                    "certificateNo": null,
                    "personId": null,
                    "postName": null,
                    "professional": null,
                    "titleCategory": null,
                    "workingYears": null
                },
                rules: {
                    postName: [
                        {required: true, message: '请填写职称名称', trigger: 'blur'}
                    ],
                    certificateNo: [
                        {required: true, message: '请填写证书编号', trigger: 'blur'}
                    ],
                },
                isSubmit: false,
                btnName: '点击上传',
                frontFileList: [],
                limit: 10,
                optTitle: '新增职称信息',
                addFlag: false,
                currentRelated: null
            }
        },
        mounted() {
            this.currentRelated = this.$route.query.id ? this.$route.query.id : null
            this.getInfo()
        },
        methods: {
            deleteHandle(info) {
                this.$confirm('此操作将永久删除该职称信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        personPostId: info.personPostId
                    })
                    this.$axios[this.$apiURL.certification.deletePositionInfo.method](this.$apiURL.certification.deletePositionInfo.url, prm).then(res => {
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
            addOpen() {
                this.addFlag = true
                this.frontFileList = []
                this.$nextTick(() => {
                    this.$refs['form'].resetFields()
                })
            },
            editOpen(info) {
                this.addFlag = true
                this.optTitle = '编辑职称信息'
                this.form.postName = info.postName
                this.form.fileIdList = []
                this.frontFileList = info.fileInfoList
                this.form.personPostId = info.personPostId
                this.form.acquisitionForm = info.acquisitionForm
                this.form.acquisitionTime = info.acquisitionTime
                this.form.certificateNo = info.certificateNo
                this.form.professional = info.professional
                this.form.titleCategory = info.titleCategory
                this.form.workingYears = info.workingYears
            },
            getInfo() {
                const prm = qs.stringify({
                    personId: this.currentRelated
                })
                this.$axios[this.$apiURL.certification.getPositionInfo.method](this.$apiURL.certification.getPositionInfo.url, prm).then(res => {
                    const {result} = res.data
                    this.tableData = result
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.frontFileList.length === 0) {
                            this.$message.error('至少上传一张职称证件')
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
                                this.uploadOneByOne(result, tempList, 0)
                            })
                        } else {
                            this.submitHandle()
                        }
                    }
                })


            },
            uploadOneByOne(uploadPrm, list, idx) {
                if (idx < uploadPrm.fileIds.length) {
                    const requestData = this.$returnUploadPrm(uploadPrm.fileIds[idx],uploadPrm,list[idx].raw)
                    /*const idxSite = list[idx].raw.name.indexOf('.')
                    const nameSite = list[idx].raw.name.substring(idxSite)
                    const requestData = new FormData()
                    const fileIdSite = uploadPrm.fileIds[idx]
                    const fileKeySite = uploadPrm.dir + fileIdSite + nameSite
                    requestData.append('policy', uploadPrm.policy)
                    requestData.append('signature', uploadPrm.signature)
                    requestData.append('ossaccessKeyId', uploadPrm.accessid)
                    requestData.append('callback', uploadPrm.callback)
                    requestData.append('key', fileKeySite)
                    requestData.append('companyid', uploadPrm.companyid)
                    requestData.append('name', list[idx].raw.name)
                    requestData.append('dir', uploadPrm.dir)
                    requestData.append('host', uploadPrm.host)
                    requestData.append('file', list[idx].raw)*/
                    axios({
                        url: uploadPrm.host,
                        method: 'post',
                        data: requestData
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.form.fileIdList.push(uploadPrm.fileIds[idx])
                            idx++
                            // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                            this.uploadOneByOne(uploadPrm, list, idx)
                        }
                    })
                } else {
                    this.submitHandle()
                }

            },
            submitHandle() {
                const prm = {
                    "fileIdList": this.form.fileIdList,
                    "personId": this.currentRelated,
                    "personPostId": this.form.personPostId,
                    "acquisitionForm": this.form.acquisitionForm,
                    "acquisitionTime": this.$lcgFormatDate(this.form.acquisitionTime),
                    "certificateNo": this.form.certificateNo,
                    "postName": this.form.postName,
                    "professional": this.form.professional,
                    "titleCategory": this.form.titleCategory,
                    "workingYears": this.form.workingYears,
                }
                this.isSubmit = true
                const fn = this.optTitle === '新增职称信息' ? this.$apiURL.certification.addPositionInfo : this.$apiURL.certification.updatePositionInfo
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.addFlag = false
                    this.isSubmit = false
                    this.getInfo()
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
            padding: 0 0 0 23px;

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
                    text-decoration: none;

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
                        text-decoration: none;
                        color: #596177;

                        &:hover {
                            color: @activeColor;
                        }

                        .right-arrow {
                            margin: 0 4px;
                        }
                    }
                }
            }

            .module-label {
                border-bottom: 1px solid #E8E8E8;
                padding: 50px 0 30px 0;
                text-align: center;
                font-size: 24px;
                font-family: @fontBoldMc;
                font-weight: bold;
                color: #1E2738;

                span {
                    color: #3272FF;
                }
            }

            .desc-content {
                display: flex;
                justify-content: center;
                padding-top: 50px;

                .legal-form {
                    .el-form-item {
                        margin-bottom: 40px;

                        .el-input {
                            width: 600px;
                        }

                        .el-textarea {
                            width: 600px;
                        }

                        .el-select {
                            width: 600px;
                        }

                        .sub-btn {
                            margin-left: 200px;
                            width: 130px;
                            height: 40px;
                        }

                        .license-wrapper {
                            .license-item {
                                display: flex;
                                align-items: center;
                                margin-top: 37px;

                                &:first-child {
                                    margin-top: 0;
                                }

                                .hidden-input {
                                    width: 1px;
                                    height: 1px;
                                    opacity: 0;
                                }

                                img {
                                    width: 200px;
                                    height: 130px;
                                    margin: 0 50px 0 0;
                                }
                            }

                            .upload-description {
                                font-size: 12px;
                                font-family: @fontMc;
                                color: #999999;
                            }
                        }
                    }
                }
            }
        }

        .self-info-form {
            width: 100%;

            .btn-form-item {
                display: flex;
                justify-content: center;
                padding-bottom: 50px;

                .sub-btn {
                    width: 114px;
                    height: 40px;
                }
            }

            .form-part-wrapper {
                font-size: 14px;
                font-weight: bold;
                color: #FF652D;
                padding: 20px 0 12px 0;
                border-bottom: 2px solid #F0F2F9;
            }

            .fill-item {
                display: flex;
                padding: 15px 0 0 0;
                flex-wrap: wrap;

                .el-form-item {
                    margin-right: 25px;

                    /deep/ .el-form-item__label {
                        line-height: 1px;
                        margin: 18px 0 10px 0;
                    }

                    .el-input {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                    }

                    .el-date-editor {

                    }
                }
            }

            .pic-flex-wrapper {
                padding-top: 32px;
                display: flex;
                flex-wrap: wrap;

                .pic-example-item {
                    width: 300px;
                    min-width: 300px;
                    margin-right: 195px;

                    &:last-child {
                        margin: 0;
                    }

                    .pic-label {
                        font-size: 13px;
                        font-weight: 400;
                        color: #202020;
                        padding-bottom: 15px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .license-pic {
                        width: 300px;
                        height: 180px;
                        border: 1px dashed #eee;
                    }
                }
            }

            .separator-line {
                width: 100%;
                height: 2px;
                background: #F0F2F9;
                margin: 60px 0 45px 0;
            }
        }

        .license-tip {
            padding-top: 8px;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            color: #A2A2A2;
        }

        .upload-pic-wrapper {
            margin-top: 20px;

            /deep/ .el-upload--picture-card {
                width: 300px;
                height: 180px;
                line-height: 180px;
            }

            /deep/ .el-upload-list__item {
                width: 300px;
                height: 180px;
            }
        }

    }
</style>
