<template>
  <div>
     <backs :title="postData.id==''?'添加职位':'编辑职位'"/>
     <a-form-model
       ref="dynamicValidateForm"
       :model="postData"
       :rules="Validata"
     >
     <div class="boxss">
        <div class="selec">
            <p>职位名称</p>
            <a-form-model-item ref="name" prop="name">
              <a-input placeholder="填写职位名称" v-model="postData.name"/>
            </a-form-model-item>
        </div>
        <div class="selec">
           <p>职位描述</p>
           <a-form-model-item ref="description" prop="description">
             <a-textarea placeholder="填写职位描述" :rows="3" v-model="postData.description"/>
           </a-form-model-item>
        </div>
        <p class="moduels">模块选择</p>
        <div class="treeBox">
          <a-tree
              v-if="lists.length!==0"
              v-model="postData.menu_auth"
              checkable
              :defaultExpandAll="true"
              :tree-data="lists"
              :replaceFields="{key:'id'}"
            />
        </div>
        <a-button type="primary" @click="saves">{{postData.id==''?'立即添加':'更新保存'}}</a-button>
     </div>
      </a-form-model>
  </div>
</template>

<script>
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        type:"",
        lists:[],
        form: this.$form.createForm(this),
        postData:{
          id:"",
          name:"",
          description:"",
          menu_auth:[238]
        },
        Validata:{
          name:[{ required: true, message: '请填写职位名称',trigger: 'blur' }],
          description:[{ required: true, message: '请填写职位描述',trigger: 'blur' }]
        },
      }
    },
    created(){
       this.postData.id = this.$route.query.id
       this.getList()
       if(this.$route.query.id!==''){
         this.getDetails(this.$route.query.id)
       }
    },
    methods:{
      getDetails(id){          //加载详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.RoleDetails({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.postData = res.data
          }
        })
      },
      saves(){        //保存
        this.$refs.dynamicValidateForm.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
             this.$http.RoleDataManipulation(this.postData).then((res)=>{
               this.$store.commit("sch_setLoaing",false)
               if(res.code==1){
                 this.$router.go(-1)
               }
             })
          } else {
            return false;
          }
        });
      },
      getList(){            //获取权限列表
        this.$http.RoleModule().then((res)=>{
          if(res.code==1){
            this.lists = res.data
          }
        })
      }
    },
    components:{
      backs
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/ConfigurationManagement/AuthorityManagement/AddPosition.scss';
</style>
