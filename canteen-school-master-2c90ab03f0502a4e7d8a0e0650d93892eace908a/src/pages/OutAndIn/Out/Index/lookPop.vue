<template>
  <a-modal
    v-model="updateShows"
    title="查看"
    centered
    cancelText="关闭"
    width="70%"
  >
   <a-table :columns="columnsTwo" :data-source="data.datalis" :scroll="{ x: 1500, y: 400 }"
      :pagination="paginationTwo"
       bordered
       :rowKey="(record,index)=>{return index}"
       @change="pageCheck"
      :loading="loadingTwos">
    </a-table>
  </a-modal>
</template>

<script>
  export default{
    data(){
      return{
        updateShows:false,
        data:{datalis:[]},
        loadingTwos:false,
        postData:{
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          id:""
        },
        paginationTwo:{
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        columnsTwo:[
          { title: '序号', dataIndex: 'sort', key: 'sort',align:"center",width:100},
          { title: '产品代码', dataIndex: 'product_code', key: 'product_code',align:"center",width:"10%"},
          { title: '产品名称', dataIndex: 'product_name', key: 'product_name',align:"center",width:"10%"},
          { title: '产地品牌生产商', dataIndex: 'manufacturer', key: 'manufacturer',align:"center",width:"10%"},
          { title: '等级规格', dataIndex: 'grade', key: 'grade',align:"center",width:"10%"},
          { title: '单位', dataIndex: 'unit', key: 'unit',align:"center",width:"10%"},
          { title: '单价', dataIndex: 'unit_price', key: 'unit_price',align:"center",width:"10%"},
          { title: '账面',align:"center",width:"10%",
            children:[
              {
                title: '数量',
                dataIndex: 'stock',
                key: 'stock',
                width: 100,
                align:"center"
              },
              {
                align:"center",
                title: '金额',
                dataIndex: 'total_price',
                key: 'total_price',
                width: 100,
              }
            ]
          },
          { title: '盘存',align:"center",width:"15%",
            children:[
              {
                title: '数量',
                dataIndex: 'take_inventory_number',
                key: 'take_inventory_number',
                width: 100,
                align:"center"
              },
              {
                align:"center",
                title: '金额',
                dataIndex: 'take_inventory_price',
                key: 'take_inventory_price',
                width: 100,
              }
            ]
          },
          { title: '盘盈',align:"center",width:"15%",
            children:[
              {
                title: '数量',
                dataIndex: 'inventory_surplus_number',
                key: 'inventory_surplus_number',
                width: 100,
                align:"center"
              },
              {
                align:"center",
                title: '金额',
                dataIndex: 'inventory_surplus_price',
                key: 'inventory_surplus_price',
                width: 100,
              }
            ]
          }
        ],
      }
    },
    methods:{
      pageCheck(pagetion){
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.paginationTwo.pageSize = pageSize;
        this.paginationTwo.current = current;
        this.getList()
      },
      opens(id){
         this.postData.id = id;
         this.updateShows = true;
         this.postData.page = 1;
         this.paginationTwo.current = 1;
         this.getList()
      },
      getList(){                 //获取列表
        this.loadingTwos = true;
        this.$http.DistributionTakeInventoryDataList(this.postData).then((res)=>{
           this.loadingTwos = false;
          if(res.code==1){
            this.data.datalis = res.data.data
            this.paginationTwo.total = res.data.total
          }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
/deep/ .ant-modal-footer{
  >div{
    >button:nth-of-type(2){
      display: none !important;
    }
  }
}
</style>
