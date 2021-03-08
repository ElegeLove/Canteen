<template>
	<div>
		<div class="pd58">
			<a-form :form="supplierInformation" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" @submit="handleSubmit" class="mt40 w800">
				<a-form-item>
					<div class="twoListInput">
						<div class="twoListInputList">
							<div class="pageImportantTitle">
								<a class="colorE900">*</a>
								供应商全称
							</div>
							<a-input v-decorator="['name', Validata.name]" class="w300" placeholder="请输入供应商全称" />
						</div> 
					</div>
				</a-form-item>
				<a-form-item> 
					<div class="twoListInput">
						<div class="twoListInputList">
							<div class="pageImportantTitle"><a class="colorE900">*</a>供应商简称</div>
							<a-input v-decorator="['abbreviation', Validata.abbreviation]" class="w300" placeholder="请输入供应商简称" />
						</div> 
					</div>
				</a-form-item>
				<a-form-item>
					<div class="twoListInput">
						<div class="twoListInputList">
							<div class="pageImportantTitle">企业类型</div>
							<a-input v-decorator="['nature', Validata.nature]" class="w300" placeholder="请输入企业类型" />
						</div> 
					</div>
				</a-form-item>
				<a-form-item>
					<div class="twoListInput"> 
						<div class="twoListInputList">
							<div class="pageImportantTitle">
								<a class="colorE900">*</a>
								联系人
							</div>
							<a-input v-decorator="['contacts',  { rules: [{ required: true, message: '请输入联系人' }] }]" class="w300" placeholder="请输入联系人" />
						</div>
					</div>
				</a-form-item>
				<a-form-item>
					<div>
						<div class="pageImportantTitle">
							<a class="colorE900">*</a>
							联系电话
						</div>
						<div class="cheackPhone">
							<a-input v-decorator="['contacts_mobile', Validata.contacts_mobile]" :disabled="true" class="w300" placeholder="请输入联系电话" />
							<div>
								<span class="cheackPhoneFun" @click="cheackPhoneFun">更新绑定手机号</span>
								（更换后将以新的手机号进行登录）
							</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item>
					<div class="supplierInformation">
						<div class="supplierInformationList">
							<div class="pageImportantTitle">
								<a class="colorE900">*</a>
								营业执照
							</div>
							<up-file @getImg="getImg($event, 'business_license')" :max_num="1" :de_fileList="cardOne" v-decorator="['business_license',Validata.business_license]">
								<div>
									<a-icon type="plus" /> 
									<div class="ant-upload-text">上传</div>
								</div>
							</up-file> 
						</div>
					</div>
				</a-form-item> 
				<a-form-item>
					 <div class="supplierInformation">
						<div class="supplierInformationList">
							<div class="pageImportantTitle">
								<!-- <a class="colorE900">*</a> -->
								食品经营许可证
							</div>
							<up-file @getImg="getImg($event, 'food_business_license')" :max_num="1" :de_fileList="cardTwo" v-decorator="['food_business_license',Validata.food_business_license]">
								<div>
									<a-icon type="plus" /> 
									<div class="ant-upload-text">上传</div>
								</div>  
							</up-file> 
							<div class="colorE900" v-if="food_business_licenseState">请上传食品经营许可证</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item>
					<div class="pageImportantTitle"><a class="colorE900">*</a>统一社会信用代码</div>
					<a-input v-decorator="['credit_code', Validata.credit_code]" class="w800" placeholder="请输入统一社会信用代码" />
				</a-form-item>
				<a-form-item>
					<div class="pageImportantTitle">食品经营许可证有效期至</div>
					<a-date-picker
						v-decorator="['fbl_end_time', Validata.fbl_end_time]"
						class="w800"
						:hideDisabledOptions="false"
						 placeholder="请选择日期"  
						format="YYYY-MM-DD"
						valueFormat="YYYY-MM-DD"
					  />
				</a-form-item>
				<a-form-item>
					<div class="pageImportantTitle"><a class="colorE900">*</a>办公地址</div>
					<a-input v-decorator="['office_address', Validata.office_address]" class="w800" placeholder="请输入办公地址" />
				</a-form-item>
				<a-form-item>
					<div class="pageImportantTitle"><a class="colorE900">*</a>仓库地址</div>
					<a-input v-decorator="['warehouse_address', Validata.warehouse_address]" class="w800" placeholder="请输入仓库地址" />
				</a-form-item>
				<a-form-item :wrapper-col="{ span: 12 }">
					<!-- @click="activeIndex = 1" -->
					<a-button type="primary" html-type="submit"   class="submitBtnStyle 01BB71Btn">下一步</a-button>
				</a-form-item> 
			</a-form>
		</div>
	</div>
</template>

<script> 
export default {
	data() {
		return {
			supplierInformation: this.$form.createForm(this),  
			food_business_licenseState: false,
			activeIndex: 0,
			loading: false,
			Validata: {
				warehouse_address: { rules: [{ required: true, message: '请输入仓库地址' }] }, 
				office_address: { rules: [{ required: true, message: '请输入办公地址' }] },
				contacts_mobile: { rules: [{ required: true, message: '请输入联系电话' },{validator:this.$commonJs.phoneCheck.bind(this)}] },
				nature: { rules: [{ required: false, message: '请输入企业性质' }] },
				abbreviation: { rules: [{ required: true, message: '请输入供应商简称' }] },
				name: { rules: [{ required: true, message: '请输入供应商全称' }] },
				credit_code: { rules: [{ required: true, message: '请输入统一社会信用代码' }] },
				fbl_end_time :{ rules: [{ required: false, message: '请选择有效期' }] },
				food_business_license: { rules: [{ required: false, message: '请选择食品经营许可证' }] },
				business_license: { rules: [{ required: true, message: '请上传营业执照' }] }
			},
			basicInformationData: {},
			cardOne: [],
			cardTwo: []
		};
	}, 
	mounted() {
		this.$http.supplierInfo({}).then(res => {
			if (res.code == 1) {
				this.basicInformationData = res.data; 
				res.data.contacts_mobile = this.$store.state.userInfo.username
				let {
					warehouse_address,
					office_address,
					contacts_mobile,
					contacts,
					nature,
					abbreviation,
					name,
					insurance_company,
					insurance_amount,
					legal_person,
					legal_person_mobile,
					is_info,
					id_card,
					credit_code,
					fbl_end_time,
					business_license,
					food_business_license
				} = res.data;
				this.$nextTick(() => {
					this.supplierInformation.setFieldsValue({
						warehouse_address,
						office_address,
						contacts_mobile,
						nature,
						credit_code,
						business_license,
						food_business_license,
						fbl_end_time,
						contacts,
						abbreviation,
						name
					});
				});
				let datas = {
					warehouse_address,
					office_address,
					contacts_mobile,
					nature,
					business_license,
					credit_code,
					food_business_license,
					contacts,
					abbreviation,
					name
				}
				this.$store.commit("dataDictionaryWarehouse",datas)
				if (business_license != ''){
					this.cardOne = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:business_license}]
				}
				if (food_business_license != ''){
					this.cardTwo = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:food_business_license}]
				}
			}
		});
	},
	methods: { 
		getImg(data, type) {   
			if (data.length !== 0) { 
				this.supplierInformation.setFieldsValue({
					[type]: data[0].url
				}); 
			} else {
				this.supplierInformation.setFieldsValue({
					[type]: ''
				});
			} 
		},
		cheackPhoneFun() {
			this.$router.push({ name: 'ChangePhone' });
		}, 
		handleSubmit(e) {
			e.preventDefault(); 
			this.supplierInformation.validateFields((err, values) => { 
				// console.log(values)
				// if (!values.food_business_license) this.food_business_licenseState = true 
				for (const key in values) {
                    if (values[key] == undefined){
                        values[key] = ''
                    }
                } 
				if (!err) { 
					console.log(values)
					localStorage.setItem('fbl_end_time',values.fbl_end_time)
					this.$store.commit("dataDictionaryWarehouse",values)
					this.$router.push('OtherInformation');
				}
			});
		}
		 
	}
};
</script>
<style scoped>
.mt40 {
	margin-top: 40px;
}
.cheackPhoneFun {
	color: #01ba72;
	cursor: pointer;
}
.w800 {
	width: 800px;
}
.pd58 {
	padding: 0 58px;
}
.submitBtnStyle {
	width: 230px;
	height: 50px;
	background: rgba(1, 187, 113, 1);
	font-size: 24px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	border-radius: 5px;
}
.mb20 {
	margin-bottom: 20px;
}
.activeClass {
	color: #02bb72 !important;
	border-bottom: 4px solid #02bb72;
}
.cheackSupplierInformation {
	border-bottom: 1px solid #eff1f5;
	padding: 0 40px;
	height: 85px;
	display: flex;
	line-height: 85px;
}
.cheackSupplierInformation div {
	width: auto;
	margin-right: 110px;
	text-align: center;
	cursor: pointer;
	font-size: 20px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	line-height: 85px;
}
.supplierInformation {
	display: flex;
}
.w300 {
	width: 300px;
}
.w800 {
	width: 800px;
}
.h120 {
	height: 120px;
}
.supplierInformationList {
	margin-right: 105px;
}
.twoListInputList {
	/* width: 50%; */
	width: 300px;
}
.twoListInput {
	display: flex;
	justify-content: space-between;
}
.cheackImg {
	width: 120px;
	height: 36px;
	border: 1px solid rgba(219, 219, 219, 1);
	border-radius: 5px;
	font-size: 14px;
	line-height: 36px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	background-color: #fff;
	color: rgba(51, 51, 51, 1);
}
.avatar-uploader {
	width: 120px;
	height: 120px;
}
.avatar-uploader .ant-upload {
	width: 100%;
	height: 100%;
}
.cheackPhone {
	display: flex;
}
.cheackPhone div {
	margin-left: 30px;
}
</style>
