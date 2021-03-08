<template>
  <div>
    <!-- 按食谱出库 -->

    <a-page-header title="食谱生成" @back="() => $router.back()">
      <a-divider orientation="left">选择出库餐次</a-divider>

      <a-form class="mySubmitForm" layout="vertical" :form="searchForm">
        <a-row>
          <a-col :span="6">
            <a-form-item label="选择用餐日期">
              <a-date-picker v-model="searchForm.time_value" value-format="YYYY-MM-DD" format="YYYY-MM-DD"
                :disabled-date="disabledDate" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="选择用餐餐次">
              <a-radio-group name="radioGroup" v-model="searchForm.type">
                <a-radio :value="0">早餐</a-radio>
                <a-radio :value="1">午餐</a-radio>
                <a-radio :value="2">晚餐</a-radio>
                <a-radio :value="3">上午点心</a-radio>
                <a-radio :value="4">下午点心</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-button type="primary" @click="getData()">生成食材单</a-button>
        </a-row>
      </a-form>
      <a-divider orientation="left">填写食材单</a-divider>
      <!-- 数据 start -->
      <a-table :columns="columns" :data-source="data" bordered :rowKey="(item,index) => index" :pagination="false">
        <template slot="out_count" slot-scope="text, record,index">
          <a-input v-model="record.out_count"  placeholder="请输入数量"
           @input="setNums(record,index)"
           :maxLength="11"
           @change="regIputs(record)"/>
        </template>
        <template slot="remarks" slot-scope="text, record">
          <a-input v-model="record.remarks" placeholder="请输入备注" />
        </template>
      </a-table>
      <!-- 数据 -end -->
      <!-- 数据 -end -->
      <div class="top-20">
        <a-button type="primary" :disabled="data.length==0" @click="submit">确认出库</a-button>
        <a-button @click="$router.back()">取消</a-button>
      </div>
    </a-page-header>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        columns: [{
            title: "产品代码",
            dataIndex: "product_code"
          },
          {
            title: "产品名称",
            dataIndex: "product_name"
          },
          {
            title: "产地品牌生产商",
            dataIndex: "manufacturer"
          },
          {
            title: "等级规格",
            dataIndex: "grade"
          },
          {
            title: "计量单位",
            dataIndex: "unit_meterage"
          },
          {
            title: "单价（元）",
            dataIndex: "unit_price"
          },
          {
            title: "数量",
            dataIndex: "out_count",
            scopedSlots: {
              customRender: "out_count"
            }
          },
          {
            title: "当前库存",
            dataIndex: "stock"
          },
          {
            title: "金额（元）",
            dataIndex: "total_price"
          },
          {
            title: "备注",
            dataIndex: "remarks",
            scopedSlots: {
              customRender: "remarks"
            }
          },
        ],
        data: [],
        searchForm: {
          time_value: moment(new Date()).format("YYYY-MM-DD"),
          type: 0,
        },
      };
    },
    mounted() {
      // this.getData();
    },
    methods: {
      regIputs(item){
        item.out_count = this.$commonJs.regMoneyOnes(item.out_count)
      },
      setNums(item,i){   //计算
      if(parseFloat(item.out_count) > parseFloat(item.stock)){
        this.data[i].out_count = item.stock;
      }
        item.total_price = this.$commonJs.rounds(Number(item.out_count)*Number(item.unit_price),2)
      },
      disabledDate(value) {
        return value.valueOf() <= moment(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
      },
      getData() {
        this.$http.outAndIn_outByRecipe(this.searchForm).then((res) => {
          this.data = res.data;
          if (this.data.length == 0) return;
          this._.forEach(this.data, item => {
            item.count= 100
          })
        });
      },
      submit() {
        //1:食谱出库  2：临时出库  3：入库即出库  4：盘亏出库
        let array = []
        this._.forEach(this.data, item => {
          if (item.out_count > 0) {
            array.push({
              id: item.id,
              number: item.out_count,
              remark: item.remarks
            })
          }
        })
        this.$store.commit("sch_setLoaing",true)
        this.$http.outAndIn_outSingleItem(array, 1).then(res => {
          this.$store.commit("sch_setLoaing",false)
          if (res.code == 1) {
            history.back()
          }
        })
      }
    },
  };
</script>

<style scoped="scoped" lang="scss">
  @import "../../../assets/css/Procurement/common.scss";
</style>
