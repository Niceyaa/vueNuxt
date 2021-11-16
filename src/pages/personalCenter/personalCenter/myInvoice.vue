<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">
                <div class="name-label">我的发票</div>
                <div class="invoice-tips">
                    <img src="~/assets/personal2/icon_tips@2x.png" alt="">
                    <span>温馨提示：申请后三个工作日开出发到邮箱</span>
                </div>
            </div>
            <div class="com-opt-wrapper">
                <el-button type="primary" plain @click="$router.push('/personalCenter/personalCenter/myOrder')">申请发票
                </el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    class="markDocTable"
                    :header-cell-style="setHeaderGray"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        align="center"
                        width="180px">
                    <template v-slot="scope">
                        {{scope.$index+1+pageSize*(currentPage-1)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="公司名称"
                        align="center"
                        prop="companyName"
                        width="240px">
                </el-table-column>
                <el-table-column
                        label="发票总金额"
                        prop="accountTotal"
                        width="200px">
                </el-table-column>
                <el-table-column
                        label="申请时间"
                        prop="applyTime"
                        width="240px">
                </el-table-column>
                <el-table-column
                        label="发票状态"
                        prop="invoiceStateName"
                        min-width="140px">
                </el-table-column>
            </el-table>
            <div class="page-wrapper" v-if="total>pageSize">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'empty-page',
        data() {
            return {
                tableData: [],
                pageSize: 10,
                currentPage: 1,
                total: 1,
                searchInfo: {
                    endDate: null,
                    startDate: null,
                }
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            getList(){
                const prm = {
                    "endDate": this.searchInfo.endDate,
                    "pageNum": this.currentPage,
                    "pageSize": this.pageSize,
                    "startDate": this.searchInfo.startDate
                }
                this.$axios[this.$apiURL.personal.getInvoiceList.method](this.$apiURL.personal.getInvoiceList.url, prm).then(res => {
                    this.tableData = res.data.result.list
                    this.total = res.data.result.total
                })
            },
            handleSelectionChange(val) {

            },
            handleSizeChange(size){

            },
            handleCurrentChange(page){

            },
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

            .com-name {
                display: flex;
                align-items: center;

                .invoice-tips {
                    margin-left: 40px;
                    font-size: 14px;
                    font-family: @fontMc;
                    color: #96A1AB;
                    font-weight: normal;
                    display: flex;
                    align-items: center;

                    img {
                        width: 14px;
                        height: 14px;
                        margin-right: 10px;
                    }
                }
            }

            .el-button {
                width: 120px;
                height: 40px;
            }
        }


        .temp-material-content {
            padding: 0 0 0 27px;

            .file-table {
                margin-top: 25px;
            }

            .page-wrapper {
                margin: 20px 0;
            }
        }

    }
</style>
