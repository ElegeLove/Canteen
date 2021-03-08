<template>
    <div id="WaterShowVillageSchool">
        <a-page-header title="查看村校" @back="() => $router.go(-1)" />
        <div class="WaterShowVillageSchool_main">
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                :loading="loadShows"
                bordered
                :pagination="false"
                :scroll="scrollVal"
            >
                <!-- @change="handleTableChange" -->
                <template
                    style="display: flex;justify-content: space-around;"
                    v-for="col in [
                        'bucket_water_image',
                        'hot_cold_water_image'
                    ]"
                    :slot="col"
                    slot-scope="text"
                >
                    <div :key="col">
                        <viewer>
                            <img class="tabImg" :src="text" v-lazy="text" />
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
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "学生人数",
        dataIndex: "student_count",
        key: "student_count",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "供水点总数",
        dataIndex: "total_point",
        key: "total_point",
        width: 180,
        align: "center"
    },
    {
        title: "容器式供水点数（开水倒入）",
        dataIndex: "container_water_point",
        key: "container_water_point",
        width: 180,
        align: "center"
    },
    {
        title: "桶装水",
        children: [
            {
                title: "点数",
                dataIndex: "bucket_water_point",
                key: "bucket_water_point",
                width: 150,
                align: "center"
            },
            {
                title: "水质报告",
                dataIndex: "bucket_water_image",
                key: "bucket_water_image",
                width: 180,
                align: "center",
                scopedSlots: { customRender: "bucket_water_image" }
            }
        ]
    },
    {
        title: "电热直供式（开水）",
        children: [
            {
                title: "点数",
                dataIndex: "hot_water_point",
                key: "hot_water_point",
                width: 150,
                align: "center"
            },
            {
                title: "设备质量",
                dataIndex: "hot_water_quality",
                key: "hot_water_quality",
                width: 150,
                align: "center"
            }
        ]
    },
    {
        title: "电热直供（冷热开）",
        children: [
            {
                title: "点数",
                dataIndex: "hot_cold_water_point",
                key: "hot_cold_water_point",
                width: 150,
                align: "center"
            },
            {
                title: "设备质量",
                dataIndex: "hot_cold_water_quality",
                key: "hot_cold_water_quality",
                width: 150,
                align: "center"
            },
            {
                title: "水质报告",
                dataIndex: "hot_cold_water_image",
                key: "hot_cold_water_image",
                width: 180,
                align: "center",
                scopedSlots: { customRender: "hot_cold_water_image" }
            }
        ]
    }
];
const data = [];
export default {
    data() {
        return {
            loadShows: false,
            data,
            columns: [],
            scrollVal: {},
            columnsVal,
            schoolName: "",
            // pagination: {
            //     pageSize: 10, // 默认每页显示数量
            //     current: 1, //显示当前页数
            //     total: 50,
            //     pageSizeOptions: ["10", "20", "30", "40", "50"],
            //     showSizeChanger: true, // 显示可改变每页数量
            //     showQuickJumper: true, //显示跳转到输入的那一页
            //     showTotal: total =>
            //         `共 ${total} 条记录 第 ${
            //             this.pagination.current
            //         } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            // },
            schoolId: ""
        };
    },
    created() {
        let id = this.$route.query.id;
        this.schoolId = id;
        this.getDataInfo(id);
    },
    methods: {
        // 列表分页
        // handleTableChange(pagination, filters, sorter) {
        //     this.pagination.pageSize = pagination.pageSize;
        //     this.pagination.current = pagination.current;
        //     this.getDataInfo(this.schoolId);
        // },
        getDataInfo(id) {
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/waterVillage",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false;
                if (res.data.code == 1) {
                    that.data = res.data.data;
                    if (res.data.data.length > 0) {
                        that.columns = that.columnsVal;
                        that.scrollVal = { x: 1400 };
                    } else {
                        that.columns = [];
                        that.scrollVal = {};
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
#WaterShowVillageSchool {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
#WaterShowVillageSchool {
    width: 100%;
    background: #ffffff;
}
.WaterShowVillageSchool_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.tabImg {
    width: 110px;
    height: 60px;
    object-fit: cover;
}
</style>