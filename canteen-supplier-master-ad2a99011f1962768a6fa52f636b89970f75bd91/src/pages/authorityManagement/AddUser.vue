<template>
	<div>
		<a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" :title="postData.id==''?'添加用户':'编辑用户'" @back="() => this.$router.back()" />
		<a-form-model ref="dynamicValidateForm" :model="postData" :rules="Validata">
			<div class="boxss">
				<a-row>
					<a-col>
						<div class="selec">
							<p>用户名（登录账号）<span class="beis">*</span><span class="tips">{{postData.id==''?'添加后不可修改':'不可修改'}}</span></p>
							<a-form-model-item ref="username" prop="username">
								<a-input placeholder="填写用户名" :disabled="postData.id!=''" v-model="postData.username" />
							</a-form-model-item>
						</div>
						<div class="selec">
							<p>职位</p>
							<a-form-model-item ref="role" prop="role">
								<a-select v-model="postData.role" default-value="全部" placeholder="请选择职位" style="width: 270px">
									<a-select-option :value="item.id" v-for="(item,index) in positions" :key="index">{{item.name}}</a-select-option>
								</a-select>
							</a-form-model-item>
						</div>
						<div class="selec">
							<p>手机号码<span class="beis">*</span><span class="tips">{{postData.id==''?'添加后不可修改':'不可修改'}}</span></p>
							<a-form-model-item ref="mobile" prop="mobile">
								<a-input placeholder="填写手机号码" v-model="postData.mobile" :maxLength="11" :disabled="postData.id!=''" />
							</a-form-model-item>
						</div>
						<div class="selec">
							<p>登录密码<span class="tips" v-if="postData.id!=''">登录密码可直接修改</span></p>
							<a-form-model-item>
								<a-input v-model="postData.password" placeholder="填写登录密码" />
							</a-form-model-item>
						</div>
						<div class="selec">
							<p>管理范围</p>
							<a-form-model-item>
								<a-radio-group name="radioGroup" v-model="postData.school_type" class="radios" @change="checkRadio">
									<a-radio :value="1">全部学校</a-radio>
									<a-radio :value="2">指定学校</a-radio>
								</a-radio-group>
							</a-form-model-item>
							<a-button type="primary" ghost class="main_color check_school" @click="checkSch" v-if="postData.school_type==2">请选择学校</a-button>
							<div class="table_box" v-if="postData.school_type==2&&show_tab[0].length!==0">
								<a-table :pagination="false" :rowKey="(record,index)=>{return record.id}" bordered :data-source="item" :columns="columns"
								 v-for="(item,index) in show_tab" :key="index">
									<div slot="action" slot-scope="text,row,index" class="actiosn main_color">
										<span @click="deletes(row)">删除</span>
									</div>
								</a-table>
							</div>
						</div>
						<div class="switchBox">
							<div>
								<span>用户状态：</span>
								<a-form-model-item>
									<a-switch checked-children="启用" v-model="postData.status" un-checked-children="关闭" />
								</a-form-model-item>
							</div>
						</div>
					</a-col>
				</a-row>
				<a-button type="primary" class="addSave" @click="saves">{{postData.id==''?'立即添加':'更新保存'}}</a-button>
			</div>
		</a-form-model>
		<a-modal v-model="checkShow" @ok="sch_sub" @cancel="sch_sub" title="选择学校" centered cancelText="取消" okText='确定' width="45%">
			<div class="search_box">
				<a-input placeholder="学校代码" v-model="schoolData.code" />
				<a-input placeholder="学校名称" v-model="schoolData.name" />
				<a-button type="primary" @click="searchs">查询</a-button>
			</div>
			<a-table :row-selection="{ selectedRowKeys: postData.relation_school_id, onChange: onSelectChange}" :columns="columnsTwo"
			 :pagination="pagination" @change="pageCheck" :data-source="data" :rowKey="(record,index)=>{return record.id}"
			 bordered :loading="loading" :scroll="{ y: 350 }">
			</a-table>
			<div class="flexEnd">已选择{{postData.relation_school_id.length}}条数据</div>
		</a-modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkShow: false,
				positions: [],
				form: this.$form.createForm(this),
				type: "",
				Validata: {
					username: [{
						required: true,
						message: '请填写用户名',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请填写手机号码',
						trigger: 'blur'
					}],
					role: [{
						required: true,
						message: '请选择职位',
						trigger: 'blur'
					}]
				},
				postData: {
					id: "",
					username: "",
					mobile: "",
					role: undefined,
					password: "",
					status: false,
					school_type: 1,
					relation_school_id: []
				},
				columns: [{
						title: '学校代码',
						dataIndex: 'code',
						align: "center",
						width: 200,
						key: "code",
					},
					{
						title: '学校名称',
						dataIndex: 'abbreviation',
						align: "center",
						key: "abbreviation",
					},
					{
						title: '操作',
						key: 'operation',
						fixed: 'right',
						align: "center",
						width: 80,
						scopedSlots: {
							customRender: 'action'
						},
					}
				],
				columnsTwo: [{
						title: '学校代码',
						dataIndex: 'code',
						align: "center",
						width: 200,
						key: "code",
					},
					{
						title: '学校名称',
						dataIndex: 'abbreviation',
						align: "center",
						key: "abbreviation",
					}
				],
				data: [],
				loading: false,
				schoolData: {
					page: 1,
					page_size: Number(this.$commonJs.PAGE_LINES[0]),
					code: "",
					name: ""
				},
				pagination: {
					total: 0,
					current: 1,
					pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示10条数据
					showTotal: total => `共有 ${total} 条数据`, //分页中显示总的数据
				},
				allData: [],
				show_tab: [
					[],
					[]
				],
				localData: []
			}
		},
		created() {
			var positions = localStorage.getItem("rolelist")
			if (positions) {
				this.positions = JSON.parse(positions)
			}
			this.postData.id = this.$route.query.id
			this.getList()
			if (this.$route.query.id !== '') {
				this.getDetails(this.$route.query.id)
			}
		},
		methods: {
			checkRadio(e) {
				this.$set(this.postData, "school_type", e.target.value)
				this.$forceUpdate()
			},
			searchs() { //查询
				this.schoolData.page = 1;
				this.pagination.current = 1;
				this.getList()
			},
			checkSch() { //打开选择学校弹窗
				this.checkShow = true;
			},
			pageCheck(pagetion) { //分页
				var {
					current,
					pageSize
				} = pagetion;
				this.schoolData.page = current;
				this.schoolData.page_size = pageSize;
				this.pagination.pageSize = pageSize;
				this.pagination.current = current;
				this.getList()
			},
			onSelectChange(selectedRowKeys, item) { //复选框选择
				this.postData.relation_school_id = selectedRowKeys;
				this.getCheckItem(selectedRowKeys);
			},
			getCheckItem(selectedRowKeys) { //过滤选中的
				this.localData.forEach((item) => {
					item.check = false;
				})
				this.localData.forEach((item) => {
					selectedRowKeys.forEach((it) => {
						if (item.id == it) {
							item.check = true;
						}
					})
				})
				var arr = [];
				this.localData.forEach((item) => {
					if (item.check == true) {
						arr.push(item)
					}
				})
				this.allData = arr;
			},
			sch_sub() { //选择学校确定
				if (this.postData.relation_school_id.length == 0) {
					this.allData = []
					this.localData.forEach((item) => {
						item.check = false;
					})
					this.show_tab = [
						[],
						[]
					]
					return this.$message.error('请选择学校');
				}
				var len = this.postData.relation_school_id.length / 2;
				var nums = 0
				if (parseInt(len) === parseFloat(len)) {
					nums = len;
				} else {
					nums = len + 0.5
				}
				this.show_tab = this.group(this.allData, nums);
				this.checkShow = false;
			},
			deletes(item) { //删除选择的学校
				var id = item.id;
				this.allData.forEach((it, index) => {
					if (it.id == id) {
						this.allData.splice(index, 1)
					}
				})
				this.postData.relation_school_id.forEach((it, index) => {
					if (it == id) {
						this.postData.relation_school_id.splice(index, 1)
					}
				})
				this.sch_sub()
			},
			group(array, subGroupLength) { //切割数据
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, index += subGroupLength));
				}
				return newArray;
			},
			arr_reduces(arr, keys) { //去重
				let newArr = [];
				let obj = {};
				for (var i = 0; i < arr.length; i++) {
					if (!obj[arr[i][keys]]) {
						newArr.push(arr[i]);
						obj[arr[i][keys]] = true;
					}
				}
				this.localData = newArr;
			},
			getList() { //获取列表
				this.loading = true
				this.$http.roleRelationSchool(this.schoolData).then((res) => {
					this.loading = false
					if (res.code == 1) {
						this.data = res.data.data
						this.localData = this.localData.concat(res.data.data);
						this.arr_reduces(this.localData, "id")
						this.getCheckItem(this.postData.relation_school_id)
						this.pagination.total = res.data.total
					}
				})
			},
			getDetails(id) { //加载详情
				this.$http.RoleUserDetails({
					id
				}).then((res) => {
					if (res.code == 1) {
						this.postData = res.data;
						if (res.data.relation_school.length == 0) {
							this.postData.school_type = 1;
							this.postData.relation_school_id = []
						} else {
							this.postData.school_type = 2;
							var selectedRowKeys = [];
							res.data.relation_school.forEach((item) => {
								selectedRowKeys.push(item.id)
							})
							this.postData.relation_school_id = selectedRowKeys;
							this.localData = this.localData.concat(res.data.relation_school);
							this.arr_reduces(this.localData, "id")
							this.getCheckItem(selectedRowKeys)
							this.sch_sub()
						}
						this.postData.status = res.data.status == 0 ? false : true
						this.postData.id = id
					}
				})
			},
			saves(e) { //提交
				this.$refs.dynamicValidateForm.validate(valid => {
					if (valid) {
						var datas = JSON.parse(JSON.stringify(this.postData))
						datas.status = datas.status == true ? 1 : 0;
						if (datas.school_type == 1) {
							datas.relation_school_id = ""
						} else {
							if (datas.relation_school_id.length == 0) {
								return this.$message.error('请选择学校');
							} else {
								datas.relation_school_id = datas.relation_school_id.toString();
							}
						}
						this.$store.commit("setLoaing", true)
						this.$http.RoleUserDataManipulation(datas).then((res) => {
							this.$store.commit("setLoaing", false)
							if (res.code == 1) {
								this.$router.go(-1)
							}
						})
					} else {
						return false;
					}
				});
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/ConfigurationManagement/UserManagement/AddUser.scss';
</style>
