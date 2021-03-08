<template>
	<a-config-provider :locale="locale">
		<div id="app">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</div>
	</a-config-provider>
</template>

<script>
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	export default {
		name: 'App',
		data() {
			return {
				locale: zhCN
			}
		},
		components: {
		
		}
	}
</script>

<style scoped="scoped">
	#app {
		height: 100%;
	}
</style>
