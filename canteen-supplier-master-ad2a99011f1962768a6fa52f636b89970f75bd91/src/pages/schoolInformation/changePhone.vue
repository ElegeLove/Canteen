<template>
	<div>
		<a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" title="更换手机号" @back="() => this.$router.back()" />
		<a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" @submit="handleSubmit" class="mt40 w800 pa20">
			<a-form-item class="changgePhoneInputPass">
				<div class="pb20">
					<div class="title">请输入原密码验证身份</div>
					<a-input placeholder="请输入原密码" v-model="password" v-decorator="['password', Validata.password]" class="w300 " />
				</div>
			</a-form-item>
			<a-form-item style="margin-bottom: 20px;">
				<div class="changgePhoneInputPass border0">
					<div class="title">新绑定手机号码</div>
					<a-input placeholder="输入手机号" v-model="cheackPhone.phone" v-decorator="['phone', Validata.phone]" class="w300 " />
				</div>
			</a-form-item>
			<a-form-item>
				<div class="">
					<a-input placeholder="输入验证码" v-model="cheackPhone.code" class="w176 mr15" v-decorator="['code', Validata.code]" />
					<a-button class="getSmsBtn border02BBColor02bb" v-show="sends.show" :loading="loading" @click="getSmsCode">获取验证码</a-button>
					<a-button type="primary" class="getSmsBtn colorFFF border02BBColor02bb" v-show="!sends.show">{{ sends.count }} s</a-button>
				</div>
			</a-form-item>
			<a-button type="primary" html-type="submit" class="confirmReplacement">确认更换</a-button>
		</a-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			Validata: {
				password: { rules: [{ required: true, message: '请输入原密码' }] },
				code: { rules: [{ required: true, message: '请输入验证码' }] },
				phone: { rules: [{ required: true, message: '请输入联系电话' }, { validator: this.$commonJs.phoneCheck.bind(this) }] }
			},
			cheackPhone:{
				phone:'',
				code: '',
			},
			password: '',
			loading: false,
			sends: {
				show: true,
				count: '',
				timer: null
			}
		};
	},
	methods: {
		handleSubmit(e) {
			console.log(e);
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					this.$http.checkSms(this.cheackPhone).then(res => {
						if (res.code == 1) {
							this.cheackPhone.password = this.password
							this.$http.updatePhone(this.cheackPhone).then(res => {
								if (res.code == 1) {
									this.$router.replace('/')
									this.setToken('')
									this.setFirstLogin({})
								}
							});
						}
					});
				}
			});
		}, 
		getSmsCode() {  
			var bool = this.$commonJs.loginReg(this.cheackPhone.phone);
			if (bool) {
				this.loading = true;
				const time_out = 60;
				this.$http.sendSms({ phone: this.cheackPhone.phone }).then(res => {
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
		}
	},
	mounted() {}
};
</script>

<style scoped="scoped">
.pa20 {
	padding: 20px 30px;
}
.colorFFF{color: #fff !important;}
.changgePhoneInputPass {
	/* padding: 20px 30px; */
	border-bottom: 1px solid #f0f2f5;
}
.pl20 {
	padding-left: 30px;
}
.w176 {
	width: 176px;
}
.w300 {
	width: 300px;
}
.pb20 {
	padding-bottom: 20px;
}
.title {
	font-size: 16px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
}
.getSmsCode {
	margin-top: 15px;
}
.mr15 {
	margin-right: 15px;
}
.border0 {
	border: 0;
}
.confirmReplacement {
	width: 230px;
	height: 50px;
	font-size: 24px;
	background: rgba(2, 187, 114, 1);
	border-radius: 5px;
	margin-top: 95px;
}
.getSmsBtn {
	height: 40px !important;
	width: 105px;
}
</style>
