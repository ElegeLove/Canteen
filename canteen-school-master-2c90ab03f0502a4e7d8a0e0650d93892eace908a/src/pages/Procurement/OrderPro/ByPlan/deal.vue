<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="下单"
      @back="() => $router.back()"
    >
      <div class="top-20" v-for="(item,pindex) in tableData" :key="pindex">
        <a-card>
          <div slot="title" class="hidden">
            <div class="left right-20">订货学校：{{item.info.school ||item.info.school_name}}</div>
            <div class="left">供应商：{{item.info.supplier ||'--'}}</div>
          </div>
          <a-table
            :columns="columns"
            :data-source="item.procurement"
            bordered
            :rowKey="(node,index) => index"
            :pagination="false"
          >
            <!-- <template slot="pro" slot-scope="text,record,index">
              <a-button
                type="link"
                @click="selectPro(record,pindex,index)"
              >{{record.brand || '选择商品'}}</a-button>
            </template> -->
          </a-table>
          <div class="top-20">
            <span>选择配送时间：</span>
            <a-date-picker
              v-model="item.info.distribution_time"
              value-format="YYYY-MM-DD HH:mm"
              :show-time="showTime"
              placeholder="请选择时间"
              format="YYYY-MM-DD HH:mm"
            />
          </div>
          <div class="top-10 hidden">
            <div class="left">
              <span class="left" style="margin-right:10px;line-height:32px">买家留言（选填）：</span>
              <a-input
                class="left"
                v-model="item.info.remark"
                style="width: 600px"
                placeholder="对卖家说点什么"
              ></a-input>
            </div>
            <div class="right">
              <span>共&nbsp;{{item.info.species}}&nbsp;类</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                小计&nbsp;&nbsp;
                <em style="color:red;font-weight:bold">{{item.info.total_money || 0}}</em>&nbsp;&nbsp;元
              </span>
            </div>
          </div>
        </a-card>
      </div>
    </a-page-header>
    <a-row class="top-20 page-footer" type="flex" justify="end">
      <a-col :span="4" style="text-align:right">
        共计
        <span style="color:red;font-weight:bold">&yen;&nbsp;{{total_money}}</span>
        <a-button class="left-20" type="primary" @click="submit">提交订单</a-button>
      </a-col>
    </a-row>

    <a-modal v-model="visible" title="选择商品" width="60%" @ok="handleOk" @cancel="handleCancel">
      <div>
        <a-table
          :scroll="{ x: 1000, y: 600 }"
          :columns="proColumns"
          :data-source="proList"
          bordered
          :rowKey="(item,index) => index"
          :pagination="false"
          :row-selection="{selectedRowKeys:selectedRowKeys, hideDefaultSelections: true, type:'radio', onChange:changeSelectPro}"
        >
          <template slot="image" slot-scope="text,record">
            <img :src="record.image" style="width:80px;height:80px" alt />
          </template>
          <template slot="unit_price" slot-scope="text,record">{{record.unit_price}}/{{record.unit}}</template>
          <template slot="action" slot-scope="text,record">
            <a-button type="link" @click="seeDetail(record)">查看详情</a-button>
          </template>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTime:{
        format:"HH:mm"
      },
      columns: [
        { title: "产品代码", dataIndex: "code" },
        { title: "产品名称", dataIndex: "name" },
        { title: "计量单位", dataIndex: "unit" },
        { title: "数量", dataIndex: "real_quantity" },
        {
          title: "产地品牌生产商",
          dataIndex: "supplier_product_name",
          scopedSlots: { customRender: "supplier_product_name" },
        },
        { title: "单价（元）", dataIndex: "price" },
        { title: "金额（元）", dataIndex: "total_price" },
      ],
      tableData: [],
      visible: false,
      //选择商品数据
      proColumns: [
        {
          title: "产品图片",
          dataIndex: "image",
          scopedSlots: { customRender: "image" },
        },
        { title: "产品名称", dataIndex: "title" },
        {
          title: "单价",
          dataIndex: "unit_price",
          scopedSlots: { customRender: "unit_price" },
        },
        { title: "产地品牌生产商", dataIndex: "manufacturer" },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],

      selectedRowKeys: [],
      selectedRowValues: [],
      proList: [],
      pIndex: 0,
      index: 0,
    };
  },
  mounted() {
    this.getData();
    console.log(this.$route.query.type)
  },
  computed: {
    total_money() {
      let money = 0;
      this._.forEach(this.tableData, (item) => {
        money = (money * 100 + item.info.total_money * 100) / 100;
      });
      return this.$commonJs.rounds(money,2);
    },
  },
  methods: {
    getData() {
      let type = this.$route.query.type;
      let id;
      if (type == "day") {
        id = this.$route.query.ids.split(",");
      } else {
        id = this.$route.query.ids;
      }
      this.$http
        .procurement_orderPro_byPlan_deal_list(this.$route.query.type, id)
        .then((res) => {
          this.tableData = res.data;
        });
    },
    submit() {
      // 判断没有填写时间不能提交
      let canSubmit = true;
      // this._.forEach(this.tableData, (item) => {
      //   this._.forEach(item.procurement, (node) => {
      //     if (!node.supplier_product_id) {
      //       canSubmit = false;
      //     }
      //   });
      // });

      // if (!canSubmit) {
      //   this.$message.error("有商品未选择品牌，请选择");
      //   return;
      // }
      this._.forEach(this.tableData, (item) => {
        if (!item.info.distribution_time) {
          canSubmit = false;
        }
      });
      if (!canSubmit) {
        this.$message.error("请选择配送时时间");
        return;
      }
      this.$confirm({
        title: "提交订单",
        content: "提交订单后供应商将按订购内容配送，请确认！",
        onOk: () => {
          this.$http
            .procurement_orderPro_byPlan_make_deal(this.tableData)
            .then((res) => {
              if (res.code == 1) {
                this.$router.push(
                  `/procurement/orderPro/cart/oneSuccess?price=${
                    this.total_money
                  }&time=${new Date().getTime()}`
                );
              }
            });
        },
        onCancel() {},
      });
    },
    selectPro(data, pIndex, index) {
      this.pIndex = pIndex;
      this.index = index;
      this.getPro(data);
    },
    changeSelectPro(arr, data) {
      this.selectedRowKeys = arr;
      this.selectedRowValues = data;
      // console.log(this.selectedRowKeys);
    },
    handleOk() {
      // 获取选择的商品
      if (this.selectedRowValues.length == 0) {
        this.$message.error("请选择");
        return;
      }
      //处理选中的数据
      let [obj] = this.selectedRowValues;
      this.tableData[this.pIndex].procurement[this.index].price =
        obj.unit_price;
      this.tableData[this.pIndex].procurement[this.index].supplier_product_id =
        obj.id;
      this.tableData[this.pIndex].procurement[this.index].brand =
        obj.manufacturer;
      this.tableData[this.pIndex].procurement[this.index].total_price =
        this.$commonJs.rounds((obj.unit_price *
          100 *
          this.tableData[this.pIndex].procurement[this.index].real_quantity) /
        100,2);
      this.handlePrice();
      this.visible = false;
      this.selectedRowKeys = [];
      this.selectedRowValues = [];
    },
    handleCancel() {
      this.selectedRowKeys = [];
      this.selectedRowValues = [];
    },
    //计算统计价格
    handlePrice() {
      this._.forEach(this.tableData, (item) => {
        item.info.total_money = 0;
        this._.forEach(item.procurement, (node) => {
          item.info.total_money =
            this.$commonJs.rounds((item.info.total_money * 100 + node.total_price * 100) / 100,2);
        });
      });
    },
    getPro(data) {
      this.$http
        .procurement_orderPro_bySelf_list({
          supplier_id: data.supplier_id,
          primary_id: "",
          keyword: "",
          secondary_id: data.secondary_id,
        })
        .then((res) => {
          this.proList = res.data.data || [];
          this.visible = true;
        });
    },
    seeDetail(obj) {
      this.$router.push(`/procurement/orderPro/byPlan/proInfo/${obj.id}`);
    },
  },
};
</script>


<style scoped="scoped" lang="scss">
  @import "../../../../assets/css/Procurement/common.scss";
</style>
