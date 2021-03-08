<template>
  <div class="selectedPro">
    <a-page-header title="选择商品" @back="() => $router.back()">
      <div class="hidden">
        <a-card
          class="myProCord"
          v-for="(item,index) in proList"
          :key="index"
          @click="selectedPro(item)"
        >
          <img class="card-img" slot="cover" alt="商品图片" :src="item.image" />
          <a-card-meta>
            <template slot="description">
              <div style="color:#333">
                <span style="color:red;">￥</span>
                <span style="color:red;font-size:25px;font-weight:bold">{{item.unit_price}}</span>
                / {{item.unit}}
              </div>
              <div class="proName">{{item.title}}&nbsp;&nbsp;{{item.manufacturer}}</div>
              <div>{{item.name}}</div>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </a-page-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proList: [],
    };
  },
  mounted() {
    this.getPro();
  },
  methods: {
    getPro() {
      this.$http
        .procurement_orderPro_bySelf_list({
          supplier_id: "",
          primary_id: "",
          keyword: "",
          code: this.$route.query.code || "",
        })
        .then((res) => {
          this.proList = res.data.data || [];
        });
    },
    selectedPro(obj) {
      sessionStorage.setItem('brandInfo',
        JSON.stringify({ name: obj.name, index: this.$route.query.index })
      );
      history.back();
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
.myProCord {
  width: 150px;
  float: left;
  margin-bottom: 30px;
  position: relative;
  border: none;
  box-shadow: 0px 0px 6px #a3ecd0;
  border-radius: 10px;
  margin-right: 45px;
  cursor: pointer;
  .card-img {
    width: 150px;
    height: 100px;
    border-radius: 10px 0 0 10px;
  }
  &:hover {
    border: none;
  }
  .ant-card-body {
    padding: 10px !important;
    .proName {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .icon-cart {
    position: absolute;
    width: 23px;
    height: 24px;
    right: 16px;
    bottom: 14px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
.selectedPro {
  .ant-tabs-bar {
    border-bottom-color: #ffffff;
  }

  .ant-card-body {
    padding: 15px 10px;
  }
}
</style>
