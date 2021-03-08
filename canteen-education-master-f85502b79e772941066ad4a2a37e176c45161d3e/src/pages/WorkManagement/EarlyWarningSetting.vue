<template>
    <div id="EarlyWarningSetting">
        <a-radio-group name="radioGroup" v-model="radioNum" @change="groupSel">
            <a-radio :value="0">
                民办学校
            </a-radio>
            <a-radio :value="1">
                其他学校
            </a-radio>
        </a-radio-group>
        <div class="main">
            <a-row>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[0].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[0].status = 1;
                                } else {
                                    dataVal[0].status = 0;
                                }
                            }
                        "
                    >
                        食谱制作
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <a-select
                                placeholder="请选择"
                                style="width:240px;height:34px;"
                                v-model="dataVal[0].value"
                            >
                                <a-select-option
                                    v-for="item in recipesTime"
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[1].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[1].status = 1;
                                } else {
                                    dataVal[1].status = 0;
                                }
                            }
                        "
                    >
                        食材保质期
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <div class="right_int">
                                <span>食材到期日期前</span>
                                <input
                                    class="inps"
                                    type="text"
                                    placeholder="请输入"
                                    v-model="dataVal[1].value"
                                />
                                <span>天</span>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[2].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[2].status = 1;
                                } else {
                                    dataVal[2].status = 0;
                                }
                            }
                        "
                    >
                        入库处理
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <div class="right_int">
                                <span>供应商交接单后</span>
                                <input
                                    class="inps"
                                    type="text"
                                    placeholder="请输入"
                                    
                                    v-model="dataVal[2].value"
                                />
                                <span>天</span>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[3].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[3].status = 1;
                                } else {
                                    dataVal[3].status = 0;
                                }
                            }
                        "
                    >
                        出库处理（蔬菜和肉类）
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <div class="right_int">
                                <span>食材入库后</span>
                                <input
                                    class="inps"
                                    type="text"
                                    placeholder="请输入"
                                    v-model="dataVal[3].value"
                                />
                                <span>天</span>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[4].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[4].status = 1;
                                } else {
                                    dataVal[4].status = 0;
                                }
                            }
                        "
                    >
                        信息公开上传
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <a-select
                                placeholder="请选择"
                                style="width:240px;height:34px;"
                                v-model="dataVal[4].value"
                            >
                                <a-select-option
                                    v-for="item in infoTime"
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[5].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[5].status = 1;
                                } else {
                                    dataVal[5].status = 0;
                                }
                            }
                        "
                    >
                        工作记录
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <a-select
                                placeholder="请选择"
                                style="width:240px;height:34px;"
                                v-model="dataVal[5].value"
                            >
                                <a-select-option
                                    v-for="item in workTime"
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[6].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[6].status = 1;
                                } else {
                                    dataVal[6].status = 0;
                                }
                            }
                        "
                    >
                        学校证件（食品经营许可）
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <div class="right_int">
                                <span>过期前</span>
                                <input
                                    class="inps"
                                    type="text"
                                    placeholder="请输入"
                                    v-model="dataVal[6].value"
                                />
                                <span>天</span>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[7].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[7].status = 1;
                                } else {
                                    dataVal[7].status = 0;
                                }
                            }
                        "
                    >
                        健康证
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <div class="right_int">
                                <span>学校证件</span>
                                <input
                                    class="inps"
                                    type="text"
                                    placeholder="请输入"
                                    v-model="dataVal[7].value"
                                />
                                <span>天</span>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-checkbox
                        :checked="dataVal[8].status == 1 ? true : false"
                        @change="
                            e => {
                                if (e.target.checked) {
                                    dataVal[8].status = 1;
                                } else {
                                    dataVal[8].status = 0;
                                }
                            }
                        "
                    >
                        超支比例预警（1个月）
                    </a-checkbox>
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>预警时间</div>
                            <div class="right_int">
                                <span>上下浮动</span>
                                <input
                                    class="inps"
                                    type="text"
                                    placeholder="请输入"
                                    v-model="dataVal[8].value"
                                />
                                <span>%</span>
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="footer_btn" @click="conserveData">{{ dataBtn }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            qwqq: "",
            radioNum: 0,
            dataVal: [
                {
                    type: "1",
                    value: "",
                    status: "0"
                },
                {
                    type: "2",
                    value: "",
                    status: "0"
                },
                {
                    type: "3",
                    value: "",
                    status: "0"
                },
                {
                    type: "4",
                    value: "",
                    status: "0"
                },
                {
                    type: "5",
                    value: "",
                    status: "0"
                },
                {
                    type: "6",
                    value: "",
                    status: "0"
                },
                {
                    type: "7",
                    value: "",
                    status: "0"
                },
                {
                    type: "8",
                    value: "",
                    status: "0"
                },
                {
                    type: "9",
                    value: "",
                    status: "0"
                }
            ],
            // 食谱制作
            recipesTime: [
                { name: "上周周五（01:00前）",id:'1' },
                { name: "上周周五（02:00前）",id:'2' },
                { name: "上周周五（03:00前）",id:'3' },
                { name: "上周周五（04:00前）",id:'4' },
                { name: "上周周五（05:00前）",id:'5' },
                { name: "上周周五（06:00前）",id:'6' },
                { name: "上周周五（07:00前）",id:'7' },
                { name: "上周周五（08:00前）",id:'8' },
                { name: "上周周五（09:00前）",id:'9' },
                { name: "上周周五（10:00前）",id:'10' },
                { name: "上周周五（11:00前）",id:'11' },
                { name: "上周周五（12:00前）",id:'12' },
                { name: "上周周五（13:00前）",id:'13' },
                { name: "上周周五（14:00前）",id:'14' },
                { name: "上周周五（15:00前）",id:'15' },
                { name: "上周周五（16:00前）",id:'16' },
                { name: "上周周五（17:00前）",id:'17' },
                { name: "上周周五（18:00前）",id:'18' },
                { name: "上周周五（19:00前）",id:'19' },
                { name: "上周周五（20:00前）",id:'20' },
                { name: "上周周五（21:00前）",id:'21' },
                { name: "上周周五（22:00前）",id:'22' },
                { name: "上周周五（23:00前）",id:'23' }
            ],
            // 信息公开上传
            infoTime: [
                { name: "每周一",id:'1' },
                { name: "每周二",id:'2' },
                { name: "每周三",id:'3' },
                { name: "每周四",id:'4' },
                { name: "每周五",id:'5' },
                { name: "每周六",id:'6' },
                { name: "每周日",id:'7' }
            ],
            // 工作记录
            workTime: [
                { name: "1",id:'1' },
                { name: "2",id:'2' },
                { name: "3",id:'3' },
                { name: "4",id:'4' },
                { name: "5",id:'5' },
                { name: "6",id:'6' },
                { name: "7",id:'7' },
                { name: "8",id:'8' },
                { name: "9",id:'9' },
                { name: "10",id:'10' },
                { name: "11",id:'11' },
                { name: "12",id:'12' },
                { name: "13",id:'13' },
                { name: "14",id:'14' },
                { name: "15",id:'15' },
                { name: "16",id:'16' },
                { name: "17",id:'17' },
                { name: "18",id:'18' },
                { name: "19",id:'19' },
                { name: "20",id:'20' },
                { name: "21",id:'21' },
                { name: "22",id:'22' },
                { name: "23",id:'23' },
                { name: "24",id:'24' },
                { name: "25",id:'25' },
                { name: "26",id:'26' },
                { name: "27",id:'27' },
                { name: "28",id:'28' },
                { name: "29",id:'29' },
                { name: "30",id:'30' },
            ],
            dataBtn: ""
        };
    },
    created() {
        this.getDataList(this.radioNum);
    },
    methods: {
        // 获取列表数据
        getDataList(type) {
            let that = this;
            that.$store.commit("setLoading", true);
            let data = {
                url: "/warning/warningList",
                method: "post",
                data: {
                    school_type: type //0:民办学校；1：其他学校
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    if (res.data.data.length > 0) {
                        that.dataVal = res.data.data;
                        that.dataBtn = "修改";
                    } else {
                        that.dataVal = [
                            {
                                type: "1",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "2",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "3",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "4",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "5",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "6",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "7",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "8",
                                value: "",
                                status: "0"
                            },
                            {
                                type: "9",
                                value: "",
                                status: "0"
                            }
                        ];
                        that.dataBtn = "保存";
                    }
                    // res.data.data.forEach(item => {
                    //     item.key = item.school_id;
                    // });
                    // // that.pagination.total = res.data.data.count;
                    // that.modelData = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        groupSel(e) {
            // console.log(this.radioNum);
            this.getDataList(this.radioNum);
        },
        conserveData() {
            let that = this;
            that.$store.commit("setLoading", true);
            let data = {
                url: "/warning/editWarning",
                method: "post",
                data: {
                    school_type: this.radioNum, //0:民办学校；1：其他学校
                    content: JSON.stringify(this.dataVal)
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#EarlyWarningSetting {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.main {
    width: 100%;
    margin-top: 30px;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.RecipeQuery_box_item > div:first-child {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(154, 154, 154, 1);
    margin-right: 15px;
}
.right_int {
    display: flex;
    align-items: center;
}
.inps {
    width: 149px;
    height: 40px;
    border: 1px solid rgba(211, 211, 211, 1);
    border-radius: 5px;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 18px;
}
.footer_btn {
    width: 140px;
    height: 40px;
    background: #02bb72;
    border: 1px solid #02bb72;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 100px;
    cursor: pointer;
}
</style>
<style>
.ant-col-12 {
    margin: 20px 0;
}
</style>