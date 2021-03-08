<template>
    <div id="PermitShowVillageSchool">
        <a-page-header title="查看村校" @back="() => $router.go(-1)" />
        <div class="PermitShowVillageSchool_main">
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                :loading="loadShows"
                bordered
                :pagination="false"
            >
                <template
                    style="display: flex;justify-content: space-around;"
                    v-for="col in ['license_certificate', 'water_certificate']"
                    :slot="col"
                    slot-scope="text"
                >
                    <div :key="col">
                        <viewer>
                            <!-- <img class="tabImg" :src="text" v-lazy="text" /> -->
                            <img
                                style="width:110px;heigth:40px"
                                :src="text"
                                v-lazy="text"
                            />
                        </viewer>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "10%",
        align: "center"
    },
    {
        title: "食品经营许可证信息",
        children: [
            {
                title: "法定代表人",
                dataIndex: "legal_person",
                key: "legal_person",
                width: "10%",
                align: "center"
            },
            {
                title: "号码（扫描上传）",
                dataIndex: "license_certificate",
                key: "license_certificate",
                width: "15%",
                align: "center",
                scopedSlots: { customRender: "license_certificate" }
            },
            {
                title: "许可项目",
                dataIndex: "license_projects",
                key: "license_projects",
                width: "10%",
                align: "center"
            },
            {
                title: "到期日期",
                dataIndex: "end_time",
                key: "end_time",
                width: "10%",
                align: "center"
            }
        ]
    },
    {
        title: "生活饮用水",
        children: [
            {
                title: "供水方式",
                dataIndex: "water_supply_mode",
                key: "water_supply_mode",
                width: "10%",
                align: "center"
            },
            {
                title: "水质（扫描合格证）",
                dataIndex: "water_certificate",
                key: "water_certificate",
                width: "15%",
                align: "center",
                scopedSlots: { customRender: "water_certificate" }
            }
        ]
    }
];
const data = [];
export default {
    data() {
        return {
            data,
            columns: [],
            columnsVal,
            loadShows: false,
            schoolName: "",
            sclType: [
                { name: "建制幼儿园" },
                { name: "民办幼儿园" },
                { name: "小学" },
                { name: "民办小学" },
                { name: "完全小学" },
                { name: "初中" },
                { name: "民办初中" },
                { name: "特殊教育" },
                { name: "九年一般制" },
                { name: "高中" },
                { name: "民办高中" },
                { name: "职高" },
                { name: "民办职高" }
            ],
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
        this.getDataInfo(id);
    },
    methods: {
        getDataInfo(id) {
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/permitVillage",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false;
                if (res.data.code == 1) {
                    that.data = res.data.data.list;
                    if (res.data.data.list.length > 0) {
                        that.columns = that.columnsVal;
                        // that.scrollVal = { x: 1400 };
                    } else {
                        that.columns = [];
                        // that.scrollVal = {};
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#PermitShowVillageSchool {
    width: 100%;
    background: #ffffff;
}
.PermitShowVillageSchool_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
</style>