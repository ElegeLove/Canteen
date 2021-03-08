<template>
    <div id="SystemSettings">
        <ul class="tabs">
            <li
                v-for="(item, index) in tabs"
                :key="index"
                :class="{ active: num == index }"
                @click="getNum(index)"
            >
                {{ item }}
            </li>
        </ul>
        <!-- <div class="SystemSettings_top">系统设置</div> -->
        <!-- <div class="SystemSettings_title">操作手册配置</div> -->
        <div class="SystemSettings_main" v-if="num == 0">
            <div class="SystemSettings_main_item">
                <!-- <div>教委端：</div> -->
                <div class="SystemSettings_main_inp">
                    <div>教委端：&emsp;</div>
                    <a-input class="inps" v-model="education" type="text" />
                </div>
            </div>
            <div class="SystemSettings_main_item">
                <!-- <div>学校端：</div> -->
                <div class="SystemSettings_main_inp">
                    <div>学校端：&emsp;</div>
                    <a-input class="inps" v-model="school" type="text" />
                </div>
            </div>
            <div class="SystemSettings_main_item">
                <!-- <div>供应商端：</div> -->
                <div class="SystemSettings_main_inp">
                    <div>供应商端：</div>
                    <a-input class="inps" v-model="supplier" type="text" />
                </div>
            </div>
        </div>
        <!-- <div class="SystemSettings_title">供应类目限制</div> -->
        <div class="category" v-if="num == 1">
            <div class="category_top">
                <div>供应类目限制（默认开启）</div>
                <div><a-switch checked-children="开" un-checked-children="关" v-model='switchVal' @change="chageVal" /></div>
            </div>
            <div class="category_footer">开启后，学校仅采购供应类目下的产品。关闭，则所有供应类目都可采购。</div>
        </div>
        <!-- <div class="SystemSettings_title">教委基本信息</div> -->
        <div class="SystemSettings_main_inp mt40" v-if="num == 2">
            <div>单位名称：</div>
            <a-input class="inps" v-model="unit_name" type="text" />
        </div>
        <div v-if="num == 3">
            <div class="contract">
                <div>解除后，所有供应商与学校的合同自动解除，供应商需重新申请与学校关联。</div>
                <div class="contract_btn" @click="relieve">立即解除</div>
            </div>
            <div class="mt40">
                <a-table :columns="columns" :pagination='false' :loading="loadShows" :data-source="data" :rowKey="row => row.id"></a-table>
            </div>
        </div>
        <div class="category" v-if="num == 4">
            <div class="category_top">
                <div>供应商关联申请限制（默认关闭）</div>
                <div><a-switch checked-children="开" un-checked-children="关" v-model='supVal' @change="chageSup" /></div>
            </div>
            <div class="category_footer">关闭时，供应商可随时发起关联学校申请。开启后，供应商则不可再发起关联学校申请。</div>
        </div>
        <div class="SystemSettings_footer"  v-if="num == 0 || num == 2">
            <div @click="conserve">保存</div>
        </div>
        <a-modal
        title="提示"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        :centered='true'
        >
            <p>解除后，所有供应商与学校需要重新关联。确定继续操作？</p>
        </a-modal>
    </div>
</template>

<script>
const columns = [
  {
    title: '设置时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align:'center'
    
  },
  {
    title: '对应学期',
    dataIndex: 'calendar',
    key: 'calendar',
    align:'center'
  },
];

const data = [];
export default {
    data() {
        return {
            education: "",
            school: "",
            supplier: "",
            loadShows:false,
            switchVal:true,
            supVal:false,
            visible:false,
            unit_name:'',
            tabs: ["操作手册地址配置", "供应类目限制设置","教委基本信息","合同到期设置","供应商关联申请设置"],
            num:0,
            data,
            columns,
        };
    },
    created() {
        this.getInfo();
        this.getList();
    },
    methods: {
        // tab切换
        getNum(i){
            this.num = i;
        },
        // 获取数据
        getInfo() {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/index/getUrlConfig",
                method: "post",
                data: {
                    type: "",
                },
            };
            this.$apiAxiox(data).then((res) => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.education = res.data.data.sec_operation_manual;
                    that.school = res.data.data.school_operation_manual;
                    that.supplier = res.data.data.supplier_operation_manual;
                    that.unit_name = res.data.data.unit_name;
                    that.switchVal = res.data.data.limit_product_type=='1'?true:false;
                    that.supVal = res.data.data.related_application=='1'?true:false;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        getList(){
            // this.$store.commit("setLoading", true);
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/index/disassociateList",
                method: "post",
                data: {
                },
            };
            this.$apiAxiox(data).then((res) => {
                // that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.loadShows = false;
                    that.data = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 解除关联
        relieve(){
            this.visible = true;
        },
        handleOk(){
            let that = this;
            let data = {
                url: "/index/disassociate",
                method: "post",
                data: {
                },
            };
            this.$apiAxiox(data).then((res) => {
                // that.$store.commit("setLoading", false);
                that.visible = false;
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getList();
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        handleCancel(){
            this.visible = false;
        },
        // 开关
        chageVal(i1,i2){
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/index/setUrlConfig",
                method: "post",
                data: {
                    limit_product_type: i1==true?'1':'2'
                },
            };
            this.$apiAxiox(data).then((res) => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.$store.commit("setLinkData", true);
                    that.$message.success(res.data.msg);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        chageSup(i1,i2){
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/index/setUrlConfig",
                method: "post",
                data: {
                    related_application: i1==true?'1':'2'
                },
            };
            this.$apiAxiox(data).then((res) => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.$store.commit("setLinkData", true);
                    that.$message.success(res.data.msg);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 保存
        conserve() {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/index/setUrlConfig",
                method: "post",
                data: {
                    sec_operation_manual: this.education,
                    school_operation_manual: this.school,
                    supplier_operation_manual: this.supplier,
                    unit_name: this.unit_name,
                },
            };
            this.$apiAxiox(data).then((res) => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.$store.commit("setLinkData", true);
                    that.$store.commit("setTitle", true);
                    that.$message.success(res.data.msg);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
    },
};
</script>

<style scoped>
#SystemSettings {
    width: 100%;
    min-height: 80vh;
    padding: 30px;
    background: #ffffff;
    box-sizing: border-box;
}
.tabs {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 20px;
}
.tabs > li {
    cursor: pointer;
    margin-right: 30px;
}
.tabs > li:last-child {
    margin: 0;
}
.active {
    color: rgb(51, 51, 51);
    font-weight: bold;
}
.SystemSettings_title{
    font-weight: bold;
    color: #413e3e;
    font-size: 18px;
}
.SystemSettings_top {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
}
.SystemSettings_main {
    margin-top: 30px;
    margin-bottom: 30px;
}
.SystemSettings_main_item {
    margin: 20px 0;
}
.SystemSettings_main_item > div:first-child {
    font-size: 18px;
}
.SystemSettings_main_inp {
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
}
.inps {
    width: 300px;
    height: 30px;
    margin-left: 20px;
}
.SystemSettings_footer {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
}
.SystemSettings_footer > div {
    width: 142px;
    height: 42px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(2, 187, 114, 1);
    color: #ffffff;
    cursor: pointer;
}
.category{
    /* width: 800px; */
    /* margin: 50px auto 0; */
    padding-left: 20px;
    margin-top: 20px;
    box-sizing: border-box;
    margin-bottom: 50px;
}
.category_top{
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    font-size: 16px;
}
.category_top>div:first-child{
    margin-right: 500px;
}
.category_footer{
    font-size: 14px;
    line-height: 30px;
}
.mt40{
    margin-top: 20px;
}
.contract{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.contract_btn{
    padding: 5px 10px;
    box-sizing: border-box;
    background: rgba(2, 187, 114, 1);
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
}
</style>