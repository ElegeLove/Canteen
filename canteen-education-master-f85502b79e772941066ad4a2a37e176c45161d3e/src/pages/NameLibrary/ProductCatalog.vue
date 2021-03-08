<template>
    <div id="ProductCatalog">
        <div class="ProductCatalog_top">
            <div class="left" @click="showModal">新增一级分类</div>
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :loading="loadShow"
            :pagination="false"
            :data-source="data"
        >
            <template slot="operation" slot-scope="text, record, index">
                <div class="operate">
                    <div @click="updata(index, record.id)">修改</div>
                    <div @click="showInfo(record.id)">查看</div>
                    <div @click="del(record.id)">删除</div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            :title="modVal"
            :centered="true"
            @ok="handleOk"
            cancelText="取 消"
            okText="确 认"
        >
            <div>
                <div class="model_main">
                    <div>一级分类名称：</div>
                    <input
                        v-model="category"
                        type="text"
                        name=""
                        id=""
                        placeholder="请输入"
                    />
                </div>
                <div class="model_main">
                    <div>序&emsp;&emsp;&emsp;&emsp;号：</div>
                    <input
                        v-model="serialNum"
                        type="text"
                        name=""
                        id=""
                        placeholder="请输入"
                    />
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "一级分类",
        dataIndex: "name",
        key: "name",
        width: "30%",
        align: "center"
    },
    {
        title: "序号",
        dataIndex: "sort",
        key: "sort",
        width: "20%",
        align: "center"
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "25%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "25%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     name: "即粮食类",
    //     create_time: "2020-8-3 17:04:56"
    // },
];
export default {
    data() {
        return {
            data,
            columns,
            visible: false,
            category: "",
            serialNum: "",
            modVal: "",
            dataId: "",
            isCreat: true,
            loadShow: true,
            headers: {
                authorization: "authorization-text"
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        // 新增
        showModal() {
            this.category = "";
            this.serialNum = "";
            this.modVal = "新增一级分类";
            this.isCreat = true;
            this.visible = true;
        },
        // 确认新增
        handleOk(e) {
            let that = this;
            if (this.isCreat) {
                // let obj = {
                //     key: this.data.length + 1,
                //     name: this.category,
                //     creTime: "2020-8-3 17:04:56"
                // };
                // this.data.push(obj);
                if (this.category == "") {
                    this.$message.error('请输入一级分类名称');
                } else if (this.serialNum == "") {
                    this.$message.error('请输入序号');
                } else {
                    let data = {
                        url: "/product/addProduct",
                        method: "post",
                        data: {
                            name: this.category,
                            sort: this.serialNum
                        }
                    };
                    this.$apiAxiox(data).then(res => {
                        if (res.data.code == 1) {
                            that.$message.success(res.data.msg);
                            that.getList();
                            that.visible = false;
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    });
                }
            } else {
                // this.data[this.dataIndex].name = this.category;
                // let that = this;
                let data = {
                    url: "/product/editProduct",
                    method: "post",
                    data: {
                        id: this.dataId,
                        name: this.category,
                        sort: this.serialNum
                    }
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.getList();
                        that.visible = false;
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            }
        },
        // 删除
        del(id) {
            // this.data.splice(i, 1);
            let that = this;
            let data = {
                url: "/product/delProduct",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getList();
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 修改
        updata(i, id) {
            this.dataId = id;
            this.category = this.data[i].name;
            this.serialNum = this.data[i].sort;
            this.modVal = "修改一级分类";
            this.isCreat = false;
            this.visible = true;
        },
        // 查看
        showInfo(id) {
            this.$router.push({
                path: "ProductCatalogInfo",
                query: {
                    id: id
                }
            });
        },
        getList() {
            this.loadShow = true;
            // this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/product/productList",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.forEach(item => {
                        item.key = item.id;
                    });
                    that.data = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#ProductCatalog {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.ProductCatalog_top {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 30px;
}
.left {
    padding: 10px 20px;
    box-sizing: border-box;
    background: rgba(2, 187, 114, 1);
    margin-right: 14px;
    border-radius: 8px;
    font-size: 16px;
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
    display: flex;
    align-items: center;
}
.model_main:last-child {
    margin-top: 20px;
}
.model_main input {
    border: 1px solid rgb(217, 217, 217);
    padding: 0 20px;
    box-sizing: border-box;
}
.box_download a {
    color: rgb(84, 84, 84);
}
</style>