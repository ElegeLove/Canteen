<template>
  <div>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
       :pagination="pagination"
        bordered
         @change="pageCheck"
         :rowKey="(record,index)=>{return index}"
        class="tables"
       :loading="loading">
       <div slot="address" slot-scope="text,row,index">
          <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
            <span class="danshen maxwidths curpoter">{{text}}</span>
          </a-tooltip>
       </div>
       <div slot="remark" slot-scope="text,row,index">
          <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
            <span class="danshen maxwidths curpoter">{{text}}</span>
          </a-tooltip>
       </div>
     </a-table>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        columns:[
          { title: '年级', width: 120, dataIndex: 'class', key: 'class', fixed: 'left',align:"center"
          },
          { title: '班', width: "7%", dataIndex: 'grade', key: 'grade',align:"center"
          },
          { title: '学生姓名', dataIndex: 'student_name', key: 'student_name', width: "7%",align:"center"},
          { title: '学生身份证号', dataIndex: 'student_id_card', key: 'student_id_card', width: "15%",align:"center"},
          { title: '是否属于留守儿童', dataIndex: 'is_stay', key: 'is_stay', width: "6%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '是否属于非寄宿贫困生', dataIndex: 'is_poor', key: 'is_poor', width: "6%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '是否在校寄宿', dataIndex: 'is_school_stay', key: 'is_school_stay', width: "6%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '家长姓名', dataIndex: 'parent_name', key: 'parent_name', width: "7%",align:"center" },
          { title: '家长联系电话', dataIndex: 'parent_phone', key: 'parent_phone', width: "11%",align:"center" },
          { title: '家庭住址', dataIndex: 'address', key: 'address', width: "9%",align:"center",
            scopedSlots: { customRender: 'address' },
          },
          { title: '午餐模式', dataIndex: 'is_lunch', key: 'is_lunch', width: "5%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '鸡蛋模式', dataIndex: 'is_egg', key: 'is_egg', width: "5%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '牛奶模式', dataIndex: 'is_milk', key: 'is_milk', width: "5%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '糕点模式', dataIndex: 'is_cake', key: 'is_cake', width: "5%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '水果模式', dataIndex: 'is_fruits', key: 'is_fruits', width: "5%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'是':'不是'
            }
          },
          { title: '备注', dataIndex: 'remark', key: 'remark', width: 140,align:"center",fixed: 'right',
            scopedSlots: { customRender: 'remark' },
          }
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
          id:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        }
      }
    },
    created(){
      this.postData.id = this.$route.query.id;
      this.getList()
    },
    methods:{
      getList(){                 //获取列表
        this.loading = true
        this.$http.InformationBusinessReformEnjoyUser(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
.tables{
  margin-top: 20px;
}
.maxwidths{
  max-width: 100%;
  display: inline-block;
}
</style>
