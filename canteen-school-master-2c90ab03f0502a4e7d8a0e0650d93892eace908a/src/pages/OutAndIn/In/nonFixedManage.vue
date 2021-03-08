<template>
  <div class="nonFixedManage">
      <a-page-header
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="非定点供应商管理"
      @back="() => $router.back()"
    >
    </a-page-header>
    <div class="main">
        <div class="main_top">
            <div class="RecipeQuery_box_item">
                <div>关键字：</div>
                <a-input
                    type="text"
                    style="width:240px;height:34px;"
                    v-model="schoolName"
                    placeholder="请输入"
                />
                <div class="mx_btnbg" @click="handleSubmit">搜索</div>
            </div>
            <div class="mx_btnbg" @click="addClick">新增</div>
        </div>
        <div>Tips：设置非定点供应商信息，便于非定点采购数据统计</div>
        <div class="main_tab">
            <a-table
                :rowKey="row => row.id"
                bordered
                :columns="columns"
                :data-source="data"
                :loading="loadShow"
                :pagination="pagination"
                @change="handleTableChange"
            >
                <template slot="operation" slot-scope="text, record">
                    <div
                        class="operate"
                        style="display:flex;justify-content:center;align-items: center;"
                    >
                        <div @click="show(record)">查看</div>
                        <div @click="updata(record)">编辑</div>
                        <div @click="del(record)">删除</div>
                        <!-- <div @click="publicityTable(record)">导出带量公示表</div> -->
                    </div>
                </template>
            </a-table>
        </div>
    </div>
    <a-modal
      :title="isShow?'编辑非定点供应商':'新增非定点供应商'"
      :visible="visible"
      :centered='true'
      @ok="handleOk"
      @cancel="handleCancel"
    >
       <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleOk">
            <a-form-item label="供应商名称：">
                <a-input
                    placeholder="请输入"
                    v-decorator="['name', { rules: [{ required: true, message: '请输入供应商名称' }] }]"
                />
            </a-form-item>
            <a-form-item label="食品经营许可证编码：">
                <a-input
                    placeholder="请输入"
                    v-decorator="['code']"
                />
            </a-form-item>
            <a-form-item label="统一社会信用代码：">
                <a-input
                    placeholder="请输入"
                    v-decorator="['credit']"
                />
            </a-form-item>
            <a-form-item label="联系方式：">
                <a-input
                    placeholder="请输入"
                    v-decorator="['phone', { rules: [{ required: true, message: '请输入供应商名称' }] }]"
                />
            </a-form-item>
            <a-form-item label="供应商地址：">
                <a-input
                    placeholder="请输入"
                    v-decorator="['adress', { rules: [{ required: true, message: '请输入供应商名称' }] }]"
                />
            </a-form-item>
        </a-form>
    </a-modal>
    <a-modal
      title="查看"
      :visible="showInfo"
      :centered='true'
      @ok="showNone"
      @cancel="showNone"
    >
       <a-row style="fontSize:16px;marginBottom:10px">
            <a-col :span="12" style="text-align: right;">
                供应商名称：
            </a-col>
            <a-col :span="12">
                {{dataVal.name}}
            </a-col>
        </a-row>
       <a-row style="fontSize:16px;marginBottom:10px">
            <a-col :span="12" style="text-align: right;">
                食品经营许可证编码：
            </a-col>
            <a-col :span="12">
                {{dataVal.food_business_license}}
            </a-col>
        </a-row>
       <a-row style="fontSize:16px;marginBottom:10px">
            <a-col :span="12" style="text-align: right;">
                统一社会信用代码：
            </a-col>
            <a-col :span="12">
                {{dataVal.credit_code}}
            </a-col>
        </a-row>
       <a-row style="fontSize:16px;marginBottom:10px">
            <a-col :span="12" style="text-align: right;">
                联系方式：
            </a-col>
            <a-col :span="12">
                {{dataVal.contacts_mobile}}
            </a-col>
        </a-row>
       <a-row style="fontSize:16px;">
            <a-col :span="12" style="text-align: right;">
                供应商地址：
            </a-col>
            <a-col :span="12">
                {{dataVal.warehouse_address}}
            </a-col>
        </a-row>
    </a-modal>
  </div>
</template>

<script>
const columns = [
    {
        title: "供应商名称",
        dataIndex: "name",
        key: "name",
        width: '30%',
        align: "center"
    },
    {
        title: "联系方式",
        dataIndex: "contacts_mobile",
        key: "contacts_mobile",
        width: '30%',
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: '40%',
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     schoolCode: "0031",
    //     name: "某某学校全称"
    // },
];
export default {
    data() {
        return {
            schoolName:'',
            columns,
            data,
            loadShow: false,
            pagination: {
                pageSize: 10, // 默认每页显示数量
                current: 1, //显示当前页数
                total: 50,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: false, // 显示可改变每页数量
                showQuickJumper: false, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            },
            visible:false,
            form: this.$form.createForm(this, { name: 'coordinated' }),
            isShow:false,
            dataId:'',
            showInfo:false,
            dataVal:{}
        }
    },
    mounted () {
        this.getListVal(this.schoolName);
    },
    methods: {
        // 搜索
        handleSubmit(){
            this.getListVal(this.schoolName);
        },
        // 新增
        addClick(){
            this.isShow = false;
            this.visible = true;
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
        },
        // 获取列表数据
        getListVal(
            schoolName
        ) {
            let that = this;
            this.loadShow = true;
            this.$http.nonFixedList({page:this.pagination.current,keyword:schoolName}).then((res)=>{
                that.loadShow = false;
                if(res.code==1){
                    //  this.pagination.pageSize = res.data.per_page;
                     that.pagination.total = res.data.total;
                     that.data = res.data.data;
                }
            })
        },
        // 查看
        show(val){
            this.dataVal = val;
            this.showInfo = true;
        },
        // 编辑
        updata(val){
            this.isShow = true;
            this.dataId = val.id;
            console.log(val)
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    name:val.name,
                    phone:val.contacts_mobile,
                    code:val.food_business_license,
                    credit:val.credit_code,
                    adress:val.warehouse_address
                });
            });
            
            this.visible = true;
        },
        // 删除
        del(val){
            let that = this;
            this.$http.delNonFixedList({id:val.id}).then((res)=>{
                if(res.code==1){
                    that.getListVal(that.schoolName);
                }
            })
        },
        handleOk(e){
            let that = this;
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    let data = {
                        name:values.name,
                        contacts_mobile:values.phone,
                        food_business_license:values.code,
                        credit_code:values.credit,
                        warehouse_address:values.adress,
                    }
                    if(this.isShow){
                        data.id = this.dataId;
                    }
                    this.$http.updataNonFixedList(data).then((res)=>{
                        if(res.code==1){
                            that.visible = false;
                            that.schoolName = '';
                            that.getListVal(that.schoolName);
                            that.form.resetFields();
                        }
                    })
                }
            });
        },
        handleCancel(e) {
            this.visible = false;
            this.form.resetFields();
        },
        showNone(){
            this.showInfo = false;
        }
    }
}
</script>

<style scoped="scoped">
.main{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.main_top{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.mx_btnbg {
    width: 62px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    color: #ffffff;
    margin-left: 22px;
    cursor: pointer;
}

.main_tab{
    width: 100%;
    margin-top: 30px;
}
.main_tab table, .main_tab td, .main_tab th{
    border: none !important;
}
.operate {
    width: 100%;
    display: flex;
    align-items: center;
}
.operate > div {
    margin-right: 30px;
    color: #02bb72;
    cursor: pointer;
}
.operate > div:last-child{
    margin: 0;
}

</style>