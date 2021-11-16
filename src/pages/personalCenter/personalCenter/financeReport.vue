<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">财务报告</div>
            <div class="com-opt-wrapper">
                <!--<el-button type="danger" icon="el-icon-delete">删除</el-button>-->
                <el-button type="primary" plain @click="addOpen">新建报告</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <!--<div class="router-nav-wrapper">
                <div class="back-wrapper">
                    <img src="~/assets/personal2/lastGrade.png" alt="">
                    <div class="back-text">返回上一级</div>
                </div>
                <div class="separator-line"></div>
                <div class="nav-wrapper">
                    <div v-for="item in 4" class="nav-item" :key="item">
                        <span>公司模板</span>
                        <span class="right-arrow">></span>
                    </div>
                </div>
            </div>-->
            <el-table
                    ref="multipleTable"
                    class="file-table"
                    :data="reportData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <!--<el-table-column
                        type="selection"
                        width="55">
                </el-table-column>-->
                <el-table-column
                        label="报表名称"
                        min-width="200px">
                    <template v-slot="{row}">
                        <router-link
                                :to="{path:'/personalCenter/personalCenter/financeReportFile',query:{name:row.reportFormName,id:row.reportFormId}}"
                                class="type-wrapper">
                            <!--<img src="~/assets/personal2/personal_icon_file@2x.png" alt="">-->
                            <div class="file-name">{{row.reportFormName}}</div>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="reportFormTypeName"
                        width="280px"
                        align="center"
                        label="报表类型">
                </el-table-column>
                <el-table-column
                        width="180px"
                        label="创建时间">
                    <template v-slot="{row}">{{$lcgFormatDate(row.addTime)}}</template>
                </el-table-column>
                <el-table-column
                        width="260px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button @click.native="$router.push({
                            path: '/personalCenter/personalCenter/financeReportFile',
                            query: {name: row.reportFormName, id: row.reportFormId}
                        })" :icon="'el-icon-files'" :btn-name="'附件管理'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native="editOpen(row)" :icon="'el-icon-edit-outline'"
                                           :btn-name="'重命名'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native="deleteFoldHandle(row)" :icon="'el-icon-delete'"
                                           :btn-name="'删除'"></common-button>
                        </div>
                        <!--<el-dropdown class="opt-dropdown" @command="handleFoldCommand($event,row)">
                            <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png" alt="">
                            <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="file">附件管理</el-dropdown-item>
                                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->

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

        <el-dialog center width="480px" class="addEnterprise" :title="optTitle" :visible.sync="addFlag">
            <el-form :label-position="labelPosition" ref="form" :rules="rules" :model="form">
                <el-form-item label="报表名称:" :label-width="formLabelWidth" prop="reportFormName">
                    <el-input style="width: 300px" v-model="form.reportFormName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="报表类型：" :label-width="formLabelWidth" prop="reportFormType">
                    <el-select style="width: 300px;" v-model="form.reportFormType" placeholder="请选择报表类型">
                        <el-option
                                v-for="item in reportType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFlag = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'finance-report',
        data() {
            return {
                optTitle: '新增报表',
                labelPosition: 'left',
                addFlag: false,
                formLabelWidth: '100px',
                reportType: [ //1年报 2月报 3财务报表 4审计报告
                    {id: 1, name: '年报'},
                    {id: 2, name: '月报'},
                    {id: 3, name: '财务报表'},
                    {id: 4, name: '审计报告'},
                ],
                form: {
                    "reportFormId": null,
                    "reportFormName": null,
                    "reportFormType": null
                },
                rules: {
                    reportFormName: [
                        {required: true, message: '请填写报表名称', trigger: 'blur'}
                    ],
                    reportFormType: [
                        {required: true, message: '请选择报表类型', trigger: 'change'}
                    ],
                },
                reportData: [],
                btnName: '点击上传',
                frontFileList: [],
                isSubmit: false,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                searchInfo: {
                    dateType: 0,
                    queryDate: null
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            //操作菜单
            handleFoldCommand(command, info) {
                switch (command) {
                    case 'delete':
                        this.deleteFoldHandle(info)
                        break
                    case 'edit':
                        this.editOpen(info)
                        break
                    case "file":
                        this.$router.push({
                            path: '/personalCenter/personalCenter/financeReportFile',
                            query: {name: info.reportFormName, id: info.reportFormId}
                        })
                }
            },
            addOpen() {
                this.optTitle = '新增报表'
                this.addFlag = true
                this.form.reportFormId = null
                this.form.reportFormName = null
                this.form.reportFormType = null
            },
            editOpen(data) {
                this.addFlag = true
                this.optTitle = '编辑报表'
                this.form.reportFormId = data.reportFormId
                this.form.reportFormName = data.reportFormName
                this.form.reportFormType = data.reportFormType
            },
            handleCurrentChange(size) {
                this.currentPage = size
            },
            deleteFoldHandle(data) {
                this.$confirm(`此操作会将该报表(${data.reportFormName})从列表中移除，是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        reportFormId: data.reportFormId
                    })
                    this.$axios[this.$apiURL.certification.deleteFinancialStatement.method](this.$apiURL.certification.deleteFinancialStatement.url, prm).then(res => {
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
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        const prm = {
                            "reportFormId": this.form.reportFormId,
                            "reportFormName": this.form.reportFormName,
                            "reportFormType": this.form.reportFormType
                        }
                        const fn = this.optTitle === '新增报表' ? this.$apiURL.certification.addFinancialStatement : this.$apiURL.certification.updateFinancialStatement
                        this.$axios[fn.method](fn.url, prm).then(res => {
                            this.$message.success(res.data.msg)
                            this.addFlag = false
                            this.getList()
                        })
                    }
                })
            },
            getList() {
                const prm = {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    dateType: this.searchInfo.dateType,
                    queryDate: this.searchInfo.queryDate
                }
                this.$axios[this.$apiURL.certification.getFinancialStatement.method](this.$apiURL.certification.getFinancialStatement.url, prm).then(res => {
                    const {result} = res.data
                    this.reportData = result.list
                    this.total = result.total
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
                    color: @activeColor !important;
                    cursor: pointer;
                    text-decoration: none;

                    &:hover {
                        color: @activeColor;
                    }

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
