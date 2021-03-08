<template>
    <div id="WorkersList">
        <a-page-header title="员工列表" @back="() => $router.go(-1)" />
        <div class="WorkersList_main">
            <!-- 搜索框 -->
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;员工：</div>
                <a-input
                    type="text"
                    style="width:240px;height:34px;"
                    v-model="staffName"
                    placeholder="姓名"
                />
                <div class="mx_btnbg" @click="handleSubmit">搜索</div>
            </div>
            <div class="RecipeQuery_box">
                <div class="RecipeQuery_box_item">
                    <div>&emsp;&emsp;职位：</div>
                    <a-select
                        placeholder="请选择"
                        style="width:240px;height:34px;"
                        default-value="全部"
                        @change="positionChange"
                    >
                        <a-select-option v-for="item in positionList" :key="item.name">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="RecipeQuery_box_item">
                    <div>&emsp;&emsp;性别：</div>
                    <a-select
                        placeholder="请选择"
                        style="width:240px;height:34px;"
                        default-value="全部"
                        @change="sexChange"
                    >
                        <a-select-option v-for="item in sexList" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="RecipeQuery_box_item" v-if="isShow == 'true'">
                    <div>&emsp;&emsp;就职学校：</div>
                    <a-select
                        placeholder="请选择"
                        style="width:240px;height:34px;"
                        default-value="全部"
                        @change="schoolTypeChange"
                    >
                        <a-select-option v-for="item in sclType" :key="item.id">
                            {{ item.full_name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="WorkersList_export" @click="exportRoster">导出花名册</div>
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
                <template slot="sex" slot-scope="text">
                    <div
                        style="display:flex;justify-content:center;align-items: center;"
                    >
                        <div>{{text}}</div>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div
                        class="operate"
                        style="display:flex;justify-content:center;align-items: center;"
                    >
                        <div @click="budgetTable(record.id)">查看</div>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "序号",
        dataIndex: "sort",
        key: "sort",
        width: "5%",
        align: "center",
    },
    {
        title: "就职学校",
        dataIndex: "full_name",
        key: "full_name",
        width: "15%",
        align: "center"
    },
    {
        title: "合同类型",
        dataIndex: "type",
        key: "type",
        width: "10%",
        align: "center"
    },
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "10%",
        align: "center"
    },
    {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        width: "5%",
        align: "center",
        scopedSlots: { customRender: "sex" }
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: "15%",
        align: "center"
    },
    {
        title: "职位",
        dataIndex: "position",
        key: "position",
        width: "15%",
        align: "center"
    },
    {
        title: "联系电话",
        dataIndex: "mobile",
        key: "mobile",
        width: "15%",
        align: "center"
    },

    {
        title: "操作按钮",
        key: "operation",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
];
export default {
    data() {
        return {
            schoolId:'',
            staffType:'',
            data,
            columns,
            staffName: "",
            sclType: [],
            sclVal:'',
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
            sexList:[
                {name:'全部',id:'全部',},
                {name:'男',id:'1',},
                {name:'女',id:'2',},
            ],
            sexVal:'',
            positionList:[],
            positionVal:'',
            isShow:'true'
        };
    },
    created() {
        let id = this.$route.query.id;
        let type = this.$route.query.type;
        let show = this.$route.query.show;
        this.sclVal = id;
        this.staffType = type;
        this.isShow = show;
        this.getPosition();
        this.getSchoolType(id);
        this.getDataList(this.positionVal,this.sexVal,this.staffName,this.sclVal)
    },
    methods: {
        // 性别选择
        sexChange(e){
            if(e == '全部'){
                this.sexVal = '';
            }else{
                this.sexVal = e;
            }
            this.getDataList(this.positionVal,this.sexVal,this.staffName,this.sclVal)
        },
        // 职位选择
        positionChange(e){
            if(e == '全部'){
                this.positionVal = '';
            }else{
                this.positionVal = e;
            }
            this.getDataList(this.positionVal,this.sexVal,this.staffName,this.sclVal)
        },
        // 获取职位列表
        getPosition(){
            let that = this;
            let data = {
                url: "/common/schoolSet",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{ name: "全部",id:'全部' }];
                    that.positionList = arr.concat(res.data.data.position);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 就职学校选择
        schoolTypeChange(e){
            if(e == '全部'){
                this.sclVal = '';
            }else{
                this.sclVal = e;
            }
            this.getDataList(this.positionVal,this.sexVal,this.staffName,this.sclVal)
        },
        // 获取就职学校列表
        getSchoolType(id){
            let that = this;
            let data = {
                url: "/common/getSchool",
                method: "post",
                data: {
                    school_id:id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{ full_name: "全部",id:'全部' }];
                    that.sclType = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 学校简称搜索
        handleSubmit() {
            this.getDataList(this.positionVal,this.sexVal,this.staffName,this.sclVal)
        },
         // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getDataList(this.positionVal,this.sexVal,this.staffName,this.sclVal)
        },
        // 获取员列表
        getDataList(position,sex,name,schoolId){
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school/formalWorker",
                method: "post",
                data: {
                    position: position,
                    type: this.staffType,
                    sex: sex,
                    school_id: schoolId,
                    name: name,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                    });
                    that.pagination.total = res.data.data.total_count;
                    that.data = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 正式职工、临时用工详情页
        budgetTable(id){
            this.$router.push({
                path: "StaffInfo",
                query: {
                    id: id
                }
            });
        },
        // 导出花名册
        exportRoster(){
            let that = this;
            if(this.data.length > 0){
                location.href = this.$globalApi + '/api/school/export?position='+this.positionVal+'&type='+this.staffType+'&sex='+this.sexVal+'&school_id='+this.sclVal+'&name='+this.staffName
            }else{
                this.$message.error('暂无数据导出');
            }
            // that.loadShow = true;
            // let data = {
            //     url: "/school/export",
            //     method: "post",
            //     data: {
            //         position: this.positionVal,
            //         type: this.staffType,
            //         sex: this.sexVal,
            //         school_id: this.sclVal,
            //         name: this.staffName,
            //     }
            // };
            // this.$apiAxiox(data).then(res => {
            //     // that.$store.commit("setLoading", false);
            //     // that.loadShow = false;
            //     if (res.data.code == 1) {
            //         // res.data.data.data.forEach(item => {
            //         //     item.key = item.id;
            //         // });
            //         // that.pagination.total = res.data.data.total;
            //         // that.data = res.data.data.data;
            //     } else {
            //         that.$message.error(res.data.msg);
            //     }
            // });
        }

    }
};
</script>

<style scoped>
#WorkersList {
    width: 100%;
    background: #ffffff;
}
.WorkersList_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.RecipeQuery_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
    margin-left: 22px;
    cursor: pointer;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.WorkersList_export {
    width: 104px;
    height: 34px;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(240, 242, 245);
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