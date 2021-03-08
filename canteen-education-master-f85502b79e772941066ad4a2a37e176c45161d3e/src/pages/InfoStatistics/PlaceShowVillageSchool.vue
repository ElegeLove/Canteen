<template>
    <div id="PlaceShowVillageSchool">
        <a-page-header title="查看村校" @back="() => $router.go(-1)" />
        <div class="PlaceShowVillageSchool_main">
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                :loading="loadShows"
                bordered
                :pagination="false"
                :scroll="scrollVal"
            >
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
        width: 120,
        fixed: "left",
        align: "center"
    },
    {
        title: "最多就餐学生数",
        dataIndex: "max_student",
        key: "max_student",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "最多就餐职工数",
        children: [
            {
                title: "总数",
                dataIndex: "max_total",
                key: "max_total",
                width: 120,
                align: "center"
            },
            {
                title: "正式职工",
                dataIndex: "max_worker_formal",
                key: "max_worker_formal",
                width: 120,
                align: "center"
            },
            {
                title: "临时用工",
                dataIndex: "max_worker_temporary",
                key: "max_worker_temporary",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "加工间面积",
        dataIndex: "processing_room_area",
        key: "processing_room_area",
        width: 120,
        align: "center"
    },
    {
        title: "库房",
        children: [
            {
                title: "间数",
                dataIndex: "storage_room_count",
                key: "storage_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "总面积",
                dataIndex: "storage_room_area",
                key: "storage_room_area",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "学生餐厅",
        children: [
            {
                title: "面积",
                dataIndex: "student_room_count",
                key: "student_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "座位数",
                dataIndex: "student_room_set",
                key: "student_room_set",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "其它用房",
        children: [
            {
                title: "间数",
                dataIndex: "other_room_count",
                key: "other_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "总面积",
                dataIndex: "other_room_area",
                key: "other_room_area",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "教师餐厅",
        children: [
            {
                title: "面积",
                dataIndex: "teacher_room_count",
                key: "teacher_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "座位数",
                dataIndex: "teacher_room_set",
                key: "teacher_room_set",
                width: 120,
                align: "center"
            }
        ]
    }
];
const data = [
];
export default {
    data() {
        return {
            data,
            columns:[],
            columnsVal,
            scrollVal:{},
            schoolName: "",
            loadShows:false,
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
        };
    },
    created () {
      let id = this.$route.query.id;
      this.getDataInfo(id);
    },
    methods: {
        getDataInfo(id){
             this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/placeVillage",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false
                if (res.data.code == 1) {
                    that.data = res.data.data;
                    if(res.data.data.length > 0){
                        that.columns=that.columnsVal;
                        that.scrollVal = { x: 1400 };
                    }else{
                        that.columns= [];
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
#PlaceShowVillageSchool {
    width: 100%;
    background: #ffffff;
}
.PlaceShowVillageSchool_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
</style>
