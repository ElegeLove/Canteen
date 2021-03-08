<template>
  <div>
    <div class="btnsd">
      <a-button
        icon="printer"
        class="right-10"
        @click="exportTabs"
        >打印空盘存表</a-button
      >
    </div>
    <a-table :columns="columns" :data-source="data"
       :pagination="pagination"
        bordered
        class="tables"
        :rowKey="(record,index)=>{return index}"
        @change="pageCheck"
       :loading="loading">
        <div slot="action" slot-scope="text,row,index" class="actiosn main_color curpoter">
           <div class="marginy" v-if="row.status==0">
             <span @click="updates(row)">批量盘存修正</span>
             <span @click="delets(row)">删除</span>
           </div>
           <div class="marginy" v-else>
             <span @click="lookPops(row)">查看</span>
             <span @click="prints(row)">打印盘存表</span>
           </div>
        </div>
     </a-table>
     <!--修改-->
     <updatescom ref="uopdates" @reloadList="getList"/>
     <!--查看-->
     <lookpop ref="looks"/>
     <!--删除-->
     <a-modal
       v-model="deleShow"
       title="删除"
       centered
       @ok="subDele"
     >
       <p class="conts">确认删除吗?</p>
     </a-modal>
     <!--打印-->
     <index-table :list='printData'></index-table>
  </div>
</template>

<script>
  import updatescom from "./updateComs.vue"
  import lookpop from "./lookPop.vue"
  import indexTable from "../../components/indexTable.vue";
  export default{
    data(){
      return{
        deleShow:false,
        printData:[],
        columns:[
          { title: '盘存时间', width: "50%", dataIndex: 'create_time_text', key: 'create_time_text',align:"center"},
          {
            title: '操作',
            key: 'operation',
            width: "50%",
            align:"center",
            scopedSlots: { customRender: 'action' },
          },
        ],
        data:[],
        loading:true,
        pagination:{
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        deleData:{
          id:""
        }
      }
    },
    created(){
      this.getList()
    },
    components:{
      updatescom,lookpop,indexTable
    },
    methods:{
      prints(item){             //打印
         this.$http.DistributionTakeInventoryPrinting({id:item.id}).then((res)=>{
           if(res.code==1){
             this.printData = res.data;
             setTimeout(() => {
               printJS({
                 printable: "indexTable",
                 type: "html",
                 // targetStyles: ["*"],
                 ignoreElements: ["no-print", "bc", "gb"],
                 style:"@media print{@page{size: A4 landscape;margin-left:20mm;margin-right:17mm;margin-top:8mm;margin-bottom:3mm;}}"
               });
             }, 500);
           }
         })
      },
      updates(item){               //点击批量盘存修正
        this.$nextTick(()=>{
          this.$refs.uopdates.opens(item.id)
        })
      },
      lookPops(item){            //查看
        this.$nextTick(()=>{
          this.$refs.looks.opens(item.id)
        })
      },
      subDele(){             //确认删除
        this.deleShow = false;
        this.$store.commit("sch_setLoaing",true)
        this.$http.DistributionTakeInventoryDelete(this.deleData).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.getList()
          }
        })
      },
      delets(item){             //删除
        this.deleData.id = item.id;
        this.deleShow = true;
      },
      getList(){                 //获取列表
        this.loading = true;
        this.$http.DistributionTakeInventoryList(this.postData).then((res)=>{
           this.loading = false;
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      pageCheck(pagetion){
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
      exportTabs(){             //导出空盘存表
        this.$http.DstributionTakeInventory().then((res)=>{
          if(res.code==1){
            this.prints({id:res.data})
            this.getList()
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.btnsd{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
}
.tables{
  margin-top: 20px;
}
.marginy>span:nth-of-type(1){
  margin-right: 10px;
}
.conts{
  text-align: center;
  font-size: 16px;
  color: #333333;
  margin: 15px 0;
}
</style>
