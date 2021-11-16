<template>
    <el-container class="member-management">
        <el-aside width="260px" class="mem-info-menu">
            <div class="common-menus">
                <router-link v-for="item in commonClassify" :key="item.name"
                             :class="{'menu-item':true,'menuActive':item.name===$route.name}"
                             :to="item.url+'?id='+currentRelated+'&name='+currentName">
                    {{item.showName}}
                    <div class="blue-sign"></div>
                </router-link>
            </div>
            <el-divider class="define-label" content-position="center">自定义资质</el-divider>
            <div class="define-menus">
                <el-tree
                        accordion
                        class="define-menu-tree"
                        :data="treeData"
                        highlight-current
                        :expand-on-click-node="false"
                        :props="defaultProps"
                        @node-click="handleClassifyClick">
                </el-tree>
                <nuxt-link class="classify-tag" to="/personalCenter/personalCenter/certificationClassify">前往资质分类
                </nuxt-link>
            </div>
        </el-aside>
        <el-main style="padding:0">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "memManageIndex",
        data() {
            return {
                commonClassify: [
                    {
                        showName: '基本信息',
                        name: "personalCenter-personalCenter-personCertification-workInfo",
                        url: '/personalCenter/personalCenter/personCertification/workInfo'
                    },
                    {
                        showName: '身份信息',
                        name: "personalCenter-personalCenter-personCertification-licenseInfo",
                        url: '/personalCenter/personalCenter/personCertification/licenseInfo'
                    },
                    {
                        showName: '学历信息',
                        name: "personalCenter-personalCenter-personCertification-educationInfo",
                        url: '/personalCenter/personalCenter/personCertification/educationInfo'
                    },
                    {
                        showName: '社保信息',
                        name: "personalCenter-personalCenter-personCertification-socialSecurityInfo",
                        url: '/personalCenter/personalCenter/personCertification/socialSecurityInfo'
                    },
                    {
                        showName: '职称信息',
                        name: "personalCenter-personalCenter-personCertification-professionalTitleInfo",
                        url: '/personalCenter/personalCenter/personCertification/professionalTitleInfo'
                    },
                    /*{
                        showName: '合同信息',
                        name: "personalCenter-personalCenter-personCertification-contractInfo",
                        url: '/personalCenter/personalCenter/personCertification/contractInfo'
                    },*/
                ],
                treeData: [],
                defaultProps: {
                    label: 'personQualifyName',
                    value: 'personQualifyTypeId',
                    children: 'next',
                },
                currentTypeId: null,
                currentRelated: null,
                currentName: null,
            }
        },
        mounted() {
            this.currentRelated = this.$route.query.id ? this.$route.query.id : this.$route.params.pId
            this.currentName = this.$route.query.name ? this.$route.query.name : null
            this.currentTypeId = this.$route.params.tId ? parseInt(this.$route.params.tId) : null
            console.log('路由', this)
            this.getData()
        },
        methods: {
            handleClassifyClick(data) {
                this.$router.push({
                    path: `/personalCenter/personalCenter/personCertification/defineCertification/${data.personQualifyTypeId}?id=${this.currentRelated}&name=${this.currentName}`,
                })
            },
            getData() {
                this.$axios[this.$apiURL.certification.getSelfCerClassifyTree.method](this.$apiURL.certification.getSelfCerClassifyTree.url).then(res => {
                    this.treeData = res.data.result
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .member-management {
        background: #fff;
        height: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        .mem-info-menu {
            padding: 20px 0;
            height: 100%;
            min-width: 260px;
            flex: 0 260px;
            border-right: 1px solid #EEEEEE;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            overflow: hidden;

            .common-menus {
                .menu-item {
                    width: 260px;
                    height: 50px;
                    display: block;
                    position: relative;
                    line-height: 50px;
                    padding: 0 0 0 20px;
                    font-size: 14px;
                    font-family: @fontMc;
                    text-decoration: none;
                    color: #596177;

                    &.menuActive {
                        background: #F4F8FE;
                        font-weight: bold;

                        .blue-sign {
                            display: block;
                        }
                    }

                    &:hover {
                        background: #F4F8FE;
                        font-weight: bold;
                    }

                    .blue-sign {
                        display: none;
                        width: 3px;
                        height: 31px;
                        background: #2C7DFA;
                        border-radius: 0px 12px 12px 0px;
                        position: absolute;
                        left: 0;
                        top: 10px;
                    }
                }
            }

            .define-label {
                .el-divider__text {
                    font-weight: bold;
                    font-size: 16px;
                }
            }

            .define-menus {
                height: calc(100% - 350px);
                padding-bottom: 60px;
                position: relative;

                .define-menu-tree {
                    padding-left: 20px;

                    /deep/ .el-tree-node {
                        .el-tree-node__content {
                            padding-left: 20px;
                            height: 36px;
                        }
                    }
                }

                .classify-tag {
                    position: absolute;
                    bottom: 0;
                    left: 30px;
                    width: 200px;
                    height: 40px;
                    color: #fff;
                    text-decoration: none;
                    background: @activeColor;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 20px;
                }
            }
        }
    }

</style>
