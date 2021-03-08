export default{
	sch_setToken:function(state,value){              //设置token
		state.sch_token = value
	},
  sch_setLoginCache:function(state,value){        //设置账号保存
  	state.sch_loginCache = value
  },
  sch_setFirstLogin:function(state,value){        //设置是否首次登录
  	state.sch_firstLogin = value
  },
  sch_setUploadConfig:function(state,value){        //设置上传配置信息
  	state.uploadConfig = value
  },
  sch_setLoaing:function(state,value){        //设置上sch_loading
  	state.sch_loading = value
  },
  setScollInfo:function(state,value){        //设置学校信息
  	state.scollInfo = value
  },
  setCommonSchoolSet:function(state,value){        //设置学校配置信息
  	state.commonSchoolSet = value
  },
  setAddCanteen:function(state,value){        //设置添加食堂缓存数据
  	state.addCanteenData = value
  },
  setAddEmployee:function(state,value){        //设置添加员工缓存数据
  	state.addEmployee = value
  },
  setAddMenu:function(state,value){        //设置添加菜品缓存数据
  	state.addMenu = value
  },
  setWeekData:function(state,value){        //设置周的数据
  	state.weekData = value
  },
  sch_setMenuList:function(state,value){        //设置菜单权限
  	state.sch_menuList = value
  },
  sch_setRootSubmenuKeys:function(state,value){        //左边展开key存放
  	state.sch_rootSubmenuKeys = value
  },
  sch_setMessages:function(state,value){        //设置message监听
  	state.messAgeLis = value
  }
}
