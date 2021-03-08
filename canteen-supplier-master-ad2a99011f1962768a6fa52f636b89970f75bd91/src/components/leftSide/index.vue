<template>
	<a-menu theme="dark" mode="inline" @select="oPChange" :default-selected-keys="['InspectionPanel']"  :selectedKeys="defaultKey" :open-keys="openKeys" @click="checs" class="leftSidsWid" @openChange="onOpenChange">
		<template v-for="(item, index) in menuList">
			<a-menu-item :key="item.key" v-if="item.children.length == 0">
				<a-icon :type="item.icon" />
				<span>{{ item.title }}</span>
			</a-menu-item>
			<a-sub-menu :key="item.key" v-else>
				<span slot="title">
					<a-icon :type="item.icon" />
					<span>{{ item.title }}</span>
				</span>
				<a-menu-item :key="it.key" v-for="(it, ix) in item.children">{{ it.title }}</a-menu-item>
			</a-sub-menu>
		</template>
	</a-menu>
</template>

<script>
import { mapState,mapMutations} from 'vuex';
export default {
	data() { 
		return {  
			openKeys: [localStorage.getItem('openKey')==null?'':localStorage.getItem('openKey')],
			defaultKey:[localStorage.getItem('cheakKey')==null?'/ManagementPanel/InspectionPanel':localStorage.getItem('cheakKey')],
		};
	},
	watch: {
		$route: {
			handler: function(val, oldVal){ 
				if(val.query.keys=="order_management"){
					this.openKeys = ["order_management"]
					this.defaultKey = ["OrderManagementList"] 
				}
				// let datas = oldVal.name == localStorage.getItem('cheakKey') ?  val.name : localStorage.getItem('cheakKey')
				// this.defaultKey = [datas] 
			},
			deep: true,
			immediate: true
		},
	},
	computed: {
      ...mapState(['firstLogin','menuList','rootSubmenuKeys','is_info'])
    },
	mounted(){ 
		console.log('213213')
		this.getMenuList()
		if(this.is_info == 0) {
			this.defaultKey = ['SchoolInformation']
			this.openKeys = ['InspectionPanel']; 
			this.$router.push('/ManagementPanel/SchoolInformation/BasicInformation')
		}
	},
	methods: {
		...mapMutations(['setMenuList','setRootSubmenuKeys']), 
		getMenuList(){                         //获取当前权限菜单
			if(this.menuList.length==0){
				this.$http.RoleSidebarMenu().then((res)=>{
					if(res.code==1){
					this.setMenuList(res.data)
					var datas = JSON.parse(JSON.stringify(res.data))
					var rootArr = []
					datas.forEach((item)=>{
						if(item.children.length!==0){
							rootArr.push(item.key)
						}
					})
						this.setRootSubmenuKeys(rootArr)
					} 
				})
			}
		},
		oPChange(val){   
			console.log(val.selectedKeys)
			this.defaultKey = val.selectedKeys; 
			localStorage.setItem('cheakKey', val.selectedKeys);
			if (val.selectedKeys == 'ManagementPanel'){
				localStorage.setItem('openKey', '');
			}
		},
		onOpenChange(openKeys) {  
			const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
			console.log(latestOpenKey)
			if(this.is_info == 1) { 
				if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) { 
					this.openKeys = openKeys;
				} else {
					this.openKeys = latestOpenKey ? [latestOpenKey] : [];
				}
			}   
		},
		checs(item) { 
			//左侧路由切换  
			var route = item.key; 
			console.log(route)
			console.log(route)
			if(item.keyPath[1]!==undefined){
				this.openKeys = [item.keyPath[1]]
				localStorage.setItem("openKey",item.keyPath[1])
			} 
			if (this.is_info == 0) return
			if(this.is_info == 1) {
				if (route == 'ManagementPanel') { //点击是首页选项时，关闭其他
					this.openKeys = []; 
				} else{ 
					this.defaultKey = [route] 
				}
			} 
			this.$router.push({name:route})
		}
	}
};
</script>

<style>
.ant-menu-item,
.ant-menu-submenu {
	margin-bottom: 10px !important;
}
.leftSidsWid {
	margin-top: 75px !important;
}
</style>
