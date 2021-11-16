<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">企业荣誉</div>
            <div class="com-opt-wrapper">
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
                <el-button @click="uploadOpen" type="primary" plain icon="el-icon-upload">上传</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    ref="multipleTable"
                    class="file-table"
                    :header-cell-style="setHeaderGray"
                    :data="reportData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="名称"
                        min-width="300px">
                    <template v-slot="{row}">
                        <div class="type-wrapper">
                            <img v-if="row.status" src="../../../assets/personal2/personal_icon_pdf@2x.png" alt="">
                            <img v-if="row.status" src="../../../assets/personal2/personal_icon_png@2x.png" alt="">
                            <img v-else src="../../../assets/personal2/personal_icon_word@2x.png" alt="">
                            <div class="file-name">{{row.title}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="荣誉名称"
                        min-width="300px">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="源发单位"
                        min-width="300px">
                </el-table-column>
                <el-table-column
                        prop="date"
                        width="350px"
                        label="年度">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="60px"
                        label="操作">
                    <template v-slot="{row}">
                        <el-dropdown class="opt-dropdown">
                            <img class="normal-icon" src="../../../assets/personal2/personal_more_normal@2x.png" alt="">
                            <img class="hover-icon" src="../../../assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>重命名</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog class="infoUploadDialog" align="center" width="770px" title="企业荣誉" :visible.sync="uploadFlag">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="荣誉名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="颁发单位" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="年度" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <dragUpload></dragUpload>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :loading="isSave" type="primary" @click="saveFodderHandle">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import defaultUrl from '../../../assets/personal2/personal_empty@2x.png'
    import dragUpload from '../../../components/dragUpload'

    export default {
        name: 'empty-page',
        components: {dragUpload},
        data() {
            return {
                uploadFlag: false,
                reportData: [
                    {status: true, title: '贵阳医学院实训采购院实训采购投标书院', type: '标书', date: '2021-01-01'},
                    {status: false, title: '贵阳医学院实训采购院实训采购投标书院', type: '标书', date: '2021-01-01'},
                    {status: false, title: '贵阳医学院实训采购院实训采购投标书院', type: '目录', date: '2021-01-01'},
                    {status: true, title: '贵阳医学院实训采购院实训采购投标书院', type: '标书', date: '2021-01-01'},
                ],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            }
        },
        props: {},
        methods: {
            uploadOpen() {
                this.uploadFlag = true
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
</style>
