<template>
    <div class="allsd">
        <!-- 结存及采购计划统计 -->
        <!-- 搜索 -->
        <div class="my-search bottom-20">
            <div class="my-search-item">
                <div class="title">学期:</div>
                <a-select
                    v-model="searchForm.calendar_id"
                    style="width: 160px"
                    @change="search(1)"
                >
                    <a-select-option value>全部</a-select-option>
                    <a-select-option
                        v-for="(item, index) in yearData"
                        :key="index"
                        :value="item.id"
                        >{{ item.year }}{{ item.semester }}</a-select-option
                    >
                </a-select>
            </div>
            <div class="my-search-item">
                <div class="title">月份:</div>
                <a-select
                    v-model="searchForm.month"
                    :disabled="searchForm.calendar_id == '' ? true : false"
                    style="width: 160px"
                    @change="searchVal(2)"
                >
                    <!-- <a-select-option value>全部</a-select-option> -->
                    <a-select-option
                        v-for="(item, index) in mouthData"
                        :key="index"
                        :value="item.month"
                        >{{ item.month }}</a-select-option
                    >
                </a-select>
            </div>
            <!--      <div class="my-search-item">
        <div class="title">周:</div>
        <a-select default-value="lucy" style="width: 120px" @change="search">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div> -->
            <!-- <div class="my-search-item">
        <a-button type="primary">生成报表</a-button>
      </div> -->
        </div>
        <!-- 数据 start -->
        <a-table
            :columns="columns"
            :data-source="tableData"
            bordered
            :pagination="pagination"
            :rowKey="(item, index) => index"
            :loading="loading"
        >
            <template slot="index" slot-scope="text, record, index"
                >{{ index + 1 }}
            </template>
            <template slot="action" slot-scope="text, record">
                <a-button type="link" @click="lookDetails(record)"
                    >查看</a-button
                >
                <a-button type="link" @click="exportTable(record)"
                    >导出表格</a-button
                >
                <a-button type="link" @click="printFun(record, 'printTable')"
                    >打印表格</a-button
                >
            </template>
        </a-table>

        <!-- 数据 -end -->

        <!-- 打印 -->
        <print-table
            :info="prinTableInfo"
            :num="prinTableInfo.cumulative_number"
            :list="prinTableInfo.list"
            :title="prinTableInfo.title"
        ></print-table>
    </div>
</template>

<script>
import printTable from "./components/printTable";
export default {
    components: {
        printTable
    },
    data() {
        return {
            columns: [
                {
                    title: "序号",
                    dataIndex: "index",
                    scopedSlots: {
                        customRender: "index"
                    }
                },
                {
                    title: "年份",
                    dataIndex: "year"
                },
                {
                    title: "学期",
                    dataIndex: "semester"
                },
                {
                    title: "月",
                    dataIndex: "month"
                },
                {
                    title: "操作",
                    dataIndex: "action",
                    scopedSlots: {
                        customRender: "action"
                    }
                }
            ],
            pagination: {
                current: 1,
                pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: e => this.search(e),
                onShowSizeChange: (current, size) => {
                    //分页触发
                    this.searchForm.pageSize = size;
                    this.pagination.pageSize = size;
                    this.search(1);
                },
                pageSizeOptions: this.$commonJs.PAGE_LINES,
                showTotal: total => `共有 ${total} 条数据` //分页中显示总的数据
            },
            //
            searchForm: {
                calendar_id: "",
                month: "",
                page: 1,
                pageSize: Number(this.$commonJs.PAGE_LINES[0])
            },
            tableData: [],
            yearData: [],
            mouthData: [],
            weekData: [],
            loading: false,
            prinTableInfo: {},
            printStyles:`
              th,
              td {
                  height: 45px;
                  border-right: 1px solid #000;
                  border-bottom: 1px solid #000;
                  text-align: center;
              }
              .flex {
                  display: flex;
              }
              table {
                  width: 100%;
                  border-top: 1px solid #000000;
                  border-left: 1px solid #000000;
              }
              .psad{
               height: 1px;
                   width: 100%;
                   page-break-after: always;
                   display: block;
              }
              .newsfix>div{
                white-space: nowrap;
              }
              th{
                text-align: center;
              }
              .allsTab{
                width: 100% !important;
              }
               .allsTab>.rtys:nth-of-type(1){
                    border-top: 0 !important;
                }
                .allsTab td{
                    white-space: pre-wrap !important;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    word-break:break-all;
                    width:75px!important;
                  }
                .rtys{
                  border-left: 0;
                  width: 100% !important;
                  min-width: 1064px !important;
                }
                .rtys>tr:nth-of-type(2){
                    td{
                      border-bottom: 0 !important;
                    }
                  }
                  .rtys>tr:nth-of-type(1){
                    border-top: 0 !important;
                    td{
                      border-top: 0 !important;
                    }
                  }
                .nobor{
                  border-right: 0 !important;
                  white-space: nowrap;
                }
              .box1 {
                width: 800px !important;
                overflow: hidden;
                border-left: 1px solid #000;
                border-right: 0 none;
                border-bottom: 0 none;
                box-sizing: border-box;
              }
              .title1 {
                width: 100px;
                height: 180px;
                border-bottom: 1px solid #000;
                border-top: 1px solid #000;
                text-align: center;
                line-height: 180px;
                float: left;
                box-sizing: border-box;
              }
              .con1 {
                width: calc(100% - 100px);
                position: relative;
                float: left;
                border-top: 1px solid #000;
              }
              .con1Item {
                width: 100%;

                overflow: hidden;
              }
              .con1Item-item-tt {
                height: 60px;
                width: 100px;
                text-align: center;
                border-right: 1px solid #000000;
                border-bottom: 1px solid #000000;
                float: left;
                box-sizing: border-box;
                border-left: 1px solid #000;
              }
              .con1Item-item-con {
                width: calc(100% - 100px);
                float: left;
                box-sizing: border-box;
              }
              .con1Item-item-con-item {
                width: 99.5px;
                text-align: center;
                height: 60px;
                border-right: 1px solid #000000;
                border-bottom: 1px solid #000000;
                float: left;
                box-sizing: border-box;
              }
              .newsda{
                min-width: 1198px !important;
              }
              .allTit{
                padding: 0 10px !important;
              }
              .noBorder{
                border: 0 !important;
              }
              .margs{
                margin-top: 10px;
                min-width: 1198px !important;
              }
              .titlsed{
                width: 100% !important;
                min-width: 1196px !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
              }
            `
        };
    },
    mounted() {
        this.getWeekData("", res => {
            this.yearData = res.data;
        });
        this.search(1);
    },
    methods: {
        printFun(obj, id) {
            this.$http
                .cashHandAndFixedPurchase_Print({
                    central_id: obj.central_id,
                    month: obj.month,
                    bpps_id:obj.id
                })
                .then(res => {
                    this.prinTableInfo = res.data;
                    this.prinTableInfo.dateTim = this.$commonJs.getDate()
                    // return;
                    // if(id == 'printTable'){
                    //     setTimeout(() => {
                    //         printJS({
                    //             printable: id,
                    //             type: "html",
                    //             targetStyles: ["*"],
                    //             // ignoreElements: ["no-print", "bc", "gb"],
                    //             // style:"@media print{@page{size: A4 landscape;margin-left:26mm;margin-right:17mm;}}"
                    //         });
                    //     }, 1500);
                    // }else{
                        setTimeout(() => {
                            printJS({
                                printable: id,
                                type: "html",
                                // targetStyles: ["*"],
                                style:'@media print{@page{size:A4 landscape;margin-left:20mm;margin-right:17mm;margin-top:8mm;margin-bottom:3mm;}.psad{page-break-after: always;}'+this.printStyles+'}'
                                // ignoreElements: ["no-print", "bc", "gb"],
                            });
                        }, 1500);
                    // }


                });
        },
        getWeekData(id, callback) {
            this.searchForm.start_week = undefined;
            this.searchForm.end_week = undefined;
            this.$http
                .weekData({
                    id: id
                })
                .then(res => {
                    if (callback) {
                        callback(res);
                    } else {
                        this.weekData = res.data;
                    }
                });
            this.search(1);
        },
        getSearchs(id) {
            //获取搜索条件
            this.$http.RecipesGetSearchMonth({ id }).then(res => {
                if (res.code == 1) {
                  let arr = [{ id: "", month: "全部" }]
                    var mounths = JSON.parse(JSON.stringify(res.data));
                    this.mouthData = arr.concat(mounths);
                }
            });
        },
        search(data) {
            // console.log(this.searchForm.calendar_id);
            this.loading = true;
            if (data) {
                this.searchForm.page = data;
                this.pagination.current = data;
            }
            this.searchForm.month = "";
            this.$http.cashHandAndFixedPurchase(this.searchForm).then(res => {
                this.tableData = res.data.data || [];
                this.loading = false;
                this.pagination.total = res.data.total;
            });
            this.getSearchs(this.searchForm.calendar_id);
        },
        searchVal() {
            this.$http.cashHandAndFixedPurchase(this.searchForm).then(res => {
                this.tableData = res.data.data || [];
                this.loading = false;
                this.pagination.total = res.data.total;
            });
        },
        exportTable(obj) {
            location.href = obj.export_url;
        },
        lookDetails(item) {
            //查看详情
            this.$router.push({
                path: "planDetailsd",
                query: {
                    central_id: item.central_id,
                    week_id: item.week_id,
                    month: item.month,
                    id:item.id
                }
            });
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
