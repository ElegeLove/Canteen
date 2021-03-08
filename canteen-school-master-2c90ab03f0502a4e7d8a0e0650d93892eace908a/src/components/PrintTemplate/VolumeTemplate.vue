<template>
  <table border="1" id="printCons" class="newTable" cellpadding="0" cellspacing="0" v-if="printdata!==''">
     <thead>
        <tr class="tabTitle">
          <th colspan="7">{{printdata.abbreviation}}学校食堂{{printdata.calendar.year}}年{{printdata.calendar.semester}}学期第{{printdata.week.weeks}}周食品及原辅材料用量总表（ {{printdata.week.start_time}}-{{printdata.week.end_time}}）</th>
        </tr>
        <tr>
          <th colspan="7" class="headTwo newPad" align="left">
            <!-- <span>食堂名称：</span>
            <span>编制人：</span>
            <span>审核人：</span>
            <span>日期：&emsp;&emsp;月&emsp;&emsp;日</span> -->
            &emsp;食堂名称：{{printdata.abbreviation}}&emsp;&emsp;&emsp;编制人：&emsp;&emsp;&emsp;&emsp;&emsp;审核人：
          </th>
        </tr>
        <tr class="trPad">
          <th>产品代码</th>
          <th>产品名称</th>
          <th>计量单位</th>
          <th>单价（元）</th>
          <th>数量</th>
          <th>金额（元）</th>
          <th>备注</th>
        </tr>
     </thead>
     <tbody>
       <tr v-for="(item,index) in printdata.food" :key="index">
         <td align="center">{{item.code}}</td>
         <td align="center">{{item.name}}</td>
         <td align="center">{{item.school_unit}}</td>
         <td align="center">{{item.unit_price}}</td>
         <td align="center">{{item.school_dosage}}</td>
         <td align="center">{{item.school_price}}</td>
         <td align="center"></td>
       </tr>
       <tr class="newPad">
         <td align="center">金额合计</td>
         <td colspan="4" align="left">&emsp;大写：{{printdata.capitalize_total_price}}</td>
         <td align="center">{{printdata.total_price}}</td>
         <td align="center">x</td>
       </tr>
     </tbody>
  </table>
</template>

<script>
  export default{
    props:["printdata"]
  }
</script>

<style scoped="scoped" lang="scss">
.newTable{
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  td,th{
    padding: 15px 20px;
    text-align: center;
    font-size: 14px;
    color: #000;
  }
  .tabTitle>td{
    font-size: 18px !important;
    font-weight: bold;
  }
  .headTwo{
    span{
      display: inline-block;
      margin-right:70px;
    }
  }
  .newPad>td,.newPad{
    padding: 10px 20px !important;
  }
  .trPad>td{
    padding: 10px 20px !important;
  }
}
</style>
