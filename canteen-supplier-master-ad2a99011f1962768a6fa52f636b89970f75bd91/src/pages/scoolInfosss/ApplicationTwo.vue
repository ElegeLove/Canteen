<template>
	<div>
		<div>
			<div class="relatedSchoolContentImg">
				<img :src="pageData.logo" />
				<div class="relatedSchoolContentText">
					<div class="name">{{pageData.full_name}} </div>
					<div class="schoolText">
						<!-- <span>{{pageData.nature}}</span> -->
						<span>{{pageData.name}}</span>
						<span>{{pageData.total_count}}人</span>
					</div>
				</div>
			</div>
		</div>
		<div class="followingInformation">
			<div></div><span>填写以下资料</span>
		</div>
		<a-form :form="form"  @submit="handleSubmit" class=" w800">
			<a-form-item>
				<div class="flex">
					<div class="mr100">
						<div class="titleLael"><span class="colorE900">*</span>上传合同</div>
						<up-file @getImg="getImg($event, 'contract')" v-decorator="['contract',Validata.contract]" class="mt18 " :max_num="10" :de_fileList="uploadContract" >
							<div>
								<a-icon type="plus" />
								<div class="ant-upload-text">上传</div>
							</div>
						</up-file>
						<!-- <div class="colorRed" v-if="isSelectState">请上传合同</div> -->
					</div>
				</div>
      </a-form-item>
			<a-form-item>
				<div>
					<div class="titleLael"><span class="colorE900">*</span>履约保证金缴款凭证</div>
					<up-file @getImg="getImg($event, 'bond_voucher')" v-decorator="['bond_voucher',Validata.bond_voucher]" class="mt18 " :max_num="5" :de_fileList="bond_voucherArr" >
						<div>
							<a-icon type="plus" />
							<div class="ant-upload-text">上传</div>
						</div>
					</up-file>
					<div class="colorRed" v-if="bond_voucherState">请上传履约保证金缴款凭证</div>
				</div>
			</a-form-item>
				<div class="selectTimeInput">
            <div class="mr130">
              <div class="titleLael"><span class="colorE900">*</span>合同开始时间</div>
              <a-form-item>
                <a-date-picker @change="onChange"   class="w300"  valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" v-decorator="['start_time', Validata.start_time]"  placeholder="选择日期"/>
              </a-form-item>
            </div>
					<div class="mr130">
						<div class="titleLael"><span class="colorE900">*</span>合同结束日期</div>
            <a-form-item>
              <a-date-picker @change="onChange"  class="w300"  valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" v-decorator="['end_time', Validata.end_time]"  placeholder="选择日期" />
            </a-form-item>
					</div>
					<div class="mr130">
						<div class="titleLael"><span class="colorE900">*</span>履约保证金（元）</div>
            <a-form-item>
              <a-input placeholder="请输入"  v-decorator="['bond', Validata.bond]" class="w300"/>
            </a-form-item>
					</div>
				</div>
			<a-form-item >
				<div class="titleLael"><span class="colorE900">*</span>供应品类</div>
				<div class="supplyCategoryContent">
					<a-checkbox-group
				        v-decorator="['primary_id', { initialValue: selectSchool_id }]"
				        style="width: 100%;"
						@change="selectcheckboxItem"
				      >
						<a-checkbox :value="item.id" v-for="(item,index) in productList" :key="index">
						  {{item.name}}
						</a-checkbox>
				  </a-checkbox-group>
				  <div class="colorRed" v-if="hasSelectcheckbox">请选择供应品类</div>
				</div>
			</a-form-item>
			<a-form-item class="mt70 twoBtn">
				<a-button type="primary" class="border02BB" @click="backPage">上一步</a-button>
				<a-button type="primary" html-type="submit" >下一步</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				current: 0,
				schoolId: '',
				form: this.$form.createForm(this),
				pageData: {},
				uploadContract: [],
				productList: [],
				activeIndex: '',
				selectID: '',
				isSelectState: false,
				bond_voucherArr: [],
				bond_voucherState: false,
				uploadContractText: [],
				hasSelectcheckbox: false,
				selectSchool_id: [],
				Validata: {
					bond: { rules: [{ required: true, message: '请输入履约保证金' }] },
					start_time: { rules:[{ required: true, message: '请选择开始时间!' }]},
					end_time: { rules: [{required: true, message: '请选择结束时间!' }]},
					contract: { rules: [{ required: true, message: '请上传合同' }] } ,
					bond_voucher: { rules: [{ required: true, message: '请上传履约保证金缴款凭证' }] } ,
					primary_id: { rules: [{ required: true, message: '请选择供应品类' }] }
				},
			}
		},
		methods:{
			selectcheckboxItem(e){
				this.selectSchool_id = []
				this.selectSchool_id.push(e.toString())
				if (this.selectSchool_id){
					this.hasSelectcheckbox = false;
				}
			},
			onChange(current) { //选择时间
			  console.log('onChange:', current[0]);
			  this.current = current[0];
			},
			backPage(){ //返回上一页
				this.$router.go(-1)
			},
			getImg(data, type) {
				console.log(data)
				console.log(type)
				if (data.length !== 0) {
					this.form.setFieldsValue({
						[type]: data[0].url
					});
				} else {
					this.form.setFieldsValue({
						[type]: ''
					});
				}
				this.isSelectState = false
				this.bond_voucherState = false
			},
			handleSubmit(e){
				e.preventDefault();
				if (!this.selectID){
					if (this.selectSchool_id){
						this.selectID = this.selectSchool_id.toString()
					}
				}
				console.log(this.uploadContract)
				this.form.validateFields((err, values) => {
					let uploadContractArr = []
					if (this.uploadContract){
						for (let index = 0; index < this.uploadContract.length; index++) {
							uploadContractArr.push(this.uploadContract[index].url)
						}
					}
					values.contract = uploadContractArr.toString()

					let bond_voucherArr2 = []
					if (this.uploadContract){
						for (let index = 0; index < this.bond_voucherArr.length; index++) {
							bond_voucherArr2.push(this.bond_voucherArr[index].url)
						}
					}
					values.bond_voucher = bond_voucherArr2.toString()
					values.primary_id = this.selectSchool_id.toString()
					values.school_id = this.schoolId
				 	if (!values.primary_id) {
						return this.hasSelectcheckbox = true;
					}
					console.log(values)
					if (!values.contract) {
						return this.isSelectState = true;
					}
					if (!values.bond_voucher) {
						return this.bond_voucherState = true;
					}
					if (!err) {
						values.id = this.$route.query.s_id
						if (this.$route.query.type == '已拒绝'){
							this.$http.schoolUpdate(values).then(res => {
								if (res.code == 1) {
									this.$router.push({
										path: "ApplicationThere"
									})
								}
							});
						} else{
							this.$http.schoolAdd(values).then(res => {
								if (res.code == 1) {
									this.$router.push({
										path: "ApplicationThere"
									})
								}
							});
						}
					}
				});
			}
		},
		created() {

			localStorage.setItem('cheakKey','ScoolInfosss')
			this.schoolId = this.$route.query.id
			this.$http.schoolDataDetail({id: this.$route.query.id}).then(res => {
				if (res.code == 1) {
					this.pageData = res.data
				}
			});
			this.$http.apiProductMenuList({}).then(res => {
				if (res.code == 1) {
					this.productList = res.data
				}
			});
			if (this.$route.query.type == '已拒绝'){
				this.$http.schoolInfo({id: this.$route.query.s_id}).then(res => {
					if (res.code == 1) {
						res.data.start_time = this.$commonJs.timestampToTime(Number(res.data.start_time))
						res.data.end_time = this.$commonJs.timestampToTime(Number(res.data.end_time))
						res.data.schoolId = res.data.id
						let {bond,start_time,end_time,contract,schoolId,primary_id,bond_voucher} = res.data;

						this.$nextTick(() => {
							this.form.setFieldsValue({
								bond,
								start_time,
								bond_voucher,
								end_time,
								contract, 
								schoolId
							});
						});

						if (primary_id.length > 0){
							for (let i = 0; i < primary_id.length; i++){
								this.selectSchool_id.push(primary_id[i])
							}
						}
						
						if (contract != ''){
							for (let index = 0; index < contract.length; index++) { 
								this.uploadContract.push({uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:contract[index]})
							}
						}
						if (bond_voucher != ''){ 
							for (let index = 0; index < bond_voucher.length; index++) { 
								this.bond_voucherArr.push({uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:bond_voucher[index]})
							}	
							// this.bond_voucherArr.push({uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:bond_voucher})
						}

					}
				});
			}
		}
	}
</script>
<style scoped="scoped">
	.h40{height: 40px;width: 77px !important; margin-bottom: 15px !important;}.h46{height: 46px; width: 69px !important;margin-bottom: 9px ;}.h55{height: 55px; width: 58px !important;}.h57{height: 57px !important;width: 51px !important;}.h54{height: 54px;width: 73px !important;}
	.colorRed{color: #f5222d;}
	.schoolText{margin-top: 27px;}
	 .p48{padding: 48px 76px;}
	 .mb15{margin-bottom: 15px;}
	 .mt18{margin-top: 0;}
	 .pd40{padding: 0 40px;}
	 .mt40{margin-top: 40px;} .mt70{margin-top: 70px;margin-bottom: 70px;}
	.submittedSuccessfully img{
		width:93px;
		height:93px;
	}
	.goProductsShelves{
		font-size:18px;
		font-family:Source Han Sans CN;
		font-weight:400;
		margin-top: 28px;
		color:rgba(153,153,153,1);
	}
	.goProductsShelves span{
		color: #01BB71;
		cursor: pointer;
	}
	.backIndex{
		width:510px;
		height:70px;
		padding: 0;
		margin-top: 60px;
		line-height: 70px;
		cursor: pointer;
		background:rgba(1,187,113,1);
		border-radius:5px;
		font-size:30px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
	}


	.twoBtn button{
		margin-right: 33px;
		width: 230px;
		height:50px;
		line-height: 50px;
		font-size:24px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
		padding: 0;
	}
	.processList .content{
		width: 168px;
	}
	.selectTimeInput{
		display: flex;
	}
	.mr130{margin-right: 130px;}
	.followingInformation{
		height:23px;
		font-size:24px;
		display: flex;
		margin-bottom: 30px;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.followingInformation div{
		width:6px;
		height:26px;
		background:rgba(12,11,11,1);
		margin-right: 10px;
	}
	.followingInformation span{
		position: relative;
		bottom: 5px;
	}
	.titleLael{
		font-size:18px;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.mr100{margin-right: 80px;}
	.processList .content .num{
		width:50px;
		height:50px;
		line-height:50px;
		background:rgba(223,223,223,1);
		font-size:30px;
		text-align: center;
		font-family:MicrosoftYaHeiUI;
		font-weight:bold;
		color:rgba(255,255,255,1);
		border-radius:50%;
	}
	.processList .content  .title{
		font-size:16px;
		margin-top:6px;
		margin-bottom:6px;
		font-family:Adobe Heiti Std;
		font-weight:normal;
		color:rgba(51,51,51,1);
	}
	.processList .content  .text{
		font-size:14px;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(153,153,153,1);
		text-align: center;
		position: relative;
		right: 48px;
	}
	.processList::after{
		position: absolute;
		left: 70px;
		top: 28px;
		width: 80%;
		height: 1px;
		content: '';
		background-color: #DFDFDF;
	}
	.noBorder .num{
		background-color: #02BB72 !important;
	}
	#lastProcessList::after{
		width: 0;
	}
	.flex{display: flex;}
	.activeBg::after{background-color: #02BB72 !important;}
	.activeBg .num{background-color: #02BB72 !important;}
	.relatedSchoolContent{ border:1px solid rgba(210,210,210,1); border-radius:5px; }
	.relatedSchoolContentImg{padding: 30px 0;display: flex;}
	.relatedSchoolContentImg img{width:120px;height:90px;object-fit: contain;}
	.relatedSchoolContentText{width: calc(100% - 140px);margin-left: 20px;}
	.relatedSchoolContentText .name{font-size:20px; font-family:Microsoft YaHei; font-weight:bold; color:rgba(51,51,51,1); }
	.schoolAddress{padding: 0 30px;height:63px; border-top: 1px solid #d2d2d2; line-height: 63px;}
	.schoolAddress span{margin-right: 60px;}
	.seachInputSchool{display: flex;margin-bottom: 50px;}
	.seachInputSchool input{margin-right: 15px;}
	.seachInputSchool button{height: 40px;}
</style>
