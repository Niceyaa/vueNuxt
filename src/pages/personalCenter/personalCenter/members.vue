<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">人员管理</div>
        </div>
        <div class="temp-material-content">
            <div class="member-wrapper">
                <div class="member-item">
                    <img src="~/assets/personal2/icon_whole@2x.png" alt="">
                    <div class="member-right">
                        <div class="member-label">10<span>人</span></div>
                        <div class="member-desc">全部人员</div>
                    </div>
                </div>
                <div class="member-item">
                    <img src="~/assets/personal2/icon_senior@2x.png" alt="">
                    <div class="member-right">
                        <div class="member-label">23<span>人</span></div>
                        <div class="member-desc">高等职称</div>
                    </div>
                </div>
                <div class="member-item">
                    <img src="~/assets/personal2/icon_intermediate@2x.png" alt="">
                    <div class="member-right">
                        <div class="member-label">23<span>人</span></div>
                        <div class="member-desc">中等职称</div>
                    </div>
                </div>
                <div class="member-item">
                    <img src="~/assets/personal2/icon_lower@2x.png" alt="">
                    <div class="member-right">
                        <div class="member-label">23<span>人</span></div>
                        <div class="member-desc">低级职称</div>
                    </div>
                </div>
            </div>
            <div class="label-wrapper">
                <div class="label-text">员工列表</div>
                <div class="btn-wrapper">
                    <!--<el-button type="danger" plain>删除</el-button>-->
                    <el-button type="primary" plain @click="addOpen">添加人员</el-button>
                </div>
            </div>
            <el-table
                    class="file-table"
                    :data="memberList"
                    @row-click="rowClick"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        align="center"
                        width="100">
                    <template v-slot="row">
                        {{row.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="personName"
                        label="姓名"
                        align="center"
                        width="140px">
                    <template v-slot="{row}">
                        <nuxt-link style="color: #3977FF;text-decoration: none"
                                   :to="'/personalCenter/personalCenter/personCertification/workInfo?id='+row.personId+'&name='+row.personName">
                            {{row.personName}}
                        </nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="personPhone"
                        width="200px"
                        label="电话号码">
                </el-table-column>
                <el-table-column
                        prop="idCardNum"
                        min-width="200px"
                        label="身份证">
                </el-table-column>
                <el-table-column
                        prop="idCardNum"
                        width="100px"
                        label="状态">
                    <template v-slot="{row}">
                        <el-tag v-if="row.personState===1" type="success">正常</el-tag>
                        <el-tag v-else type="warning">禁止</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button @click.native.stop="editOpen(row)" :icon="'el-icon-edit-outline'" :btn-name="'编辑'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native.stop="deleteHandle(row)" :icon="'el-icon-delete'" :btn-name="'删除'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <el-dropdown class="opt-dropdown" @command="handleFoldCommand($event,row)">
                                <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png" alt="">
                                <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="licenseInfo" icon="el-icon-postcard">身份信息</el-dropdown-item>
                                    <el-dropdown-item command="educationInfo" icon="el-icon-toilet-paper">学历信息
                                    </el-dropdown-item>
                                    <el-dropdown-item command="socialSecurityInfo" icon="el-icon-suitcase-1">社保信息
                                    </el-dropdown-item>
                                    <el-dropdown-item command="contractInfo" icon="el-icon-document">合同信息</el-dropdown-item>
                                    <el-dropdown-item command="positionInfo" icon="el-icon-user">职称信息</el-dropdown-item>
                                    <el-dropdown-item command="uploadMore" icon="el-icon-upload2" divided>上传更多
                                    </el-dropdown-item>
                                    <!--<el-dropdown-item command="edit" icon="el-icon-edit-outline" divided>编辑
                                    </el-dropdown-item>
                                    <el-dropdown-item command="delete" icon="el-icon-delete" divided>删除
                                    </el-dropdown-item>-->
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>


                    </template>
                </el-table-column>
            </el-table>
            <div class="page-wrapper" v-if="pageSize<total">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-drawer
                class="department-drawer"
                title="人员管理"
                :visible.sync="addFlag"
                direction="rtl">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
                <el-form-item label="姓名" prop="personName">
                    <el-input v-model="form.personName"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <el-select v-model="form.deptId" placeholder="请选择部门">
                        <el-option
                                v-for="item in departmentData"
                                :key="item.deptId"
                                :label="item.deptName"
                                :value="item.deptId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证" prop="idCardNum">
                    <el-input v-model="form.idCardNum"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.personPhone"></el-input>
                </el-form-item>
               <!-- <el-form-item label="职位">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>-->
                <el-form-item label="性别">
                    <el-select v-model="form.personSex" placeholder="请选择">
                        <el-option label="男" :value="1"/>
                        <el-option label="女" :value="2"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.personAge"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="form.personState" :label="1">正常</el-radio>
                    <el-radio v-model="form.personState" :label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input type="textarea" v-model="form.address" autocomplete="off"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
    import qs from 'qs'
    import dragUpload from '~/components/dragUpload'

    export default {
        name: 'empty-page',
        components: {dragUpload},
        data() {
            return {
                departmentData: [],
                optTitle: '新增人员信息',
                labelPosition: 'right',
                addFlag: false,
                formLabelWidth: '80px',
                form: {
                    "address": null,
                    "cityId": null,
                    "companyId": null,
                    "deptId": null,
                    "idCardNum": null,
                    "personAge": null,
                    "position": null,
                    "personBirthday": null,
                    "personId": null,
                    "personImgFileId": null,
                    "personName": null,
                    "personPhone": null,
                    "personSex": null,
                    "personState": 1
                },
                rules: {
                    personName: [
                        {required: true, message: '请填写人员姓名', trigger: 'blur'}
                    ],
                    personPhone: [
                        {required: true, message: '请填写人员电话', trigger: 'blur'}
                    ],
                    idCardNum: [
                        {required: true, message: '请填写人员身份证', trigger: 'blur'},
                        {min: 18, max: 18, message: '身份证需为18位'}
                    ],
                    deptId: [
                        {required: true, message: '请选择部门', trigger: 'change'}
                    ],
                },
                sexData: [
                    {
                        label: '男',
                        value: 1
                    },
                    {
                        label: '女',
                        value: 2
                    }
                ],
                memberList: [],
                btnName: '点击上传',
                frontFileList: [],
                isSubmit: false,
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        mounted() {
            this.getMemberList()
            this.getDepartList()
        },
        methods: {
            rowClick(row){
                this.$router.push({
                    path:`/personalCenter/personalCenter/personCertification/workInfo?id=${row.personId}&name=${row.personName}`
                })
            },
            handleFoldCommand(command, info) {
                switch (command) {
                    case 'delete':
                        this.deleteHandle(info)
                        break
                    case 'edit':
                        this.editOpen(info)
                        break
                    case 'licenseInfo':
                        this.goToUrl('/personalCenter/personalCenter/personCertification/licenseInfo', info)
                        break
                    case 'educationInfo':
                        this.goToUrl('/personalCenter/personalCenter/personCertification/educationInfo', info)
                        break
                    case 'socialSecurityInfo':
                        this.goToUrl('/personalCenter/personalCenter/personCertification/socialSecurityInfo', info)
                        break
                    case 'contractInfo':
                        this.goToUrl('/personalCenter/personalCenter/personCertification/contractInfo', info)
                        break
                    case 'positionInfo':
                        this.goToUrl('/personalCenter/personalCenter/personCertification/professionalTitleInfo', info)
                        break
                    case 'uploadMore':
                        this.goToUrl('/personalCenter/personalCenter/personCertification/workInfo', info)
                        break
                }
            },
            getDepartList() {
                this.$axios[this.$apiURL.user.getDepartmentList.method](this.$apiURL.user.getDepartmentList.url).then(res => {
                    this.departmentData = res.data.result
                })
            },
            goToUrl(path, info) {
                this.$router.push({
                    path,
                    query: {
                        id: info.personId,
                        name: info.personName
                    }
                })
            },
            addOpen() {
                this.addFlag = true
                this.frontFileList = []
                this.$nextTick(() => {
                    this.$refs['form'].resetFields()
                })
                this.form.address = null
                this.form.cityId = null
                this.form.position = null
                this.form.companyId = null
                this.form.deptId = null
                this.form.idCardNum = null
                this.form.personAge = null
                this.form.personBirthday = null
                this.form.personId = null
                this.form.personImgFileId = null
                this.form.personName = null
                this.form.personPhone = null
                this.form.personSex = null
                this.form.personState = 2
            },
            handleCurrentChange(size) {
                this.currentPage = size
                this.getMemberList()
            },
            editOpen(data) {
                this.addFlag = true
                this.frontFileList = []
                this.optTitle = '编辑人员信息'
                this.form.address = data.address
                this.form.cityId = data.cityId
                this.form.position = data.position
                this.form.companyId = data.companyId
                this.form.deptId = data.deptId
                this.form.idCardNum = data.idCardNum
                this.form.personAge = data.personAge
                this.form.personBirthday = data.personBirthday
                this.form.personId = data.personId
                this.form.personImgFileId = null
                this.form.personName = data.personName
                this.form.personPhone = data.personPhone
                this.form.personSex = data.personSex
                this.form.personState = data.personState
                data.personImgFileUrl ? this.frontFileList.push({
                    url: data.personImgFileUrl
                }) : ""
                console.log(1, data)
            },
            deleteHandle(data) {
                this.$confirm(`此操作会将该用户(${data.personName})从列表中移除，是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        personId: data.personId
                    })
                    this.$axios[this.$apiURL.certification.deleteUserBaseInfo.method](this.$apiURL.certification.deleteUserBaseInfo.url, prm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getMemberList()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.frontFileList.length > 0 && this.frontFileList[0].raw) {
                            let prm = qs.stringify({
                                fileNum: 1,
                                uploadType: 400
                            })
                            this.isSubmit = true
                            getUploadParams(prm).then(res => {
                                const {result} = res.data
                                const idxSite = this.frontFileList[0].raw.name.indexOf('.')
                                const nameSite = this.frontFileList[0].raw.name.substring(idxSite)
                                const requestData = new FormData()
                                const fileIdSite = result.fileIds[0]
                                const fileKeySite = result.dir + fileIdSite + nameSite
                                requestData.append('policy', result.policy)
                                requestData.append('signature', result.signature)
                                requestData.append('ossaccessKeyId', result.accessid)
                                requestData.append('key', fileKeySite)
                                requestData.append('callback', result.callback)
                                requestData.append('dir', result.dir)
                                requestData.append('host', result.host)
                                requestData.append('file', this.frontFileList[0].raw)
                                axios({
                                    url: result.host,
                                    method: 'post',
                                    data: requestData
                                }).then((res) => {
                                    if (res.data.code === 200) {
                                        this.form.personImgFileId = result.fileIds[0]
                                        // this.bannerForm.imgUrl = result.host + '/' + fileKeySite
                                        this.submitHandle()
                                    }
                                })
                            })
                        } else {
                            this.submitHandle()
                        }
                    }
                })
            },
            submitHandle() {
                const prm = {
                    "address": this.form.address,
                    "cityId": this.form.cityId,
                    "companyId": this.form.companyId,
                    "deptId": this.form.deptId,
                    "idCardNum": this.form.idCardNum,
                    "personAge": this.form.personAge,
                    "personBirthday": this.form.personBirthday,
                    "personId": this.form.personId,
                    "personImgFileId": this.form.personImgFileId,
                    "personName": this.form.personName,
                    "personPhone": this.form.personPhone,
                    "personSex": this.form.personSex,
                    "personState": this.form.personState,
                }
                this.isSubmit = true
                const fn = this.optTitle === '新增人员信息' ? this.$apiURL.certification.addUserBaseInfo : this.$apiURL.certification.updateUserBaseInfo
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.addFlag = false
                    this.getMemberList()
                    this.isSubmit = false
                }).catch(err => {
                    this.isSubmit = false
                })
            },
            getMemberList() {
                const prm = {
                    pageSize: this.pageSize,
                    callScenario: 2,
                    pageNum: this.currentPage
                }
                this.$axios[this.$apiURL.certification.getMemberList.method](this.$apiURL.certification.getMemberList.url, prm).then(res => {
                    const {result} = res.data
                    this.memberList = result.list
                    this.total = result.total
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
            margin-top: 20px;

            .member-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .member-item {
                    flex: .4;
                    margin-right: 40px;
                    padding: 0 0 0 52px;
                    display: flex;
                    align-items: center;
                    height: 118px;
                    background: #FFFFFF;
                    box-shadow: 0px 0px 21px 0px #F1F1F1;
                    border-radius: 8px;
                    font-size: 14px;
                    font-family: @fontMc;
                    color: #666666;

                    &:last-child {
                        margin-right: 0;
                    }

                    .member-label {
                        font-size: 30px;
                        font-weight: 600;
                        color: #1E2738;
                        font-family: @fontBoldMc;
                        padding-bottom: 10px;

                        span {
                            font-size: 12px;
                            font-family: @fontMc;
                            color: #596177;
                            font-weight: normal;
                        }
                    }

                    img {
                        width: 30px;
                        height: 30px;
                        margin-right: 29px;
                    }
                }
            }

            .label-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 40px 0 0 0;
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
    }

    .department-drawer {
        .el-drawer__body {
            padding: 0 50px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            .el-input {
                width: 280px;
            }

            .el-textarea {
                width: 280px;
            }
        }
    }
</style>
