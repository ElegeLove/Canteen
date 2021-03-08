<template>
  <div>
    <a-page-header
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="查看详情"
      @back="() => this.$router.back()"
    />
    <div class="relatedSchoolDetails">
      <div class="relatedSchoolTime">
        <!-- （主动关联/被动关联） -->
        <div>关联时间：{{ pageData.create_time }}</div>
        <div>
          合作时间：{{ pageData.start_time_text }}~{{ pageData.end_time_text }}
          <span>{{ pageData.status }}</span>
        </div>
      </div>

      <div class="relatedContent boxShow pd20 borderR6">
        <div class="titleRelated">
          <div></div>
          <span>办学信息</span>
        </div>
        <div class="contentItem">
          <div>学校简称： {{ pageData.school.abbreviation || "无" }}</div>
          <div>学校类别： {{ pageData.school.type_text }}</div>
          <div>学校代码： {{ pageData.school.code || "无" }}</div>
          <div>
            统一社会信用代码： {{ pageData.school.credit_code || "无" }}
          </div>
          <div>所属片区： {{ pageData.school.area || "无" }}</div>
          <div>所属乡镇： {{ pageData.school.township || "无" }}</div>
          <div>详细地址： {{ pageData.school.address || "无" }}</div>
        </div>
      </div>
      <div class="relatedContent flexContent">
        <div class="leftItem boxShow">
          <div class="titleRelated">
            <div></div>
            <span>办学信息</span>
          </div>
          <div class="contentItem">
            <div>学校法人代表： {{ pageData.school.legal_person || "无" }}</div>
            <div>
              法人联系电话： {{ pageData.school.legal_person_mobile || "无" }}
            </div>
            <div>校长： {{ pageData.school.principal || "无" }}</div>
            <div>
              校长联系电话： {{ pageData.school.principal_mobile || "无" }}
            </div>
          </div>
        </div>
        <div
          class="leftItem boxShow"
          v-if="pageData.school.affiliated_kindergarten == 1"
        >
          <div class="titleRelated">
            <div></div>
            <span>附属幼儿园</span>
          </div>
          <div class="contentItem">
            <div>幼儿园长： {{ pageData.school.director || "无" }}</div>
            <div>
              幼儿园长联系电话： {{ pageData.school.principal_mobile || "无" }}
            </div>
            <div>
              是否为普惠：
              {{ pageData.school.inclusive_garden == 0 ? "否" : "是" }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="relatedContent flexContent flex_boxs"
        v-if="pageData.school.village.length > 0"
      >
        <div
          class="leftItem boxShow"
          v-for="(item, index) in pageData.school.village"
          :key="index"
        >
          <div class="titleRelated">
            <div></div>
            <span class="danshen">{{ item.full_name }}</span>
          </div>
          <div class="contentItem">
            <div>村校简称： {{ item.abbreviation || "无" }}</div>
            <div>主任教师： {{ item.chief_teacher || "无" }}</div>
            <div>主任教师联系电话： {{ item.chief_teacher_mobile || "无" }}</div>
            <div>园长联系电话： {{ item.chief_teacher || "无" }}</div>
            <div>
              是否有普惠： {{ item.inclusive_garden == 0 ? "否 " : "是" }}
            </div>
            <div>详情地址： {{ item.address || "无" }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- v-if="pageData.cooperation == 1" -->
    <button
      class="disconnectBtn"
      @click="seeApplyingInfo"
    >
      查看申请信息
    </button>
    <button
      class="disconnectBtn"
      v-if="(pageData.status == '合作中' || pageData.status == '已过期')&&pageData.related_application==2"
      @click="disconnect"
    >
      解除关联
    </button>

    <button
      class="disconnectBtn"
      v-if="pageData.status == '已过期'&&pageData.related_application==2"
      @click="schoolUpdate"
    >
      更新合作信息
    </button>
    <button
      class="disconnectBtn"
      v-if="pageData.status == '已拒绝'&&pageData.related_application==2"
      @click="applyForAssociation"
    >
      申请关联
    </button>

    <a-modal
      v-model="editShow"
      title="更新合作信息"
      width="500px"
      :closable="true"
      :footer="null"
    >
      <a-spin :spinning="openLoading">
        <a-form :form="form" class="addContentPadding" @submit="handleSubmit">
          <a-form-item>
            <div class="flex">
              <label class="labelTitle labelTitle88">上传合同</label>
              <!-- <upload></upload> -->
              <up-file
                @getImg="getImg($event, 'contract')"
                :max_num="10"
                :de_fileList="image"
                v-decorator="['contract']"
              >
                <div>
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </up-file>
            </div>
          </a-form-item>
          <a-form-item>
            <div class="flex">
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
            <div class="flex">
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
              <a-input
                placeholder="请输入履约保证金"
                v-decorator="['bond', Validata.bond]"
                class="wlist260"
              />
            </div>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="configBtns">
              确认更新
            </a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>

    <a-modal
      v-model="seeApplyingState"
      title="申请信息"
      width="800px"
      :closable="true"
	  :footer="null"
    >
      <div>
        <div class="applyingList">
          <div class="applyingTitle">上传合同</div>
          <div class="applyingContent">
            <img :src="item" alt="" v-for="(item,index) in applyingInfo.contract" :key="index" @click="openImg(item)"/>
          </div>
        </div>
        <div class="applyingList">
          <div class="applyingTitle">合同开始时间</div>
          <div class="applyingContent">{{applyingInfo.start_time}}</div>
        </div>
        <div class="applyingList">
          <div class="applyingTitle">合同结束时间</div>
          <div class="applyingContent">{{applyingInfo.end_time}}</div>
        </div>
        <div class="applyingList">
          <div class="applyingTitle">履约保证金（元）</div>
          <div class="applyingContent">{{applyingInfo.bond}}</div>
        </div>
        <div class="applyingList">
          <div class="applyingTitle">履约保证金缴款凭证</div>
          <div class="applyingContent">
            <img :src="item" alt="" v-for="(item,index) in applyingInfo.bond_voucher" :key="index" @click="openImg(item)"/>
          </div>
        </div>
        <div class="applyingList">
          <div class="applyingTitle">供应品类</div>
          <div class="applyingContent">
			  <span  v-for="(item,index) in applyingInfo.primary" :key="index"> {{index == applyingInfo.primary.length - 1 ? `${item.name}` : `${item.name},` }}  </span>
		  </div>
        </div>
        <div class="applyingList ">
          <a-button type="primary"  @click="seeApplyingState = false" style="margin-left: 42%;width: 150px;margin-top: 30px;  "> 关闭 </a-button>
        </div>
      </div>
    </a-modal>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openLoading: false,
      form: this.$form.createForm(this),
      pageData: {
        school: {
          abbreviation: "",
        },
      },
      editShow: false,
      image: [],
      Validata: {
        start_time: { rules: [{ required: true, message: "请选择开始日期" }] },
        end_time: { rules: [{ required: true, message: "请选择结束时间" }] },
        contract: { rules: [{ required: true, message: "请选择合同" }] },
        bond: { rules: [{ required: true, message: "请选择合同金额" }] },
      },
      selectId: "",
      infoData: '',
	  seeApplyingState: false,
	  applyingInfo:{},
    previewVisible: false,
    previewImage:''
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    handleCancel(){
       this.previewVisible = false;
    },
    openImg(url){       //打开图片
      if(url==""){
        return false;
      }
     this.previewImage = url;
     this.previewVisible = true;
    },
    seeApplyingInfo() {
      //查看申请信息
      if(this.$route.query.type && this.$route.query.type == 1){
        this.$http.hisSchooldetail({ id: this.$route.query.id }).then((res) => {
           this.seeApplyingState = true;
            this.applyingInfo = res.data
        });
      }else{
        this.$http
        .schoolDetailInfo({ id: this.pageData.id })
        .then((res) => {
            this.seeApplyingState = true;
            this.applyingInfo = res.data
        });
      }
	  
    },
    schoolUpdate() {
      this.editShow = true;
      this.openLoading = true;
      this.$http
        .schoolInfo({ id: this.pageData.school_supplier_id })
        .then((res) => {
          this.openLoading = false;
          if (res.code == 1) {
            res.data.start_time = this.$commonJs.timestampToTime(
              Number(res.data.start_time)
            );
            res.data.end_time = this.$commonJs.timestampToTime(
              Number(res.data.end_time)
            );
            var { start_time, end_time, bond, contract, id } = res.data;
            if (contract != "") {
              this.image = [];
              contract.forEach((items) => {
                this.image.push({
                  uid: this.$commonJs.randoms(),
                  status: "done",
                  name: this.$commonJs.randoms(items),
                  url: items,
                });
              });
            }
            this.$nextTick(() => {
              this.form.setFieldsValue({
                bond,
                end_time,
                start_time,
                contract: this.image,
              });
            });
            this.infoData = res.data;
          }
        });
    },
    getImg(data, type) {
      //上传图
      if (data.length !== 0) {
        this.form.setFieldsValue({
          [type]: data,
        });
      } else {
        this.form.setFieldsValue({
          [type]: [],
        });
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        values.id = this.infoData.id;
        var imgs = [];
        values.contract.forEach((item) => {
          imgs.push(item.url);
        });
        values.contract = imgs.toString();
        if (!err) {
          this.$http.schoolUpdate(values).then((res) => {
            if (res.code == 1) {
              this.editShow = false;
              this.$nextTick(() => {
                this.form.setFieldsValue({
                  end_time: "",
                  start_time: "",
                  contract: "",
                  bond: "",
                });
                this.image = [];
              });

              this.getDetails();
            }
          });
        }
      });
    },
    applyForAssociation() {
      this.$router.push({
        path: "/ManagementPanel/AddAssociatedSchool/ApplicationTwo",
        query: {
          s_id: this.pageData.school_supplier_id,
          id: this.pageData.school_id,
          type: this.pageData.status,
        },
      });
    },
    getDetails() {
      if(this.$route.query.type && this.$route.query.type == 1){
        this.$http.hisSchooldetail({ id: this.$route.query.id }).then((res) => {
          if (res.code == 1) {
            this.pageData = res.data;
          }
        });
      }else{
        this.$http.schooldetail({ id: this.$route.query.id }).then((res) => {
          if (res.code == 1) {
            this.pageData = res.data;
          }
        });
      }
    },
    backGoPage() {
      this.$router.back();
    },
    disconnect() {
      var that = this;
      that.$confirm({
        title: "解除关联信息?",
        cancelText: "取消",
        content: "您确定要解除关联信息？",
        onOk() {
          that.$http
            .removecooperation({ id: that.$route.query.id })
            .then((res) => {
              if (res.code == 1) {
                setTimeout(() => {
                  that.$router.back();
                });
              }
            });
        },
        onCancel() {},
      });
    },
  },
  mounted() {
    console.log(this.$route.params);
  },
};
</script>

<style scoped="scoped">
.pd20 {
  padding: 20px;
}
.relatedContent {
  margin-bottom: 20px;
}
.borderR6 {
  border-radius: 6px;
}
.boxShow {
  box-shadow: 1px 1px 7px 1px #ccc;
}
.textCenter{text-align: center;}
.applyingList {
  margin-bottom: 10px;
  display: flex;
  line-height: 60px;
  height: auto;
}
.applyingList button{display: inline-block;}
.applyingTitle {
  width: 160px;
  text-align: right;
  margin-right: 20px;
  font-size: 17px;
  color: #666;
}
.applyingContent {
  font-size: 16px;
  color: #999;
}
.applyingContent img {
  width: 110px;
  margin-right: 10upx;
  height: 110px;
  object-fit: cover;
}


.titleRelated {
  display: flex;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
}
.titleRelated div {
  width: 5px;
  height: 35px;
  background-color: #000000;
  margin-right: 10px;
}
.titleRelated span {
  position: relative;
  bottom: 14px;
}
.contentItem {
  color: #666;
  font-size: 14px;
}
.contentItem div {
  margin-bottom: 6px;
}
.flexContent {
  display: flex;
  justify-content: space-between;
}
.leftItem {
  padding: 20px;
  width: 45%;
  border-radius: 6px;
}

.labelTitle88 {
  width: 100px;
}

.relatedSchoolDetails {
  padding: 35px 40px;
}

.relatedSchoolTime {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(101, 101, 101, 1);
}
.relatedSchoolTime div {
  margin-bottom: 13px;
}
.relatedSchoolTime span {
  font-weight: bold;
  margin-left: 30px;
  color: rgba(229, 6, 6, 1);
}
/*
.relatedSchoolContent {
	border: 1px solid rgba(210, 210, 210, 1);
	border-radius: 5px;
}
.relatedSchoolContentImg {
	padding: 30px;
	display: flex;
}
.relatedSchoolContentImg img {
	width: 120px;
	height: 90px;
}
.relatedSchoolContentText {
	width: calc(100% - 140px);
	margin-left: 20px;
}
.relatedSchoolContentText .name {
	font-size: 20px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.schoolText {
	color: #333;
	font-size: 14px;
	margin-top: 20px;
}
.schoolText span {
	margin-right: 30px;
}
.schoolAddress {
	padding: 0 30px;
	height: 63px;
	border-top: 1px solid #d2d2d2;
	line-height: 63px;
}
.schoolAddress span {
	margin-right: 60px;
}
.relatedSchoolCode {
	font-size: 18px;
	font-family: Microsoft YaHei;
	margin-top: 30px;
	font-weight: bold;
	color: rgba(101, 101, 101, 1);
}
.schoolInfo {
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
	margin-top: 35px;
}
.schoolInfo .title {
	margin-top: 20px;
	color: rgba(51, 51, 51, 1);
	font-size: 18px;
	margin-bottom: 10px;
}
.schoolCode {
	display: flex;
	font-family: Microsoft YaHei;
	font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
}
.schoolCode img {
	width: 180px;
	height: 110px;
	border-radius: 5px;
}
.schoolCodeText {
	font-size: 16px;
	width: calc(100% - 200px);
	margin-left: 20px;
	font-family: Microsoft YaHei;
	padding-top: 10px;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
}
.schoolCodeText div {
	margin-top: 15px;
} */
.disconnectBtn {
  margin-left: 40px;
  width: 230px;
  height: 50px;
  margin-bottom: 100px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  cursor: pointer;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(1, 187, 113, 1);
  border-radius: 5px;
}
.flex_boxs {
  flex-wrap: wrap;
}
.flex_boxs > div {
  margin-bottom: 20px;
}
</style>
