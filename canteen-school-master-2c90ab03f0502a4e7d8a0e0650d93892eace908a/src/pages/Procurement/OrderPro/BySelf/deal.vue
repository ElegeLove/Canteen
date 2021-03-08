<template>
  <div>
    <a-page-header title="确认订单" @back="() => $router.back()">
      <div class="top-20 cart-pro-card">
        <div class="cart-pro-card-title">{{tableData.supplierInfo.name}}</div>
        <div>
          <div class="cart-pro-card-wrap">
            <a-row class="cart-pro-card-wrap-item" type="flex" align="middle">
              <a-col :span="4">
                <img style="width:100px;height:100px" :src="tableData.image" alt="商品图片" />
              </a-col>
              <a-col :span="8">{{tableData.title}}</a-col>
              <a-col :span="4">&yen;{{tableData.unit_price}}/{{tableData.unit}}</a-col>
              <a-col :span="4">{{total_num}}{{tableData.unit}}</a-col>
              <a-col :span="4">
                <span style="color:#FF0000">&yen;{{total_money}}</span>
              </a-col>
            </a-row>
          </div>
          <div class="datas">
            <span>选择配送时间：</span>
            <a-date-picker placeholder="选择日期"
             valueFormat="YYYY-MM-DD"
             v-model="sendTim"
             />
             <a-time-picker format="HH:mm" v-model="houres" valueFormat="HH:mm"/>
          </div>
          <a-row class="hidden cart-pro-card-footer">
            <a-col :span="18">
              <span class="left" style="margin-right:10px;line-height:32px">买家留言(选填):</span>
              <a-input class="left" style="width: 80%" v-model="remark" placeholder="对卖家说点什么"></a-input>
            </a-col>
            <a-col :span="6">
              <span>共&nbsp;1&nbsp;类</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                小计&nbsp;&nbsp;
                <em style="color:#FF0000; ">{{total_money}}</em>&nbsp;&nbsp;元
              </span>
            </a-col>
          </a-row>
        </div>
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
          <a-col :span="3">1件商品</a-col>
          <a-col :span="4">
            共计：
            <span class="red">￥{{total_money}}</span>
          </a-col>
          <a-col :span="3">
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
      central_id:undefined,
      schoolData:[],
      //数据
      loading: false,
      tableData: {
        supplierInfo: {},
      },
      total_num: this.$route.query.num || 1,
      total_money: 0,
      remark: "",
      sendTim:"",
      houres:""
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
      this.total_money = 0;
      this.$http
        .production_detail_deal({ id: this.$route.query.id })
        .then((res) => {
          this.loading = false;
          this.tableData = res.data;
          this.total_money =
            this.$commonJs.rounds((this.total_num * Number(this.tableData.unit_price) * 100) / 100,2);
        });
    },
    submitOrder() {
      if(this.sendTim==""){
        return this.$message.error('请选择配送日期');
      }
      if(this.houres==""){
        return this.$message.error('请选择配送时间');
      }
      this.$confirm({
        title: "提交订单",
        content: "提交订单后供应商将按订购内容配送，请确认！",
        onOk: () => {
          this.$http
            .production_detail_confirmOrder({
              supplier_id: this.tableData.supplier_id,
              product_id: this.tableData.id,
              num: this.total_num,
              remark: this.remark,
              distribution_time:this.sendTim+" "+this.houres,
              school_id:this.central_id
            })
            .then((res) => {
              if (res.code == 1) {
                this.$router.replace(
                  `/procurement/orderPro/cart/success?price=${
                    this.total_money
                  }&time=${new Date().getTime()}`
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
