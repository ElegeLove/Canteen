<template>
    <div id="SchoolCode">
        <div class="ProductCatalog_top">
            <!-- 搜索框 -->
            <div>
                <a-form layout="inline" class="mx_form mx_staff">
                    <a-form-item label="学校简称：">
                        <span>
                            <a-input
                                type="text"
                                v-model="unitAbbreviation"
                                placeholder="输入学校简称"
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
            </div>
            <div class="ProductCatalog_top_btn">
                <div @click="addSchool">新增学校</div>
                <!-- <div>批量导入</div> -->
                <div class="right">
                    <!-- <a-upload @change="handleChange" :showUploadList="false">
                    <div>导入产品目录</div>
                </a-upload> -->
                    <!-- <input id="file" @change="handleFileChange" value="导入产品目录" type="file"  name="file" /> -->
                    <a href="javascript:;" class="a-upload">
                        <input
                            type="file"
                            @change="handleFileChange"
                            ref="uplodVal"
                        />
                        <span>导入学校</span>
                    </a>
                    <!-- <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange="{this.handleFileChange}"
                /> -->
                    <div class="box_download">
                        <a :href="pathUrl" download="school.xls">下载模板</a>
                    </div>
                </div>
            </div>
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :loading="loadShow"
            :pagination="pagination"
            @change="handleTableChange"
        >
            <template slot="orderNumber" slot-scope="text, record, index">
                <div class="orderNumber">
                    <div>{{ index + 1 }}</div>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="showInfo(record.id)">查看</div>
                    <div @click="repwd(record.id,record.abbreviation)">重置密码</div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            title="提示"
            :centered="true"
            @ok="handleOk"
            cancelText="取 消"
            okText="确 认"
        >
            <div>确定为{{schoolNameVal}}的登录密码重置为123456？</div>
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "序号",
        dataIndex: "sort",
        key: "sort",
        width: "3%",
        align: "center",
        // scopedSlots: { customRender: "orderNumber" }
    },
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "10%",
        align: "center"
    },
    {
        title: "学校全称",
        dataIndex: "full_name",
        key: "full_name",
        width: "10%",
        align: "center"
    },
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: "10%",
        align: "center"
    },
    {
        title: "学校账号",
        dataIndex: "username",
        key: "username",
        width: "10%",
        align: "center"
    },
    {
        title: "学校类别",
        dataIndex: "name",
        key: "name",
        width: "10%",
        align: "center"
    },
    {
        title: "地址",
        dataIndex: "address",
        key: "address",
        width: "20%",
        align: "center"
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "12%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "15%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     name: "某某学校全称",
    //     schoolCode: "0031",
    //     schoolType: "幼儿园",
    //     address: "重庆市沙坪坝区小龙坎正街96号",
    //     cretaTime: "2020-8-3",
    //     pwd:''
    // }
];
export default {
    data() {
        return {
            pathUrl: "",
            data,
            columns,
            loadShow: false,
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
            schoolNameVal: "",
            unit: "",
            valueData: "",
            unitData: [
                { name: "g" },
                { name: "kg" },
                { name: "袋" },
                { name: "桶" },
                { name: "个" }
            ],
            dataIndex: "",
            iscreat: true,
            unitAbbreviation: ""
        };
    },
    created() {
        // this.pathUrl = this.$globalApi + "/sec/school.xls";
        this.pathUrl =
            this.$globalApi + "/school/common/downloadFile?file_name=school";
        this.getList(this.unitAbbreviation);
    },
    methods: {
        handleFileChange(e) {
            this.$store.commit("setLoading", true);
            const input = e.target;
            const files = e.target.files;
            let formData = new FormData();
            if (files && files[0]) {
                const file = files[0];
                let that = this;
                this.loadShow = true;
                formData.append("file", file);
                this.$http.schoolMune(formData).then(res => {
                    this.$store.commit("setLoading", false);
                    if (res.code == 1) {
                        that.$refs.uplodVal.value = "";
                        that.getList(this.unitAbbreviation);
                        that.$message.success(res.msg);
                    } else {
                        that.$refs.uplodVal.value = "";
                        that.$message.error(res.msg);
                        that.loadShow = false;
                    }
                });
            } else {
                this.$message.error("上传失败！");
            }
        },
        // 单位简称搜索
        handleSubmit() {
            this.getList(this.unitAbbreviation);
        },
        // 新增学校
        addSchool() {
            this.$router.push({
                path: "AddSchoolCode"
            });
        },
        // 重置密码
        repwd(i,value) {
            this.dataIndex = i;
            this.visible = true;
            this.schoolNameVal = value;
        },
        // 确认重置密码
        handleOk(e) {
            let that = this;
            let data = {
                url: "/school/resetPassword",
                method: "post",
                data: {
                    id: this.dataIndex
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.visible = false;
                    that.$message.success(res.data.msg);
                    that.getList(that.unitAbbreviation);
                } else {
                    that.$message.error(res.data.msg);
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
        // 查看详情
        showInfo(i) {
            this.$router.push({
                path: "SchoolCodeInfo",
                query: {
                    id: i
                }
            });
        },
        getList(search_name) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/school/schoolList",
                method: "post",
                data: {
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize,
                    search_name: search_name
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
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
#SchoolCode {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ProductCatalog_top_btn {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
/* .ProductCatalog_top_btn div {
    
} */
.ProductCatalog_top_btn > div:first-child {
    width: 90px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
}
.left {
    font-size: 18px;
    font-weight: bold;
}
.right {
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 16px;
    background: rgb(242, 242, 242);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    margin-left: 50px;
}
.right > div {
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 24px;
    cursor: pointer;
}
.right > div:last-child {
    border-left: 1px solid rgb(121, 121, 121);
}
.box_download a {
    color: rgb(84, 84, 84);
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
.operate > div:last-child {
    margin: 0;
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
</style>
<style>
.mx_form{
    display: flex !important;
    align-items: center !important;
}
.ant-form-item{
    display: flex !important;
    align-items: center !important;
}
/*样式1*/
.a-upload {
    width: 120px;
    padding: 4px 10px;
    /* height: 20px; */
    /* line-height: 20px; */
    position: relative;
    color: rgb(84, 84, 84);
    cursor: pointer !important;
    background: rgb(242, 242, 242);
    text-align: center;
    /* border: 1px solid #ddd; */
    /* border-radius: 4px; */
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
}

.a-upload input {
    width: 100px;
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer !important;
}
.a-upload input span {
    cursor: pointer;
}
.a-upload:hover {
    color: rgb(84, 84, 84);
    background: rgb(242, 242, 242);
    border-color: #ccc;
    text-decoration: none;
    cursor: pointer !important;
}
</style>