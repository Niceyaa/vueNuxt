<template>
    <div class="markDocEdit">
        <common-nav-header></common-nav-header>
        <!--<common-nav></common-nav>-->
        <div class="doc-edit-container" v-loading="markDocStatus"
             element-loading-text="标书正在解析中..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 0.7)">
            <div class="aside-content-container">
                <aside-tree :start-node.sync="startNode" :start-event.sync="startEvent" :end-event.sync="endEvent"
                            @performFn="openPerformDialog" @memberCerFn="openMemberCerDialog"
                            :resource-type.sync="resourceType"
                            :is-delete-flag.sync="isDeleteFlag"
                            :bidDocId="markDocAllData.bidDocId"
                            :current-checked-node.sync="currentCheckedNode" :fileId.sync="fileId"
                            about-id-param="catalogEnc" :tree-options="markDocAllData.treeOptions"
                            :isCreate="true" :content="markDocAllData.contentTreeData"
                            :isChangeContent.sync="isChangeContentFlag"></aside-tree>
                <div class="template-and-fodder">
                    <div class="template-module">
                        <el-popover
                                @hide="hideTemplatePopper"
                                @show="openTemplatePopper(201)"
                                popper-class="template-material-popper"
                                placement="right-start"
                                v-model="defaultSysFlag"
                                width="310"
                                trigger="click">
                            <div class="right-template-fodder">
                                <div class="template-fodder-search">
                                    <el-input class="search-input" v-model="searchVal" placeholder="搜索"></el-input>
                                    <img class="search-icon" src="../../assets/template/searchIcon.png" alt="">
                                </div>
                                <div class="little-lib-types">
                                    <div @click="changeResourceType(201)"
                                         :class="{'little-lib-item':true,'littleItemActive':resourceType===201}">
                                        <div class="lib-txt">系统模板</div>
                                        <div class="blue-sign"></div>
                                    </div>
                                    <span class="separator-line"></span>
                                    <div @click="changeResourceType(202)"
                                         :class="{'little-lib-item':true,'littleItemActive':resourceType===202}">
                                        <div class="lib-txt">公司模板</div>
                                        <div class="blue-sign"></div>
                                    </div>
                                    <span class="separator-line"></span>
                                    <div @click="changeResourceType(203)"
                                         :class="{'little-lib-item':true,'littleItemActive':resourceType===203}">
                                        <div class="lib-txt">个人模板</div>
                                        <div class="blue-sign"></div>
                                    </div>
                                </div>
                                <div class="template-content">
                                    <div class="none-content" v-if="libraryData.length===0">
                                        <img src="../../assets/template/noneTemplate.png" alt="">
                                        <div class="none-txt">这里还没有素材可使用，请上传</div>
                                        <uploadByBtn></uploadByBtn>
                                    </div>
                                    <templateAsideTree :start-node.sync="startNode" :start-event.sync="startEvent"
                                                       :end-event.sync="endEvent" :preview-info.sync="previewInfo"
                                                       :page-size.sync="pageSize"
                                                       :current-page.sync="currentPage"
                                                       :resourceType.sync="resourceType"
                                                       :template-or-fodder-data.sync="templateOrFodderData"
                                                       v-else></templateAsideTree>
                                </div>
                            </div>
                            <img class="default-icon" slot="reference"
                                 src="../../assets/newMarkDoc/template_default@2x.png" alt="">
                            <img class="select-icon" slot="reference"
                                 src="../../assets/newMarkDoc/template_selected@2x.png" alt="">
                        </el-popover>

                    </div>
                    <div class="material-module">
                        <el-popover
                                @hide="hideFodderPopper"
                                @show="openFodderPopper(101)"
                                popper-class="template-material-popper"
                                placement="right-start"
                                width="310"
                                trigger="click">
                            <div class="right-template-fodder">
                                <div class="template-fodder-search">
                                    <el-input class="search-input" v-model="searchVal" placeholder="搜索"></el-input>
                                    <img class="search-icon" src="../../assets/template/searchIcon.png" alt="">
                                </div>
                                <div class="little-lib-types">
                                    <div @click="changeResourceType(101)"
                                         :class="{'little-lib-item':true,'littleItemActive':resourceType===101}">
                                        <div class="lib-txt">系统素材</div>
                                        <div class="blue-sign"></div>
                                    </div>
                                    <span class="separator-line"></span>
                                    <div @click="changeResourceType(102)"
                                         :class="{'little-lib-item':true,'littleItemActive':resourceType===102}">
                                        <div class="lib-txt">公司素材</div>
                                        <div class="blue-sign"></div>
                                    </div>
                                    <span class="separator-line"></span>
                                    <div @click="changeResourceType(103)"
                                         :class="{'little-lib-item':true,'littleItemActive':resourceType===103}">
                                        <div class="lib-txt">个人素材</div>
                                        <div class="blue-sign"></div>
                                    </div>
                                </div>
                                <div class="template-content">
                                    <div class="none-content" v-if="libraryData.length===0">
                                        <img src="../../assets/template/noneTemplate.png" alt="">
                                        <div class="none-txt">这里还没有素材可使用，请上传</div>
                                        <uploadByBtn></uploadByBtn>
                                    </div>
                                    <templateAsideTree :start-node.sync="startNode" :start-event.sync="startEvent"
                                                       :end-event.sync="endEvent" :preview-info.sync="previewInfo"
                                                       :page-size.sync="pageSize"
                                                       :current-page.sync="currentPage"
                                                       :resourceType.sync="resourceType"
                                                       :template-or-fodder-data.sync="templateOrFodderData"
                                                       v-else></templateAsideTree>
                                </div>
                            </div>
                            <img class="default-icon" slot="reference"
                                 src="../../assets/newMarkDoc/source_material_default@2x.png" alt="">
                            <img class="select-icon" slot="reference"
                                 src="../../assets/newMarkDoc/source_material_select@2x.png" alt="">
                        </el-popover>

                    </div>
                </div>
            </div>

            <div class="wps-container">
                <div class="doc-opt-wrapper">
                    <div class="doc-opt-item" @click="exportCurrentSection">
                        <img class="default-icon" src="../../assets/newMarkDoc/browse_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/browse_click@2x.png" alt="">
                        <div class="opt-txt">导出当前章节</div>
                    </div>
                    <div class="doc-opt-item" @click="exportRecordFlag=true">
                        <img class="default-icon" src="../../assets/newMarkDoc/exportRecord.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/exportReportSelect.png" alt="">
                        <div class="opt-txt">导出记录</div>
                    </div>
                    <div v-if="currentCheckedNode&&currentCheckedNode.length>0" class="doc-opt-item">
                        <el-upload
                                class="self-upload"
                                action="1"
                                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                :on-change="bidDocFileChange"
                                :show-file-list="false"
                                :auto-upload="false"
                                :limit="10">
                            <img class="default-icon" src="../../assets/newMarkDoc/upload_select@2x.png" alt="">
                            <img class="hover-icon" src="../../assets/newMarkDoc/upload_click@2x.png" alt="">
                            <div class="opt-txt">本地上传</div>
                        </el-upload>
                    </div>
                    <div v-else class="doc-opt-item" @click="$message.warning('请先选择需要导入的节点')">
                        <img class="default-icon" src="../../assets/newMarkDoc/upload_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/upload_click@2x.png" alt="">
                        <div class="opt-txt">本地上传</div>
                    </div>
                    <div class="doc-opt-item" @click="openPrintSetting">
                        <img class="default-icon" src="../../assets/newMarkDoc/printing_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/printing_click.png" alt="">
                        <div class="opt-txt">打印设置</div>
                    </div>
                    <div @click="openPageDialog" class="doc-opt-item">
                        <img class="default-icon" src="../../assets/newMarkDoc/pagenumber_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/pagenumber_click@2x.png" alt="">
                        <div class="opt-txt">页眉页脚设置</div>
                    </div>
                    <div class="doc-opt-item">
                        <img class="default-icon" src="../../assets/newMarkDoc/catalogue_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/catalogue_click@2x.png" alt="">
                        <div class="opt-txt">目录样式</div>
                    </div>
                    <div class="doc-opt-item" @click="generateBidDoc">
                        <img class="default-icon" src="../../assets/newMarkDoc/bidingdocument_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/bidingdocument_click@2x.png" alt="">
                        <div class="opt-txt">生成标书</div>
                    </div>
                    <div class="doc-opt-item" @click="setDocToTemplateFlag=true">
                        <img class="default-icon" src="../../assets/newMarkDoc/Template_select@2x.png" alt="">
                        <img class="hover-icon" src="../../assets/newMarkDoc/Template_click@2x.png" alt="">
                        <div class="opt-txt">存为模板</div>
                    </div>
                </div>
                <div v-if="fileId.length>0" id="realWpsContainer" class="wps-inner-container"></div>
                <div v-else class="none-content-wrapper">
                    <div class="none-content-inner-wrapper">
                        <img class="none-doc-icon" src="../../assets/template/icon_file_empty@2x.png" alt="">
                        <div class="none-doc-desc">该目录下暂无文档，你可以从模板或素材导入或者本地上传</div>
                        <!--<uploadByBtn>本地上传</uploadByBtn>-->
                        <!--<el-button class="upload-model-btn" type="primary">本地上传</el-button>-->
                    </div>
                </div>

                <div v-show="sysTemplateOpenFlag||sysFodderOpenFlag" class="mask-layer">
                    <div v-show="previewInfo.catalogName"
                         :class="{'inner-wps-container':true,'fodderType':sysFodderOpenFlag}">
                        <div class="title-name">{{previewInfo.catalogName}}</div>
                        <div id="previewWpsContainer" class="preview-wps-container"></div>
                    </div>
                </div>
            </div>
        </div>

        <!--存为模板-->
        <setDocToTemplate :bid-doc-id="markDocAllData.bidDocId" :current-name.sync="markDocAllData.bidDocTitle"
                          :setting-flag.sync="setDocToTemplateFlag"></setDocToTemplate>

        <!--业绩对话框-->
        <el-dialog @close="getContentTreeData" class="setPrintDialog outField" width="770px" title="选择业绩插入标书"
                   :visible.sync="performFlag">
            <div class="export-record">
                <el-table
                        ref="singleTable"
                        :header-cell-style="setHeaderGray"
                        :data="performData"
                        highlight-current-row
                        @current-change="handlePerformIdChange"
                        style="width: 100%;max-height: 340px;">
                    <!-- <el-table-column
                     width="60">
                         <template v-slot="{row}">
                             <el-radio v-model="selectPerformId===row.performId"></el-radio>
                         </template>
                     </el-table-column>-->
                    <el-table-column
                            property="performName"
                            label="业绩名称"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            property="industryName"
                            label="行业类型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            width="200"
                            property="amount"
                            label="业绩金额">
                    </el-table-column>
                </el-table>
                <div class="page-wrapper" v-if="performTotal>performPageSize">
                    <el-pagination
                            @current-change="handleExportChange"
                            :current-page.sync="performCurrentPage"
                            :page-size="performPageSize"
                            layout="total, prev, pager, next"
                            :total="performTotal">
                    </el-pagination>
                </div>
            </div>
            <div class="preform-tree">
                <div class="inner-perform-tree-label">业绩类型</div>
                <div class="inner-perform-tree">
                    <el-tree
                            ref="performTree"
                            :default-checked-keys="checkedPerformTypeId"
                            :data="performTypeTree"
                            show-checkbox
                            node-key="performTypeId"
                            :check-on-click-node="false"
                            :props="performProps">
                    </el-tree>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <!--<el-button type="primary" plain @click="lastStep">取 消</el-button>-->
                <el-button type="primary" plain @click="insertPerform">插 入</el-button>
            </div>
        </el-dialog>

        <exportRecordDialog :bid-doc-id="markDocAllData.bidDocId"
                            :modal-flag.sync="exportRecordFlag"></exportRecordDialog>

        <!--资质对话框-第一步-->
        <el-dialog @close="getContentTreeData" class="setPrintDialog" width="778px" title="输出字段"
                   :visible.sync="insertCertificationFlag">
            <div class="out-info-wrapper">
                <div class="out-info-item">
                    <div class="insert-info-label">
                        <div class="insert-info-sign"></div>
                        <div class="insert-info-txt">请选择要输出的信息</div>
                    </div>
                    <div class="insert-info-wrapper">
                        <el-checkbox-group v-model="checkUserInfo">
                            <el-checkbox label="personName">姓名</el-checkbox>
                            <el-checkbox label="personPhone">电话号码</el-checkbox>
                            <el-checkbox label="idCardNum">身份证号码</el-checkbox>
                            <el-checkbox label="personAge">年龄</el-checkbox>
                            <el-checkbox label="personBirthday">生日</el-checkbox>
                            <el-checkbox label="personSex">性别</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="out-info-item">
                    <div class="insert-info-label">
                        <div class="insert-info-sign"></div>
                        <div class="insert-info-txt">请选择要导出的个人材料</div>
                    </div>
                    <div class="insert-info-wrapper">
                        <el-checkbox-group v-model="checkCertification">
                            <el-checkbox label="edu">学历证</el-checkbox>
                            <el-checkbox label="identity">身份证</el-checkbox>
                            <el-checkbox label="post">职称</el-checkbox>
                            <el-checkbox label="socialSecurity">社保</el-checkbox>
                        </el-checkbox-group>
                        <div class="more-certification">
                            <div class="more-certification-label">更多：</div>
                            <el-cascader
                                    :options="personCerTypeData"
                                    :props="personCerTypeProp"
                                    v-model="checkDefineCerType"
                                    clearable>
                            </el-cascader>
                        </div>

                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button :disabled="checkCertification.length===0||checkUserInfo.length===0" type="primary"
                           @click="nextStep">下一步
                </el-button>
            </div>
        </el-dialog>
        <!--资质对话框-第二步-->
        <el-dialog @close="getContentTreeData" class="setPrintDialog outField" width="778px" title="输出字段"
                   :visible.sync="insertCertification2Flag">
            <div class="person-table">
                <el-table
                        class="markDocTable"
                        :header-cell-style="setHeaderGray"
                        :data="personList"
                        style="width: 100%"
                        @selection-change="handleSelectPerson">
                    <el-table-column
                            align="center"
                            type="selection"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop="personName"
                            label="姓名"
                            width="140px">
                    </el-table-column>
                    <el-table-column
                            width="150px"
                            prop="personPhone"
                            label="电话">
                    </el-table-column>
                    <el-table-column
                            width="150px"
                            prop="idCardNum"
                            label="身份证">
                    </el-table-column>
                    <el-table-column
                            min-width="150px"
                            label="生日">
                        <template v-slot="{row}">{{$lcgFormatDate(row.personBirthday)}}</template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain @click="lastStep">上一步</el-button>
                <el-button type="primary" plain @click="insertCerHandle">插入</el-button>
            </div>
        </el-dialog>
        <!--打印设置对话框-->
        <el-dialog class="setPrintDialog" width="770px" title="打印设置" :visible.sync="setPrintFlag">
            <div class="set-print-main">
                <div class="set-print-menu">
                    <div class="set-print-menu-item setPrintActive">页边距设置</div>
                </div>
                <div class="set-print-content">
                    <div class="margin-setting">
                        <el-radio-group class="margin-radio-group" v-model="marginSetting">
                            <el-radio v-for="item in marginData" :key="item.marginCode" class="margin-radio-item"
                                      :label="item.marginCode">
                                <div class="margin-item-title">{{item.marginName}}</div>
                                <div class="margin-item-distance">
                                    <div class="margin-dis">上：{{item.top.toFixed(2)}}毫米</div>
                                    <div class="margin-dis">下：{{item.bottom.toFixed(2)}}毫米</div>
                                </div>
                                <div class="margin-item-distance">
                                    <div class="margin-dis">左：{{item.left.toFixed(2)}}毫米</div>
                                    <div class="margin-dis">右：{{item.right.toFixed(2)}}毫米</div>
                                </div>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setPrintFlag = false">取 消</el-button>
                <el-button :loading="marginSetLoading" type="primary" @click="saveMarginHandle">保 存</el-button>
            </div>
        </el-dialog>

        <!--预览-->
        <el-dialog :visible.sync="previewDialogFlag">
            <iframe width="100%" height="500" :src="turnURL"></iframe>
        </el-dialog>

        <!--合成标书对话框-->
        <el-dialog class="generate-doc-dialog" width="450px" title="正在生成标书，请稍后..." :visible.sync="generateBidDocFlag">
            <div class="flex-center-wrapper">
                <img class="generate-waiting-icon" src="../../assets/template/tips_generatetender.png" alt="">
                <div class="generate-waiting-text">生成标书需要花费一些时间，您可以</div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="generateBidDocFlag = false">留在本页</el-button>
                <el-button @click="generateBidDocFlag = false">查看生成记录</el-button>
            </div>
        </el-dialog>

        <!--标书本地上传对话框-->
        <el-dialog class="generate-doc-dialog" width="450px" title="标书正在导入解析，请稍后..." :visible.sync="generateBidDocFlag">
            <div class="flex-center-wrapper">
                <img class="generate-waiting-icon" src="../../assets/template/tips_generatetender.png" alt="">
                <div class="generate-waiting-text">系统正在解析您导入的标书，您可以</div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="generateBidDocFlag = false">留在本页</el-button>
            </div>
        </el-dialog>

        <!--页眉页脚设置-->
        <pageHeaderAndFooter :bid-doc-id="markDocAllData.bidDocId" :modal-flag.sync="pageFlag"></pageHeaderAndFooter>
    </div>
</template>

<script>
    import pageHeaderAndFooter from '../../components/pageHeaderAndFooter'
    import setDocToTemplate from '../../components/setDocToTemplate'
    import exportRecordDialog from '../../components/exportRecordDialog'
    import templateAsideTree from '../../components/asideTree/templateAsideTree'
    import uploadByBtn from '../../components/uploadByBtn'
    import qs from 'qs'

    export default {
        name: 'markDocEdit',
        components: {templateAsideTree, uploadByBtn, pageHeaderAndFooter, exportRecordDialog, setDocToTemplate},
        data() {
            return {
                defaultSysFlag: false,

                //控制遮罩层显示
                sysTemplateOpenFlag: false,
                sysFodderOpenFlag: false,
                previewWpsOption: null,
                previewInfo: {},


                //左右拖拽节点信息
                startNode: null,
                startEvent: null,
                endEvent: null,

                setDocToTemplateFlag: false, //存为模板flag

                markDocStatus: false, //标书解析完成flag
                analysisTimer: null,
                //业绩
                performMoveKeyId: null,
                performIsNotMerge: false,
                selectPerformId: null,
                checkedPerformTypeId: [],
                performFlag: false,
                performData: [],
                performTypeTree: [],
                performProps: {
                    value: 'performTypeId',
                    label: 'performTypeName',
                    children: 'children'
                },
                performCurrentPage: 1,
                performPageSize: 10,
                performTotal: 0,

                //导出记录
                exportRecordFlag: false,

                pageFlag: false,//页眉页脚设置

                insertCertification2Flag: false,//第二步flag
                insertCertificationFlag: false,//插入人员资质信息
                checkUserInfo: [], //输出字段
                checkCertification: [], //选中的资质类型
                checkDefineCerType: [], // 选中的自定义资质类型
                checkPersonList: [], // 选中的人员列表
                moveKeyId: null, // 标书moveKeyId
                isNotMerge: false, //是否合并
                personFieldData: [],
                personCerTypeData: [],
                personList: [],
                personPageSize: 10,
                personCurrentPage: 1,
                personTotal: 0,
                personCerTypeProp: {
                    multiple: true,
                    checkStrictly: true,
                    emitPath: false,
                    value: 'personQualifyTypeId',
                    label: 'personQualifyName',
                    children: 'next',
                },

                setPrintFlag: false, //打印设置
                marginSetting: null,
                marginData: [],
                marginSetLoading: false,

                resourceType: 201,//资源类型 101系统素材 102公司素材 103个人素材 201系统模板 202公司模板 203个人模板
                pageSize: 50,
                currentPage: 1,
                templateOrFodderData: [],

                generateBidDocFlag: false, // 生成标书flag
                previewDialogFlag: false,
                floatIconOption: {
                    placement: 'left',
                    isShow: true
                },
                searchVal: null,
                libraryData: [1],
                currentLibType: 'templateType',
                simpleMode: false,
                turnURL: null,
                markDocAllData: {
                    bidDocId: null,
                    contentTreeData: [],
                    bidDocTitle: '',
                    treeOptions: {
                        label: 'catalogName',
                        value: 'bidDocCatalogId',
                        children: 'sonCatalog'
                    }
                },
                fileId: '',
                isChangeContentFlag: false,
                currentCheckedNode: '',
                currentNodeItemInfo: {},
                isDeleteFlag: false,
                wpsOption: null,
                previewFileId: ''
            }
        },
        watch: {
            fileId: function (val) {
                if (val.length > 0) {
                    const prm = {
                        fileId: val
                    }
                    this.$axios[this.$apiURL.commonApi.getFileUrlByFileId.method](this.$apiURL.commonApi.getFileUrlByFileId.url, {params: prm}).then(res => {
                        if (res.data.code === 200) {
                            const {result} = res.data
                            this.openWPS(result.wpsUrl, result.token)
                        }
                    })
                } else {
                    this.destroyWps()
                }

            },
            previewInfo: function (val) {
                console.log('-----------------', val)
                if (val.fileId) {
                    const prm = {
                        fileId: val.fileId
                    }
                    this.$axios[this.$apiURL.commonApi.getFileUrlByFileId.method](this.$apiURL.commonApi.getFileUrlByFileId.url, {params: prm}).then(res => {
                        if (res.data.code === 200) {
                            const {result} = res.data
                            this.openPreviewWPS(result.wpsUrl, result.token)
                        }
                    })
                    /*  /!*const prm = {
                          fileId: val
                      }
                      getFileUrlByFileId(prm).then(res => {
                          if (res.data.code === 200) {
                              const {result} = res.data
                              this.previewDialogFlag = true
                              this.turnURL = getTurnedUrl(result.url)

                          }
                      })*!/
                      // this.turnURL = getTurnedUrl('https://kjt-guizhou-gov.oss-cn-chengdu.aliyuncs.com/report/2021-07-22/GYGXSTXXYXGS1626941791751.docx')
                      // this.turnURL = getTurnedUrl('https://kjt-guizhou-gov.oss-cn-chengdu.aliyuncs.com/images/2021-07-28/8108641710042710016.doc')
                      this.turnURL = 'https://view.officeapps.live.com/op/view.aspx?src=https://smart-doc.oss-cn-chengdu.aliyuncs.com/cus/bid_qualify/8108644895274139648.docx'
                      // this.turnURL = 'https://smart-doc.oss-cn-chengdu.aliyuncs.com/cus/bid_qualify/8108637952417562624.docx'
                      // this.turnURL = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
                      this.previewDialogFlag = true*/
                } else {
                    this.destroyWps()
                }

            },
            isChangeContentFlag: function (val) {
                if (val) {
                    this.getContentTreeData()
                }
            },
        },
        mounted() {
            this.defaultSysFlag = true
            this.markDocAllData.bidDocId = this.$route.query.bidDocId ? this.$route.query.bidDocId : null
            this.markDocAllData.bidDocTitle = this.$route.query.title ? this.$route.query.title : null

            if (this.$route.query.formWord) {
                this.analysisTimer = setInterval(() => {
                    const prm = qs.stringify({
                        bidDocId: this.markDocAllData.bidDocId
                    })
                    this.$axios[this.$apiURL.markDocApi.getMarkDocStatus.method](this.$apiURL.markDocApi.getMarkDocStatus.url, prm).then(res => {
                        if (res.data.result.importState.indexOf('成功') !== -1) {
                            clearInterval(this.analysisTimer)
                            this.analysisTimer = null
                            this.markDocStatus = false
                            if (this.markDocAllData.bidDocId) {
                                this.getContentTreeData()
                            }
                            // this.getTemplateOrFodder()
                        } else if (res.data.result.importState.indexOf('失败') !== -1) {
                            clearInterval(this.analysisTimer)
                            this.analysisTimer = null
                            this.markDocStatus = false
                            this.$message.error('解析失败')
                            this.$router.push({
                                path: '/'
                            })
                        } else {
                            this.markDocStatus = true
                        }
                    })
                }, 1000)
            } else {
                if (this.markDocAllData.bidDocId) {
                    this.getContentTreeData()
                    this.currentNodeItemInfo = this.markDocAllData.contentTreeData[1]
                }
                // this.getTemplateOrFodder()
            }
        },
        methods: {
            //打开业绩对话框
            openPerformDialog(id, type) {
                this.performIsNotMerge = type === 'inner'
                this.performMoveKeyId = id
                this.performFlag = true
                this.selectPerformId = null
                this.getPerformData()
            },
            //插入业绩
            insertPerform() {
                console.log(this.$refs.performTree.getCheckedKeys());
                const checkKeys = this.$refs.performTree.getCheckedKeys()
                if (checkKeys.length <= 0) {
                    this.$message.warning('请至少选择一个业绩类型')
                    return
                }
                const prm = {
                    "bidDocId": this.markDocAllData.bidDocId,
                    "isNotMerge": this.performIsNotMerge,
                    "moveKeyId": this.performMoveKeyId,
                    "performId": this.selectPerformId,
                    "performTypeIdList": checkKeys
                }
                this.$axios[this.$apiURL.certification.insertPerformInfo.method](this.$apiURL.certification.insertPerformInfo.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.performFlag = false
                })
            },

            //改变选中的performId
            handlePerformIdChange(val) {
                console.log(val)
                this.$refs.performTree.setCheckedKeys([])
                this.selectPerformId = val.performId
                if (this.performTypeTree.length > 0) {
                    return
                } else {
                    this.getPerformType()
                }
            },

            //获取业绩数据
            getPerformData() {
                const prm = {
                    pageSize: this.performPageSize,
                    pageNum: this.performCurrentPage
                }
                this.$axios[this.$apiURL.certification.getPerformance.method](this.$apiURL.certification.getPerformance.url, prm).then(res => {
                    this.performData = res.data.result.list
                    this.performTotal = res.data.result.total
                })
            },
            getPerformType() {
                this.$axios[this.$apiURL.certification.getPerformanceTypeTree.method](this.$apiURL.certification.getPerformanceTypeTree.url).then(res => {
                    this.performTypeTree = res.data.result
                })
            },

            //导出当前章节
            exportCurrentSection() {
                if (!this.currentCheckedNode || this.currentCheckedNode.length <= 0) {
                    this.$message.warning('请先选择需要导出的章节目录')
                    return
                }
                const prm = qs.stringify({
                    bidDocCatalogId: this.currentCheckedNode
                })
                this.$axios[this.$apiURL.markDocApi.exportDataById.method](this.$apiURL.markDocApi.exportDataById.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                })
            },
            //打开页眉页脚设置
            openPageDialog() {
                this.pageFlag = true
            },

            //人员资质插入事件
            insertCerHandle() {
                if (this.checkPersonList.length === 0) {
                    this.$message.warning('至少选择一个需要插入的人员')
                    return
                }
                let personField = {}
                this.checkUserInfo.forEach(item => {
                    personField['' + item + ''] = item
                })
                let personCerType = {}
                this.checkCertification.forEach(item => {
                    personCerType['' + item + ''] = item
                })
                personCerType.coQualifyTypeIdList = this.checkDefineCerType

                const prm = {
                    "apiPersonListBO": personField,
                    "bidDocId": this.markDocAllData.bidDocId,
                    "isNotMerge": this.isNotMerge,
                    "moveKeyId": this.moveKeyId,
                    "personIdList": this.checkPersonList,
                    "personalMatCatBO": personCerType
                }
                this.$axios[this.$apiURL.certification.insertCerInfo.method](this.$apiURL.certification.insertCerInfo.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.insertCertification2Flag = false
                })

                console.log("选中的信息", personField, personCerType, this.checkPersonList, this.checkDefineCerType)

            },
            //打开人员资质弹窗
            openMemberCerDialog(moveId, type) {
                this.initIPersonFieldAndType()
                console.log(moveId, type)
                this.isNotMerge = type === 'inner'
                this.moveKeyId = moveId
                this.insertCertificationFlag = true
                this.checkCertification = []
                this.checkUserInfo = []
                this.checkDefineCerType = []
            },
            //下一步
            nextStep() {
                this.insertCertificationFlag = false
                this.insertCertification2Flag = true
                this.getPersonList()
            },
            //上一步
            lastStep() {
                this.insertCertificationFlag = true
                this.insertCertification2Flag = false
            },
            //设置表头
            setHeaderGray(rowInfo) {
                return 'background: #F8F9FC;color:#202020'
            },
            //初始化人员信息字段，人员资质类别
            initIPersonFieldAndType() {
                this.$axios[this.$apiURL.certification.getPersonCerType.method](this.$apiURL.certification.getPersonCerType.url).then(res => {
                    this.personCerTypeData = res.data.result.typeTree
                })
            },

            //选中人员
            handleSelectPerson(sel) {
                this.checkPersonList = []
                if (sel.length <= 0) return
                sel.forEach(item => {
                    this.checkPersonList.push(item.personId)
                })
            },

            //获取人员列表
            getPersonList() {
                const prm = {
                    "deptId": null,
                    "idCardNum": null,
                    "pageNum": this.personCurrentPage,
                    "pageSize": this.personPageSize,
                    "personName": null
                }
                this.$axios[this.$apiURL.certification.getPersonList.method](this.$apiURL.certification.getPersonList.url, prm).then(res => {
                    this.personList = res.data.result.list
                    this.personTotal = res.data.result.total
                })
            },

            //打开打印设置
            openPrintSetting() {
                this.setPrintFlag = true
                this.marginSetting = null
                this.getMarginData()
            },
            //获取页边距数据
            getMarginData() {
                this.$axios[this.$apiURL.markDocApi.getMarginData.method](this.$apiURL.markDocApi.getMarginData.url).then(res => {
                    this.marginData = res.data.result
                })
            },
            //保存打印设置
            saveMarginHandle() {
                if (!this.marginSetting) {
                    this.$message.warning('请选择页边距格式')
                    return
                }
                const prm = {
                    bidDocId: this.markDocAllData.bidDocId,
                    pageMarginCode: this.marginSetting
                }
                this.marginSetLoading = true
                this.$axios[this.$apiURL.markDocApi.editMarkDocFormat.method](this.$apiURL.markDocApi.editMarkDocFormat.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.setPrintFlag = false
                    this.marginSetLoading = false
                }).catch(err => {
                    this.marginSetLoading = false
                })
            },


            //标书本地文件上传
            bidDocFileChange(file, fileList) {
                /*if (file.status === 'ready') {
                    const prm = new FormData()
                    prm.append('file',file.raw)
                    prm.append('bidDocId',this.markDocAllData.bidDocId)
                    importBidDocFile(prm).then(res=>{
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg)
                            this.generateBidDocFlag = true
                        }
                    })
                }*/
                if (file.status === 'ready') {
                    const prm = new FormData()
                    prm.append('file', file.raw)
                    prm.append('bidDocCatalogId', this.currentCheckedNode)
                    this.$axios[this.$apiURL.markDocApi.importNodeDoc.method](this.$apiURL.markDocApi.importNodeDoc.url, prm).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg)
                            this.generateBidDocFlag = true
                        }
                    })
                }
            },
            //标书生成
            generateBidDoc() {
                const prm = qs.stringify({
                    bidDocId: this.markDocAllData.bidDocId
                })
                this.$axios[this.$apiURL.markDocApi.generateMarkDoc.method](this.$apiURL.markDocApi.generateMarkDoc.url, prm).then(res => {
                    this.$message.success(res.data.msg)
                    this.generateBidDocFlag = true
                })
            },
            //销毁wps
            destroyWps() {
                if (this.wpsOption) {
                    this.wpsOption.destroy()
                    this.wpsOption = null
                }
            },
            //销毁预览wps
            destroyPreviewWps() {
                if (this.previewWpsOption) {
                    this.previewWpsOption.destroy()
                    this.previewWpsOption = null
                }
            },
            //打开wps
            async openWPS(url, token) {
                this.wpsOption = this.wps.config({
                    mode: this.simpleMode ? 'simple' : 'normal',  //显示模式控制
                    mount: document.querySelector('#realWpsContainer'),  //元素关联绑定
                    wpsUrl: url,  //wps文件地址
                    commonOptions: {
                        isIframeViewFullscreen: true,
                    },
                })
                this.wpsOption.setToken({
                    token: token,
                    timeout: 10 * 60 * 1000
                })
                await this.wpsOption.ready()
                const app = this.wpsOption.Application

                // app.ActiveDocument.ActiveWindow.View.Zoom.Percentage = 50
                console.log('app', app)
            },
            //打开预览wps
            async openPreviewWPS(url, token) {
                this.previewWpsOption = this.wps.config({
                    mode: !this.simpleMode ? 'simple' : 'normal',  //显示模式控制
                    mount: document.querySelector('#previewWpsContainer'),  //元素关联绑定
                    wpsUrl: url,  //wps文件地址
                    commonOptions: {
                        isIframeViewFullscreen: true,
                    },
                })
                this.previewWpsOption.setToken({
                    token: token,
                    timeout: 10 * 60 * 1000
                })
                await this.previewWpsOption.ready()
                const app = this.previewWpsOption.Application

                // app.ActiveDocument.ActiveWindow.View.Zoom.Percentage = 50
                console.log('app', app)
            },
            //获取目录树
            getContentTreeData() {
                const prm = qs.stringify({
                    bidDocId: this.markDocAllData.bidDocId
                })
                this.$axios[this.$apiURL.markDocApi.checkMarkDocContent.method](this.$apiURL.markDocApi.checkMarkDocContent.url, prm).then(res => {
                    this.markDocAllData.contentTreeData = res.data.result
                    this.isChangeContentFlag = false
                })
            },
            getTemplateOrFodder() {
                const prm = {
                    "pageParam": {
                        "pageNum": this.currentPage,
                        "pageSize": this.pageSize
                    },
                    "relatedId": "",
                    "resourceType": this.resourceType
                }
                this.$axios[this.$apiURL.markDocApi.getTemplateFodderData.method](this.$apiURL.markDocApi.getTemplateFodderData.url, prm).then(res => {
                    console.log("请求数据", res)
                    this.templateOrFodderData = res.data.result.list
                }).catch(err => {
                    console.log("请求数据", err)
                })
            },
            changeResourceType(num) {
                if (this.resourceType === num && this.templateOrFodderData.length !== 0) return
                this.resourceType = num
                this.currentPage = 1
                this.getTemplateOrFodder()
            },
            openHandler(num) {
                if (this.templateOrFodderData.length > 0) {
                    let changeFlag = Math.abs(this.resourceType - num) > 10
                    if (changeFlag) {
                        this.changeResourceType(num)
                        this.previewInfo = {}
                        this.destroyWps()
                    }
                } else {
                    this.changeResourceType(num)
                }
                // this.previewInfo = {}
                console.log('打开', this.sysTemplateOpenFlag)
            },
            hideHandler() {
                // this.previewInfo = {}
                // this.destroyPreviewWps()
                console.log('关闭', this.sysTemplateOpenFlag)
            },
            openTemplatePopper(num) {
                this.sysTemplateOpenFlag = true
                this.openHandler(num)
            },
            hideTemplatePopper() {
                this.sysTemplateOpenFlag = false
                this.hideHandler()
            },
            openFodderPopper(num) {
                this.sysFodderOpenFlag = true
                this.openHandler(num)
            },
            hideFodderPopper() {
                this.sysFodderOpenFlag = false
                this.hideHandler()
            }
        },
        destroyed() {
            if (this.analysisTimer) clearInterval(this.analysisTimer)
        }
    }
</script>
<style lang="less">
    .markDocEdit {
        height: 100%;
        font-family: @fontFa;

        .doc-edit-container {
            display: flex;
            -height: calc(100% - 200px);
            height: calc(100% - 81px);
            justify-content: space-between;
            overflow: hidden;

            .aside-content-container {
                -width: 310px;
                -min-width: 310px;
                height: 100%;
                position: relative;
                /*模板库和素材库*/

                .template-and-fodder {
                    position: absolute;
                    right: -88px;
                    top: 89px;
                    z-index: 9999;

                    .template-module {
                        margin-bottom: 10px;

                        img {
                            cursor: pointer;
                            width: 88px;
                            height: 88px;

                            &.default-icon {
                                display: block;
                            }

                            &.select-icon {
                                display: none;
                            }

                        }
                    }

                    .material-module {
                        img {
                            cursor: pointer;
                            width: 88px;
                            height: 88px;

                            &.default-icon {
                                display: block;
                            }

                            &.select-icon {
                                display: none;
                            }
                        }
                    }
                }
            }

            .wps-container {
                width: 100%;
                height: 100%;
                position: relative;

                .doc-opt-wrapper {
                    display: flex;
                    align-items: center;
                    height: 68px;
                    border: 1px solid #F0F2F9;
                    box-shadow: 0px 4px 9px 1px rgba(202, 207, 218, 0.35);

                    .doc-opt-item {
                        width: 100px;
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        padding: 13px 0 9px 0;
                        font-size: 12px;
                        font-weight: 400;
                        color: #404040;
                        cursor: pointer;
                        height: 50px;

                        .self-upload {
                            .el-upload {
                                -height: 50px;
                                display: flex;
                                justify-content: center;
                                flex-wrap: wrap;
                            }
                        }

                        &:hover {
                            color: @activeColor;
                            background: #F5F6F8;

                            img {
                                &.default-icon {
                                    display: none;
                                }

                                &.hover-icon {
                                    display: block;
                                }
                            }
                        }

                        img {
                            width: 20px;
                            height: 20px;

                            &.default-icon {
                                display: block;
                            }

                            &.hover-icon {
                                display: none;
                            }
                        }

                        .opt-txt {
                            width: 100px;
                            text-align: center;
                        }

                    }
                }

                .wps-inner-container {
                    width: 100%;
                    height: calc(100% - 68px);

                    #wps-iframe {
                        width: 100%;
                        height: 100%;
                    }
                }

                .none-content-wrapper {
                    width: 100%;
                    height: calc(100% - 68px);
                    background: #F5F6F8;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .none-content-inner-wrapper {
                        width: 330px;
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;

                        .none-doc-icon {
                            width: 101px;
                            height: 98px;
                        }

                        .none-doc-desc {
                            font-size: 12px;
                            color: #202020;
                            margin: 17px 0 28px 0;
                        }

                        .upload-model-btn {
                            width: 120px;
                            height: 42px;
                            border-radius: 4px;
                        }
                    }

                }

                .mask-layer {
                    background: rgba(0, 0, 0, .4);
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 99;

                    .inner-wps-container {
                        position: absolute;
                        left: 408px;
                        top: 89px;
                        width: calc(100% - 355px);
                        height: 610px;
                        background: #fff;

                        &.fodderType {
                            top: 133px;
                        }

                        .title-name {
                            text-align: center;
                            font-size: 18px;
                            height: 50px;
                            line-height: 50px;
                        }

                        .preview-wps-container {
                            width: 100%;
                            height: calc(100% - 50px);
                        }
                    }
                }
            }
        }


        .generate-doc-dialog {
            .el-dialog__header {
                .el-dialog__title {
                    font-size: 14px;
                    color: #A2A2A2;
                }

                background: #FAFDFF;
            }

            .el-dialog__body {
                display: flex;
                justify-content: center;

                .flex-center-wrapper {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;

                    .generate-waiting-icon {
                        width: 61px;
                        height: 55px;
                        margin-bottom: 20px;
                    }

                    .generate-waiting-text {
                        width: 100%;
                        font-size: 12px;
                        color: #515151;
                        text-align: center;
                    }
                }

            }

            .el-dialog__footer {
                display: flex;
                justify-content: center;

                .el-button {
                    width: 130px;
                    height: 40px;
                    background: #F5F6F8;
                    border: 1px solid #D7D7D7;
                    border-radius: 2px;
                    font-size: 14px;
                    color: #202020;
                }
            }
        }

        .setPrintDialog {
            &.outField {
                .el-dialog__header {
                    background: none;

                    .el-dialog__title {
                        font-size: 15px;
                        color: #333333;
                    }
                }
            }

            .el-dialog__header {
                background: #FAFDFF;

                .el-dialog__title {
                    font-size: 15px;
                    color: #333333;
                }
            }

            .el-dialog__body {
                padding: 0;
                /*打印设置*/

                .set-print-main {
                    padding: 30px 20px;
                    display: flex;

                    .set-print-menu {
                        min-width: 120px;
                        flex: 0 120px;
                        border: 1px solid #eee;
                        min-height: 300px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        padding: 6px 15px 15px 15px;
                        font-weight: bold;
                        color: #333;
                        margin-right: 15px;

                        .set-print-menu-item {
                            cursor: pointer;
                            height: 34px;
                            line-height: 34px;

                            &.setPrintActive {
                                color: @activeColor;
                            }

                            &:hover {
                                color: @activeColor;
                            }
                        }
                    }

                    .set-print-content {
                        border: 1px solid #eee;
                        width: 100%;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        padding: 6px 15px 15px 15px;

                        .margin-setting {
                            .margin-radio-group {
                                display: flex;
                                flex-wrap: wrap;

                                .margin-radio-item {
                                    padding: 40px 0;
                                    display: flex;
                                    -align-items: center;
                                    margin-bottom: 15px;

                                    .margin-item-title {
                                        font-size: 14px;
                                        font-weight: bold;
                                        -color: #333;
                                    }

                                    .margin-item-distance {
                                        display: flex;
                                        font-size: 12px;
                                        margin: 6px 0;

                                        .margin-dis {
                                            margin-right: 30px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                /*人员资质选择*/

                .out-info-wrapper {
                    padding: 0 30px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;

                    .out-info-item {
                        padding: 21px 0 10px 0;

                        .insert-info-label {
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                            font-weight: 400;
                            color: #43484D;

                            .insert-info-sign {
                                width: 4px;
                                height: 12px;
                                background: #FF6831;
                                border-radius: 2px;
                                margin-right: 6px;
                            }
                        }

                        .insert-info-wrapper {
                            display: flex;
                            align-items: center;

                            .el-checkbox {
                                margin-top: 10px;
                            }

                            .more-certification {
                                display: flex;
                                align-items: center;
                                margin-left: 30px;
                                margin-top: 10px;
                            }
                        }
                    }
                }

                /*导出记录*/

                .export-record {
                    padding: 20px;
                }

                .page-wrapper {
                    padding: 30px 20px;
                }

                /*业绩对话框*/

                .preform-tree {
                    padding: 20px 20px 50px 20px;

                    .inner-perform-tree-label {
                        font-size: 16px;
                        font-weight: bold;
                        padding: 0 0 15px 0;

                    }

                    .inner-perform-tree {
                        height: 200px;
                        padding: 15px;
                        border: 1px solid #eee;
                        overflow: auto;
                    }

                }
            }

            .el-dialog__footer {
                .dialog-footer {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .el-button {
                        width: 130px;
                    }
                }

            }
        }
    }

    .el-loading-spinner {
        font-size: 40px;

        .el-loading-text {
            font-size: 20px;
        }
    }

    .template-material-popper {
        padding: 0;
        height: 610px;
        overflow: hidden;
        top: 149px;
        left: 378px;

        .right-template-fodder {
            height: 100%;
            -border: 1px solid #F0F2F9;
            width: 310px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            .template-fodder-search {
                padding: 21px 10px 0 10px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                position: relative;

                .search-input {
                    .el-input__inner {
                        height: 30px;
                        background: #F7F7F8;
                        border: 1px solid #EAEAEA;
                        border-radius: 3px;
                        padding: 0 0 0 31px;
                    }
                }

                .search-icon {
                    position: absolute;
                    bottom: 7px;
                    left: 19px;
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                }
            }

            .little-lib-types {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
                height: 50px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                border-bottom: 1px solid #F0F2F9;
                border-top: 1px solid #F0F2F9;
                font-size: 14px;
                font-weight: bold;
                color: #43484D;

                span {
                    width: 3px;
                    height: 12px;
                    background: #CFD1D9;
                    border-radius: 2px;
                }

                .little-lib-item {
                    cursor: pointer;
                    position: relative;

                    &:hover {
                        color: @activeColor;
                    }

                    &.littleItemActive {
                        color: @activeColor;
                        font-weight: bold;

                        .blue-sign {
                            display: block;
                        }
                    }

                    .blue-sign {
                        display: none;
                        width: 15px;
                        height: 4px;
                        background: #156BFE;
                        border-radius: 2px;
                        position: absolute;
                        bottom: -14px;
                        left: 20px;
                    }
                }

            }

            .template-content {
                height: calc(100% - 101px);

                .none-content {
                    text-align: center;

                    img {
                        width: 101px;
                        height: 98px;
                        margin: 43px 0 17px 0;
                    }

                    .none-txt {
                        font-size: 12px;
                        font-weight: 400;
                        color: #202020;
                        margin-bottom: 30px;
                    }
                }
            }
        }
    }
</style>
