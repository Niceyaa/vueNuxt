<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">资质分类管理</div>
            <div class="com-opt-wrapper">
                <el-button v-show="deleteList.length>0" type="danger" icon="el-icon-delete" @click="multipleDeleteHandle">删除</el-button>
                <el-button type="primary" plain @click="addFolderClassify">新建分类</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <div class="router-nav-wrapper" v-if="alreadyExistClassify.length>1">
              <!--  <div class="back-wrapper">
                    <img src="~/assets/personal2/lastGrade.png" alt="">
                    <div class="back-text">返回上一级</div>
                </div>
                <div class="separator-line"></div>-->
                <div class="nav-wrapper">
                    <div @click="goToInnerClassifyData(item)" v-for="(item,idx) in alreadyExistClassify"
                         :key="item.personQualifyTypeId"  class="nav-item">
                        <span>{{item.personQualifyName}}</span>
                        <span v-if="idx!==alreadyExistClassify.length-1" class="right-arrow">></span>
                    </div>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    class="file-table"
                    :header-cell-style="setHeaderGray"
                    :data="certificationClassifyData"
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
                        <div @click="getInnerClassifyData(row)" class="type-wrapper">
                            <img src="~/assets/personal2/personal_icon_file@2x.png" alt="">
                            <div class="file-name">{{row.personQualifyName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作">
                    <template v-slot="{row}">
                        <div style="display: flex;align-items: center;">
                            <common-button @click.native="renameOpen(row)" :icon="'el-icon-edit-outline'"
                                           :btn-name="'重命名'"></common-button>
                            <el-divider direction="vertical"></el-divider>
                            <common-button @click.native="deleteHandle(row)" :icon="'el-icon-delete'"
                                           :btn-name="'删除'"></common-button>
                        </div>
                       <!-- <el-dropdown class="opt-dropdown" @command="handleFoldCommand($event,row)">
                            <img class="normal-icon" src="~/assets/personal2/personal_more_normal@2x.png" alt="">
                            <img class="hover-icon" src="~/assets/personal2/personal_more_hover@2x.png" alt="">
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="edit">重命名</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->

                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: 'certificationClassify',
        data() {
            return {
                deleteList: [],
                currentRelated: null,
                certificationClassifyData: [],
                alreadyExistClassify: [],
            }
        },
        mounted() {
            this.getData()
            this.alreadyExistClassify = [
                {
                    personQualifyTypeId: null,
                    personQualifyName: '全部分类'
                }
            ]
        },
        methods: {
            //操作菜单
            handleFoldCommand(command,info){
                switch(command){
                    case 'delete':
                        this.deleteHandle(info)
                        break
                    case 'edit':
                        this.renameOpen(info)
                        break
                }
            },
            //新建自定义分类
            addFolderClassify() {
                this.$prompt('请输入新建分类名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    const prm = {
                        "personQualifyName": value,
                        "pid": this.currentRelated
                    }
                        this.$axios[this.$apiURL.certification.addUserSelfCerClassify.method](this.$apiURL.certification.addUserSelfCerClassify.url, prm).then(res => {
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

            //批量删除
            multipleDeleteHandle() {
                this.$confirm('此操作将永久删除该文件夹和文件夹下面的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios[this.$apiURL.certification.deleteUserSelfCerClassify.method](this.$apiURL.certification.deleteUserSelfCerClassify.url, this.deleteList).then(res => {
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
            deleteHandle(info){
                this.$confirm('此操作将永久删除该资质分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const prm = qs.stringify({
                        personQualifyTypeId:info.personQualifyTypeId
                    })
                    this.$axios[this.$apiURL.certification.deleteUserSelfCerClassify.method](this.$apiURL.certification.deleteUserSelfCerClassify.url, [info.personQualifyTypeId]).then(res => {
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
            renameOpen(info){
                this.$prompt('请输入分类名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                    inputValue: info.personQualifyName,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    const prm = {
                        personQualifyTypeId: info.personQualifyTypeId,
                        personQualifyName:value,
                        pid: info.pid
                    }
                    this.$axios[this.$apiURL.certification.updateUserSelfCerClassify.method](this.$apiURL.certification.updateUserSelfCerClassify.url, prm).then(res => {
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
                this.currentRelated = info.personQualifyTypeId
                this.alreadyExistClassify.push(info)
                this.getData()
            },
            //点击面包屑获取数据
            goToInnerClassifyData(info) {
                if (info.personQualifyTypeId === this.currentRelated) return
                let idx1 = 0
                this.alreadyExistClassify.forEach((item, idx) => {
                    if (item.personQualifyTypeId === info.personQualifyTypeId) {
                        idx1 = idx
                    }
                })
                this.alreadyExistClassify.splice(idx1 + 1)
                this.currentRelated = info.personQualifyTypeId
                this.getData()
            },
            //获取分类数据
            getData() {
                this.deleteList = []
                const prm = qs.stringify({
                    "personQualifyTypeId": this.currentRelated
                })
                this.$axios[this.$apiURL.certification.getUserSelfCerClassify.method](this.$apiURL.certification.getUserSelfCerClassify.url, prm).then(res => {
                    this.certificationClassifyData = res.data.result
                })
            },
            handleSelectionChange(sel){
                console.log(sel)
                this.deleteList = []
                if (sel.length > 0) {
                    sel.forEach(item=>{
                        this.deleteList.push(item.personQualifyTypeId,)
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
