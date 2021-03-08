<template>
    <div id="ProductCatalogInfo">
        <a-page-header title="查看详情" @back="() => $router.go(-1)" />
        <div class="ProductCatalogInfo_main">
            <div class="ProductCatalog_top">
                <div class="left">当前分类：{{ classifyName }}</div>
                <div class="ProductCatalogInfo_right">
                    <div class="rights" @click="showModal">新增二级分类</div>
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
                            <span>导入产品目录</span>
                        </a>
                        <!-- <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange="{this.handleFileChange}"
                /> -->
                        <div class="box_download">
                            <a :href="pathUrl"
                                >下载模板</a
                            >
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
                <template slot="operation" slot-scope="text, record, index">
                    <div class="operate">
                        <div @click="updata(record.id, index)">修改</div>
                        <div @click="del(record.id, index)">删除</div>
                    </div>
                </template>
            </a-table>
            <a-modal
                v-model="visible"
                :title="molVal"
                :centered="true"
                @ok="handleOk"
                cancelText="取 消"
                okText="确 认"
            >
                <div class="model_main">
                    <div>二级分类名称：</div>
                    <input
                        v-model="category"
                        type="text"
                        name=""
                        id=""
                        placeholder="请输入"
                    />
                </div>
                <div class="model_main">
                    <div>产品代码：</div>
                    <input
                        v-model="number"
                        type="text"
                        name=""
                        id=""
                        placeholder="请输入"
                    />
                </div>
                <div class="model_main">
                    <div>计量单位：</div>
                    <a-select
                        style="width: 196px"
                        placeholder="请选择"
                        @change="handleChange"
                        v-model="valueData"
                    >
                        <a-select-option v-for="(item, i) in unitData" :key="i">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </div>
            </a-modal>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "二级分类",
        dataIndex: "name",
        key: "name",
        width: "20%",
        align: "center"
    },
    {
        title: "产品代码",
        dataIndex: "code",
        key: "code",
        width: "20%",
        align: "center"
    },
    {
        title: "计量单位",
        dataIndex: "unit",
        key: "unit",
        width: "20%",
        align: "center"
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        align: "center",
        width: "20%"
    },
    {
        title: "操作",
        key: "operation",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     name: "东北大米",
    //     number: "DB23",
    //     unit: "g",
    //     creTime: "2020-8-3 17:04:56"
    // },
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
            unit: "",
            valueData: "",
            unitData: [
                { name: "L" },
                { name: "kg" },
                { name: "袋" },
                { name: "桶" },
                { name: "个" }
            ],
            dataIndex: -1,
            pid: "",
            iscreat: true,
            classifyName: "",
            molVal: ""
        };
    },
    created() {
        this.pathUrl = this.$globalApi + "/school/common/downloadFile?file_name=product";
        let id = this.$route.query.id;
        this.pid = id;
        this.getList(id);
    },
    methods: {
        // 导入二级目录
        handleFileChange(e) {
            this.$store.commit("setLoading", true);
            const input = e.target;
            const files = e.target.files;
            let formData = new FormData();
            if (files && files[0]) {
                const file = files[0];
                let that = this;
                formData.append("file", file);
                this.$http
                    .productMune(formData)
                    .then(res => {
                        this.$store.commit("setLoading", false);
                        if (res.code == 1) {
                            // this.$refs.uplodVal
                            that.$message.success(res.msg);
                            that.$refs.uplodVal.value = "";
                            that.$refs.uplodVal.value = "";
                            that.pagination.current = 1;
                            that.getList(that.pid);
                        } else {
                            that.$refs.uplodVal.value = "";
                            that.$message.error(res.msg);
                        }
                    })
            } else {
                this.$store.commit("setLoading", false);
                this.$message.error("上传失败！");
            }
        },
        handleChange(info) {
            if (info.file.status !== "uploading") {
            }
            if (info.file.status === "done") {
                this.$message.success(
                    `${info.file.name} file uploaded successfully`
                );
            } else if (info.file.status === "error") {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
        // 新增
        showModal() {
            this.category = "";
            this.number = "";
            this.unit = "";
            this.molVal = "新增二级分类";
            this.valueData = "";
            this.iscreat = true;
            this.visible = true;
        },
        // 确认新增
        handleOk(e) {
            let that = this;
            if (this.iscreat) {
                if (this.category == "") {
                    this.$message.error("请输入分类名称");
                } else if (this.number == "") {
                    this.$message.error("请输入产品代码");
                } else if (this.unit == "") {
                    this.$message.error("请选择计量单位");
                } else {
                    let data = {
                        url: "/product/addProductSon",
                        method: "post",
                        data: {
                            pid: this.pid,
                            name: this.category,
                            unit: this.unit,
                            code: this.number
                        }
                    };
                    this.$apiAxiox(data).then(res => {
                        that.loadShow = false;
                        if (res.data.code == 1) {
                            that.$message.success(res.data.msg);
                            that.visible = false;
                            that.getList(that.pid);
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    });
                }
            } else {
                let data = {
                    url: "/product/editProductSon",
                    method: "post",
                    data: {
                        id: this.dataIndex,
                        name: this.category,
                        unit: this.unit,
                        code: this.number
                    }
                };
                this.$apiAxiox(data).then(res => {
                    that.loadShow = false;
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.visible = false;
                        that.getList(that.pid);
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            }
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getList(this.pid);
            // this.getAllStudents()
        },
        // 删除
        del(id, i) {
            let that = this;
            let data = {
                url: "/product/delProduct",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getList(that.pid);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 修改
        updata(id, i) {
            this.dataIndex = id;
            this.iscreat = false;
            this.category = this.data[i].name;
            this.number = this.data[i].code;
            this.unit = this.data[i].unit;
            this.valueData = this.data[i].unit;
            this.molVal = "修改二级分类";
            this.visible = true;
        },
        handleChange(e) {
            this.unit = this.unitData[e].name;
        },
        getList(id) {
            this.loadShow = true;
            // this.$store.commit("setLoading", true);this.pagination.pageSize, this.pagination.current
            let that = this;
            let data = {
                url: "/product/productSonList",
                method: "post",
                data: {
                    pid: id,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                    });
                    that.classifyName = res.data.data.father_name;
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
#ProductCatalogInfo {
    width: 100%;
    background: #ffffff;
}
.ProductCatalogInfo_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.ProductCatalog_top {
    width: 100%;
    padding: 0 20px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}
.left {
    font-size: 18px;
    font-weight: bold;
}
.ProductCatalogInfo_right {
    display: flex;
    align-items: center;
}
.rights {
    padding: 10px 20px;
    box-sizing: border-box;
    background: rgba(2, 187, 114, 1);
    margin-right: 14px;
    border-radius: 8px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
}
.right {
    padding: 10px 20px;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 16px;
    background: rgb(242, 242, 242);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
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
.operate {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.operate > div {
    margin-right: 30px;
    color: rgba(2, 187, 114, 1);
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
    width: 120px;
    text-align: right;
}
.model_main input {
    border: 1px solid rgb(217, 217, 217);
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
<style>
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
.box_download a {
    color: rgb(84, 84, 84);
}
</style>