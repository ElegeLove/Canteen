<template>
    <div class="pd28">
        <div class="chackIndexStyle">
            <div
                :class="activeIndex == 0 ? 'aciveClass' : ''"
                @click="cheackIndex(0)"
            >
                消息中心
            </div>
            <div
                :class="activeIndex == 1 ? 'aciveClass' : ''"
                @click="cheackIndex(1)"
            >
                通知中心
            </div>
        </div>
        <div v-if="activeIndex == 0">
            <!-- <div class="mb30 orderListHead">
				<div  class="mr7" >
					<label>通知：</label>
					<a-input placeholder="标题名称" v-model="seachData.keyword" class="wlist260" />
				</div>
				<a-button type="primary" class="btnH40" @click="getSeach">搜索</a-button>
			</div> -->
            <div class="pageTableHead">
                <div class="pageTableHeadLeft">
                    <div class="">
                        <label>状态：</label>
                        <a-select
                            show-search
                            placeholder="未读"
                            v-model="seachData.status"
                            default-value="1"
                            @change="changMeassageStatus"
                            class="wlist260"
                        >
                            <a-select-option value="">
                                全部
                            </a-select-option>
                            <a-select-option value="1">
                                未读
                            </a-select-option>
                            <a-select-option value="2">
                                已读
                            </a-select-option>
                        </a-select>
                    </div>
                    <!-- <div class="">
                        <label>类型：</label>
                        <a-select
                            show-search
                            placeholder="全部"
                            v-model="seachData.type"
                            option-filter-prop="children"
                            class="wlist260"
                        >
                            <a-select-option value="">
                                全部
                            </a-select-option>
                        </a-select>
                    </div> -->
                </div>
                <div>
                    <a-button
                        type="primary"
                        class="btnH40 mr15"
                        @click="MarRead"
                        >标注已读</a-button
                    >
                    <a-button
                        type="primary"
                        class="btnH40 mr15"
                        @click="batchDeletion"
                        >批量删除</a-button
                    >
                </div>
            </div>
            <div>
                <a-table
                    bordered
                    :data-source="dataSource"
                    :columns="columns"
                    :loading="loadings"
                    :rowKey="
                        (record, index) => {
                            return index;
                        }
                    "
                    @change="pageCheck"
                    :row-selection="{
                        selectedRowKeys: selectIdsMassage,
                        onChange: onSelectChange
                    }"
                    :pagination="pagination"
                >
                    <template slot="read_id" slot-scope="text, record">
                        <div class="recordTitle">
                            {{ record.title }}
                            <div
                                class="isShowLine"
                                v-if="record.status == 1"
                            ></div>
                        </div>
                    </template>
                    <template slot="id" slot-scope="text, record">
                        <a
                            href="javascript:;"
                            class="operatingA"
                            @click="seeDetails(record, 'message')"
                            >查看</a
                        >
                        <a
                            href="javascript:;"
                            class="operatingA"
                            @click="removeItemMassAge(record.id)"
                            >删除</a
                        >
                    </template>
                </a-table>
            </div>
        </div>
        <div v-else>
            <div class="mb30 orderListHead">
                <div class="mr7">
                    <label>通知：</label>
                    <a-input
                        placeholder="标题名称"
                        v-model="seachGetNotificationData.keyword"
                        class="wlist260"
                    />
                </div>
                <a-button
                    type="primary"
                    class="btnH40"
                    @click="notiSearch"
                    >搜索</a-button
                >
            </div>
            <div class="pageTableHead">
                <div class="pageTableHeadLeft">
                    <div class="mr30 flex">
                        <label class="pt10">日期：</label>
                        <a-date-picker
                            format="YYYY-MM-DD"
                            class="height40"
                            placeholder="选择日期"
                            valueFormat="YYYY-MM-DD"
                            @change="changeNoticeInfo0"
                            v-model="seachData.start_time"
                        />
                        <p class="liness pt10">—</p>
                        <a-date-picker
                            format="YYYY-MM-DD"
                            valueFormat="YYYY-MM-DD"
                            v-model="seachData.end_time"
                            @change="changeNoticeInfo"
                            placeholder="选择日期"
                            @
                        />
                    </div>
                </div>
                <div>
                    <a-button
                        type="primary"
                        class="btnH40 mr15"
                        @click="notificationBatchDeletion"
                        >批量删除</a-button
                    >
                </div>
            </div>
            <div>
                <a-table
                    bordered
                    :loading="loadings"
                    @change="pageCheck"
                    :rowKey="
                        (record, index) => {
                            return index;
                        }
                    "
                    :data-source="notificationCenterDataSource"
                    :columns="notificationCenter"
                    :row-selection="{
                        selectedRowKeys: selectIdsMassage,
                        onChange: onSelectChange
                    }"
                    :pagination="pagination"
                >
                    <template slot="id" slot-scope="text, record">
                        <a
                            href="javascript:;"
                            class="operatingA"
                            @click="seeDetails(record, 'notification')"
                            >查看</a
                        >
                        <a
                            href="javascript:;"
                            class="operatingA"
                            @click="removeNotification(record.id)"
                            >删除</a
                        >
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: 0,
            batchArr: [],
            pagination: {
                //消息分页
                total: 0,
                current: 1,
                pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示10条数据
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
                showTotal: total => `共有 ${total} 条数据` //分页中显示总的数据
            },
            dataSource: [],
            notificationCenterDataSource: [],
            columns: [
                {
                    title: "标题",
                    scopedSlots: { customRender: "read_id" }
                },
                {
                    title: "类型",
                    dataIndex: "message_type"
                },
                {
                    title: "时间",
                    dataIndex: "create_time"
                },
                {
                    title: "操作",
                    scopedSlots: { customRender: "id" }
                }
            ],
            notificationCenter: [
                {
                    title: "标题",
                    dataIndex: "title"
                },
                {
                    title: "发送对象",
                    dataIndex: "send_type"
                },
                {
                    title: "接受时间",
                    dataIndex: "send_time"
                },
                {
                    title: "操作",
                    scopedSlots: { customRender: "id" }
                }
            ],
            seachData: {
                keyword: "",
                status: "",
                type: "",
                page: 1,
                page_size: Number(this.$commonJs.PAGE_LINES[0])
            },
            seachGetNotificationData: {
                keyword: "",
                start_time: "",
                end_time: "",
                page: 1,
                page_size: Number(this.$commonJs.PAGE_LINES[0])
            },
            selectIds: [],
            selectIdsMassage: [],
            loadings: true
        };
    },
    created() {
        this.messageList(); //消息中心
        // this.getNotificationCenter() //通知中心
        if (this.$route.query && this.$route.query.type == "1") {
            this.activeIndex = 1;
            this.selectIdsMassage = [];
            this.selectIds = [];
        }
    },
    methods: {
        pageCheck(pagetion) {
            //分页
            var { current, pageSize } = pagetion;
            this.seachData.page = current;
            this.seachData.page_size = pageSize;
            this.seachGetNotificationData.page = current;
            this.seachGetNotificationData.page_size = pageSize;
            this.pagination.pageSize = pageSize;
            this.pagination.current = current;
            if (this.activeIndex == 0) {
                this.messageList();
            } else {
                this.getNotificationCenter();
            }
        },
        onSelectChange(selectedRowKeys, item) {
            //选择
            this.selectIdsMassage = selectedRowKeys;
            var arr = [];
            item.forEach(item => {
                arr.push(item.id);
            });
            this.selectIds = arr;
        },
        cheackIndex(index) {
            this.selectIdsMassage = [];
            this.selectIds = [];
            this.activeIndex = index;
            this.pagination.current = 1;
            this.seachData.page = 1;
            this.seachGetNotificationData.page = 1;
            if (index == 0) {
                this.messageList();
            } else {
                this.getNotificationCenter();
            }
        },
        // 以下为消息中心------------------------------
        messageList() {
            //消息中心
            this.dataSource = [];
            this.loadings = true;
            this.$http.messageList(this.seachData).then(res => {
                this.loadings = false;
                if (res.code == 1) {
                    var { data, total, per_page } = res.data;
                    this.selectIdsMassage = [];
                    this.pagination.total = res.data.total;
                    this.dataSource = res.data.data;
                    this.selectIds = [];
                }
            });
        },
        changMeassageStatus(e) {
            this.seachData.status = e;
			this.seachData.page = 1
			this.pagination.current = 1
            this.messageList();
        },
        MarRead() {
            //批量已读--消息
            var that = this;
            if (that.selectIdsMassage.length < 1)
                return that.$message.error("请选择需要批量已读的数据");
            that.$confirm({
                title: "提示",
                content: "您确定要批量已读？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    that.$http
                        .messageRead({ ids: that.selectIds.toString() })
                        .then(res => {
                            if (res.code == 1) {
                                that.$message.success("已读成功");
                                that.selectIdsMassage = [];
                                that.selectIds = [];
                                that.$store.commit("setMessages", true);
                                setTimeout(() => {
                                    that.$store.commit("setMessages", false);
                                }, 300);
                                that.messageList();
                            }
                        });
                },
                onCancel() {}
            });
        },
        batchDeletion() {
            //消息中心批量删除
            var that = this;
            if (that.selectIdsMassage.length < 1)
                return that.$message.error("请选择需要批量删除的数据");
            that.$confirm({
                title: "提示",
                content: "您确定要批量删除？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    that.$http
                        .messageDel({ ids: that.selectIds.toString() })
                        .then(res => {
                            if (res.code == 1) {
                                that.messageList();
                                that.selectIdsMassage = [];
                                that.selectIds = [];
                                that.$store.commit("setMessages", true);
                                setTimeout(() => {
                                    that.$store.commit("setMessages", false);
                                }, 300);
                                that.messageList();
                            }
                        });
                },
                onCancel() {}
            });
        },
        removeItemMassAge(data) {
            //删除--消息
            var that = this;
            that.$confirm({
                title: "提示",
                content: "消息通知删除后无法恢复，是否继续？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    that.$http.messageDel({ ids: data }).then(res => {
                        if (res.code == 1) {
                            that.messageList();
                        }
                    });
                },
                onCancel() {}
            });
        },

        // -----------------------------消息中心 end
        seeDetails(item, type) {
            // 查看详情
            var objs = {
                2: {
                    route: "AnnouncementDetails",
                    types: "message",
                    id: item.id
                },
                3: {
                    route: "AnnouncementDetails",
                    types: "message",
                    id: item.id
                },
                4: {
                    route: "AnnouncementDetails",
                    types: "notification",
                    id: item.order_id
                },
                5: { route: "BusinessTrainingList", types: type, id: item.id },
                6: {
                    route: "AnnouncementDetails",
                    types: "message",
                    id: item.id
                },
				25: {
				    route: "OrderManagementList",
				    types: "message",
				    id: item.id,
					keys:"order_management"
				}
            };
            if (type == "notification") {
                this.$router.push({
                    path: "AnnouncementDetails",
                    query: { id: item.id, type: type }
                });
            } else {
                if (item.status == 1) {
                    //未读
                    this.readMessa(item.id, () => {
                        this.$router.push({
                            name: objs[item.type].route,
                            query: {
                                id: objs[item.type].id,
                                type: objs[item.type].types,
								keys:objs[item.type].keys
                            }
                        });
                    });
                } else {
                    this.$router.push({
                        name: objs[item.type].route,
                        query: {
                            id: objs[item.type].id,
                            type: objs[item.type].types,
							keys:objs[item.type].keys
                        }
                    });
                }
            }
        },
        readMessa(id, call) {
            this.$http.messageRead({ ids: id }).then(res => {
                if (res.code == 1) {
                    this.$store.commit("setMessages", true);
                    setTimeout(() => {
                        this.$store.commit("setMessages", false);
                    }, 300);
                    call();
                }
            });
        },

        // 以下为通知中心------------------------------
		notiSearch(){
			 this.selectIdsMassage.page = 1;
			 this.pagination.current = 1;
			this.getNotificationCenter()
		},
        getNotificationCenter() {
            //通告中心
            this.loadings = true;
            this.$http.noticeList(this.seachGetNotificationData).then(res => {
                this.loadings = false;
                if (res.code == 1) {
                    this.pagination.total = res.data.total;
                    this.selectIdsMassage = [];
                    this.selectIds = [];
                    this.notificationCenterDataSource = res.data.data;
                }
            });
        },
        changeNoticeInfo0(e) {
            this.seachGetNotificationData.start_time = e;
            this.notiSearch(); //通知中心
        },
        changeNoticeInfo(e) {
            this.seachGetNotificationData.end_time = e;
            this.notiSearch(); //通知中心
        },
        notificationBatchDeletion() {
            //通知中心 批量删除
            var that = this;
            if (that.selectIds.length < 1)
                return that.$message.error("请选择需要批量删除的数据");
            that.$confirm({
                title: "提示",
                content: "您确定要批量删除？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    that.$http
                        .noticeDel({ id: that.selectIds.toString() })
                        .then(res => {
                            if (res.code == 1) {
                                that.getNotificationCenter();
                            }
                        });
                },
                onCancel() {}
            });
        },
        removeNotification(data) {
            //删除--通告
            var that = this;
            that.$confirm({
                title: "提示",
                content: "消息通知删除后无法恢复，是否继续？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    that.$http
                        .noticeDel({ id: that.selectIds.toString() })
                        .then(res => {
                            if (res.code == 1) {
                                that.getNotificationCenter();
                            }
                        });
                },
                onCancel() {
                    console.log("Cancel");
                }
            });
        }

        // -----------------------------通知中心 end
    }
};
</script>

<style scoped="scoped">
.pd28 {
    padding: 28px;
}
.chackIndexStyle {
    display: flex;
    margin-bottom: 40px;
}
.pt10 {
    padding-top: 10px;
}
.chackIndexStyle div {
    margin-right: 80px;
    font-size: 20px;
    cursor: pointer;
}
.aciveClass {
    padding-bottom: 10px;
    color: rgba(24, 144, 255, 1);
    border-bottom: 3px solid rgba(24, 144, 255, 1);
}
.w200px {
    width: 200px;
}
.wlist260 {
    width: 260px;
    margin-right: 20px;
}
.mb30 {
    margin-bottom: 30px;
}
.orderListHead {
    display: flex;
}
.recordTitle {
    display: flex;
}
.isShowLine {
    width: 4px;
    height: 4px;
    margin-left: 6px;
    background-color: red;
    border-radius: 10px;
}
</style>
