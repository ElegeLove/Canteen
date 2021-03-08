<template>
    <div class="boxss">
        <div class="selecs">
            <p>用户：</p>
            <a-input
                placeholder="用户名/职位/账号"
                v-model="postData.keyword"
            />
            <a-button type="primary" @click="searchs">搜索</a-button>
        </div>
        <div class="selecs">
            <p>角色：</p>
            <a-select
                style="width: 200px"
                default-value="全部"
                placeholder="请选择职位"
                @change="searchs"
                v-model="postData.role"
            >
                <a-select-option
                    :value="item.id"
                    v-for="(item, index) in position"
                    :key="index"
                    >{{ item.name }}</a-select-option
                >
            </a-select>
        </div>
        <div class="btnBox">
            <a-button type="primary" icon="usergroup-add" @click="adduser('')"
                >添加用户</a-button
            >
            <a-button @click="stopStatus">批量停用</a-button>
            <a-button @click="openAlls">批量启用</a-button>
            <a-button @click="deleAll">批量删除</a-button>
        </div>
        <a-table
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
                getCheckboxProps: getCheckboxProps
            }"
            :columns="columns"
            :data-source="data"
            bordered
            :loading="loading"
            class="tables"
            @change="pageCheck"
            :pagination="pagination"
        >
            <!-- <div slot="imgs" slot-scope="text">
         <img src="../../../assets/image/loginBg.png" class="imgs"/>
       </div> -->
            <div slot="status" slot-scope="text, items, index">
                <a-switch
                    checked-children="启用"
                    un-checked-children="关闭"
                    :disabled="items.role == 0 || items.role == 1"
                    :checked="items.status == 1 ? true : false"
                    @click="switchs(items, index)"
                />
            </div>
            <div slot="action" slot-scope="text, rows" class="operate">
                <div @click="shoeInfo(rows.id)">查看</div>
                <div @click="adduser(rows.id)" v-if="rows.role != 0 && rows.role != 1">编辑</div>
                <div @click="delets(rows.id)" v-if="rows.role != 0 && rows.role != 1">删除</div>
            </div>
        </a-table>
        <a-modal
            v-model="statusShow"
            :title="modalObj.title"
            centered
            cancelText="取消"
            okText="确认"
            @ok="subModals"
        >
            <p>{{ modalObj.cont }}</p>
        </a-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalObj: {},
            statusShow: false,
            position: [{ id: "", name: "全部" }],
            columns: [
                {
                    title: "用户名",
                    dataIndex: "username",
                    align: "center",
                    width: "15%"
                },
                {
                    title: "角色",
                    dataIndex: "role_name",
                    align: "center",
                    width: "15%"
                },
                {
                    title: "手机号码",
                    dataIndex: "mobile",
                    align: "center",
                    width: "15%"
                },
                {
                    title: "创建时间",
                    dataIndex: "create_time",
                    align: "center",
                    width: "20%"
                },
                {
                    title: "状态",
                    dataIndex: "status",
                    align: "center",
                    width: "15%",
                    scopedSlots: { customRender: "status" }
                },
                {
                    title: "操作按钮",
                    dataIndex: "action",
                    align: "center",
                    width: "20%",
                    scopedSlots: { customRender: "action" }
                }
            ],
            data: [],
            selectedRowKeys: [], //选中得下标
            actionIds: {
                //删除  停启用数据id
                ids: []
            },
            loading: false,
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10, //每页中显示10条数据
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ["10", "20", "30", "40", "50"], // 每页数量选项
                showTotal: total => `共有 ${total} 条数据` //分页中显示总的数据
            },
            postData: {
                page: 1,
                pageSize: 10,
                role: undefined,
                keyword: ""
            }
        };
    },
    created() {
        // console.log(this.postData);
        this.getPosition();
        this.getList();
    },
    methods: {
        getCheckboxProps(record) {
            return {
                props: {
                    disabled: record.role == 0 || record.role == 1,
                    role: record.role
                }
            };
        },
        getList() {
            //获取列表
            this.loading = true;
            let that = this;
            let data = {
                url: "/role/user",
                method: "post",
                data: that.postData
            };
            this.$apiAxiox(data).then(res => {
                that.loading = false;
                if (res.data.code == 1) {
                    var asss = res.data.data.data;
                    asss.forEach((it, index) => {
                        it.key = it.id;
                    });
                    that.data = asss;
                    that.pagination.total = res.data.data.total;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        pageCheck(pagetion) {
            //分页
            var { current, pageSize } = pagetion;
            this.postData.page = current;
            this.postData.pageSize = pageSize;
            this.pagination.pageSize = pageSize;
            this.pagination.current = current;
            this.getList();
        },
        searchs() {
            //搜索
            this.postData.page = 1;
            this.pagination.current = 1;
            this.getList();
        },
        getPosition() {
            //获取角色筛选列表
            let that = this;
            let data = {
                url: "/role/userRole",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.position = this.position.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        onSelectChange(selectedRowKeys, item) {
            //选中的数据处理
            this.selectedRowKeys = selectedRowKeys;
            var arr = [];
            item.forEach(item => {
                arr.push(item.id);
            });
            this.actionIds.ids = arr;
        },
        switchs(item) {
            //切换switch
            this.actionIds.ids = item.id;
            if (item.status == 1) {
                this.switchTxt("closeStatus");
            } else {
                let that = this;
                let data = {
                    url: "/role/userEnable",
                    method: "post",
                    data: this.actionIds
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.emptyCheck();
                        item.status = item.status == 1 ? 2 : 1;
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            }
        },
        switchTxt(type) {
            //状态提示框
            this.modalObj = {
                title: "确认停用",
                cont: "停用后用户将无法正常登录，是否继续？",
                type: type
            };
            this.statusShow = true;
        },
        openDele() {
            //删除提示框
            this.modalObj = {
                title: "确认删除",
                cont: "删除后用户将无法正常登录，是否继续？",
                type: "dele"
            };
            this.statusShow = true;
        },
        delets(id) {
            //删除
            this.actionIds.ids = id;
            this.openDele();
        },
        deleAll() {
            //批量删除
            if (this.actionIds.ids.length == 0) {
                return this.$message.error("请选择用户");
            }
            this.openDele();
        },
        openAlls() {
            //批量启用
            if (this.actionIds.ids.length == 0) {
                return this.$message.error("请选择用户");
            }
            let that = this;
            let data = {
                url: "/role/userEnable",
                method: "post",
                data: this.actionIds
            };
            this.$apiAxiox(data).then(res => {
                that.loading = false;
                if (res.data.code == 1) {
                    that.emptyCheck();
                    that.getList();
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        stopStatus() {
            //批量停用
            if (this.actionIds.ids.length == 0) {
                return this.$message.error("请选择用户");
            }
            this.switchTxt("closeStatus");
        },
        emptyCheck() {
            //清空选中
            this.selectedRowKeys = [];
            this.actionIds.ids = [];
        },
        subModals() {
            //弹框确认
            this.statusShow = false;
            var { type } = this.modalObj;
            let that = this;
            if (type == "dele") {
                //删除
                let data = {
                    url: "/role/userDelete",
                    method: "post",
                    data: this.actionIds
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.emptyCheck();
                        that.getList();
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            } else if (type == "closeStatus") {
                //停用
                let data = {
                    url: "/role/userDisable",
                    method: "post",
                    data: this.actionIds
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.emptyCheck();
                        that.getList();
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            }
        },
        shoeInfo(id) {
            //添加用户
            this.$router.push({
                path: "UserInfo",
                query: { id }
            });
        },
        adduser(id) {
            //添加用户
            this.$router.push({
                path: "AddUser",
                query: { id }
            });
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
.boxss {
    box-sizing: border-box;
    padding: 30px 40px;
    background: #ffffff;
}
.selecs {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 10px;
    > p,
    > span {
        white-space: nowrap;
        font-size: 14px;
        color: #333333;
        margin-bottom: 0;
        width: 50px;
        margin-left: 0;
    }
    > input {
        width: 200px;
    }
    > .ant-calendar-picker {
        width: 200px;
    }
    > button {
        margin-left: 20px;
    }
}
.btnBox {
    margin-top: 30px;
    > button {
        margin-right: 15px;
    }
}
.imgs {
    width: 60px;
    height: 60px;
    border-radius: 4px;
}
.actiosn {
    font-size: 14px;
    > span:nth-of-type(2) {
        margin: 0 5px;
    }
    > span {
        cursor: pointer;
    }
}
.tables {
    margin-top: 30px;
}
.operate {
    // width: 100%;
    display: flex;
    justify-content: center;
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
</style>
