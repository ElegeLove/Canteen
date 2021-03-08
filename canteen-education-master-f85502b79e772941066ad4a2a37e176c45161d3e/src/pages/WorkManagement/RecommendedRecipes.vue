<template>
    <div id="RecommendedRecipes">
        <div class="RecommendedRecipes_top">
            <div>
                <div class="RecipeQuery_box_item">
                    <div>上传日期：</div>
                    <div>
                        <a-date-picker
                            v-model="startValue"
                            :disabled-date="disabledStartDate"
                            show-time
                            format="YYYY-MM-DD"
                            placeholder="选择日期"
                            @openChange="handleStartOpenChange"
                            @ok="selStartTime"
                        />
                        -
                        <a-date-picker
                            v-model="endValue"
                            :disabled-date="disabledEndDate"
                            show-time
                            format="YYYY-MM-DD"
                            placeholder="选择日期"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                            @ok="selEndTime"
                        />
                    </div>
                </div>
            </div>
            <div class="mx_btnbg" @click="addPpdata()">新增</div>
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="pagination"
            :loading="loadShow"
            @change="handleTableChange"
        >
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="showInfo(record.id)">查看</div>
                    <div @click="addPpdata(record.id)">编辑</div>
                    <div @click="delTabs(record.id)">删除</div>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
const columns = [
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: "20%",
        align: "center"
    },
    {
        title: "推荐说明",
        dataIndex: "explain",
        key: "explain",
        width: "40%",
        align: "center"
    },
    {
        title: "上传时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "20%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
export default {
    data() {
        return {
            data,
            columns,
            startValue: null,
            endValue: null,
            endOpen: false,
            startTime:'',
            endTime:'',
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
            loadShow:false
        };
    },
    watch: {
        startValue(val) {
            if (this.startValue == null) {
                this.startTime = "";
                this.endTime = "";
                this.endValue = null;
            } else {
                this.startTime = this.$moment(val).format("YYYY-MM-DD");
            }
        },
        endValue(val) {
            if (this.endValue == null) {
                this.endTime = "";
            } else {
                this.endTime = this.$moment(val).format("YYYY-MM-DD");
            }
        }
    },
    created () {
      this.getList(this.startTime,this.endTime);
    },
    methods: {
        // 开始时间确认
        selStartTime() {
            this.getList(this.startTime,this.endTime);
        },
        // 结束时间确认
        selEndTime() {
            this.getList(this.startTime,this.endTime);
        },
        //日期选择
        disabledStartDate(startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
        // 列表分页
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getList(this.startTime,this.endTime);
        },
        // 获取列表数据
        getList(startTime,endTime){
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/recipes/recipesList",
                method: "post",
                data: {
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize,
                    start_time: startTime,
                    end_time: endTime
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                    });
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看
        showInfo(i) {
            this.$router.push({
                path: "RecommendedRecipesInfo",
                query: {
                    id: i
                }
            });
        },
        // 编辑
        addPpdata(i) {
            if ((i && i != undefined) || i == 0) {
                this.$router.push({
                    path: "NewDishes",
                    query: {
                        id: i
                    }
                });
            } else {
                this.$router.push({
                    path: "NewDishes"
                });
            }
        },
        // 删除
        delTabs(i) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/recipes/delEduRecipes",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                   that.$message.success(res.data.msg);
                   that.getList();
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#RecommendedRecipes {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.RecommendedRecipes_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin-bottom: 20px;
    cursor: pointer;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
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
</style>