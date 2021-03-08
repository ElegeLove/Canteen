<template>
    <div id="EnjoyRoster">
        <a-page-header title="享受花名册" @back="() => $router.go(-1)" />
        <div class="EnjoyRoster_main">
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
                <template
                    style="display: flex;justify-content: space-around;"
                    v-for="col in [
                        'is_stay',
                        'is_poor',
                        'is_school_stay',
                        'is_lunch',
                        'is_egg',
                        'is_milk',
                        'is_cake',
                        'is_fruits'
                    ]"
                    :slot="col"
                    slot-scope="text"
                >
                    <div :key="col">{{ text == 1 ? "是" : "否" }}</div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        width: 120,
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
        fixed: "left",
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
        title: "是否属于留守儿童",
        dataIndex: "is_stay",
        key: "is_stay",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_stay" }
    },
    {
        title: "是否属于非寄宿贫困生",
        dataIndex: "is_poor",
        key: "is_poor",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_poor" }
    },
    {
        title: "是否在校寄宿",
        dataIndex: "is_school_stay",
        key: "is_school_stay",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_school_stay" }
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
        title: "午餐模式",
        dataIndex: "is_lunch",
        key: "is_lunch",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_lunch" }
    },
    {
        title: "鸡蛋模式",
        dataIndex: "is_egg",
        key: "is_egg",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_egg" }
    },
    {
        title: "牛奶模式",
        dataIndex: "is_milk",
        key: "is_milk",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_milk" }
    },
    {
        title: "糕点模式",
        dataIndex: "is_cake",
        key: "is_cake",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_cake" }
    },
    {
        title: "水果模式",
        dataIndex: "is_fruits",
        key: "is_fruits",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "is_fruits" }
    },
    {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 150,
        align: "center"
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
                url: "/information/enjoyList",
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
                this.$globalApi + "/api/export/enjoyExport?id=" + this.listId;
        }
    }
};
</script>

<style scoped>
#EnjoyRoster {
    width: 100%;
    background: #ffffff;
}
.EnjoyRoster_main {
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
</style>