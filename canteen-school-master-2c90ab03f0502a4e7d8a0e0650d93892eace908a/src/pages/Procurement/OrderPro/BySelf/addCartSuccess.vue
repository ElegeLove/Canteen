<template>
  <div class="o_my">
    <div class="icon-wrap">
      <div>
        <img
          style="width:55px;height:55px;margin-right:28px"
          src="@/assets/image/icon-addCart-success.png"
          alt
        />
      </div>
      <span>加入购物车成功~</span>
    </div>
    <div class="pro-wrap">
      <div>
        <img :src="info.image" style="width:92px;height:92px;margin-right:20px" alt />
      </div>
      <div class="pro-info">
        <div class="info-name">{{info.manufacturer}}&nbsp;&nbsp;{{info.title}}</div>
        <div class="info-num">
          <span>数量：{{num}} {{unit}}</span>
          <span style="margin-left:21px">总价：&yen;{{price}}</span>
        </div>
      </div>
    </div>
    <div style="margin-top:37px">
      <a-button class="btn" @click="back()">继续选购</a-button>
      <a-button
        class="btn btn-active"
        type="primary"
        @click="$router.replace('/procurement/orderPro/cart/cartList')"
      >去购物车下单</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      num: this.$route.query.num,
      unit: this.$route.query.unit,
      price:this.$commonJs.rounds(this.$route.query.num * Number(this.$route.query.unit_price),2),
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.production_detail({ id: this.$route.query.id }).then((res) => {
        this.info = res.data;
      });
    },
    back() {
      history.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.o_my {
  padding: 29px 39px;
  .icon-wrap {
    padding: 48px 50px;
    background: #eeeeee;
    display: flex;
    align-items: center;

    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .pro-wrap {
    margin-top: 31px;
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #f0f2f5;
    .pro-info {
      height: 92px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .info-name {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #333333;
        padding-top: 15px;
      }
      .info-num {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
    }
  }
  .btn {
    background: #eeeeee;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
  }
  .btn-active {
    background: #02bb72;
    border-radius: 4px;
    border: 1px solid #02bb72;
    margin-left: 30px;
  }
}
</style>
