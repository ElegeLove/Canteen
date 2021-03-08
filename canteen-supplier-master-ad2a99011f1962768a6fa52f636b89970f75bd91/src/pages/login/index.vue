<template>
	<div id="boxs">
		<div class="login" v-if="isLogin">
			<div class="logos">
				<img src="../../assets/image/logo.png" />
				<span>智慧食堂供应商端</span>
				<div>
					<img src="../../assets/image/picr.png" />
					<span>守护孩子每一餐</span>
					<img src="../../assets/image/picl.png" />
				</div>
			</div>
			<div class="formBox">
				<a-form :form="form" @submit="handleSubmit">
					<a-form-item><a-input placeholder="账号" v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]" /></a-form-item>
					<a-form-item><a-input-password placeholder="密码" v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]" /></a-form-item>
					<div class="flex">
						<a-checkbox v-model="checkPhone">记住账户</a-checkbox>
						<span class="noPass" @click="updatepass">忘记密码</span>
					</div>
					<a-button type="primary" html-type="submit" class="logins" :loading="loading">登录</a-button>
					<div @click="isLogin = false" class="targetHref">立即注册</div>
				</a-form>
			</div>
		</div>
		<div class="zhuce" v-else>
			<div  class="gysName">供应商注册</div>
			<div class="formBox">
				<a-form :form="registerForm" @submit="registerFormSubmit">
					<!-- <a-form-item>
						<div class="loginTitle"><span>*</span>供应商名称</div>
						<a-input placeholder="请输入供应商名称" v-decorator="['username', { rules: [{ required: true, message: '请输入供应商名称' }] }]" />
					</a-form-item> -->
					<a-form-item>
						<div><span>*</span>联系电话（将用于系统登录）</div>
						<a-input  placeholder="请输入联系电话" v-model="register.phone" v-decorator="['mobile', Validata.phone]" />
					</a-form-item>
					<a-form-item>
						<div class="loginTitle"><span>*</span>验证码</div>
						<div class="flexContent">
							<a-input  placeholder="请输入验证码" v-decorator="['code', { rules: [{ required: true, message: '请输入验证码' }] }]" class="w260"/> 
							<a-button class="getSms border02BBColor02bb" v-show="sends.show" :loading="loading" @click="getSmsCodeFun">获取验证码</a-button>
							<a-button type="primary" class="getSms colorFFF border02BBColor02bb w100" v-show="!sends.show">{{ sends.count }} s</a-button>
						</div>
					</a-form-item>
					<a-form-item>
						<div class="loginTitle"><span>*</span>密码设置</div>
						<a-input placeholder="请输入输入6-12密码" v-decorator="['password', { rules: [{ required: true, message: '请输入6-12位密码' }] }]" />
					</a-form-item>
					<!-- <a-form-item>
						<div class="flexContent">
							<div class="mr30">
								<div class="loginTitle"><span>*</span>营业执照</div>
								<up-file @getImg="getImg($event, 'image')" :max_num="1" :de_fileList="image" v-decorator="['image']">
									<div>
										<a-icon type="plus" /> 
										<div class="ant-upload-text">上传</div>
									</div>  
								</up-file>
							</div>
							<div>
								<div class="loginTitle"><span>*</span>食品经营许可证</div>
								<up-file @getImg="getImg($event, 'image')" :max_num="1" :de_fileList="image" v-decorator="['image']">
									<div>
										<a-icon type="plus" /> 
										<div class="ant-upload-text">上传</div>
									</div>  
								</up-file>
							</div>
						</div>
					</a-form-item> -->
					<a-button type="primary" html-type="submit" class="logins" >确定</a-button>
					<div class="backLogin targetHref" @click="isLogin = true">返回登录</div>
				</a-form>
			</div>
			
		</div>
	</div>
</template>

<script> 
 import { mapState,mapMutations} from 'vuex';
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			registerForm: this.$form.createForm(this),
			Validata: {
				phone: { rules: [{ required: true, message: '请输入联系电话' }, { validator: this.$commonJs.phoneCheck.bind(this) }] }
			},
			checkPhone: false,
			register: {
				phone: ''
			},
			loading: false,
			isLogin: true,
			sends: {
				show: true,
				count: '',
				timer: null
			}
		};
	},
	computed: {
		...mapState(['loginCache'])
	},
	mounted() {
		this.clearLeftSide()
		this.setMenuList([])
        this.setRootSubmenuKeys([])
		if (this.loginCache !== '') {
			var { username, password, checkPhone } = this.loginCache;
			this.form.setFieldsValue({
				username,
				password
			});
			this.checkPhone = checkPhone;
		}
		this.getUpload();
		this.getOption(); 
	},
	methods: {
		clearLeftSide(){          //清空左侧
			localStorage.removeItem("cheakKey")
			localStorage.removeItem("openKey")
		},
		...mapMutations(['setToken', 'setLoginCache','setIs_info', 'setFirstLogin', 'setUploadConfig','userinfo', 'setMenuList', 'setRootSubmenuKeys']),
		getUpload() {
			this.$http.CommonUpload().then(res => {
				if (res.code == 1) {
					this.setUploadConfig(res.data);
				}
			});
		},
		registerFormSubmit(e){
			e.preventDefault();
			var type = true;
			this.registerForm.validateFields((err, values) => {
				if (!err) {
					this.loading = true; 
					this.$http.register(values).then(res => {
						this.loading = false;
						if (res.code == 1) { 
							this.isLogin = true 
						}
					});
				}
			});
		},
		handleSubmit(e) {
			e.preventDefault();
			var type = true;
			this.form.validateFields((err, values) => {
				if (!err) {
					this.loading = true;
					this.$http.login(values).then(res => {
						this.loading = false;
						if (res.code == 1) {
							this.setToken(`Bearer ${res.data.access_token}`) 
                			this.setFirstLogin(res.data.is_info) 
							this.$store.commit('userinfo',res.data) 
							sessionStorage.setItem('supplier_operation_manual',res.data.supplier_operation_manual)
							this.setIs_info(res.data.is_info) 
							if (res.time !== '') { 
								if (res.data.is_info == 1){ 
									this.$router.push({ name: 'ManagementPanel' });
								} else{ 
									this.$router.push({ name: 'InspectionPanel' }); 
								}
							} else { 
								this.$router.push({ name: 'SettingPassword' });
							}
							if (this.checkPhone) {
								var login_post = values;
								login_post.checkPhone = true;
								this.setLoginCache(login_post);
							} else {
								this.setLoginCache('');
							}
						 
						}
					});
				}
			});
		},
		updatepass() {
			this.$router.push({ name: 'UpdatePass' });
		},
		getSmsCodeFun(){
			var bool = this.$commonJs.loginReg(this.register.phone);
			if (bool) {
				this.loading = true;
				const time_out = 60;
				this.$http.sendSms({ phone: this.register.phone }).then(res => {
					this.loading = false;
					if (res.code == 1) {
						if (!this.timer) {
							this.sends.count = time_out;
							this.sends.show = false;
							this.sends.timer = setInterval(() => {
								if (this.sends.count > 0 && this.sends.count <= time_out) {
									this.sends.count--;
								} else {
									this.sends.show = true;
									clearInterval(this.timer);
									this.sends.timer = null;
								}
							}, 1000);
						}
					} 
				});
			}
		},
		
		getOption() {
			//获取学校配置
			// this.$http.CommonSchoolSet().then(res => {
			// 	if (res.code == 1) {
			// 		this.setCommonSchoolSet(res.data);
			// 		// this.position = res.data.position
			// 	}
			// });
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/login.scss';
.gysName{width: 100%;text-align: center;font-size: 25px;font-weight: 800;padding: 20px 0;}
.w100{width: 100px !important;}
.targetHref{margin-top: 20px;cursor: pointer;}
.colorFFF{color: #fff !important;}
.zhuce{
	height: auto;
	padding: 20px 10px;
	.formBox{padding: 0 10px;}
	.w260{width: 420px;border-radius: 5px 0 0 5px !important;}
	.flexContent{display: flex;}
	.getSms{width: auto;height:50px;border-radius: 0 5px 5px 0 !important;}
	.ant-row{margin-bottom: 5px;}
	.loginTitle{
		span{color: red;}
	}
	.backLogin{margin-top: 20px;}
}
</style>
