<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">成员管理</div>
        </div>
        <div class="member-explain">
            <img src="../../../assets/personal/personal_icon_details@2x.png" alt="">
            <div class="member-detail">
                <div class="member-label">会员详情</div>
                <div class="member-detail-info">
                    <!--<div class="info-desc">会员类型：企业会员（1人版）</div>
                    <div class="account-type">账号类型：'主账号'</div>
                    <div class="info-desc">会员截止时间：202020220</div>-->
                    <div class="info-desc" v-if="$store.state.userVipInfo.purchaseNums>1">会员类型：企业会员（{{$store.state.userVipInfo.purchaseNums}}人版）</div>
                    <div class="info-desc" v-else>会员类型：个人版会员</div>
                    <div class="account-type">账号类型：{{$store.state.userVipInfo.mainAccountFlag?'主账号':'成员账号'}}
                    </div>
                    <div class="info-desc">会员截止时间：{{$store.state.userVipInfo.termOfValidity}}</div>
                </div>
            </div>
        </div>
        <div class="temp-material-content">
            <div class="label-wrapper">
                <div class="label-text">成员列表</div>
                <div class="btn-wrapper">
                    <!--<el-button type="danger" plain>删除</el-button>-->
                    <el-button type="primary" plain @click="openAddDialog" v-if="$store.state.userVipInfo.purchaseNums>1">添加人员</el-button>
                </div>
            </div>
            <el-table
                    class="markDocTable"
                    :header-cell-style="setHeaderGray"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="用户名"
                        prop="userNick"
                        width="180px">
                </el-table-column>
                <el-table-column
                        label="所属公司"
                        prop="companyName"
                        width="240px">
                </el-table-column>
                <el-table-column
                        label="电话"
                        prop="userPhone"
                        width="180px">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="主账号"
                        width="90px">
                    <template v-slot="{row}">
                        {{row.isAdmin?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="240px">
                    <template v-slot="{row}">
                        <el-button v-if="!row.isAdmin" @click="deleteHandle(row)" size="mini" type="danger">移除账号</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--<el-drawer
                class="department-drawer"
                title="添加成员"
                :visible.sync="uploadFlag"
                direction="rtl">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="name">
                    <el-select v-model="ruleForm.name" placeholder="请选择">
                        <el-option label="管理员" value="1" />
                        <el-option label="成员" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保  存</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>-->

        <el-dialog width="440px" title="添加成员" :visible.sync="dialogFlag">
            <el-form :model="form" ref="form">
                <!--<el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>-->
                <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
                    <el-input maxlength="11" @input="getInfo" v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: center;" slot="footer" class="dialog-footer">
                <el-button @click="dialogFlag = false">取 消</el-button>
                <el-button :disabled="!infoFlag" type="primary" @click="addHandle">添 加</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import qs from 'qs'
    import defaultUrl from '../../../assets/personal2/personal_empty@2x.png'
    import dragUpload from '../../../components/dragUpload'

    export default {
        name: 'empty-page',
        components: {dragUpload},
        data() {
            return {
                infoFlag: false,
                formLabelWidth: '100px',
                form: {
                    name: null,
                    phone: null
                },
                rules: {
                    name: [{
                        required: true, message: '请填写用户名', trigger: 'blur'
                    }],
                    phone: [{
                        required: true, message: '请填写手机号', trigger: 'blur'
                    }],
                },
                dialogFlag: false,
                tableData: [],
                pageSize: 10,
                currentPage: 1,
                total: 1
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            addHandle() {
                const prm = qs.stringify({
                    userPhone: this.form.phone
                })
                this.$axios[this.$apiURL.personal.addVipMember.method](this.$apiURL.personal.addVipMember.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.dialogFlag = false
                    this.getList()
                })
            },
            getInfo() {
                if (this.form.phone.length === 11) {
                    const prm = qs.stringify({
                        userPhone: this.form.phone
                    })
                    this.$axios[this.$apiURL.personal.getInfoByPhone.method](this.$apiURL.personal.getInfoByPhone.url, prm).then(res => {
                        const {result} = res.data
                        if (result) {
                            this.infoFlag = true
                            this.$message.success('查询到用户信息，可以添加')
                        } else {
                            this.$message.error('未查询到用户信息')
                            this.infoFlag = false
                        }
                    })
                } else {
                    this.infoFlag = false
                }
            },
            deleteHandle(info) {
                this.$confirm(`此操作会将该(${info.userName})用户从会员中移除, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        companyUserId: info.companyUserId
                    })
                    this.$axios[this.$apiURL.personal.deleteVipMember.method](this.$apiURL.personal.deleteVipMember.url, prm).then(res => {
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
            openAddDialog() {
                this.dialogFlag = true
                this.form.name = null
                this.form.phone = null
                this.$nextTick(() => {
                    this.$refs['form'].resetFields()
                })
            },
            getList() {
                this.$axios[this.$apiURL.personal.getVipMember.method](this.$apiURL.personal.getVipMember.url).then(res => {
                    this.tableData = res.data.result
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

        .member-explain {
            height: 83px;
            background: #F4FBF8;
            border-radius: 5px;
            border: 1px solid #D7EEE2;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            img {
                width: 34px;
                height: 34px;
                padding: 2px 19px 2px 21px;
                border-right: 1px solid #D7EEE2;
            }

            .member-detail {
                padding-left: 25px;

                .member-label {
                    font-size: 15px;
                    font-weight: bold;
                    color: #333333;
                    margin-bottom: 8px;
                }

                .member-detail-info {
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    color: #333333;

                    .account-type {
                        margin: 0 54px;
                    }
                }
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
        }
    }
</style>
