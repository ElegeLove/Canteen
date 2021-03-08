<template>
  <div>
    <a-page-header class="my-border-bottom" title="查看详情" @back="() => $router.back()" />
    <div class="my-container">
      <p class="bottom-10">当前分类：{{$route.query.pName}}</p>
      <div>
        <a-table
          :loading="loading"
          :columns="columns"
          :data-source="tableData"
          bordered
          :rowKey="(item,index) => index"
          :pagination="pagination"
        ></a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: "二级分类", dataIndex: "name" },
        { title: "编号", dataIndex: "code" },
        { title: "计量单位", dataIndex: "unit" },
        { title: "创建时间", dataIndex: "create_time" },
      ],
       pagination: {
        current: 1,
        pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: (e) => this.search(e),
        onShowSizeChange: (current, size) => {
          //分页触发
          this.searchForm.page_size = size;
          this.pagination.pageSize = size;
          this.search(1);
        },
        pageSizeOptions: this.$commonJs.PAGE_LINES,
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },

      //数据
      tableData: [],
      searchForm: {
        page: 1,
        page_num: Number(this.$commonJs.PAGE_LINES[0]),
        pid: Number(this.$route.params.pid),
      },
      loading: false,
    };
  },
  mounted() {
    this.search(1);
  },
  methods: {
    search(data) {
      this.loading = true;
      if (data) {
        this.searchForm.page = data;
        this.pagination.current = data;
      }
      this.$http.procurement_proMenu_second(this.searchForm).then((res) => {
        this.tableData = res.data.list || [];
        this.loading = false;
        this.pagination.total = res.data.total_count;
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
