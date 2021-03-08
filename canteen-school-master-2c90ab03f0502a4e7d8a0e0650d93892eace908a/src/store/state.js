export default{
  sch_menuList:[],           //菜单权限
  sch_rootSubmenuKeys:[],        //左边展开key存放
	sch_token:"",                 //登录token
  sch_loginCache:"",               //登录记住账户
  sch_firstLogin:"",           //是否是首次登录
  uploadConfig:"",            //上传配置信息
  sch_loading:false,               //配置sch_loading
  scollInfo:"",                  //学校信息
  commonSchoolSet:{},                //学校配置信息
  addCanteenData:{},                   //添加食堂缓存数据
  addEmployee:{},                      //添加员工缓存数据
  addMenu:{},                   //添加菜品缓存数据
  weekData:{},                  //获取周的数据
  messAgeLis:false,               //监听消息变化
}
//调用直接 this.$store.state.sch_token
