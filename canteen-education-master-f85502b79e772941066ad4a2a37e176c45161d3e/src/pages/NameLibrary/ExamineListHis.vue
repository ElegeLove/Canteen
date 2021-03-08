<template>
    <div id="ExamineList">
        <a-page-header title="关联学校列表" @back="() => $router.go(-1)" />
        <div class="ExamineList_main">
            <div class="ExamineList_main_top">当前单位：{{ name }}</div>
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                bordered
                :loading="loadShow"
                :pagination="false"
            >
                <template slot="sec_status" slot-scope="text">
                    <div
                        style="display:flex;justify-content:center;align-items: center;"
                    >
                        <div>
                            {{
                                text == 0
                                    ? "未审核"
                                    : text == 1
                                    ? "已通过"
                                    : "未通过"
                            }}
                        </div>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div
                        class="operate"
                        style="display:flex;justify-content:center;align-items: center;"
                        @click="showInfo(record)"
                    >
                        <div v-if="record.sec_status == '0'">审核</div>
                        <div v-else>查看</div>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "20%",
        align: "center"
    },
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: "20%",
        align: "center"
    },
    {
        title: "申请关联时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "20%",
        align: "center"
    },
    {
        title: "审核状态",
        dataIndex: "sec_status",
        key: "sec_status",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "sec_status" }
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
            loadShow: false,
            name: "",
        };
    },
    created() {
        let id = this.$route.query.id;
        let weekId = this.$route.query.weekId;
        this.getList(id,weekId);
    },
    methods: {
        getList(id,weekId) {
            this.loadShow = true;
            // this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/supplier/getHistoryCheckList",
                method: "post",
                data: {
                    supplier_id: id,
                    disassociate_id:weekId
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    // console.log(res)
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                    });
                    that.name = res.data.data.supplier_name;
                    that.data = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看
        showInfo(val) {
            let num = 0;
            if (val.sec_status == "0") {
                num = 1;
            } else {
                num = 2;
            }
            this.$router.push({
                path: "HistoricalInfoInfo",
                query: {
                    id: val.id,
                    type: num
                }
            });
        }
    }
};
</script>

<style scoped>
#ExamineList {
    width: 100%;
    background: #ffffff;
}
.ExamineList_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.ExamineList_main_top {
    margin-bottom: 20px;
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