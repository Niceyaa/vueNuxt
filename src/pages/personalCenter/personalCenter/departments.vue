<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">部门管理</div>
            <div class="com-opt-wrapper">
                <!--<el-button type="danger" plain>删除</el-button>-->
                <el-button @click="addOpen" type="primary" plain>添加部门</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    class="file-table"
                    :data="reportData"
                    style="width: 100%">
                <el-table-column
                        prop="deptName"
                        label="名称"
                        min-width="300px">
                </el-table-column>
                <el-table-column
                        prop="personSum"
                        width="150px"
                        label="人数">
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button @click.native="editOpen(row)" :icon="'el-icon-edit-outline'" :btn-name="'编辑'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native="deleteHandle(row)" :icon="'el-icon-delete'" :btn-name="'删除'"></common-button>
                        </div>
                       <!-- <el-button size="mini" @click="editOpen(row)" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" @click="deleteHandle(row)" type="danger" icon="el-icon-delete">删除
                        </el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-drawer
                :close-on-press-escape="false"
                class="department-drawer"
                title="部门管理"
                :visible.sync="uploadFlag"
                direction="rtl">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
                <el-form-item label="部门名称" prop="deptName">
                    <el-input v-model="ruleForm.deptName"></el-input>
                </el-form-item>
                <!--<el-form-item label="公司名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'empty-page',
        data() {
            return {
                uploadFlag: false,
                reportData: [],
                ruleForm: {
                    deptName: null,
                    deptId: null
                },
                rules: {
                    deptName: [
                        {required: true, message: '请输入部门名称', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                this.$axios[this.$apiURL.user.getDepartmentList.method](this.$apiURL.user.getDepartmentList.url).then(res => {
                    this.reportData = res.data.result
                })
            },
            addOpen() {
                this.uploadFlag = true
                this.ruleForm.deptId = null
                this.ruleForm.deptName = null
            },
            editOpen(info) {
                this.uploadFlag = true
                this.ruleForm.deptName = info.deptName
                this.ruleForm.deptId = info.deptId
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        const prm = {
                            deptId: this.ruleForm.deptId,
                            deptName: this.ruleForm.deptName,
                        }
                        const fn = this.ruleForm.deptId ? this.$apiURL.user.updateDepartment : this.$apiURL.user.addDepartment
                        this.$axios[fn.method](fn.url, prm).then(res => {
                            this.$message.success(res.data.msg)
                            this.uploadFlag = false
                            this.getList()
                        })
                    }
                })
            },
            deleteHandle(info) {
                this.$confirm('此操作将永久删除该部门信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        deptId: info.deptId
                    })
                    this.$axios[this.$apiURL.user.deleteDepartment.method](this.$apiURL.user.deleteDepartment.url,prm).then(res => {
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
        }
    }
</style>
