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
           <p>年份：</p>
           <a-select
               label-in-value
               style="width: 150px"
               :default-value="{ key: '全部' }"
               placeholder="请选择年份"
               @change="handleChange"
             >
               <a-select-option :value="item" v-for="(item,index) in scrolls" :key="index">{{item}}</a-select-option>
           </a-select>
         </div>
         <div class="selecs">
           <p>学期：</p>
           <a-select
               label-in-value
               style="width: 150px"
               :default-value="{ key: '全部' }"
               placeholder="请选择年份"
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
       <a-table :columns="columns" :data-source="data"
        :scroll="{ x:1500,y: 600 }"
        class="tables"
        bordered
        :pagination="pagination"
        :loading="loading">
           <div slot="printOne" slot-scope="text" :class="{'actions':true,'main_color':text==1}">
             <span>导出</span>
             <span>打印</span>
           </div>
           <div slot="printTwo" slot-scope="text" :class="{'actions':true,'main_color':text==1}">
             <span>导出</span>
             <span @click="prints">打印</span>
           </div>
        </a-table>
        <table border="1" class="tablef" id="printCons">
           <thead>
              <tr class="headOne">
                <td colspan="14">学习食堂20____年____季学期第____周餐带量食谱公示表（ &emsp;月&emsp;&emsp;日&emsp;-&emsp;月&emsp;&emsp;日）</td>
              </tr>
              <tr class="headTwo">
                <td colspan="14">
                  <span>食堂名称：</span>
                  <span>编制人(签字)：</span>
                  <span>审定人(签字)：</span>
                </td>
              </tr>
           </thead>
           <tbody v-for="(item,index) in 7" :key="index">
             <tr>
               <td rowspan="5" class="week">星 期</td>
               <td colspan="2" class="smallTd"></td>
               <td colspan="2" class="smallTd"></td>
               <td colspan="2" class="smallTd"></td>
               <td colspan="2" class="smallTd"></td>
               <td colspan="2" class="smallTd"></td>
               <td colspan="3" class="smallTd">点心</td>
             </tr>
             <tr>
               <td rowspan="4" class="titCol">主要食材</td>
               <td></td>
               <td rowspan="4" class="titCol">主要食材</td>
               <td></td>
               <td rowspan="4" class="titCol">主要食材</td>
               <td></td>
               <td rowspan="4" class="titCol">主要食材</td>
               <td></td>
               <td rowspan="4" class="titCol">主要食材</td>
               <td></td>
               <td rowspan="4" class="titCol">主要食材</td>
               <td rowspan="2">上午</td>
               <td rowspan="2">下午</td>
             </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
             </tr>
           </tbody>
        </table>
        <button @click="prints">打印</button>
    </div>
  </div>
</template>

<script>
   import print from "print-js"
  export default{
    data(){
      return{
        scrolls:["全部","一年级","二年级"],
        startValue: null,
        endValue: null,
        endOpen: false,
        columns:[
          { title: '就餐学校', width: 100, dataIndex: 'scoll', key: 'scoll',align:"center",fixed:"left" },
          { title: '年份', width: "10%", dataIndex: 'year', key: 'year',align:"center" },
          { title: '学期', dataIndex: 'mouns', key: 'mouns', width: "10%",align:"center"},
          { title: '周', dataIndex: 'week', key: 'week', width: "10%",align:"center" },
          { title: '日期', dataIndex: 'date', key: 'date', width: "30%",align:"center" },
          { title: '预算编制情况', dataIndex: 'status', key: 'status', width: "20%",align:"center" },
          { title: '周带量食谱公示表', dataIndex: 'show',
            key: 'show', width: "20%",align:"center",
            scopedSlots: { customRender: 'printOne' }
          },
          {
            title: '周食材用量总表',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'printTwo' },
            align:"center",
            width: 150,
            dataIndex: 'operation'
          },
        ],
        data:[],
        loading:true,
        pagination:{
          total: 0,
          pageSize: 20,//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          onChange:(e)=>{          //分页触发
            console.log(e)
          },
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
      }
    },
    created(){
      for (let i = 0; i < 15; i++) {
        this.data.push({
          key:i,
          scoll: "乐园中学",
          year:"2020年",
          mouns:"春季学期",
          week: "第一周",
          date:"2020/3/12—2020/3/17",
          status:"待编制",
          show:0,
          operation:1
        });
      }
      setTimeout(()=>{
        this.loading = false
      },1000)
    },
    methods:{
      prints(){            //打印
        printJS({
              printable: 'printCons',
              type: 'html',
              //properties: [
              //    { field: 'name', displayName: '姓名', columnSize:`50%`},
              //    { field: 'sex', displayName: '性别',columnSize:`50%`},
              //],
              // header: `<p class="custom-p"> 名单 </p>`,
              // style: '#printCons {width: 200px;} ',
              // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
              // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
              // repeatTableHeader: true,
              // scanStyles:true,
              targetStyles: ['*'],
              ignoreElements:['no-print','bc','gb']
          })
      },
      handleChange(){

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
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/NutritionDiet/RecipePublicity.scss';
</style>
