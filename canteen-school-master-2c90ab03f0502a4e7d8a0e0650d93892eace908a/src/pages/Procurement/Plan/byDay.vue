<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="返回"
        @back="() => $router.back()"
    />
    <div class="my-container">
      <!-- 搜索 start -->
      <div class="my-search bottom-20">
        <div class="my-search-item">
          <div class="title">状态:</div>
          <a-select
            allowClear
            v-model="searchForm.status"
            placeholder="选择状态"
            style="width: 120px"
            @change="search(1)"
          >
            <a-select-option value>全部</a-select-option>
            <a-select-option :value="0">未完成</a-select-option>
            <a-select-option :value="1">已完成</a-select-option>
          </a-select>
        </div>
      </div>
      <!-- 搜索 end -->

      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        bordered
        :rowKey="(item, index) => index"
        :pagination="false"
      >
        <template slot="semester" slot-scope="text, record"
          >{{ record.year }}年{{ record.semester }}</template
        >
        <template slot="school_week" slot-scope="text, record"
          >第{{ record.school_week }}周</template
        >
        <template slot="action" slot-scope="text, record">
          <!-- procurement_status   采购计划状态  0 未完成  1 已完成  -->
          <!-- order_status 下单状态   0未下单  1 待确认 2 已确认  3 已撤回', -->
          <a-button
            type="link"
            v-if="record.procurement_status == 1"
            @click="
              $router.push(`/procurement/plan/update/${record.id}?type=day`)
            "
            :disabled="record.order_status == 1 || record.order_status == 2"
            >修改</a-button
          >
          <a-button
            type="link"
            v-if="record.procurement_status == 1"
            @click="download(record.download_url)"
            >导出</a-button
          >
          <a-button
            type="link"
            v-if="record.procurement_status == 1"
            @click="printFun('printTable', record)"
            >打印</a-button
          >
          <a-button
            type="link"
            v-if="record.procurement_status == 1"
            @click="goInfo(record)"
            >查看</a-button
          >
          <a-button
            type="link"
            v-if="record.procurement_status == 0"
            @click="goEdit(record)"
            >编写计划</a-button
          >
        </template>
      </a-table>

      <print-table :info="prinTableInfo"></print-table>
    </div>
  </div>
</template>

<script>
import print from "print-js";
import printTable from "@/pages/Procurement/Plan/components/printTable";
export default {
  components: {
    printTable,
  },
  data() {
    return {
      columns: [
        {
          title: "学期",
          dataIndex: "semester",
          scopedSlots: { customRender: "semester" },
        },
        {
          title: "周",
          dataIndex: "school_week",
          scopedSlots: { customRender: "school_week" },
        },
        { title: "星期", dataIndex: "week" },
        { title: "时间", dataIndex: "time_text" },
        { title: "本表状态", dataIndex: "procurement_status_text" },
        { title: "编制时间", dataIndex: "preparation_time" },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],

      //数据
      tableData: [],
      searchForm: {
        id: Number(this.$route.params.id),
      },
      loading: false,
      prinTableInfo: [],
    };
  },
  mounted() {
    this.search(1);
  },
  methods: {
    download(url) {
      location.href = url;
    },
    //打印
    printFun(tableId, obj) {
      this.$http
        .procurement_plan_detailInfo("day", { id: obj.id })
        .then((res) => {
          this.prinTableInfo = res.data;
          setTimeout(() => {
            printJS({
              printable: tableId,
              type: "html",
              // targetStyles: ["*"],
              ignoreElements: ["no-print", "bc", "gb"],
            });
          }, 1000);
        });
    },
    search(data) {
      this.loading = true;
      this.$http.procurement_plan_byDay(this.searchForm).then((res) => {
        this.tableData = res.data || [];
        this.loading = false;
      });
    },
    goInfo(obj) {
      this.$router.push(`/procurement/plan/info/${obj.id}?type=day`);
    },
    goEdit(obj) {
      this.$router.push(`/procurement/plan/edit/${obj.id}?type=day`);
    },
  },
};
</script>


<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
