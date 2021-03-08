<template>
  <div>
    <a-page-header title="商品详情" @back="() => $router.back()">
      <div class="proInfo-base hidden">
        <div class="left" style="width:230px;height:230px; margin-right:50px">
          <img style="width:100%;height:100%;" slot="cover" alt="商品图片" :src="info.image" />
        </div>
        <div class="left" style="width:600px">
          <div class="proInfo-base-name">{{info.title}}</div>
          <div class="proInfo-base-price">
            商品售价：
            <span>￥{{info.unit_meterage }}</span>
            /  {{info.type==0?info.small_unit:info.unit}}
          </div>
          <div style="margin-top:32px" v-if="unable == 1">
            <a-button
              type="danger"
              style="margin-right:48px"
              class="btn"
              size="large"
              :ghost="true"
              @click="deal()"
            >立即下单</a-button>
            <a-button type="danger" class="btn btn-active" size="large" @click="addCart()">加入购物车</a-button>
          </div>
        </div>
      </div>

      <div class="proInfo-info">
        <div class="proInfo-info-title">商品介绍</div>
        <a-row  v-if="info.type==0">
          <a-col class="proInfo-info-item" :span="8">产地品牌生厂商：{{info.brand}},{{info.produce}}</a-col>
          <a-col class="proInfo-info-item" :span="8">等级规格：{{info.grade}},{{info.net_content}}{{info.unit}}/{{info.small_unit}}</a-col>
          <a-col class="proInfo-info-item" :span="8">生产日期：{{info.production_time}}</a-col>
          <a-col class="proInfo-info-item" :span="8">保质期至：{{info.expiration_time}}</a-col>
          <a-col class="proInfo-info-item" :span="8">类型：{{info.type==0?'预包装食品':info.type==1?'农产品':'小作坊食品'}}</a-col>
          <a-col class="proInfo-info-item" :span="8">计量单位价：￥{{info.unit_price}}/{{info.unit}}</a-col>
        </a-row>
        <a-row  v-if="info.type==1">
          <a-col class="proInfo-info-item" :span="8">产地：{{info.origin}}</a-col>
          <a-col class="proInfo-info-item" :span="8">类型：{{info.type==0?'预包装食品':info.type==1?'农产品':'小作坊食品'}}</a-col>
        </a-row>
        <a-row  v-if="info.type==2">
          <a-col class="proInfo-info-item" :span="8">小作坊名称：{{info.workshop_name}}</a-col>
          <a-col class="proInfo-info-item" :span="8">生产日期：{{info.production_time}}</a-col>
        </a-row>
      </div>
      <div class="imgList">
        <pre>{{info.introduce}}</pre>
      </div>
    </a-page-header>

    <a-modal
      title="选择"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div>
        <span>数量：</span>
        <a-input style="width:180px" v-model="num" :suffix="info.unit" @change="iptReg"></a-input>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      unable: this.$route.query.unable,
      visible: false,
      confirmLoading: false,
      num: 1,
      isCart: false,
    };
  },
  created() {
    if (this.$route.query.unable == 1) {
      this.$parent.$parent.activeName = "bySelf";
    }
  },
  mounted() {
    this.getInfo();
    if (this.$route.query.unable == 1) {
      this.$parent.$parent.activeName = "bySelf";
    }
  },
  methods: {
    iptReg(e){         //输入验证
      var vals = e.target.value;
      var newVal = this.$commonJs.regMoneyOnes(vals);
      e.target.value = newVal;
      this.num = newVal;
    },
    getInfo() {
      this.$http
        .SupplierProductInfo({ id: this.$route.params.id })
        .then((res) => {
          this.info = res.data;
        });
    },
    //加入购物车
    addCart() {
      this.visible = true;
      this.num = 1;
      this.isCart = true;
    },
    handleOk() {
      this.confirmLoading = true;
      var nums = Number(this.num)
      if (!this.isCart) {
        this.$router.push(
          `/procurement/orderPro/bySelf/deal?id=${this.info.id}&num=${nums}`
        );
        return;
      }
      this.$http
        .addProToCart({
          supplier_id: this.info.supplier_id,
          id: this.info.id,
          num: nums,
          price: this.info.unit_price,
        })
        .then((res) => {
          this.confirmLoading = false;
          this.visible = false;
          if (res.code == 1) {
            this.$router.replace(
              `/procurement/orderPro/bySelf/addCartSuccess?id=${this.$route.params.id}&num=${nums}&unit_price=${this.info.unit_price}&unit=${this.info.unit}`
            );
          }
          this.num = 1;
        });
    },
    handleCancel() {
      this.visible = false;
    },
    deal() {
      this.isCart = false;

      this.visible = true;
      this.num = 1;
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
</style>
<style lang="scss" scoped="scoped">
.proInfo-base {
  &-name {
    font-size: 36px;
    font-weight: bold;
    color: #333333;
  }
  &-price {
    margin-top: 40px;
    font-size: 16px;
    padding: 25px 40px 25px 21px;
    background: #f5f5f5;
    color: #999999;
    display: inline-block;
    span {
      color: #f00404;
      font-weight: bold;
      font-size: 36px;
      margin-left: 70px;
    }
  }
  .btn {
    width: 146px;
    height: 44px;
    border-color: #ff0000;
    border-radius: 6px;
  }
}
.proInfo-info {
  margin-top: 70px;
  &-title {
    background: #f5f5f5;
    padding: 15px 20px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    margin-bottom: 40px;
  }
  &-item {
    padding: 4px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
  }
}
.imgList {
  margin-top: 50px;
  widows: 856px;
  pre {
    font-family: Microsoft YaHei;
  }
  img,
  image {
    width: 100%;
    height: auto;
  }
}
</style>
