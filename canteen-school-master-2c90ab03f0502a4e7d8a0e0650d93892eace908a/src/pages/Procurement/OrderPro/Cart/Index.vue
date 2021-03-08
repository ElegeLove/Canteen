<template>
  <div class="cart">
    <!-- 列表  -->
    <div v-if="proList.length>0">
      <div class="head hidden">
        <a-checkbox class="left" :checked="checkAll" @change="onCheckAllChange">
          <span class="em">全部商品（{{totalNum}}）</span>
        </a-checkbox>
        <a-button class="right" @click="deleteArray()">移除选中</a-button>
      </div>
      <div class="top-20 card-item" v-for="(item,pIndex) in proList" :key="pIndex">
        <div class="card-item-title">
          <a-checkbox v-model="item.isCheck" @change="changeSort(item)">
            <span class="em">{{item.name}}</span>
          </a-checkbox>
        </div>
        <!-- 商品列表 -->
        <div class="card-item-pro">
          <a-row
            type="flex"
            align="middle"
            class="card-item-pro-item"
            v-for="(node,index) in item.cartInfo"
            :key="index"
          >
            <a-col :span="1">
              <a-checkbox class="left" @change="changeSingle(item)" v-model="node.isCheck"></a-checkbox>
            </a-col>
            <a-col :span="7" class="pro-base">
              <img class="pro-img" :src="node.image" />
              <div class="pro-name">{{node.title}}</div>
            </a-col>
            <a-col :span="2">￥{{node.unit_price}}/{{node.unit}}</a-col>
            <a-col :span="4">
              <a-input
                style="width:88px"
                class="table-input"
                v-model="node.num"
                :suffix="node.unit"
                @change="iptReg($event,node)"
                @pressEnter="addCart(node)"
                @blur="addCart(node)"
              ></a-input>
            </a-col>
            <a-col :span="4" class="pro-price">￥{{node.total_price}}</a-col>
            <a-col :span="6">
              <a-button type="link" class="pro-btn" @click="deleSingle(node)">移除</a-button>
            </a-col>
          </a-row>
          <div class="hidden card-item-total">
            <div class="right">
              <span style="margin-right:55px">共：{{item.total_type}}类</span>
              <span>
                共计：
                <em
                  style="font-weight:bold;color:#FF0000;font-size:18px"
                >&yen;{{item.total_money}}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 固定底部  -->
      <div class="footer">
        <a-row type="flex" align="middle">
          <a-col :span="7" style="display:flex;align-items: center;">
            <a-checkbox class="left" :checked="checkAll" @change="onCheckAllChange">
              <span class="em">全部商品（{{totalNum}}）</span>
            </a-checkbox>
            <a-button type="link" style="color:#333" @click="deleteArray()">移除选中</a-button>
          </a-col>
          <a-col :span="9">
            已选择
            <span class="red">{{selectedNum}}</span>件商品
          </a-col>
          <a-col :span="4">
            共计：
            <span class="red">￥{{selectedPrice}}</span>
          </a-col>
          <a-col :span="4" style="text-align:right">
            <a-button type="danger" class="pay-btn" @click="makeDeal()">提交订单</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- 无商品 -->
    <div class="emptyss" v-else>
      <img src="@/assets/image/noSearch.png" />
      <div>暂未添加商品</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proList: [],
      totalNum: 0,
    };
  },
  computed: {
    selectedNum() {
      let num = 0;
      for (let i = 0; i < this.proList.length; i++) {
        for (let j = 0; j < this.proList[i].cartInfo.length; j++) {
          if (this.proList[i].cartInfo[j].isCheck) {
            num++;
          }
        }
      }
      return num;
    },
    selectedPrice() {
      let num = 0;
      for (let i = 0; i < this.proList.length; i++) {
        for (let j = 0; j < this.proList[i].cartInfo.length; j++) {
          if (this.proList[i].cartInfo[j].isCheck) {
            num =
              (num * 100 +
                Number(this.proList[i].cartInfo[j].total_price) * 100) /
              100;
          }
        }
      }
      return this.$commonJs.rounds(num,2);
    },
    checkAll() {
      if (this.proList.length == 0) return false;

      let flag = false;
      let checkedArray = [];
      checkedArray = this.proList.filter((item) => {
        return item.isCheck;
      });
      if (checkedArray.length == this.proList.length) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    iptReg(e,item){         //输入限制
       var vals = e.target.value;
       var newVal = this.$commonJs.regMoneyOnes(vals);
       e.target.value = newVal;
       item.num = newVal;
    },
    //加入购物车
    addCart(obj) {
      this.$http
        .addProToCart({
          supplier_id: obj.supplier_id,
          id: obj.supplier_product_id,
          num: Number(obj.num),
          price: obj.unit_price,
        })
        .then((res) => {
          this.getList();
        });
    },
    //删除
    deleSingle(item) {
      let list = [];
      list.push(item.id);
      this.deleteArray(list);
    },
    deleteArray(data) {
      let deleteList = [];
      let isSingle = false;
      if (data) {
        deleteList = data;
        isSingle = true;
      } else {
        //多选删除
        isSingle = false;

        for (let i = 0; i < this.proList.length; i++) {
          for (let j = 0; j < this.proList[i].cartInfo.length; j++) {
            if (this.proList[i].cartInfo[j].isCheck) {
              deleteList.push(this.proList[i].cartInfo[j].id);
            }
          }
        }
      }
      if (deleteList.length <= 0) {
        this.$message.info("请选择要移除的商品");
        return;
      }

      this.$confirm({
        title: "提示",
        content: isSingle ? "是否确认移除该商品？" : "是否确认移除选中的商品？",
        onOk: () => {
          this.$http
            .deleteProFromCart({ id: deleteList.join(",") })
            .then((res) => {
              if (res.code == 1) {
                this.getList();
              }
            });
        },
        onCancel() {},
      });
    },
    changeSingle(obj) {
      let checkedArray = [];
      checkedArray = obj.cartInfo.filter((item) => {
        return item.isCheck;
      });
      if (checkedArray.length == obj.cartInfo.length) {
        obj.isCheck = true;
      } else {
        obj.isCheck = false;
      }
    },
    changeSort(obj) {
      for (let j = 0; j < obj.cartInfo.length; j++) {
        this.$set(obj.cartInfo[j], "isCheck", obj.isCheck);
      }
    },
    //全选
    onCheckAllChange(e) {
      console.log();
      for (let i = 0; i < this.proList.length; i++) {
        this.$set(this.proList[i], "isCheck", e.target.checked);

        for (let j = 0; j < this.proList[i].cartInfo.length; j++) {
          this.$set(this.proList[i].cartInfo[j], "isCheck", e.target.checked);
        }
      }
    },
    //获取商品列表
    getList() {
      this.totalNum = 0;
      this.$http.cartProList().then((res) => {
        this.proList = res.data || [];

        for (let i = 0; i < this.proList.length; i++) {
          this.$set(this.proList[i], "isCheck", false);
          for (let j = 0; j < this.proList[i].cartInfo.length; j++) {
            this.$set(this.proList[i].cartInfo[j], "isCheck", false);
            this.totalNum++;
          }
        }
      });
    },
    //去结算
    makeDeal() {
      let submitForm = this._.cloneDeep(this.proList);
      submitForm = this._.forEach(submitForm, (element) => {
        let list = this._.filter(element.cartInfo, ["isCheck", false]);
        element.cartInfo = this._.pullAllBy(element.cartInfo, list, "id");
      });
      //删除 isCheck
      submitForm = this._.forEach(submitForm, (element) => {
        delete element.isCheck;
        this._.forEach(element.cartInfo, (node) => {
          delete node.isCheck;
        });
      });
      let cart_id = [];
      let product_id = [];

      this._.forEach(submitForm, (element) => {
        if (element.cartInfo.length > 0) {
          cart_id.push(element.id);
        }
        this._.forEach(element.cartInfo, (node) => {
          product_id.push(node.id);
        });
      });
      if(cart_id.length == 0)
      {
        this.$message.error("请选择商品");
        return
      }
      this.$router.push(
        `deal?cart_id=${cart_id.join(",")}&product_id=${product_id.join(",")}`
      );
      // this.$http.makeDealFromCart({ data: JSON.stringify(submitForm) }).then((res) => {});
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
</style>
<style lang="scss" scoped="scoped">
.cart {
  max-width: 1365px;
  .em {
    font-weight: bold;
  }
  .head {
    width: 100%;
  }
  .card-item {
    padding: 25px 20px;
    box-shadow: 0px 1px 10px 0px rgba(2, 187, 114, 0.06);
    border-radius: 8px;
    margin-bottom: 30px;
    overflow: hidden;
    .card-item-title {
      margin-bottom: 8px;
    }
    &-pro {
      width: 100%;
      &-item {
        padding: 30px 0;
        border-bottom: 1px solid #f0f2f5;
        font-size: 16px;
        .pro-base {
          display: flex;
          align-items: center;
        }
        .pro-img {
          width: 92px;
          height: 92px;
          margin-right: 20px;
        }
        .pro-name {
          width: 60%;
        }
        .pro-price {
          color: #ff0000;
          font-size: 16px;
        }
        .pro-btn {
          color: #ff0000;
        }
      }
    }
    .card-item-total {
      padding: 40px 0 20px 0;
    }
  }

  .footer {
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
.table-input {
  max-width: 200px;
}
</style>
