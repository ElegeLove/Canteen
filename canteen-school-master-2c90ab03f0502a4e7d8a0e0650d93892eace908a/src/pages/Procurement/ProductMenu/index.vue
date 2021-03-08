<template>
  <div style="padding:40px">
    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :pagination="false"
      :rowKey="(item,index)=>index"
      :loading="loading"
    >
      <div slot="action" slot-scope="text,record" class="actiosn main_color">
        <a-button
          type="link"
          @click="$router.push(`info/${record.id}?pName=${record.name}`)"
        >查看</a-button>
      </div>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "一级分类",
          dataIndex: "name",
        },
        {
          title: "操作按钮",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
        },
      ],
      //数据
      tableData: [],
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http.procurement_proMenu_list().then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style></style>
