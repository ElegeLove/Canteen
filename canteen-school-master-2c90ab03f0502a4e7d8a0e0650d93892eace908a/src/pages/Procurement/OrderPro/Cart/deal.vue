<template>
  <div>
    <a-page-header title="确认订单" @back="() => $router.back()">
      <div class="top-20 cart-pro-card" v-for="(item,index) in tableData" :key="index">
        <div class="cart-pro-card-title">{{item.name}}</div>
        <a-table :columns="columns" :data-source="item.cartInfo" :scroll="{ x: 1500}"
           :pagination="false"
            bordered
            class="tabsd"
            :rowKey="(record,index)=>{return index}"
            >
            <div slot="imgs" slot-scope="text,row,index">
              <img v-lazy="row.image" class="img_icon"/>
            </div>
         </a-table>
      <!--  <div v-for="(node,cIndex) in item.cartInfo" :key="cIndex">
          <div class="cart-pro-card-wrap">
            <a-row class="cart-pro-card-wrap-item" type="flex" align="middle">
              <a-col :span="4">
                <img style="width:100px;height:100px" :src="node.image" alt="商品图片" />
              </a-col>
              <a-col :span="8">{{node.title}}</a-col>
              <a-col :span="4">&yen;{{node.unit_price}}/{{node.unit}}</a-col>
              <a-col :span="4">{{node.num}}{{node.unit}}</a-col>
              <a-col :span="4">
                <span style="color:#FF0000">&yen;{{node.total_price}}</span>
              </a-col>
            </a-row>
          </div>
        </div> -->
        <div class="datas">
          <span>选择配送时间：</span>
          <a-date-picker placeholder="选择日期"
           valueFormat="YYYY-MM-DD"
           v-model="item.distribution_time"
           :allowClear="false"
           :getCalendarContainer="
               triggerNode => {
                 return triggerNode.parentNode || document.body;
               }
             "
           />
           <a-time-picker
            :getPopupContainer="
                triggerNode => {
                  return triggerNode.parentNode || document.body;
                }
              "
            format="HH:mm" valueFormat="HH:mm" :allowClear="false" v-model="item.time"/>
        </div>
        <a-row class="hidden cart-pro-card-footer">
          <a-col :span="18">
            <span class="left" style="margin-right:10px;line-height:32px">买家留言</span>
            <a-input class="left" style="width: 80%" v-model="item.remark" placeholder="对卖家说点什么"></a-input>
          </a-col>
          <a-col :span="6">
            <span>共&nbsp;{{item.total_type}}&nbsp;类</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              小计&nbsp;&nbsp;
              <em style="color:#FF0000; ">{{item.total_money}}</em>&nbsp;&nbsp;元
            </span>
          </a-col>
        </a-row>
      </div>
      <div class="school_sec">
        <span>*选择采购学校：</span>
        <a-select
           style="width: 120px"
           placeholder="请选择"
           v-model="central_id"
         >
           <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.abbreviation}}</a-select-option>
       </a-select>
      </div>
      <div class="footer">
        <a-row type="flex" justify="end" align="middle">
          <a-col :span="3">{{total_num}}件商品</a-col>
          <a-col :span="4">
            共计：
            <span class="red">￥{{total_money}}</span>
          </a-col>
          <a-col :span="6">
            <a-button type="danger" class="pay-btn" @click="submitOrder()">提交订单</a-button>
          </a-col>
        </a-row>
      </div>
    </a-page-header>
  </div>
</template>

<script>
  import moment from "moment"
export default {
  data() {
    return {
      //数据
      central_id:undefined,
      schoolData:[],
      loading: false,
      tableData: [],
      total_num: 0,
      total_money: 0,
      columns:[
        { title: '产品图片', width: 200, dataIndex: 'full_name', key: 'full_name',align:"center",fixed: 'left',
          scopedSlots: { customRender: 'imgs' },
        },
        { title: '产品名称', width: "25%", dataIndex: 'title', key: 'title',align:"center"},
        { title: '单价(元)', dataIndex: 'is_fill', key: 'is_fill', width: "25%",align:"center",
          customRender: (value, row, index) => {
            return "￥"+row.unit_price+"/"+row.unit
          }
        },
        { title: '数量', dataIndex: 'num', key: 'num', width: "25%",align:"center",
          customRender: (value, row, index) => {
            return row.num+row.unit
          }
        },
        { title: '金额(元)', dataIndex: 'total_price', key: 'total_price', width: "25%",align:"center",
          customRender: (value, row, index) => {
            return "￥"+row.total_price
          }
        },
      ],
    };
  },
  mounted() {
    this.getData();
    this.getSchool()
  },
  methods: {
    getSchool(){          //获取学校
      this.$commonJs.getSchool((data)=>{
        this.schoolData = data;
        if(data.length!==0){
           this.central_id = data[0].id
        }
      })
    },
    getData() {
      this.loading = true;
      this.total_num = 0;
      this.total_money = 0;
      this.$http
        .bySelf_settlementList({
          cart_id: this.$route.query.cart_id,
          product_id: this.$route.query.product_id,
        })
        .then((res) => {
          if(res.code==0){
            this.$router.go(-1)
          }
          this.loading = false;
          this.tableData = res.data;

          for (let i = 0; i < this.tableData.length; i++) {
            this.total_money = this.$commonJs.rounds(Number(this.total_money) + Number(this.tableData[i].total_money),2);
            this.total_num = this.total_num + this.tableData[i].total_type;
            for (let j = 0; j < this.tableData[i].cartInfo.length; j++) {
              this.$set(this.tableData[i].cartInfo[j], "remark", "");
            }
            this.$set(this.tableData[i], "distribution_time",moment().format("YYYY-MM-DD"));
            this.$set(this.tableData[i], "time",moment().format("HH:mm"));
          }
        });
    },
    submitOrder() {
      var datas = JSON.parse(JSON.stringify(this.tableData));
      datas.forEach((item)=>{
        item.distribution_time = item.distribution_time+" "+item.time
      })
      var objs = {
        param:datas,
        school_id:this.central_id
      }
      this.$confirm({
        title: "提交订单",
        content: "提交订单后供应商将按订购内容配送，请确认！",
        onOk: () => {
          this.$http.makeDealFromSettlement(objs).then((res) => {
            if (res.code == 1) {
              this.$router.replace(
                `success?price=${this.total_money}&time=${new Date().getTime()}`
              );
            }
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>


<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
.datas{
  display: flex;
  align-items: center;
  margin-top: 20px;
  /deep/ .ant-time-picker{
    margin-left: 10px;
  }
}
.img_icon{
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.tabsd{
  margin-top: 10px;
}
.cart-pro-card {
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(2, 187, 114, 0.06);
  border-radius: 8px;
  padding: 0 35px;
  &-title {
    padding: 27px 0 6px 0;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  &-wrap {
    &-item {
      padding: 30px 0;
      border-bottom: 1px solid #f0f2f5;
      font-size: 16px;
      color: #333;
    }
  }
  &-footer {
    padding: 37px 0 34px 0;
  }
}

.footer {
  box-sizing: border-box;
  padding: 20px 0;
  background: #fff;
  font-size: 16px;
  .red {
    color: #ff0000;
    font-weight: bold;
  }
  .pay-btn {
    width: 146px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    background: #ff0000;
    border-radius: 6px;
  }
}
.school_sec{
  display: flex;
  align-items: center;
  >span{
    margin-left: 30px;
  }
}
</style>
