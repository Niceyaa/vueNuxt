<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">业绩列表</div>
            <div class="com-opt-wrapper">
                <!--<el-button type="danger" icon="el-icon-delete">删除</el-button>-->
                <el-button type="primary" plain @click="addOpen">新建业绩</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    class="file-table"
                    :data="reportData"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        align="center"
                        width="60">
                    <template v-slot="row">
                        {{row.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="performName"
                        label="业绩名称"
                        min-width="200px">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="金额"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="projectLeader"
                        label="项目负责人"
                        width="90px">
                </el-table-column>
                <el-table-column
                        prop="region"
                        label="区域"
                        width="120px">
                </el-table-column>
                <el-table-column
                        label="开工时间"
                        width="140px">
                    <template v-slot="{row}">
                        {{$lcgFormatDate(row.startTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="完工时间"
                        width="140px">
                    <template v-slot="{row}">
                        {{$lcgFormatDate(row.endTime)}}
                    </template>
                </el-table-column>
                <!--<el-table-column
                        prop="industryName"
                        width="150px"
                        align="center"
                        label="行业">
                </el-table-column>-->
                <el-table-column
                        width="100px"
                        label="附件管理">
                    <template v-slot="{row}">
                        <nuxt-link :to="'/personalCenter/personalCenter/performFile/'+row.performId">附件管理</nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button @click.native="editOpen(row)" :icon="'el-icon-edit-outline'"
                                           :btn-name="'编辑'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native="deleteHandle(row)" :icon="'el-icon-delete'"
                                           :btn-name="'删除'"></common-button>
                        </div>
                        <!--<el-dropdown class="opt-dropdown" @command="handleFoldCommand($event,row)">
                            <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png" alt="">
                            <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
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
                <el-form-item label="业绩名称:" :label-width="formLabelWidth" prop="performName">
                    <el-input style="width: 300px" v-model="form.performName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="项目负责人:" :label-width="formLabelWidth">
                    <el-input style="width: 300px" v-model="form.projectLeader" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="区域:" :label-width="formLabelWidth">
                    <el-input style="width: 300px" v-model="form.region" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="开工时间:" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.startTime"
                            type="date"
                            placeholder="开工时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="完工时间:" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.endTime"
                            type="date"
                            placeholder="完工时间">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="行业类型：" :label-width="formLabelWidth" prop="industryId">
                    <el-select style="width: 300px;" v-model="form.industryId" placeholder="请选择行业类型">
                        <el-option
                                v-for="item in industryList"
                                :key="item.industryId"
                                :label="item.industryName"
                                :value="item.industryId">
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="金额：" :label-width="formLabelWidth" prop="amount">-->
                <el-form-item label="金额：" :label-width="formLabelWidth" prop="amount" :rules="[
                {required: true,message:'金额不能为空'},
                {type:'number',message:'金额必须为数字'}
                ]">
                    <el-input style="width: 300px" v-model.number="form.amount" autocomplete="off">
                        <template slot="append">万元</template>
                    </el-input>
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
    import uploadImg from '@/components/uploadImg'
    import qs from 'qs'

    export default {
        name: 'performanceList',
        components: {uploadImg},
        data() {
            return {
                optTitle: '新增业绩',
                labelPosition: 'right',
                addFlag: false,
                formLabelWidth: '100px',
                form: {
                    "amount": null,
                    "companyId": null,
                    "industryId": null,
                    "performArea": null,
                    "performId": null,
                    "performName": null,
                    "endTime": null,
                    "startTime": null,
                    "region": null,
                    "projectLeader": null,
                    "performTypeId": null
                },
                rules: {
                    performName: [
                        {required: true, message: '请填写业绩名称', trigger: 'blur'}
                    ],
                   /* industryId: [
                        {required: true, message: '请选择行业', trigger: 'change'}
                    ],*/
                    performTypeId: [
                        {required: true, message: '请选择业绩类型', trigger: 'change'}
                    ],
                    /* amount: [
                         {required: true, message: '请填写金额', trigger: 'blur'}
                     ],*/
                },
                industryList: [],
                performTypes: [],
                performTypeProps: {
                    label: 'performTypeName',
                    value: 'performTypeId',
                    children: 'children',
                    emitPath: false,
                    checkStrictly: true
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
            this.getIndustryList()
            this.getList()
        },
        methods: {
            handleFoldCommand(command, info) {
                switch (command) {
                    case 'delete':
                        this.deleteHandle(info)
                        break
                    case 'edit':
                        this.editOpen(info)
                        break
                }
            },
            getIndustryList() {
                this.$axios[this.$apiURL.commonApi.getIndustryList.method](this.$apiURL.commonApi.getIndustryList.url).then(res => {
                    this.industryList = res.data.result
                })
            },
            handleCurrentChange(size) {
                this.currentPage = size
                this.getList()
            },
            goToUrl(info) {
                this.$router.push({
                    path: '/certification/performanceFile',
                    query: {
                        id: info.performId,
                        name: info.performName
                    }
                })
            },
            addOpen() {
                this.optTitle = '新增业绩'
                this.addFlag = true/*
                this.$nextTick(() => {
                    this.$refs['form'].resetFields()
                })*/
                this.form.amount = 0
                this.form.companyId = null
                this.form.industryId = null
                this.form.performArea = null
                this.form.performId = null
                this.form.performName = null
                this.form.region = null
                this.form.projectLeader = null
                this.form.startTime = null
                this.form.endTime = null
                this.form.performTypeId = null
            },
            editOpen(info) {
                this.addFlag = true
                this.optTitle = '编辑业绩'
                this.form.amount = info.amount?info.amount/10000:0
                this.form.companyId = info.companyId
                this.form.industryId = info.industryId
                this.form.performArea = info.performArea
                this.form.performId = info.performId
                this.form.region = info.region
                this.form.projectLeader = info.projectLeader
                this.form.startTime = info.startTime
                this.form.endTime = info.endTime
                this.form.performName = info.performName
                // this.form.performTypeId = info.performTypeId
            },
            deleteHandle(data) {
                this.$confirm(`此操作会将该业绩(${data.performName})从列表中移除，是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        performId: data.performId
                    })
                    this.$axios[this.$apiURL.certification.deletePerformance.method](this.$apiURL.certification.deletePerformance.url, [data.performId]).then(res => {
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
                            "amount": this.form.amount*10000,
                            "companyId": this.form.companyId,
                            // "industryId": this.form.industryId,
                            "performArea": this.form.performArea,
                            "performId": this.form.performId,
                            "endTime": this.$lcgFormatDate(this.form.endTime,1),
                            "startTime": this.$lcgFormatDate(this.form.startTime,1),
                            "projectLeader": this.form.projectLeader,
                            "region": this.form.region,
                            "performName": this.form.performName,
                            // "performTypeId": this.form.performTypeId
                        }
                        const fn = this.optTitle === '新增业绩' ? this.$apiURL.certification.addPerformance : this.$apiURL.certification.updatePerformance
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
                }
                this.$axios[this.$apiURL.certification.getPerformance.method](this.$apiURL.certification.getPerformance.url, prm).then(res => {
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
                    color: #313748 !important;
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
