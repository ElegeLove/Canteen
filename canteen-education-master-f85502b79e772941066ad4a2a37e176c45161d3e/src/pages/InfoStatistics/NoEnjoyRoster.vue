<template>
    <div id="NoEnjoyRoster">
        <a-page-header title="未享受花名册" @back="() => $router.go(-1)" />
        <div class="NoEnjoyRoster_main">
            <div class="exportBox">
                <div class="exportData" @click="exportVal">导出</div>
            </div>
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                bordered
                :pagination="pagination"
                :loading="loadShow"
                @change="handleTableChange"
                :scroll="scrollVal"
            >
                <template slot="noEnjoyRoster" slot-scope="text, record">
                    <div
                        class="operate"
                        style="display:flex;justify-content:center;align-items: center;"
                    >
                        <div @click="preview(record.image)">预览</div>
                    </div>
                </template>
            </a-table>
            <div class="images" v-viewer="{ movable: false }" v-show="false">
                <img v-for="src in imagesPath" :src="src" :key="src" />
            </div>
        </div>
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "片区",
        dataIndex: "area",
        key: "area",
        width: 120,
        fixed: "left",
        align: "center"
    },
    {
        title: "类别",
        dataIndex: "type",
        key: "type",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "班",
        dataIndex: "class",
        key: "class",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "学生姓名",
        dataIndex: "student_name",
        key: "student_name",
        width: 150,
        align: "center"
    },
    {
        title: "学生身份证号",
        dataIndex: "student_id_card",
        key: "student_id_card",
        width: 150,
        align: "center"
    },
    {
        title: "家长姓名",
        dataIndex: "parent_name",
        key: "parent_name",
        width: 150,
        align: "center"
    },
    {
        title: "家长联系电话",
        dataIndex: "parent_phone",
        key: "parent_phone",
        width: 150,
        align: "center"
    },
    {
        title: "家庭住址",
        dataIndex: "address",
        key: "address",
        width: 150,
        align: "center"
    },
    {
        title: "不享受营改申请（自愿）书",
        dataIndex: "noEnjoyRoster",
        key: "noEnjoyRoster",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "noEnjoyRoster" }
    }
];
const data = [];
export default {
    data() {
        return {
            data,
            columns: [],
            columnsVal,
            scrollVal: {},
            loadShow: false,
            imagesPath: [],
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
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        this.listId = id;
        this.getList(id);
    },
    methods: {
        handleTableChange(pagination, filters, sorter) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize;
            this.getList(this.listId);
        },
        // 获取列表数据
        getList(id) {
            this.loadShow = true;
            let that = this;
            let data = {
                url: "/information/notEnjoyList",
                method: "post",
                data: {
                    id: id,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.pagination.total = res.data.data.total_count;
                    that.data = res.data.data.list;
                    if (res.data.data.list.length > 0) {
                        that.scrollVal = { x: 1400 };
                        that.columns = that.columnsVal;
                    } else {
                        that.scrollVal = {};
                        that.columns = [];
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 导出
        exportVal() {
            location.href =
                this.$globalApi +
                "/api/export/notEnjoyExport?id=" +
                this.listId;
        },
        // 预览
        preview(val) {
            this.imagesPath = val;
            const viewer = this.$el.querySelector(".images").$viewer;
            viewer.show();
        }
    }
};
</script>

<style scoped>
#NoEnjoyRoster {
    width: 100%;
    background: #ffffff;
}
.NoEnjoyRoster_main {
    width: 100%;
    padding: 0 24px 24px;
    box-sizing: border-box;
    /* border-top: 1px solid #eff1f5; */
}
.exportBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.exportData {
    width: 60px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>