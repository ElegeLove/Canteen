<template>
  <div class="bySelf">
    <a-radio-group
      class="radio-wrap top-10"
      v-model="searchForm.supplier_id"
      button-style="solid"
      @change="changeSupplier"
      v-if="allSupplier.length > 0"
    >
      <a-radio-button
        :value="item.id"
        v-for="item in allSupplier"
        :key="item.id"
        >{{ item.name }}</a-radio-button
      >
    </a-radio-group>

    <a-divider v-if="allSupplier.length > 0" />

    <!-- 搜索 -->
    <div class="my-search top-20">
      <div class="my-search-item">
        <div class="title">商品:</div>
        <a-input
          v-model="searchForm.keyword"
          placeholder="商品/食材名称"
        ></a-input>
      </div>
      <div class="my-search-item">
        <a-button type="primary" @click="searchIpt()">搜索</a-button>
      </div>
    </div>

    <a-tabs v-model="searchForm.primary_id" @change="changeMenu">
      <a-tab-pane key tab="全部"></a-tab-pane>
      <a-tab-pane
        v-for="item in allMenu"
        :key="item.id"
        :tab="item.name"
      ></a-tab-pane>
    </a-tabs>


   <div>
      <div class="tabBox" v-if="proList.length!==0">
        <a-list
          :pagination="pageGration"
          :dataSource="proList"
          :split="false"
        >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="lists"  @click.stop="
            $router.push(
              `/procurement/orderPro/byPlan/proInfo/${item.id}?unable=1`
            )
          ">
            <img v-lazy="item.image" />
            <div class="conts">
              <p>
                <span>￥</span>
                <span>{{item.unit_meterage}}</span>
                <span>/{{ item.type == 0 ? item.small_unit : item.unit }}</span>
              </p>
              <div class="danshen">{{ item.title }}&nbsp;&nbsp;{{ item.manufacturer }}</div>
              <div class="danshen">{{ item.name }}</div>
            </div>
            <div class="icon-cart" @click.stop="addCart(item)" v-if="item.is_cart==0">
              <img src="@/assets/image/cart.png" alt />
            </div>
            <div class="icon-cart" v-else @click.stop="()=>{}">
              <img src="@/assets/image/overs.png"/>
            </div>
          </div>
        </a-list-item>
       </a-list>
      </div>
      <div class="emptyss" v-else>
        <img src="@/assets/image/noSearch.png" />
        <div>暂未搜索到对应食材</div>
      </div>
    </div>
<!--   <a-row>
      <div v-if="proList.length > 0" class="top-20">
        <a-card
          class="myProCord"
          v-for="(item, index) in proList"
          :key="index"
          @click.stop="
            $router.push(
              `/procurement/orderPro/byPlan/proInfo/${item.id}?unable=1`
            )
          "
        >
          <img class="card-img" slot="cover" alt="商品图片" :src="item.image" />
          <a-card-meta>
            <template slot="description">
              <div style="color: #333">
                <span style="color: red">￥</span>
                <span style="color: red; font-size: 22px; font-weight: bold">{{
                  item.unit_meterage
                }}</span>
                / {{ item.type == 0 ? item.small_unit : item.unit }}
              </div>
              <div class="proName">
                {{ item.title }}&nbsp;&nbsp;{{ item.manufacturer }}
              </div>
              <div>{{ item.name }}</div>
            </template>
          </a-card-meta>


          <div class="icon-cart" @click.stop="addCart(item)" v-if="item.is_cart==0">
            <img src="@/assets/image/cart.png" alt />
          </div>
          <div class="icon-cart" v-else @click.stop="()=>{}">
            <img src="@/assets/image/overs.png"/>
          </div>
        </a-card>
      </div>
      <div class="emptyss" v-else>
        <img src="@/assets/image/noSearch.png" />
        <div>暂未搜索到对应食材</div>
      </div>
    </a-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      allSupplier: [], //供应商列表
      allMenu: [], //一级目录
      searchForm: {
        supplier_id: parseInt(this.$route.query.supplier_id) || "",
        primary_id: parseInt(this.$route.query.primary_id) || "",
        keyword: "",
        code: "",
        page:1,
        pageSize:14
      },
      proList: [],
      pageGration:{
        pageSize:14,
        current:1,
        total:0,
        showSizeChanger:true,
        showQuickJumper:true,
        onShowSizeChange:(current,nums)=>{
          this.pageGration.pageSize = nums
          this.pageGration.current = 1
          this.searchForm.pageSize = nums
          this.searchForm.page = 1
          this.search()
        },
        onChange: (page,pageSize) => {
          this.pageGration.current = page
          this.searchForm.page = page
          this.search()
        },
        pageSizeOptions:['14','20','30'], // 每页数量选项
        showTotal: total => `共有${total} 条数据`,  //分页中显示总的数据
      },
    };
  },
  mounted() {
    this.$http.procurement_supplierList({self_purchase:1}).then((res) => {
      this.allSupplier = res.data;

      if (this.allSupplier.length > 0) {
        this.searchForm.supplier_id =
          parseInt(this.$route.query.supplier_id) ||
          this.allSupplier[0].id ||
          "";
        this.searchForm.primary_id =
          parseInt(this.$route.query.primary_id) || "";
        this.getMenu(this.searchForm.supplier_id);
      } else {
        this.search(1);
      }
    });
  },
  methods: {
    getProduct(){

    },
    getMenu(id) {
      //获取一级目录
      this.$http.procurement_orderPro_bySelf_menu({ id: id }).then((res) => {
        this.allMenu = res.data;
        this.search(1);
      });
    },
    changeMenu(val) {
      this.searchForm.primary_id = val;
      this.search(1);

      let obj = {
        supplier_id: this.searchForm.supplier_id,
        primary_id: this.searchForm.primary_id,
      };
      this.searchForm.page = 1
      this.pageGration.current = 1
      this.$router.replace({
        path: this.$route.path,
        query: obj,
      });
    },
    changeSupplier() {
      this.searchForm.page = 1
      this.pageGration.current = 1
      this.getMenu(this.searchForm.supplier_id);
      this.searchForm.primary_id = "";

      let obj = {
        supplier_id: this.searchForm.supplier_id,
        primary_id: "",
      };
      this.$router.replace({
        path: this.$route.path,
        query: obj,
      });
    },
    //加入购物车
    addCart(data) {
      this.$http
        .addProToCart({
          supplier_id: data.supplier_id,
          id: data.id,
          num: 1,
          price: data.unit_price,
        })
        .then((res) => {
          if(res.code==1){
            data.is_cart = 1
          }
        });
    },
    searchIpt(){
        this.searchForm.page = 1
        this.pageGration.current = 1
        this.search()
    },
    search() {
      this.$store.commit("sch_setLoaing", true);
      //搜索商品
      var searchForm = JSON.parse(JSON.stringify(this.searchForm));
      this.$http.procurement_orderPro_bySelf_list(searchForm).then((res) => {
        this.$store.commit("sch_setLoaing", false);
        if(res.code==1){
          this.pageGration.total = res.data.total
          this.proList = res.data.data || [];
        }
      });
    },
  },
};
</script>



<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
.tabBox{
  box-sizing: border-box;
  /deep/ .ant-tabs-bar{
    border: 0;
  }
}
.lists:hover{
  transform: scale(1.05);
}
.lists{
  transition: all 0.4s;
  width: 159px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 25px;
  cursor: pointer;
  position: relative;
  margin-bottom: 30px;
  box-shadow:0px 5px 10px rgba(32,191,124,0.2);
  .icon-cart {
    position: absolute;
    width: 23px;
    height: 24px;
    top: 8px;
    left: 10px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  >img{
    width: 100%;
    height: 90px;
    object-fit: cover;
  }
  >.conts{
    box-sizing: border-box;
    padding: 10px 10px;
    >p{
      display: flex;
      align-items:baseline;
      font-weight: bold;
      margin-bottom: 3px;
      >span{
        font-size: 14px;
        color: #333333;
      }
      >span:nth-of-type(2){
        font-size: 25.5px;
        color: #FF5050;
      }
      >span:nth-of-type(1){
        color: #FF5050;
      }
    }
    >div{
      font-size: 14px;
      color: #656565;
    }
  }
}
.pagetions{
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 60px;
}
/deep/ .ant-list-items{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
/deep/ .ant-list-item{
  border: 0 !important;
}


.bySelf {
  .radio-wrap {
    .ant-radio-button-wrapper {
      margin-right: 4px;
      border-radius: 4px;
      overflow: hidden;
      box-sizing: border-box;
      border: 1px solid #d2d2d2;
    }
    .ant-radio-button-wrapper-checked {
      border-color: #02bb72;
    }
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      box-shadow: none;
    }
  }
  .emptyss {
    width: 186px;
    text-align: center;
    margin: 0 auto;
    margin-top: 160px;
    color: #999999;
    img {
      width: 186px;
      height: 180px;
    }
    div {
      margin-top: 40px;
    }
  }
}

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
    border-radius: 10px 10px 0 0;
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
    top: 8px;
    bottom: 8px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
.bySelf {
  .ant-tabs-bar {
    border-bottom-color: #ffffff;
  }

  .ant-card-body {
    padding: 15px 10px;
  }
}
</style>
