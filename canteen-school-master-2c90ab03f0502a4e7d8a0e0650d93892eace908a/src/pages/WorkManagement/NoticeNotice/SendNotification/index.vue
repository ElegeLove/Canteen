<template>
  <div>
    <div class="sendBoxs">
      <div>
        <span>接收对象：</span>
        <a-select
            mode="multiple"
            v-model="postData.supplier_id"
            style="max-width: 600px;min-width: 200px;"
            placeholder="请选择供应商"
          >
            <a-select-option v-for="(item,index) in typeData" :key="item.supplier_id" :value="item.supplier_id">
              {{item.name}}
            </a-select-option>
          </a-select>
      </div>
      <div class="btnBox">
        <a-button @click="sends(1)">存草稿</a-button>
        <a-button type="primary" @click="sends(2)">立即发送</a-button>
      </div>
    </div>
    <div class="titles">
      <span>标&emsp;&emsp;题：</span>
      <a-input placeholder="填写通知标题" v-model="postData.title"/>
    </div>
    <div class="uploadsd">
      <span>附&emsp;&emsp;件：</span>
      <tachmentup :max="-1" @getFile="getFile" ref="upfiles"/>
    </div>
    <div class="ritchTxts">
      <span>正&emsp;&emsp;文：</span>
       <richTxt ref="child"/>
    </div>
     <a-modal
          v-model="modelShow"
          title="确认发送"
          centered
          @ok="subModels"
        >
          <p class="conts">接收人为关联上级，确认继续发送？</p>
        </a-modal>
  </div>
</template>

<script>
  import tachmentUp from "../../../../components/AttachmentUpload/index.vue"
  import richTxt from "../../../../components/RichText/index.vue"
  export default{
    data(){
      return{
        modelShow:false,
        typeData:[],
        postData:{
          supplier_id:[],
          title:"",
          file:[],
          content:"",
          status:""
        }
      }
    },
    components:{
       tachmentup:tachmentUp,
       richTxt
    },
    created(){
       this.getSupper();
    },
    mounted(){
      var {id} = this.$route.query;
      var types = localStorage.getItem("sendTypes")
      if(types=="update"){              //编辑
        this.getDetails(id)
      }
    },
    destroyed(){
      localStorage.removeItem("sendTypes")
    },
    methods:{
      getDetails(id){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.NoticeDetails({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.postData = res.data;
            var {file,supplier_id} = this.postData;
            var imgs = [];
            file.forEach((item)=>{
              imgs.push({status:"done",url:item,uid:this.$commonJs.randoms(),name:decodeURI(this.$commonJs.getType(item))})
            })
            this.postData.file = imgs;
            this.postData.supplier_id = supplier_id.split(",");
            var newIds = [];
            this.postData.supplier_id.map((items)=>{
              newIds.push(Number(items))
            })
            this.postData.supplier_id = newIds;
            this.$refs.upfiles.setlists(imgs);
            this.$refs.child.setVal(this.postData.content);
          }
        })
      },
      getSupper(){              //获取接受人
        this.$http.SupplierLists({cooperation:1}).then((res)=>{
          if(res.code==1){
            this.typeData = res.data;
          }
        })
      },
      getFile(data){          //获取文件回调
        this.postData.file = data;
      },
      sends(type){
        let oldProcedure = this.$refs.child.getVal();
        this.postData.content = oldProcedure;
        var {supplier_id,title,file} = this.postData;
        if(supplier_id.length==0){
          return this.$message.error('请选择接收对象');
        }
        if(title==""){
          return this.$message.error('请输入标题');
        }
        if(file.length==0){
          return this.$message.error('请上传文件');
        }
        this.postData.status = type;
        if(type==1){             //草稿
           this.sendQuest()
        }else{          //发送
          this.modelShow = true;
        }
      },
      subModels(){          //确认发送
        this.modelShow = false;
        this.sendQuest();
      },
      sendQuest(){             //发送请求
        var datas = JSON.parse(JSON.stringify(this.postData))
        var file = [];
        datas.supplier_id = datas.supplier_id.join(",");
        datas.file.forEach((item)=>{
          file.push(item.url)
        })
        datas.file = file.join(",");
        this.$store.commit("sch_setLoaing",true);
        this.$http.NoticeNoticeSend(datas).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            if(datas.status==1){   //草稿
              this.$router.push({path:"/ManagementPanel/t_NoticeNotice/t_TwoCenter"})
            }else{
              this.$router.push({path:"/ManagementPanel/t_CationSuccss",query:{id:res.data.id}})
            }
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../../assets/css/WorkManagement/NoticeNotice/SendNotification/index.scss';
</style>
