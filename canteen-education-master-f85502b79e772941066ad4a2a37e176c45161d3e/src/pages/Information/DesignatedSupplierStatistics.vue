<template>
    <div id="DesignatedSupplierStatistics">
        <!-- 搜索框 -->
        <a-form layout="inline" class="mx_form mx_staff topBox">
            <a-form-item label="学校：">
                <span>
                    <a-input
                        type="text"
                        v-model="schoolName"
                        placeholder="学校简称/代码"
                    />
                </span>
            </a-form-item>
            <a-form-item>
                <a-button
                    class="mx_btnbg"
                    @click="handleSubmit"
                    type="primary"
                    html-type="submit"
                    >搜索</a-button
                >
            </a-form-item>
        </a-form>
        <!-- <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>年份：</div>
                <a-select
                    placeholder="请选择"
                    style="width:240px;height:34px;"
                    @change="handleChange"
                >
                    <a-select-option v-for="(item, i) in sclType" :key="i">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>学期：</div>
                <a-select
                    placeholder="请选择"
                    style="width:240px;height:34px;"
                    @change="handleChange"
                >
                    <a-select-option v-for="(item, i) in sclType" :key="i">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
        </div> -->
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="pagination"
            :scroll="scroll"
            :loading="loadShow"
            @change="handleTableChanges"
        >
            <template
                style="display: flex;justify-content: space-around;"
                v-for="col in imgPath"
                :slot="col"
                slot-scope="text"
            >
                <!-- <div>{{text}}</div> -->
                <div :key="col">
                    <viewer :images="text">
                        <img
                            v-for="(item, imgIndex) in text"
                            :key="imgIndex"
                            class="tabImg"
                            :src="item"
                            v-lazy="item"
                        />
                    </viewer>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
const columns = [];
const data = [];
export default {
    data() {
        return {
            columns,
            data,
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
                total: 0,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true, // 显示可改变每页数量
                showQuickJumper: true, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            },
            scroll: {},
            imgPath: [],
            loadShow:false
        };
    },
    created() {
        this.getDataInfo(this.schoolName);
    },
    methods: {
        // 学校简称搜索
        handleSubmit() {
            this.getDataInfo(this.schoolName);
        },
        // 学校类型
        handleChange(value) {
            console.log(`Selected: ${value}`);
        },
        // 列表分页s
        handleTableChanges(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            // this.getAllStudents()
            this.getDataInfo(this.schoolName);
        },
        // 获取列表信息
        getDataInfo(schoolName) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/supplier/typeSupplier",
                method: "post",
                data: {
                    search_name: schoolName,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    let arr = [];
                    if (res.data.data.list.length > 0) {
                        if (parseInt(res.data.data.type_count) < 3) {
                            that.scroll = {};
                            arr = [
                                {
                                    title: "学校代码",
                                    dataIndex: "code",
                                    key: "code",
                                    width: 100,
                                    align: "center"
                                },
                                {
                                    title: "学校简称",
                                    dataIndex: "abbreviation",
                                    key: "abbreviation",
                                    width: 120,
                                    align: "center"
                                }
                            ];
                        } else {
                            that.scroll = { x: 1400 };
                            arr = [
                                {
                                    title: "学校代码",
                                    dataIndex: "code",
                                    key: "code",
                                    width: 100,
                                    fixed: "left",
                                    align: "center"
                                },
                                {
                                    title: "学校简称",
                                    dataIndex: "abbreviation",
                                    key: "abbreviation",
                                    width: 120,
                                    fixed: "left",
                                    align: "center"
                                }
                            ];
                        }
                        // for (
                        //     let i = 0;
                        //     i < parseInt(res.data.data.count);
                        //     i++
                        // ) {
                        //     let arr1 = [
                        //         {
                        //             title: "原材料",
                        //             dataIndex: "schoolName" + (i + 1),
                        //             key: "schoolName" + (i + 1),
                        //             width: 150,
                        //             align: "center"
                        //         },
                        //         {
                        //             title: "单价（元）",
                        //             dataIndex: "price" + (i + 1),
                        //             key: "price" + (i + 1),
                        //             width: 120,
                        //             align: "center"
                        //         }
                        //     ];
                        //     arr = arr.concat(arr1);
                        // }
                        let arr3 = [];
                        res.data.data.list[0].list.forEach((items, i) => {
                            let arr1 = {
                                title: items.name,
                                children: [
                                    {
                                        title: "简称",
                                        dataIndex: "abbreviation" + (i + "s"),
                                        key: "abbreviation" + (i + "s"),
                                        width: 200,
                                        align: "center"
                                    },
                                    {
                                        title: "履约保证金金额（元）",
                                        dataIndex: "bond" + (i + "s"),
                                        key: "bond" + (i + "s"),
                                        width: 180,
                                        align: "center"
                                    },
                                    {
                                        title: "合同扫描件",
                                        dataIndex: "contract" + (i + "s"),
                                        key: "contract" + (i + "s"),
                                        width: 340,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "contract" + (i + "s")
                                        }
                                    }
                                ]
                            };
                            let it = "contract" + (i + "s");
                            arr3.push(it);
                            arr = arr.concat(arr1);
                        });
                        that.imgPath = arr3;
                        that.columns = arr;
                        res.data.data.list.forEach(item => {
                            item.key = item.id;
                            item.list.forEach((itemChild, i) => {
                                item["abbreviation" + (i + "s")] =
                                    itemChild.abbreviation;
                                item["bond" + (i + "s")] = itemChild.bond;
                                item["contract" + (i + "s")] =
                                    itemChild.contract;
                            });
                        });
                        that.data = res.data.data.list;
                        that.pagination.total = res.data.data.total_count;
                    } else {
                        that.columns = [];
                        that.scroll = {};
                        that.data = [];
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
#DesignatedSupplierStatistics {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.topBox {
    margin-bottom: 30px;
}
.RecipeQuery_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.tabImg {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin: 0 10px 10px 0;
}
</style>