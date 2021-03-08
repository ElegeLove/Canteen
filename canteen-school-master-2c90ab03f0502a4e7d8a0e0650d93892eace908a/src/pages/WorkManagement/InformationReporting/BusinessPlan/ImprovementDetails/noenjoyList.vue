<template>
  <div>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
       :pagination="pagination"
        bordered
        :rowKey="(record,index)=>{return index}"
         @change="pageCheck"
        class="tables"
       :loading="loading">
        <div slot="action" slot-scope="text,row" class="curpoter main_color">
          <span v-if="row.image.length==0" @click="uploads(row)">
            点击上传
          </span>
          <div v-else>
            <span @click="lookImg(row)">预览</span>
            <span @click="uploads(row)">重新上传</span>
          </div>
        </div>
        <div slot="address" slot-scope="text,row,index">
           <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
             <span class="danshen maxwidths curpoter">{{text}}</span>
           </a-tooltip>
        </div>
     </a-table>
     <a-modal
            v-model="upShow"
            title="上传"
            centered
            width="900"
            okText="提交"
            @ok="subScann"
          >
         <drg-file @getFile="getImg" :max="10" ref="is_scanning"/>
     </a-modal>
     <!--预览-->
     <div class="images" v-viewer="{movable: false}" v-show="false">
      <img v-for="src in modelImage" :src="src" :key="src">
     </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        upShow:false,
        modelImage:[],
        columns:[
          { title: '片区', width: 120, dataIndex: 'area', key: 'area', fixed: 'left',align:"center" },
          { title: '类别', width: "12%", dataIndex: 'type', key: 'type',align:"center"  },
          { title: '年级', dataIndex: 'class', key: 'class', width: "12%",align:"center"
          },
          { title: '班', dataIndex: 'grade', key: 'grade', width: "12%",align:"center"
          },
          { title: '学生姓名', dataIndex: 'student_name', key: 'student_name', width: "12%",align:"center" },
          { title: '学生身份证号', dataIndex: 'student_id_card', key: 'student_id_card', width: "16%",align:"center" },
          { title: '家长姓名', dataIndex: 'parent_name', key: 'parent_name', width: "12%",align:"center" },
          { title: '家长联系电话', dataIndex: 'parent_phone', key: 'parent_phone', width: "12%",align:"center" },
          { title: '家庭住址', dataIndex: 'address', key: 'address', width: "12%",align:"center",
            scopedSlots: { customRender: 'address' },
          },
          {
            title: '不享受营改申请（自愿）书',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            align:"center",
            width: 150
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
          id:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        updata:{        //上传的数据
          id:"",
          image:[]
        }
      }
    },
    created(){
      this.postData.id = this.$route.query.id;
      this.getList()
    },
    methods:{
      lookImg(item){         //预览
        this.modelImage = item.image;
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      },
      uploads(item){            //上传/重新上传
         this.updata.id = item.id;
         var newImage = [];
         item.image.forEach((item)=>{
           newImage.push({load:false,url:item,name:this.$commonJs.getType(item)})
         })
         this.updata.image = newImage;
         this.upShow = true;
         this.$nextTick(()=>{
           this.$refs.is_scanning.setArr(newImage);
         })
      },
      subScann(){       //上传提交
        if(this.updata.image.length==0){
          return this.$message.error('请上传');
        }
        var datas = JSON.parse(JSON.stringify(this.updata));
        var newsImg = [];
        datas.image.forEach((item)=>{
          newsImg.push(item.url)
        })
        datas.image = newsImg.join(",");
        this.upShow = false;
        this.$store.commit("sch_setLoaing",true)
        this.$http.InformationBusinessReformVoluntaryApplication(datas).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.getList()
          }
        })
      },
      getImg(file){
        this.updata.image = file;
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.InformationBusinessReformNotEnjoyUser(this.postData).then((res)=>{
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
