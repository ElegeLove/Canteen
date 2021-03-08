<template>
	<div>
		<a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" :title="title" @back="() => this.$router.back()" />
		<a-form :form="form" class="addContentPadding">
			<a-form-item>
				<div class="setTypeName">
					<div class="w300 mr37">
						<div class="labelTitle"><span class="colorE900">*</span>产品</div>
						<a-select v-model="twoTypeText" show-search placeholder="请搜索产品" style="width: 300px" :default-active-first-option="false"
						 :show-arrow="false" :filter-option="false" :not-found-content="null" @search="handleSearch">
							<a-select-option @click="handleChange(it)" v-for="(it,ix) in selectArr" :key="ix">
								{{it.name}}
							</a-select-option>
						</a-select>
						<!-- <a-input placeholder="请输入" class="" @change="getInputProduct" v-model="getInputData"  />  -->
					</div>
					<div class="w300 mr37">
						<div class="h40"></div>
						<a-input placeholder="请输入" disabled="disabled" class="" v-model="oneTypeText" />
						<!-- <a-input placeholder="请输入" disabled="disabled" class="" v-decorator="['secondary_id', Validata.secondary_id]"  /> 	 -->
					</div>
				</div>
			</a-form-item>
			<a-form-item>
				<div class="labelTitle"><span class="colorE900">*</span>副标题</div>
				<a-input placeholder="请输入" class="w615" v-decorator="['title', Validata.title]" />
			</a-form-item>
			<a-form-item>
				<div class="labelTitle"><span class="colorE900">*</span>产品图片</div>
				<div class="submitImgView">
					<up-file @getImg="getImg($event, 'image')" :max_num="1" :de_fileList="image" v-decorator="['image',{ rules: [{ required: true, message: '请上传产品图片' }] }]">
						<div>
							<a-icon type="plus" />
							<div class="ant-upload-text">上传</div>
						</div>
					</up-file>
				</div>
			</a-form-item>
			<a-form-item>
				<div class="segmentationTitle">类目属性</div>
			</a-form-item>
			<a-form-item>
				<div class="cheackSelect">
					<div v-for="(item,index) in typeArrLists" :key="index" @click="chackIndexFun(index)" :class="activeIndex == index ? 'activeClass' : ''">{{item}}</div>
				</div>
				<!-- 预包装食品 strat-->
				<div v-if="activeIndex == 0">
					<a-form :form="PrepackagedFood" ref="PrepackagedFood">
						<a-form-item>
							<div class="addListStyle mt18">
								<div class="mr37">
									<div class="labelTitle"><span class="colorE900">*</span>品牌</div>
									<a-input placeholder="请输入" class="w465" v-decorator="['brand', { rules: [{ required: true, message: '请输入品牌' }] }]" />
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle mt18">
								<div class="mr37">
									<div class="labelTitle"><span class="colorE900">*</span>生产商</div>
									<a-input placeholder="请输入" class="w465" v-decorator="['produce', { rules: [{ required: true, message: '请输入生产商' }] }]" />
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle mt18">
								<div class="mr37">
									<div class="labelTitle"><span class="colorE900">*</span>等级</div>
									<a-input placeholder="请输入" class="w465" v-decorator="['grade', { rules: [{ required: true, message: '请输入等级' }] }]" />
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle mt18">
								<div>
									<div class="labelTitle"><span class="colorE900">*</span>规格</div>
									<a-input placeholder="请输入" class="w230" v-model="input.net_content"  @input="getSpecificationsMinData($event,'net_content')"
									 v-decorator="['net_content', { rules: [{ required: true, message: '请输入等级规格' }] }]" />
									{{unitDataString}}/
									<a-input placeholder="请输入最小包装单位" v-model="input.net_contentMin" @input="getNet_contentMinDataFun" class="w230"
									 v-decorator="['small_unit', { rules: [{ required: true, message: '请输入最小包装单位' }] }]" />
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle  mt18">
								<div class="mr37">
									<div class="labelTitle"><span class="colorE900">*</span>生产日期</div>
									<a-date-picker format="YYYY-MM-DD" class="w465" valueFormat="YYYY-MM-DD" v-decorator="['production_time', { rules: [{ required: true, message: '请选择生产日期' }] }]"
									 placeholder="选择日期" />
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle  mt18">
								<div>
									<div class="labelTitle"><span class="colorE900">*</span>保质期至</div>
									<a-date-picker format="YYYY-MM-DD" class="w465" valueFormat="YYYY-MM-DD" v-decorator="['expiration_time', { rules: [{ required: true, message: '请选择保质期至' }] }]"
									 placeholder="选择保质期" />
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="segmentationTitle">销售属性</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle">
								<div class="mr37 flex">
									<div class="labelTitle"><span class="colorE900">*</span>单价（元）</div>
									<a-input placeholder="请输入" class="w100 mr25" v-model="input.unit_meterage"  @input="getSpecificationsMinData($event,'unit_meterage')"
									 v-decorator="['unit_meterage', { rules: [{ required: true, message: '请输入单价（元）' }] }]" />
									{{SelectunitDataString}} /（规格 {{input.net_content}}{{unitDataString}}/{{input.net_contentMin}}）
								</div>
							</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle noFlex mt18">
								<div class="labelTitle">计量单位价</div>
								<div>{{input.unitPriceNum}} 元/{{unitDataString}}</div>
							</div>
						</a-form-item>
					</a-form>
				</div>
				<!-- 预包装食品 end -->
				<!-- 农产品 strat-->
				<div v-if="activeIndex == 1">
					<a-form :form="agricultureProducts" ref="agricultureProducts">
						<a-form-item>
							<div class="mr37">
								<div class="labelTitle"><span class="colorE900">*</span>产地</div>
								<a-input placeholder="请输入" class="w465" v-decorator="['origin', { rules: [{ required: true, message: '请输入产地' }] }]" />
							</div>
						</a-form-item>
						<a-form-item>
							<div class="segmentationTitle">销售属性</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle">
								<div class="mr37">
									<div class="labelTitle"><span class="colorE900">*</span>售价（元）</div>
									<a-input placeholder="请输入" class="w465" 
									 @input="iptRegs($event,'agricultureProducts','unit_price')"
									 v-decorator="['unit_price', Validata.unit_price]" />
									<span class="ml10">/{{unitDataString}}</span>
								</div>
							</div>
						</a-form-item>
					</a-form>
				</div>
				<!-- 农产品 end -->
				<!-- 小作坊名称 strat-->
				<div v-if="activeIndex == 2">
					<a-form :form="SmallWorkshop" ref="SmallWorkshop">
						<a-form-item>
							<div>
								<div class="labelTitle"><span class="colorE900">*</span>小作坊名称</div>
								<a-input placeholder="请输入" class="w465" v-decorator="['workshop_name', { rules: [{ required: true, message: '请输入小作坊名称' }] }]" />
							</div>
						</a-form-item>
						<a-form-item>
							<div>
								<div class="labelTitle"><span class="colorE900">*</span>生产日期</div>
								<a-date-picker format="YYYY-MM-DD" class="w465" valueFormat="YYYY-MM-DD" v-decorator="['production_time',{ rules: [{ required: true, message: '请选择生产日期' }] }]"
								 placeholder="选择日期" />
							</div>
						</a-form-item>
						<a-form-item>
							<div class="segmentationTitle">销售属性</div>
						</a-form-item>
						<a-form-item>
							<div class="addListStyle">
								<div class="mr37">
									<div class="labelTitle"><span class="colorE900">*</span>售价（元）</div>
									<a-input placeholder="请输入" class="w465" 
									@input="iptRegs($event,'SmallWorkshop','unit_price')"
									v-decorator="['unit_price', { rules: [{ required: true, message: '请输入售价（元）' }] }]" />
									<span class="ml10">/{{unitDataString}}</span>
								</div>
							</div>
						</a-form-item>

					</a-form>
				</div>
				<!-- 小作坊名称 end -->

			</a-form-item>
			<a-form-item>
				<div class="addListStyle noFlex mt18">
					<div class="labelTitle">产品介绍</div>
					<a-textarea placeholder="请输入" :rows="4" v-decorator="['introduce']" class="aTextarea" />
					<!-- <richTxt ref="child"/>	 -->
				</div>
			</a-form-item>
			<a-form-item>
				<div class="mt55">
					<a-button type="primary" class="mr100" @click="handleSubmit('0')">
						立即上架
					</a-button>
					<!-- class="addPageBtn" -->
					<a-button type="primary" @click="handleSubmit('1')">
						放入仓库
					</a-button>
				</div>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
	let timeout;
	import richTxt from "../../../components/RichText/index.vue"
	export default {
		data() {
			return {
				input: {
					unit_price: 0,
					net_content: 0,
					net_contentMin: 0,
					unitPriceNum: 0
				},
				typeArrLists: ['预包装食品', '农产品', '小作坊食品'],
				activeIndex: 0,
				form: this.$form.createForm(this),
				PrepackagedFood: this.$form.createForm(this),
				agricultureProducts: this.$form.createForm(this),
				SmallWorkshop: this.$form.createForm(this),
				title: '新增',
				provinceData: ['Zhejiang', 'Jiangsu'],
				Validata: {
					primary_id: {
						rules: [{
							required: true,
							message: '请选择产品类目'
						}]
					},
					secondary_id: {
						rules: [{
							required: true,
							message: '请选择产品类目'
						}]
					},
					title: {
						rules: [{
							required: true,
							message: '请输入副标题'
						}]
					},
					storage_type: {
						rules: [{
							required: false,
							message: '请输入储存方式'
						}]
					},
					unit_meterage: {
						rules: [{
							required: true,
							message: '请输入单价（元）'
						}]
					},
					net_content: {
						rules: [{
							required: true,
							message: '请输入净含量'
						}]
					},
					unit: {
						rules: [{
							required: true,
							message: '请输入单位'
						}]
					},
				},
				image: [],
				OneMenu: [],
				getSelectTwoData: '',
				TwoMenu: [],
				OneMenuData: '',
				SelectunitDataString: '',
				unitDataString: '',
				selectTwoID: '',
				selectPrimary_id: '',
				postData: {},
				secondary_DataId: '',
				getInputData: '',
				pageData: {},
				selectArr: [],
				oneTypeText: '',
				twoTypeText: undefined,
				searData: {
					keyword: ""
				},
				btn_check: true
			}
		},
		created() {
			this.title = this.$route.query.id == '' ? '新增' : '编辑'
			if (this.$route.query.id) {
				this.getProductDetail(this.$route.query.id, '编辑')
			}
			this.getApiProductMenuList('load')
		},
		methods: {
			iptRegs(e,forms,key){
				e.target.value = this.$commonJs.regMoneyOnes(e.target.value)
				this[forms].setFieldsValue({
					[key]:this.$commonJs.regMoneyOnes(e.target.value)
				})
			},
			questMenu(e) { //获取二级类目输入的值，进行一级类目的显示
				if (this.searData.keyword == "") {
					return false;
				}
				this.$http.schoolProductSecondary(this.searData).then((res) => {
					if (res.code == 1) {
						this.selectArr = res.data
					}
				})
			},
			handleSearch(value) { //食材搜索
				this.searData.keyword = value
				this.getMenu()
			},
			getMenu() { //获取食材
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				timeout = setTimeout(this.questMenu, 400);
			},
			handleChange(it) {
				this.secondary_DataId = it.id;
				this.getSelectTwoData = it.code;
				this.unitDataString = it.unit;
				this.OneMenu.forEach((item) => {
					if (it.pid == item.id) {
						this.oneTypeText = item.name
						this.OneMenuData = item.id
					}
				})
			},
			getNet_contentMinDataFun() { //获取输入的最小包装单位
				this.SelectunitDataString = this.input.net_contentMin
			},
			getSpecificationsMinData(e,key) { //监听输入最小的规格
				e.target.value = this.$commonJs.regMoneyOnes(e.target.value)
				this.PrepackagedFood.setFieldsValue({
					[key]:this.$commonJs.regMoneyOnes(e.target.value)
				})
				this.input[key] = this.$commonJs.regMoneyOnes(e.target.value)
				if (Number(this.input.net_content) == NaN) {
					return this.$message.error('请输入数字');
				} else {
					if (isNaN(Number(this.input.unit_meterage)) || Number(this.input.net_content) == 0) {
						this.input.unitPriceNum = 0;
						return false;
					}
					this.input.unitPriceNum = this.$commonJs.rounds(Number(this.input.unit_meterage) / Number(this.input.net_content),3)
				}
			},
			chackIndexFun(index) { //切换类目属性
				this.input.unitPriceNum = 0
				this.input.net_content = ""
				// if (this.title == '新增'){
				this.activeIndex = index
				// if (index == 0){
				// 	this.agricultureProducts.resetFields();
				// 	this.SmallWorkshop.resetFields();
				// } else if (index == 1){
				// 	this.PrepackagedFood.resetFields();
				// 	this.SmallWorkshop.resetFields();
				// } else{
				// 	this.PrepackagedFood.resetFields();
				// 	this.agricultureProducts.resetFields();
				// }
				// }

			},
			filterOption(input, option) {
				return (
					option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
				);
			},
			getStatus(e) {

			},

			getApiProductMenuList(type) {
				this.$http.getProductList({
					pid: ''
				}).then(res => {
					if (res.code == 1) {
						if (!type) this.getApiProductMenuListTwoFun(res.data[0].id)
						this.OneMenu = res.data
					}
				});
			},
			// getApiProductMenuListTwoFun(id,secondary_id){ //查看第二级目录 secondary_id参数有参数的情况下显示对于的id
			// 	this.$http.getProductList({pid: id}).then(res => {
			// 		if (res.code == 1) {
			// 			this.TwoMenu = res.data
			// 			if (secondary_id){
			// 				this.secondary_DataId = this.setSecondary_idFun(secondary_id,'code')
			// 			}
			// 		}
			// 	});
			// },

			getImg(data, type) { //上传图
				if (data.length !== 0) {
					this.form.setFieldsValue({
						[type]: data[0].url
					});
				} else {
					this.form.setFieldsValue({
						[type]: ''
					});
				}
			},
			getProductDetail(id, type) {
				this.$http.productDetail({
					id: id
				}).then(res => {
					if (res.code == 1) {
						res.data.expiration_time = res.data.expiration_time_text
						res.data.production_time = res.data.production_time_text
						let {
							expiration_time,
							grade,
							image,
							contacts,
							introduce,
							abbreviation,
							manufacturer,
							net_content,
							insurance_amount,
							packing_type,
							primary_id,
							production_time,
							storage_type,
							secondary_id,
							workshop_name,
							title,
							unit_price,
							unit,
							produce,
							small_unit,
							brand,
							unit_meterage,
							type,
							secondary_name,
							primary_name,
							origin,
							code
						} = res.data;
						this.pageData = res.data
						this.activeIndex = type
						this.OneMenuData = primary_id
						this.getSelectTwoData = code

						this.twoTypeText = secondary_name
						this.oneTypeText = primary_name
						this.unitDataString = unit
						this.input.net_contentMin = small_unit
						this.input.net_content = net_content
						this.secondary_DataId = secondary_id
						let setData = {}
						this.$nextTick(() => {
							this.form.setFieldsValue({
								primary_id,
								secondary_id,
								title,
								image,
								introduce,
								id
							});
							if (type == 0) {
								this.PrepackagedFood.setFieldsValue({
									brand,
									produce,
									grade,
									net_content,
									unit_price,
									production_time,
									expiration_time,
									unit,
									small_unit,
									unit_meterage
								});
								this.input.unit_meterage = unit_meterage
								this.input.unitPriceNum = unit_price
							} else if (type == 1) {
								this.agricultureProducts.setFieldsValue({
									unit_price,
									origin
								});
							} else {
								this.SmallWorkshop.setFieldsValue({
									production_time,
									unit_price,
									workshop_name,
									production_time,
									unit
								});
							}
						});
						if (image != '') {
							this.image = [{
								uid: this.$commonJs.randoms(),
								status: "done",
								name: this.$commonJs.randoms(),
								url: image
							}]
						}
						//  if (this.title == '编辑'){
						// 	this.getApiProductMenuListTwoFun(primary_id, secondary_id)
						// 	this.selectPrimary_id =  primary_id
						//  } else{
						// 	this.getApiProductMenuListTwoFun(this.OneMenu[0].id )
						//  }
					}
				});
			},
			setSecondary_idFun(data, type) { //通过参数判断return值
				let state = ''
				for (let index = 0; index < this.TwoMenu.length; index++) {
					if (type == 'code') {
						if (this.TwoMenu[index].id == data) {
							state = this.TwoMenu[index].code
						}
					}
					if (type == 'id')
						if (this.TwoMenu[index].id == data) state = this.TwoMenu[index].id
				}
				return state
			},
			handleSubmit(type) { //提交产品上架信息
				if (this.activeIndex == 0) { //预包装食品
					this.PrepackagedFood.validateFields((err, backData) => {
						if (err) return
					})
				} else if (this.activeIndex == 1) { //农产品
					this.agricultureProducts.validateFields((err, backData) => {
						if (err) return
					})
				} else { //小作坊食品
					this.SmallWorkshop.validateFields((err, backData) => {
						if (err) return
					})
				}
				this.form.validateFields((err, values) => {
					if (!values.production_time) {
						values.production_time = ''
					}
					if (!values.expiration_time) values.expiration_time = ''
					values.code = this.getSelectTwoData //二级分类的code
					values.primary_id = this.primary_id //一级分类的ID
					if (!values.image) values.image = this.image[0] ? this.image[0].url : ''
					if (this.$route.query.id) values.id = this.$route.query.id
					values.status = type
					values.type = this.activeIndex
					if (!err) {
						let datas = {}
						if (this.activeIndex == 0) { //预包装食品
							this.PrepackagedFood.validateFields((err, backData) => {
								values.unit_price = this.input.unitPriceNum
								if (!err) {
									datas = backData;
									this.postDataApi(values, backData)
								} else return
							})
						} else if (this.activeIndex == 1) { //农产品
							this.agricultureProducts.validateFields((err, backData) => {
								if (!err) {
									datas = backData;
									this.postDataApi(values, backData)
								} else return
							})
						} else { //小作坊食品
							this.SmallWorkshop.validateFields((err, backData) => {
								if (!err) {
									datas = backData;
									this.postDataApi(values, backData)
								} else return
							})
						}
					}
				});
			},
			postDataApi(values, datas) {
				if (!this.btn_check) {
					return false;
				}
				this.btn_check = false;
				let postData = Object.assign(values, datas)
				values.secondary_id = this.secondary_DataId
				values.primary_id = this.OneMenuData
				values.unit = this.unitDataString
				for (const key in values) {
					if (values[key] == undefined) {
						values[key] = ''
					}
				}
				// return
				this.$http.productAddUpdate(postData).then(res => {
					this.btn_check = true;
					if (res.code == 1) {
						setTimeout(() => {
							this.$router.replace('ProductManagementList')
						})
					}
				});
			},
			setReplacefun(node) {
				return node.replace('年', '-').replace('月', '-').replace('日', '')
			}
		},
		mounted() {

		},
		components: {
			richTxt
		},
	}
</script>

<style scoped="scoped">
	.addContentPadding {
		padding: 20px 40px;
	}

	.w615 {
		width: 615px;
	}

	.w465 {
		width: 465px;
	}

	.setTypeName {
		display: flex;
		width: auto;
	}

	.h40 {
		height: 40px;
	}

	.showSubmitImg {
		margin-left: 32px;
		width: 120px;
		height: 120px;
	}

	.submitImgView {
		display: flex;
	}

	.showSubmitImg img {
		width: 100%;
		height: 100%;
	}

	.addListStyle {
		display: flex;
	}

	.labelTitle {
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.mr100 {
		margin-right: 100px;
	}

	.mt55 {
		margin-top: 55px;
	}

	.mr37 {
		margin-right: 37px;
	}

	.aTextarea {
		width: 1460px;
		height: 203px;
		padding: 10px;
		border: 1px solid rgba(210, 210, 210, 1);
		border-radius: 5px;
	}

	.addPageBtn {
		width: 230px;
		height: 50px;
		border-radius: 5px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		margin-right: 32px;
	}

	.cheackSelect {
		display: flex;
		cursor: pointer;
	}

	.w100 {
		width: 100px;
	}

	.mr25 {
		margin-right: 25px;
	}

	.w230 {
		width: 230px;
	}

	.ml10 {
		margin-left: 10px;
	}

	.cheackSelect div {
		margin-right: 100px;
	}

	.activeClass {
		color: rgb(64, 158, 255);
		cursor: pointer;
	}

	.ant-form-item {
		margin-bottom: 0;
	}

	.segmentationTitle {
		margin: 20px 0;
	}
</style>
