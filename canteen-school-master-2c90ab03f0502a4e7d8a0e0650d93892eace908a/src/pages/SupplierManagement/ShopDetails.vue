<template>
  <div ref="scroll">
    <backs title="店铺详情"/>
    <div class="boxs" v-if="shopInfo!==''">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="7" class="topLef">
           <div class="imgs">
             <img v-lazy="shopInfo.info.logo" />
           </div>
           <div class="conts">
              <p>{{shopInfo.info.name}}</p>
              <div>
               <span>经营类目：</span>
               <div>{{shopInfo.info.product}}</div>
              </div>
           </div>
        </a-col>
      </a-row>
    </div>
    <div class="topRig">
      <a-input placeholder="搜索店内商品/食材" v-model="proData.keyword"/>
       <a-button type="primary" @click="sarchs">搜索</a-button>
    </div>
    <div class="tabBox">
      <a-tabs tabPosition="top" @change="checkTab" v-model="proData.primary_id">
        <a-tab-pane :tab="item.name" :key="item.id" v-for="(item,index) in typeData"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="tabBox" v-if="shopList.length!==0">
      <a-list
        :pagination="pageGration"
        :dataSource="shopList"
        :split="false"
      >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <div class="lists"  @click="goDetails(item)">
          <img v-lazy="item.image" />
          <div>
            <p>
              <span>￥</span>
              <span>{{item.unit_meterage}}</span>
              <span>/{{item.small_unit}}</span>
            </p>
            <div class="danshen">{{item.title}}</div>
          </div>
        </div>
      </a-list-item>
     </a-list>
    </div>
     <emptys titles="供应商暂未上传食材" v-else/>
  </div>
</template>

<script>
  import backs from "../../components/goBack/index.vue"
  import emptys from "../../components/EmptyNum/index.vue"
  export default{
    data(){
      return{
          typeData:[{id:0,name:"全部"}],
          shopInfo:"",
          proData:{
            supplier_id:"",
            primary_id:0,
            keyword:"",
            page:1,
            pageSize:14
          },
          pageGration:{
            pageSize:14,
            current:1,
            total:0,
            showSizeChanger:true,
            showQuickJumper:true,
            onShowSizeChange:(current,nums)=>{
              this.pageGration.pageSize = nums
              this.pageGration.current = 1
              this.proData.pageSize = nums
              this.proData.page = 1
              this.getProduct()
            },
            onChange: (page,pageSize) => {
              this.pageGration.current = page
              this.proData.page = page
              this.getProduct()
            },
            pageSizeOptions:['14','20','30'], // 每页数量选项
            showTotal: total => `共有${total} 条数据`,  //分页中显示总的数据
          },
          shopList:[]
      }
    },
    components:{
      backs,emptys
    },
    created(){
       this.getShop(this.$route.query.id)
       this.proData.supplier_id = this.$route.query.supplier_id
       this.getProduct()
    },
    methods:{
      goDetails(item){
        this.$router.push({path:"/ManagementPanel/CommodityDetails",query:{id:item.id}})
      },
      getShop(id){          //获取店铺
        this.$store.commit("sch_setLoaing",true)
        this.$http.SupplierShop({id}).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
           if(res.code==1){
             this.shopInfo = res.data
             this.typeData = this.typeData.concat(res.data.product)
           }
        })
      },
      getProduct(){        //获取商品
        this.$store.commit("sch_setLoaing",true)
        this.$http.SupplierProduct(this.proData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.pageGration.total = res.data.total
            this.shopList = res.data.data
          }
        })
      },
      checkTab(e){          //切换类型
        this.proData.primary_id = e
        this.proData.page = 1
        this.pageGration.current = 1
        this.getProduct()
      },
      sarchs(){
        this.proData.page = 1
        this.proData.primary_id = 0
        this.pageGration.current = 1
        this.getProduct()
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/SupplierManagement/ShopDetails.scss';
</style>
