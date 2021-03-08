import { mapState,mapMutations,mapActions} from 'vuex';

1\获取state
computed: {
     ...mapState(['sch_token'])
}

2\调用Mutations和Actions
methods:{
  ...mapMutations(['sch_setToken']),
  ...mapActions(["mouSetToken"])
}

使用:this.mouSetToken("kos")

 ///原始旧方法//
   // this.$store.commit("sch_setToken","更新了")      //触发mutations
   // this.$store.dispatch("mouSetToken","12")           //触发action




///上传组件
//getImg获取上传的图片           max_num是最多多少张   不传默认100张        
//de_fileList：默认展示得图片       格式：[{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:res.data.logo}]  
使用：<up-file @getImg="getImg" :max_num="1" :de_fileList="fileList">          
         <div>
           <a-icon type="plus" />
           <div class="ant-upload-text">上传</div>
         </div>
      </up-file>
