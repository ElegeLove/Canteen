<template>
  <a-modal
    v-model="updateShows"
    title="批量盘存修正"
    centered
    :footer="null"
    width="70%"
  >
  <a-form-model
     ref="dynamicValidateForm"
     :model="data"
   >
   <a-table :columns="columnsTwo" :data-source="data.datalis" :scroll="{ x: 1500, y: 400 }"
      :pagination="paginationTwo"
       bordered
       :rowKey="(record,index)=>{return index}"
       @change="pageCheck"
      :loading="loadingTwos">
      <div slot="numiput" slot-scope="text,row,index">
        <a-form-model-item :prop="'datalis.' + index + '.take_inventory_number'" :rules="AlidateRule.take_inventory_number">
           <a-input placeholder="请输入"
            @input="setNums(row)"
            :maxLength="9"
            @change="iptReg(row)" v-model="row.take_inventory_number"/>
        </a-form-model-item>
      </div>
    </a-table>
    <div class="footBtns">
      <div>注：每页填写后请先点击保存，否则数据会丢失</div>
      <a-button type="primary" @click="submitForm('dynamicValidateForm')" :loading="btnload">保存</a-button>
    </div>
    </a-form-model>
  </a-modal>
</template>

<script>
  export default{
    data(){
      return{
        btnload:false,
        updateShows:false,
        data:{datalis:[]},
        loadingTwos:false,
        postData:{
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          id:""
        },
        allPage:0,            //一共多少页
        AlidateRule:{
          take_inventory_number:[{required: true,message: '请输入', trigger: 'blur'}]
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
                align:"center",
                scopedSlots: { customRender: 'numiput' },
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
      submitForm(formName) {            //提交
        this.$refs[formName].validate((valid,value) => {
          if (valid) {
            this.btnload = true;
            this.$http.DistributionBatchCorrectionInventory({param:this.data.datalis,take_inventory_id: this.postData.id}).then((res)=>{
              this.btnload = false;
              if(res.code==1){
                if(Number(this.postData.page)<Number(this.allPage)){
                  this.postData.page += 1;
                  this.paginationTwo.current += 1;
                  this.getList()
                }else{
                  this.updateShows = false;
                  this.$emit('reloadList');
                }
              }
            })
          } else {
            return false;
          }
        });
      },
      pageCheck(pagetion){
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.paginationTwo.pageSize = pageSize;
        this.paginationTwo.current = current;
        this.getList()
      },
      iptReg(item){         //输入验证
        item.take_inventory_number = this.$commonJs.regMoneyOnes(item.take_inventory_number)
      },
      setNums(item){              //计算
        item.take_inventory_price = this.$commonJs.rounds(Number(item.take_inventory_number)*Number(item.unit_price),2);
        item.inventory_surplus_number = this.$commonJs.rounds(Number(item.take_inventory_number)-Number(item.stock),3);
        item.inventory_surplus_price = this.$commonJs.rounds(Number(item.inventory_surplus_number)*Number(item.unit_price),2);
      },
      opens(id){
         this.postData.id = id;
         this.updateShows = true;
         this.postData.page = 1;
         this.paginationTwo.current = 1;
         this.data.datalis = [];
         this.getList()
      },
      getList(){                 //获取列表
        this.loadingTwos = true;
        this.$http.DistributionTakeInventoryDataList(this.postData).then((res)=>{
           this.loadingTwos = false;
          if(res.code==1){
            this.allPage = res.data.last_page
            this.data.datalis = res.data.data
            this.paginationTwo.total = res.data.total
          }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
.footBtns{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5px;
  >div{
    font-size: 15px;
    color: #333333;
    margin-right: 10px;
  }
}
/deep/ .ant-form-item{
  margin-bottom: 0 !important;
}
</style>
