<template>
  <a-menu theme="dark"
   mode="inline"
   :open-keys="openKeys"
   @click="checs"
   @select="oPChange"
   class="leftSidsWid"
    :selectedKeys="defaultKey"
   @openChange="onOpenChange">
   <template v-for="(item,index) in sch_menuList">
      <a-menu-item :key="item.key"  v-if="item.children.length==0">
        <a-icon :type="item.icon" />
        <span>{{item.title}}</span>
      </a-menu-item>
      <a-sub-menu :key="item.key" v-else>
        <span slot="title"><a-icon :type="item.icon" /><span>{{item.title}}</span></span>
        <a-menu-item :key="it.key" v-for="(it,ix) in item.children">{{it.title}}</a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  export default{
    data(){
      return{
        openKeys: [localStorage.getItem('openKey')==null?'':localStorage.getItem('openKey')]
        ,defaultKey:[localStorage.getItem('cheakKey')==null?'/ManagementPanel/InspectionPanel':localStorage.getItem('cheakKey')]
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name!=='SetSchoolInformation'){
            this.getFirst()
          }
          var relation = val.meta.relation
          var path = val.path
          this.sch_menuList.forEach((item)=>{
            if(item.relation==relation){                 //没有下级的时候 只有一级
              this.defaultKey = [item.key]
              this.openKeys = [""]
              localStorage.setItem('cheakKey', item.key);
              localStorage.removeItem("openKey")
            }else{
              if(relation=='noSide'){             //此处是指像意见反馈这种没有选中左边的路由  直接清空
                  this.openKeys = [""]
                  this.defaultKey = [""]
                  localStorage.removeItem("openKey");
                  localStorage.removeItem('cheakKey');
              }else{
               item.children.forEach((it)=>{
                 if(it.relation==relation){
                   this.openKeys = [item.key]
                   this.defaultKey = [it.key]
                   localStorage.setItem('cheakKey', it.key);
                   localStorage.setItem('openKey', item.key);
                 }
               })
              }
            }
          })
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      ...mapState(['sch_firstLogin','sch_menuList','sch_rootSubmenuKeys'])
    },
    mounted(){
      this.getMenuList()
       if(this.sch_firstLogin==0){                //用户首次登录
          this.defaultKey = [""]
          this.openKeys = [""]
          this.$router.replace({path:"/FirstLogin"})
       }
    },
    methods:{
      ...mapMutations(['sch_setMenuList','sch_setRootSubmenuKeys']),
      getMenuList(){                        //获取当前权限菜单
        if(this.sch_menuList.length==0){
          this.$http.RoleSidebarMenu().then((res)=>{
            if(res.code==1){
              this.sch_setMenuList(res.data)
              var datas = JSON.parse(JSON.stringify(res.data))
              var rootArr = []
              datas.forEach((item)=>{
                if(item.children.length!==0){
                  rootArr.push(item.key)
                }
              })
              this.sch_setRootSubmenuKeys(rootArr)
            }
          })
        }
      },
      getFirst(){
        var bool = true
        if(this.sch_firstLogin==0){
           this.defaultKey = []
           this.openKeys = [""]
           this.$router.replace({path:"/FirstLogin"})
           bool = false
        }
        return bool
      },
      oPChange(val){
        var bool = this.getFirst()
        if(!bool){
          return false
        }
        this.defaultKey = val.selectedKeys;
        localStorage.setItem('cheakKey', val.selectedKeys);
      },
      onOpenChange(openKeys){
        var bool = this.getFirst()
        if(!bool){
          return false
        }
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.sch_rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
      checs(item){           //左侧路由切换
        var bool = this.getFirst()
        if(!bool){
          return false
        }
        if(item.keyPath[1]!==undefined){
           this.openKeys = [item.keyPath[1]]
           localStorage.setItem("openKey",item.keyPath[1])
        }
        var route = item.key
        this.$router.push({path:route})
      }
    }
  }
</script>

<style>
 .ant-menu-item,.ant-menu-submenu{
   margin-bottom: 10px !important;
 }
 .leftSidsWid{
   margin-top: 60px !important;
 }
</style>
