export default{
	mouSetToken:function(state,openid){
		console.log(openid)
		state.token = openid
	},
	setToken:function(state,value){              //设置token
		console.log(value)
		state.token = value
	},
	setIs_info:function(state,value){              //设置token
		console.log(value)
		state.is_info = value
	},
	setUploadConfig:function(state,value){        //设置上传配置信息
		state.uploadConfig = value
	},
	moutionsLoginCache:function(state,data){ 
		state = data
	},
	setFirstLogin:function(state,value){        //设置是否首次登录
		state.firstLogin = value
	},
	setLoginCache:function(state,value){        //设置账号保存
	  	state.loginCache = value
	},
	userinfo:function(state,data){
		state.userInfo = data
	},
	dataDictionaryWarehouse:function(state,data){ //c存储页面兄弟，父子之前传值的公共方法
		state.dataDictionary = data
	},
	setMenuList:function(state,value){        //设置菜单权限
		state.menuList = value
	},
	setRootSubmenuKeys:function(state,value){        //左边展开key存放
		state.rootSubmenuKeys = value
	},
  setMessages:function(state,value){        //设置message监听
  	state.sup_messAgeLis = value
  }
}