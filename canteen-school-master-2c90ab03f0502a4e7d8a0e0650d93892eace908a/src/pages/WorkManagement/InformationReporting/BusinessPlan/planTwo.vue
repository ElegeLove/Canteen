<template>
  <div>
     <goback title="返回"/>
     <steps :current="1"/>
     <div class="conBox">
        <p>请上传未享受营养改善学生的不享受营改申请自愿书</p>
        <a-table :columns="columns" :data-source="data"
            bordered
            :scroll="{ x: 1500, y: 500 }"
            :pagination="false"
           >
            <div slot="action" slot-scope="text,row,index" class="actiosn main_color">
              <span v-if="row.status<=1" @click="openImg(row.url)">预览</span>
              <span v-if="row.status==2&&row.updone!=1" @click="uploadFile(index)">点击上传</span>
              <a-spin v-if="row.updone==1">
                <a-icon slot="indicator" type="loading" style="font-size: 16px" spin />
              </a-spin>
            </div>
         </a-table>
         <div class="btnBox">
           <a-button @click="goBack">取消</a-button>
           <a-button type="primary" @click="goNext">下一步</a-button>
         </div>
     </div>
     <impmodule ref="upfile" @getFiles="getFile" accept="image/*"/>
     <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
       <img alt="example" style="width: 100%" :src="previewImage" />
     </a-modal>
  </div>
</template>

<script>
  import steps from "./step.vue"
  import goback from "../../../../components/goBack/index.vue"
  import impmodule from "../../../../components/ImportModule.vue"
  import {
    put
  } from "../../../../assets/js/upload.js"
  export default{
    data(){
      return{
        columns:[
          { title: '片区', width: 100, dataIndex: 'area', key: 'area', fixed: 'left',align:"center" },
          { title: '类别', width: "10%", dataIndex: 'type', key: 'type',align:"center"  },
          { title: '年级', dataIndex: 'grade', key: 'grade', width: "10%"},
          { title: '班', dataIndex: 'class', key: 'class', width: "10%",align:"center" },
          { title: '学生姓名', dataIndex: 'stuname', key: 'stuname', width: "10%",align:"center" },
          { title: '学生身份证号', dataIndex: 'stucard', key: 'stucard', width: "15%",align:"center" },
          { title: '家长姓名', dataIndex: 'faname', key: 'faname', width: "10%",align:"center" },
          { title: '家长联系电话', dataIndex: 'faphone', key: 'faphone', width: "15%",align:"center" },
          { title: '家庭住址', dataIndex: 'address', key: 'address', width: "20%",align:"center" },
          {
            title: '不享受营改申请（自愿）书',
            key: 'operation',
            fixed: 'right',
            width: 150,
            align:"center",
            scopedSlots: { customRender: 'action' },
          },
        ],
        data:[],
        upIx:"",
        previewVisible:false,
        previewImage: ''
      }
    },
    created(){
      for (let i = 0; i < 3; i++) {
        this.data.push({
          key:i,
          area: "丰乐",
          grade:"六年级",
          class:"1班",
          stuname: "张三",
          stucard:"123092784323",
          faname:"张一",
          faphone:"18787659876",
          address:"公司打卡ASJDLASJ",
          status:i
        });
      }
      setTimeout(()=>{
        this.loading = false
      },1000)
    },
    components:{
      steps,goback,impmodule
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      goNext(){
        this.$router.push({name:"t_planThree"})
      },
      getFile(file){         //获取文件
        this.data[this.upIx].updone = 1
        this.$forceUpdate()
        put(parseInt(Math.random() * 10000) + file.name, file).then(result => {
          this.data[this.upIx].updone = 2
          this.data[this.upIx].status = 1
          this.data[this.upIx].url = result.url
          this.$forceUpdate()
        }).catch(e => {
          put(parseInt(Math.random() * 10000) + file.name, file).then(result => {

          })
        })

      },
      uploadFile(index){          //上传文件
        this.upIx = index;
        this.$refs.upfile.upFile();
      },
      handleCancel() {
        this.previewVisible = false;
      },
      openImg(url) { //打开图片
        this.previewImage = url;
        this.previewVisible = true;
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
 .conBox{
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 40px;
   justify-content: center;
   >p{
     text-align: center;
     font-size: 16px;
     color: #000;
     font-weight: bold;
     margin-bottom: 40px;
   }
   >table{
     width: 80%;
   }
 }
 .btnBox{
   margin-top: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   button{
     width: 80px;
     height: 36px;
     font-size: 14px;
     border-radius: 4px;
   }
   button:nth-of-type(1){
     margin-right: 20px;
   }
 }
 .actiosn{
   >span{
     cursor: pointer;
   }
 }
</style>
