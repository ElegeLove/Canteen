<template>
    <div class="boxss">
        <div class="search">
            <span>角色：</span>
            <a-input placeholder="输入角色名称" v-model="postData.keyword" />
            <a-button type="primary" @click="searchs">搜索</a-button>
        </div>
        <div class="btnBox">
            <a-button type="primary" icon="usergroup-add" @click="adduser('')"
                >添加角色</a-button
            >
            <a-button @click="stopStatus">批量停用</a-button>
            <a-button @click="openAlls">批量启用</a-button>
            <a-button @click="deleAlls">批量删除</a-button>
        </div>
        <a-table
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
            }"
            :columns="columns"
            :data-source="data"
            bordered
            class="tables"
            :loading="loading"
            :rowKey="
                (record, index) => {
                    return index;
                }
            "
            @change="pageCheck"
            :pagination="pagination"
        >
            <div slot="status" slot-scope="text, rows">
                <a-switch
                    checked-children="启用"
                    un-checked-children="关闭"
                    :checked="rows.status == 1 ? true : false"
                    @click="switchs(rows)"
                />
            </div>
            <div
                slot="action"
                slot-scope="text, rows"
                class="operate"
            >
                <div @click="shoeInfo(rows.id)">查看</div>
                <div @click="adduser(rows.id)">编辑</div>
                <div @click="delets(rows.id)">删除</div>
            </div>
        </a-table>
        <a-modal
            v-model="statusShow"
            title="提示"
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
            modalObj: {
                cont: "停用职位后配置该职位的用户将无法正常使用，是否继续？"
            },
            statusShow: false,
            columns: [
                {
                    title: "名称",
                    dataIndex: "name",
                    align: "center",
                    width: '15%'
                },
                {
                    title: "描述",
                    dataIndex: "description",
                    align: "center",
                    width: "15%"
                },
                {
                    title: "创建人",
                    dataIndex: "founder",
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
                    width: '20%',
                    scopedSlots: { customRender: "action" }
                }
            ],
            data: [],
            selectedRowKeys: [],
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
                keyword: "",
                pageSize: 10
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            //获取列表
            // this.loading = true
            // this.$http.RoleLists(this.postData).then((res)=>{
            //    this.loading = false
            //   if(res.code==1){
            //     this.data = res.data.data
            //     this.pagination.total = res.data.total
            //   }
            // })

            //获取列表
            this.loading = true;
            let that = this;
            let data = {
                url: "/role/lists",
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
        onSelectChange(selectedRowKeys, item) {
            //选中的数据
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
                //   this.$http.RoleRoleEnable(this.actionIds).then((res)=>{
                //     if(res.code==1){
                //       this.emptyCheck()
                //       item.status = item.status==1?2:1
                //     }
                //   })
                let that = this;
                let data = {
                    url: "/role/roleEnable",
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
                cont: "停用职位后配置该职位的用户将无法正常使用，是否继续？",
                type: type
            };
            this.statusShow = true;
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
                // this.$http.RoleRoleDelete(this.actionIds).then(res => {
                //     if (res.code == 1) {
                //         this.emptyCheck();
                //         this.getList();
                //     }
                // });
                let data = {
                    url: "/role/roleDelete",
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
                // this.$http.RoleRoleDisable(this.actionIds).then(res => {
                //     if (res.code == 1) {
                //         this.getList();
                //         this.emptyCheck();
                //     }
                // });
                let data = {
                    url: "/role/roleDisable",
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
        openDele() {
            //删除提示框
            this.modalObj = {
                cont: "删除职位后配置该职位的用户将无法正常使用，是否继续？",
                type: "dele"
            };
            this.statusShow = true;
        },
        delets(id) {
            //删除
            this.actionIds.ids = id;
            this.openDele();
        },
        deleAlls() {
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
            // this.$http.RoleRoleEnable(this.actionIds).then((res)=>{
            //   if(res.code==1){
            //     this.emptyCheck()
            //     this.getList()
            //   }
            // })
            let that = this;
            let data = {
                url: "/role/roleEnable",
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
        },
        stopStatus() {
            //批量停用
            if (this.actionIds.ids.length == 0) {
                return this.$message.error("请选择用户");
            }
            this.switchTxt("closeStatus");
        },
        shoeInfo(id) {
            //添加用户
            this.$router.push({
                path: "RoleInfo",
                query: { id }
            });
        },
        adduser(id) {
            //添加用户
            this.$router.push({ path: "AddRole", query: { id } });
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
.search {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    // margin-bottom: 32px;
    box-sizing: border-box;
    > input {
        width: 296px;
        height: 32px;
        font-size: 14px;
        border-radius: 6px;
    }
    > button {
        width: 72px;
        height: 32px;
        border-radius: 6px;
        margin-left: 15px;
    }
    > span {
        font-size: 14px;
        color: #333333;
    }
}
.btnBox {
    margin-top: 30px;
    > button {
        margin-right: 15px;
    }
}
.tables {
    margin-top: 30px;
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
