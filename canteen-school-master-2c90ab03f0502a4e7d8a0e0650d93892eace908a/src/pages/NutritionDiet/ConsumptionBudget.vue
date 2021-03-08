<template>
  <div class="boxs">
     <div>
        <div class="flexBox">
          <div class="selecs">
             <p>就餐学校：</p>
             <a-select
                 label-in-value
                 style="width: 150px"
                 :default-value="{ key: '全部' }"
                 placeholder="请选择就餐学校"
                 @change="handleChange"
               >
                 <a-select-option :value="item" v-for="(item,index) in scrolls" :key="index">{{item}}</a-select-option>
             </a-select>
          </div>
          <div class="selecs">
            <p>餐次：</p>
            <a-select
                label-in-value
                style="width: 150px"
                :default-value="{ key: '全部' }"
                placeholder="请选择就餐学校"
                @change="handleChange"
              >
                <a-select-option :value="item" v-for="(item,index) in scrolls" :key="index">{{item}}</a-select-option>
            </a-select>
          </div>
          <div class="selecs">
            <span>用餐日期：</span>
            <a-date-picker
              v-model="startValue"
              :disabled-date="disabledStartDate"
              format="YYYY-MM-DD"
              placeholder="选择日期"
              @openChange="handleStartOpenChange"
            />
            <p class="liness">—</p>
            <a-date-picker
              v-model="endValue"
              :disabled-date="disabledEndDate"
              format="YYYY-MM-DD"
              placeholder="选择日期"
              :open="endOpen"
              @openChange="handleEndOpenChange"
            />
          </div>
        </div>
     </div>
     <a-table :columns="columns" :data-source="data"
      :scroll="{ x: 1500, y: 600 }"
      class="tables"
      bordered
      @change="handleTableChange"
      :pagination="pagination"
      :loading="loading">
         <div slot="action" slot-scope="text" class="actiosn main_color">
           <span>修改</span>
           <span @click="updates">编制预算</span>
           <span>导出预算表</span>
         </div>
      </a-table>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        scrolls:["全部","一年级","二年级"],
        startValue: null,
        endValue: null,
        endOpen: false,
        columns:[
          { title: '就餐学校', width: 110, dataIndex: 'id', key: 'id', fixed: 'left',align:"center" },
          { title: '学期', width: "15%", dataIndex: 'shi', key: 'shi',align:"center" },
          { title: '学周', dataIndex: 'img', key: 'img', width: "10%",align:"center"},
          { title: '星期', dataIndex: 'name', key: 'name2', width: "10%",align:"center" },
          { title: '用餐日期', dataIndex: 'name', key: 'name3', width: "15%",align:"center" },
          { title: '餐次', dataIndex: 'name', key: 'name4', width: "15%",align:"center" },
          { title: '预算编制情况', dataIndex: 'name', key: 'name5', width: "15%",align:"center" },
          { title: '编制时间', dataIndex: 'name', key: 'name6', width: "20%",align:"center" },
          {
            title: '操作按钮',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            align:"center",
            width: 200
          },
        ],
        data:[],
        loading:true,
        pagination:{
          total: 50,
          pageSize: 20,//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
      }
    },
    created(){
      for (let i = 0; i < 15; i++) {
        this.data.push({
          key:i,
          id: "2020年",
          shi:"一食堂",
          img:"12",
          name: `Edrward ${i}`
        });
      }
      setTimeout(()=>{
        this.loading = false
      },1000)
    },
    methods:{
      handleChange(){

      },
      handleTableChange(e){        //分页触发
         console.log(e)
      },
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
      updates(){        //编制预算
        this.$router.push({path:"/ManagementPanel/BudgetTable"})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/NutritionDiet/ConsumptionBudget.scss';
</style>
