<template>
  <div class="paySuccess">
    <!-- 下单成功 -->
    <div class="main">
      <img class="main-icon" src="@/assets/image/sensucc.png" alt />
      下单成功！请留意验收
    </div>
    <div
      class="txt"
    >下单时间：&nbsp;&nbsp;&nbsp;&nbsp;{{['yyyy-MM-dd hh:mm:ss',$route.query.time] | dateFormat}}</div>
    <div class="txt">
      实际金额(元)：&nbsp;&nbsp;&nbsp;&nbsp;
      <span>&yen;{{$route.query.price}}</span>
      <a-divider />
    </div>
    <div class="btn-wrap">
      <a-button class="btn-item" @click="$router.push('/procurement/orderList/index')">查看我的订货单</a-button>
      <a-button class="btn-item"
       v-if="info.optional_purchase == 1"
       @click="$router.push('/procurement/orderPro/bySelf/bySelfList')">继续选购</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      info: {},
    }
  },
	created(){
		var infos = JSON.parse(localStorage.getItem("indexInfo"));
    this.info = infos;
	}
};
</script>

<style lang="scss" scoped>
.paySuccess {
  .main {
    padding: 48px;
    background: #eeeeee;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    .main-icon {
      width: 55px;
      height: 55px;
      margin-right: 24px;
    }
    margin-bottom: 7px;
  }
  .txt {
    font-size: 14px;
    color: #333333;
    margin-top: 23px;
    span {
      color: #ff0000;
    }
  }

  .btn-wrap {
    .btn-item {
      background: rgba(238, 238, 238, 1);
      border: 1px solid rgba(220, 220, 220, 1);
      border-radius: 4px;
      margin-right: 30px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
