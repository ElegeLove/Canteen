<template>
    <div id="SupplierCode">
        <div class="ProductCatalog_top">
            <!-- 搜索框 -->
            <a-form layout="inline" class="mx_form mx_staff">
                <a-form-item label="单位简称：">
                    <span>
                        <a-input
                            type="text"
                            v-model="unitAbbreviation"
                            placeholder="输入单位简称"
                        />
                    </span>
                </a-form-item>
                <a-form-item>
                    <a-button
                        class="mx_btnbg"
                        @click="handleSubmit"
                        type="primary"
                        html-type="submit"
                        >搜索</a-button
                    >
                </a-form-item>
            </a-form>
            <!-- <a-form layout="inline" class="mx_form mx_staff">
                <a-form-item label="审核状态：">
                    <a-select
                        defaultValue="all"
                        style="width: 120px"
                        v-model="selStatus"
                        @change="auditStataus"
                    >
                        <a-select-option value="-1">全部</a-select-option>
                        <a-select-option value="0">待审核</a-select-option>
                        <a-select-option value="1">审核通过</a-select-option>
                        <a-select-option value="2"
                            >审核未通过</a-select-option
                        >
                    </a-select>
                </a-form-item>
            </a-form> -->
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :loading='loadShow'
            :pagination="pagination"
            @change="handleTableChange"
        >
            <template slot="code" slot-scope="text">
                <div class="unitCode">
                    <div v-if="text && text != ''">{{ text }}</div>
                    <div v-else>未设置</div>
                </div>
            </template>
            <template
                style="display: flex;justify-content: space-around;"
                slot="logo"
                slot-scope="text"
            >
                <img class="tabImg" v-lazy="text" />
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                    @click="showInfo(record)"
                >
                    <div v-if="record.sort == '3' || record.sort == '4'">审核</div>
                    <div v-else>查看</div>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
const columns = [
    {
        title: "单位简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "10%",
        align: "center"
    },
    {
        title: "logo",
        dataIndex: "logo",
        key: "logo",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "logo" }
    },
    {
        title: "单位代码",
        dataIndex: "code",
        key: "code",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "code" }
    },
    {
        title: "详细地址",
        dataIndex: "office_address",
        key: "office_address",
        width: "15%",
        align: "center"
    },
    {
        title: "已关联学校数量",
        dataIndex: "relation_count",
        key: "relation_count",
        width: "15%",
        align: "center"
    },
    {
        title: "最新申请关联时间",
        dataIndex: "last_time",
        key: "last_time",
        width: "15%",
        align: "center"
    },
    {
        title: "审核状态",
        dataIndex: "status_text",
        key: "status_text",
        width: "15%",
        align: "center",
    },
    {
        title: "操作",
        key: "operation",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     name: "某某供应商",
    //     img: "http://a2.att.hudong.com/50/03/01300000167059121860035875425.jpg",
    //     unitCode: "",
    //     address: "达州市通川区i朝阳路3号",
    //     applicationTime: "2019.02.02 15:15",
    //     auditStatus: "待审核"
    // },
];
export default {
    data() {
        return {
            data,
            columns,
            loadShow:false,
            pagination: {
                pageSize: 10, // 默认每页显示数量
                current: 1, //显示当前页数
                total: 50,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true, // 显示可改变每页数量
                showQuickJumper: true, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            },
            visible: false,
            category: "",
            number: "",
            unit: "",
            valueData: "",
            unitData: [
                { name: "g" },
                { name: "kg" },
                { name: "袋" },
                { name: "桶" },
                { name: "个" }
            ],
            dataIndex: -1,
            iscreat: true,
            unitAbbreviation: "",
            selStatus: "-1",
        };
    },
    created () {
      this.getList(this.unitAbbreviation);
    },
    methods: {
        // 单位简称搜索
        handleSubmit() {
            this.getList(this.unitAbbreviation);
        },
        // 审核状态筛选
        auditStataus(e) {
            console.log(e)
            this.getList(this.unitAbbreviation);
        },
        // 查看
        showInfo(val) {
            let num = 0;
            if(val.auditStatus == '待审核'){
              num = 1;
            }else{
              num = 2;
            }
            this.$router.push({
                path: "ExamineList",
                query: {
                    id: val.id
                }
            });
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            // this.getAllStudents()
            this.getList(this.unitAbbreviation);
        },
        getList(search_name){
            this.loadShow = true;
            // this.$store.commit("setLoading", true);
            let that = this;
            let nums;
            if(status == '-1'){
                nums = '';
            }else{
                nums = status;
            }
            let data = {
                url: "/supplier/supplierCheckList",
                method: "post",
                data: {
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize,
                    // status:nums,
                    search_name:search_name
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    // console.log(res)
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                        if(!item.logo && item.logo == ''){
                           item.logo = require("../../assets/image/logos.png")
                        }
                    });
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#SupplierCode{
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.ProductCatalog_top {
    width: 100%;
    padding: 0 20px 0 50px;
    box-sizing: border-box;
    margin-bottom: 30px;
}
.left {
    font-size: 18px;
    font-weight: bold;
}
.right {
    padding: 10px 20px;
    box-sizing: border-box;
    background: #02bb72;
    margin-right: 14px;
    border-radius: 8px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
}
.operate {
    width: 100%;
    display: flex;
    align-items: center;
}
.operate > div {
    /* margin-right: 30px; */
    color: #02bb72;
    cursor: pointer;
}
.model_main {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
}
.model_main > div {
    width: 200px;
    text-align: right;
}
.model_main input {
    border: 1px solid rgb(217, 217, 217);
    padding: 0 20px;
    box-sizing: border-box;
}
.tabImg {
    width: 60px;
    height: 60px;
    object-fit: cover;
}
</style>