<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">基本信息</div>
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
                        <span>基本信息</span>
                    </div>
                </div>
            </div>
            <div class="module-label">
                {{$route.query.name}}<span>基本信息</span>
            </div>
            <div class="desc-content">
                <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="legal-form">
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
                    <!--<el-form-item label="职位">
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
                        <el-button class="sub-btn" type="primary" @click="submitHandle('form')">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'workInfo',
        data() {
            return {
                departmentData: [],
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
                isSubmit: false,
                currentRelated: null,
            }
        },
        props: {},
        mounted() {
            this.currentRelated = this.$route.query.id ? this.$route.query.id : null
            this.getDepartList()
            this.getInfo()
        },
        methods: {
            getDepartList() {
                this.$axios[this.$apiURL.user.getDepartmentList.method](this.$apiURL.user.getDepartmentList.url).then(res => {
                    this.departmentData = res.data.result
                })
            },
            getInfo() {
                const prm = qs.stringify({
                    personId: this.currentRelated
                })
                this.$axios[this.$apiURL.certification.getUserBaseInfo.method](this.$apiURL.certification.getUserBaseInfo.url, prm).then(res => {
                    const {result} = res.data
                    this.form.address = result.address
                    this.form.cityId = result.cityId
                    this.form.position = result.position
                    this.form.companyId = result.companyId
                    this.form.deptId = result.deptId
                    this.form.idCardNum = result.idCardNum
                    this.form.personAge = result.personAge
                    this.form.personBirthday = result.personBirthday
                    this.form.personId = result.personId
                    this.form.personImgFileId = null
                    this.form.personName = result.personName
                    this.form.personPhone = result.personPhone
                    this.form.personSex = result.personSex
                    this.form.personState = result.personState

                })
            },
            submitHandle(formname) {
                this.$refs[formname].validate(valid=>{
                    if (valid) {

                    }
                })
                const prm = {
                    "address": this.form.address,
                    "cityId": this.form.cityId,
                    "companyId": this.form.companyId,
                    "deptId": this.form.deptId,
                    "idCardNum": this.form.idCardNum,
                    "personAge": this.form.personAge,
                    "personBirthday": this.form.personBirthday,
                    "personId": this.currentRelated,
                    "personImgFileId": this.form.personImgFileId,
                    "personName": this.form.personName,
                    "personPhone": this.form.personPhone,
                    "personSex": this.form.personSex,
                    "personState": this.form.personState,
                }
                this.isSubmit = true
                const fn = this.$apiURL.certification.updateUserBaseInfo
                this.$axios[fn.method](fn.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.getInfo()
                    this.isSubmit = false
                }).catch(err => {
                    this.isSubmit = false
                })
            },
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

                .el-form-item {
                    margin-bottom: 40px;
                }

                .el-input {
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
            }
        }

    }
</style>
