export default{
	token:"",//登录token
	userInfo: {},
	is_info: 0,
	rootSubmenuKeys:[],
	menuList: [],//菜单权限
	firstLogin: '', //是否是首次登录
	loginCache: '',  //是否是首次登录
	dataDictionary:{},
  sup_messAgeLis:false,               //监听消息变化
}
//调用直接 this.$store.state.token
