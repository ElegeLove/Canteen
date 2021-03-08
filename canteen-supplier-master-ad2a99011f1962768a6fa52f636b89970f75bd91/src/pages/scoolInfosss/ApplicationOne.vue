<template>
	<div v-if="applicationData!==''">
		<div class="seachInputSchool">
			<a-input placeholder="请输入需要查询的学校" v-model="schoolText" class="w300 mr10"/>
			<a-button type="primary" @click="searchs">查询</a-button>
		</div>
		<div class="seachNoSchool" v-if="applicationData.data.length < 1">
			<img src="@/assets/image/noSearch.png" alt="">
			<div>查询无此学校</div>
		</div>
		<a-spin :spinning="spinning">
		<div class="relatedSchoolContent"  v-for="(item,index) in applicationData.data" :key="index">
			<div class="relatedSchoolContentImg">
				<div class="flex">
					<img :src="item.logo"/>
					<div class="relatedSchoolContentText">
						 <!-- -->
						<div class="name">
						   <!-- <div class="">	 -->
							   {{item.full_name}}( 代码：{{item.code}})
                 <div class="stateSchool" v-if="item.status">{{item.status}}</div>
                 <a-button
                 v-if="item.status == '已过期'"  @click="gengxinFun(item)"
                 type="primary" style="margin-left: 10px;">去更新合作信息</a-button>
							<!-- </div>	 -->
						</div>
						<div class="schoolText">
							<span>{{item.name}}</span>
							<span>{{item.total_count}}人</span>
						</div>
					</div>
				</div>
				<a-button type="primary"  v-if="item.status == '已拒绝' || item.status == ''" @click="associationSchool(item)">申请关联</a-button>
			</div>
			<div class="schoolAddress">
				<span>学校法人：{{item.legal_person}}</span>
				<span>联系电话：{{item.legal_person_mobile}}</span>
				<span>联系地址：{{item.address}}</span>
			</div>
		</div>
		</a-spin>
		<div class="txt-right pb100">
			<a-pagination show-quick-jumper
			 :current="seachData.page"
			 :total="applicationData.total" show-less-items :defaultPageSize="applicationData.per_page" @change="onChangePageNum" />
		</div>

		<a-modal v-model="editShow" title="更新合同信息" width="500px"  :closable="true" :footer="null">
      <a-spin :spinning="openLoading">
			<a-form :form="form" class="addContentPadding"  @submit="handleSubmit" >
				<a-form-item>
					<div class="flex">
						<label class="labelTitle labelTitle88">上传合同</label>
							<!-- <upload></upload> -->
						<up-file @getImg="getImg($event, 'contract')" :max_num="10" :de_fileList="image" v-decorator="['contract']">
							<div>
								<a-icon type="plus" />
								<div class="ant-upload-text">上传</div>
							</div>
						</up-file>
					</div>
				</a-form-item>
				<a-form-item>
					<div class=" flex">
						<label class="pt10 labelTitle88">合同开始时间：</label>
						<a-date-picker
						  format="YYYY-MM-DD"
						   class="height40 setIconStyleTop wlist248"
						  placeholder="合同开始日期"
						    v-decorator="['start_time', Validata.start_time]"
						  valueFormat="YYYY-MM-DD"
						/>
					</div>
				</a-form-item>
				<a-form-item>
					<div class=" flex">
						<label class="pt10 labelTitle88">合同结束时间：</label>
						<a-date-picker
						  format="YYYY-MM-DD"
						  class="setIconStyleTop wlist248"
						  valueFormat="YYYY-MM-DD"
						  placeholder="合同结束日期"
						    v-decorator="['end_time', Validata.end_time]"
						/>
					</div>
				</a-form-item>
				<a-form-item>
					<div class="submitImgView">
						<label class="pt10 labelTitle88">履约保证金：</label>
						<a-input placeholder="请输入履约保证金"  v-decorator="['bond', Validata.bond]"  class="wlist260" />
					</div>
				</a-form-item>
				<a-form-item>
					<a-button type="primary"  html-type="submit"  class="configBtns">
						确认更新
					</a-button>
				</a-form-item>
			</a-form>
      </a-spin>
		</a-modal>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				spinning:false,
        openLoading:false,
				form: this.$form.createForm(this),
				schoolText: '',
				applicationData: "",
				editShow: false,
				image: [],
				Validata: {
					production_time: { rules: [{ required: true, message: '请选择开始日期' }] },
					expiration_time :{ rules: [{ required: true, message: '请选择结束时间' }] },
					contract: { rules: [{ required: true, message: '请选择合同' }] },
					bond: { rules: [{ required: true, message: '请选择合同金额' }] }
				},
				selectObj: {},
				seachData:{
					keyword: '',
					page: 1,
					page_size: Number(this.$commonJs.PAGE_LINES[0])
				},
        infoData:""
			}
		},
		created() {
			this.seachSchool()
		},
		methods:{
			onChangePageNum(e){ //切换分页
				this.seachData.page = e
				this.seachSchool()
			},
			searchs(){
				this.seachData.page = 1;
				this.seachSchool();
			},
			seachSchool(){
				this.spinning = true;
				this.seachData.keyword = this.schoolText.trim()
				this.$http.schoolData(this.seachData).then(res => {
					this.spinning = false;
					if (res.code == 1) {
						this.applicationData = res.data
					}
				});
			},
			associationSchool(item){
				this.$router.push({
					path: "ApplicationTwo",
					query: { s_id: item.school_supplier_id, id: item.id,type: item.status}
				})
			},
			gengxinFun(node){ //更新当前学校状态
				this.selectObj = node
				this.editShow = true
        this.openLoading = true;
        this.$http.schoolInfo({id:node.school_supplier_id}).then((res)=>{
          this.openLoading = false;
          if(res.code==1){
            res.data.start_time = this.$commonJs.timestampToTime(Number(res.data.start_time))
            res.data.end_time = this.$commonJs.timestampToTime(Number(res.data.end_time))
             var {start_time,end_time,bond,contract,id} = res.data;
             if (contract != ''){
              this.image = [];
              contract.forEach((items)=>{
                this.image.push({uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(items),url:items})
              })
             }
             this.$nextTick(() => {
             	this.form.setFieldsValue({
             		bond,end_time,start_time,contract:this.image
             	});
             });
              this.infoData = res.data;
          }
        })
			},
			getImg(data, type) { //上传图
				if (data.length !== 0) {
					this.form.setFieldsValue({
						[type]: data
					});
				} else {
					this.form.setFieldsValue({
						[type]: []
					});
				}
			},
			handleSubmit(e){
				e.preventDefault();
				this.form.validateFields((err, values) => {
          values.id = this.infoData.id;
          var imgs = [];
          values.contract.forEach((item)=>{
            imgs.push(item.url)
          })
          values.contract = imgs.toString();
					if (!err) {
						this.$http.schoolUpdate(values).then(res => {
							if (res.code == 1) {
								this.editShow = false
								this.seachSchool()

								this.$nextTick(() => {
									this.form.setFieldsValue({
										end_time: '',
										start_time: '',
										contract: '',
										bond: ''
									});
									this.image = []
								});
							}
						});
					}
				});
			},
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped">
	.txt-right{text-align: right;}
	.pb100{padding-bottom: 100px;}
	.seachNoSchool{
		color: #666;
		text-align: center;
		font-size: 16px;
		margin-top: 60px;
	}
	.seachNoSchool img{
		width: 186px;
   		height: 180px;
	}
	.codeApplication{
		width: 100%;
	}
	.seachNoSchool div{margin-top: 20px;}
	 .p48{padding: 48px 76px;}
	 .mb15{margin-bottom: 15px;}
	 .labelTitle{width: 100px;} .labelTitle88{width: 100px;}
	 .mt18{margin-top: 0;}
	 .gengxinInfo{color: blue;font-size: 12px;position: relative;top: 10px;cursor: pointer;}
	 .pd40{padding: 0 40px;}
	 .wlist260{width: 260px;}
	 .mt40{margin-top: 40px;} .mt70{margin-top: 70px;margin-bottom: 70px;}
	.processListContent{width: 100%;display: flex;}
	.processList{width: 40%;position: relative;}
	.schoolText{position: relative;top: 20px;color: #333;}
	.schoolText span{margin-right: 20px;}
	.mr10{margin-right: 10upx;}
	.seachInputSchool{margin-bottom: 50px;}
	.noBorder .num{
		background-color: #02BB72 !important;
	}
	.wlist248{width: 248px;}
	.configBtns{
		margin-top: 20px;
		width: 270px;
		margin-left: 85px;
	}
	.stateSchool{
    white-space: nowrap;
    height: 30px; padding: 0 10px; background-color: lightcoral; color: #fff; border-radius: 5px; font-size: 12px;line-height: 30px;}
	.applyAssociation{
		width:192px;
		font-size:24px;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		height:60px;
		background:rgba(2,187,114,1);
		border-radius:5px;
	}
	.activeBg::after{background-color: #02BB72 !important;}
	.activeBg .num{background-color: #02BB72 !important;}
	.relatedSchoolContent{ border:1px solid rgba(210,210,210,1); border-radius:5px; margin-bottom: 30px;}
	.relatedSchoolContentImg{padding: 30px 50px 30px 35px;display: flex;justify-content: space-between;}
	.relatedSchoolContentImg img{
		width:90px;height:90px;object-fit: contain;
	}
	.relatedSchoolContentText{width: 80%;margin-left: 20px;}
	.relatedSchoolContentText .name{font-size:20px; font-family:Microsoft YaHei; display: flex; font-weight:bold; color:rgba(51,51,51,1); }
	.relatedSchoolContentText div{margin-left: 30px;}
	.schoolAddress{padding: 0 30px;height:63px; border-top: 1px solid #d2d2d2; line-height: 63px;}
	.schoolAddress span{margin-right: 50px;}
</style>
