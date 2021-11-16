<template>
    <div class="template-or-material">
        <div class="temp-material-header">
            <div class="com-name">我的订单</div>
            <div class="com-opt-wrapper">
                <el-button type="primary" plain @click="applyOpen">申请发票</el-button>
            </div>
        </div>
        <div class="temp-material-content">
            <el-table
                    class="markDocTable"
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        :selectable="canSelectFn"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="订单编号"
                        prop="orderId"
                        width="280px">
                </el-table-column>
                <el-table-column
                        label="订单金额"
                        prop="orderAmount"
                        width="90px">
                </el-table-column>
                <el-table-column
                        label="订单状态"
                        prop="orderStateName"
                        width="120px">
                </el-table-column>
                <el-table-column
                        label="支付方式"
                        prop="paymentTypeName"
                        width="140px">
                </el-table-column>
                <el-table-column
                        label="发票状态"
                        prop="invoiceStateName"
                        width="120px">
                </el-table-column>
                <el-table-column
                        label="支付渠道"
                        prop="paymentChannelName"
                        width="140px">
                </el-table-column>
                <el-table-column
                        min-width="300px"
                        prop="validityTime"
                        label="有效期">
                </el-table-column>
                <!--<el-table-column
                        prop="companyName"
                        width="300px"
                        align="center"
                        label="公司名称">
                </el-table-column>-->
            </el-table>
            <div class="page-wrapper">
                <el-pagination
                        :hide-on-single-page="true"
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
        <invoiceDialog @success="getList" :order-id-list="orderIdList" :total-amount="totalAmount"
                       :invoice-flag.sync="invoiceFlag"></invoiceDialog>
    </div>
</template>

<script>
    import invoiceDialog from '../../../components/invoiceDialog'

    export default {
        name: 'empty-page',
        components: {invoiceDialog},
        data() {
            return {
                invoiceFlag: false,
                orderIdList: [],
                totalAmount: null,

                tableData: [],
                pageSize: 10,
                currentPage: 1,
                total: 1,
                searchInfo: {
                    startDate: null,
                    endDate: null,
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            //发票申请弹窗打开
            applyOpen() {
                if (this.orderIdList.length <= 0) {
                    this.$message.warning('请先选择需要开发票的订单！')
                    return
                }
                this.invoiceFlag = true
            },
            //订单是否可以开发票
            canSelectFn(row, index) {
                return row.orderState === 101 && row.invoiceState === 0
                // return true
            },
            //获取列表
            getList() {
                const prm = {
                    "endDate": this.searchInfo.endDate,
                    "pageNum": this.currentPage,
                    "pageSize": this.pageSize,
                    "startDate": this.searchInfo.endDate
                }
                this.$axios[this.$apiURL.user.getMyOrder.method](this.$apiURL.user.getMyOrder.url, prm).then(res => {
                    this.tableData = res.data.result.list
                    this.total = res.data.result.total
                })
            },
            //表格项选中状态改变事件
            handleSelectionChange(val) {
                this.orderIdList = []
                this.totalAmount = 0
                if (val.length > 0) {
                    val.forEach(item => {
                        this.orderIdList.push(item.orderId)
                        this.totalAmount += item.payAmount
                    })
                }
                console.log(val)
            },
            //分页
            handleSizeChange(size) {
                this.pageSize = size
                this.getList()
            },
            //分页
            handleCurrentChange(page) {
                this.currentPage = page
                this.getList()
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
