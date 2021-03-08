<template>
  <div id="recTab" >
    <div class="tits"><span class="rts">学校食堂{{printdata.year}}年{{printdata.semester}}学期第{{printdata.weeks}}周食谱总表</span></div>
    <div class="names">&emsp;食堂名称：{{printdata.school_name}}&emsp;&emsp;&emsp;&emsp;&emsp;食谱编制人(签字)：&emsp;&emsp;&emsp;&emsp;&emsp;食谱审定人(签字)：</div>
    <div class="new_tabs">
      <div v-for="(its,index) in printdata.recipes" :key="index">
        <table border="1" cellpadding="0" cellspacing="0" class="reciperTab">
          <thead>
            <tr class="newPad">
              <th width="60">星期</th>
              <th width="100">日期</th>
              <th>早餐食谱名称</th>
              <th>午餐食谱名称</th>
              <th>晚餐食谱名称</th>
              <th>上午点心名称</th>
              <th>下午点心名称</th>
            </tr>
          </thead>
          <tbody v-for="(item,ix) in its" :key="ix" class="body_cont">
              <tr>
                <td :rowspan="item.menu.length+1" class="cols" align="center"><span class="scales">{{item.week}}</span></td>
                <td :rowspan="item.menu.length+1" class="cols" align="center"><span class="scales">{{item.date}}</span></td>
                <tr v-for="(it,ix) in item.menu" class="row_class">
                  <td align="center"><span class="scales">{{it.breakfast}}</span></td>
                  <td align="center"><span class="scales">{{it.lunch}}</span></td>
                  <td align="center"><span class="scales">{{it.dinner}}</span></td>
                  <td align="center"><span class="scales">{{it.morning_snack}}</span></td>
                  <td align="center"><span class="scales">{{it.afternoon_snack}}</span></td>
                </tr>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:["printdata"]
  }
</script>

<style scoped="scoped" lang="scss">
#recTab{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  >.new_tabs table:not(:first-child){
    margin-top: 30px !important;
  }
   >.new_tabs>div:not(:first-child){
     height: 1167px !important;
   }
   >.new_tabs>div:nth-of-type(1){
     height: 1112px !important;
   }
}
.tits{
  text-align:center;
  width:100%;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
   color: #000000;
}
.names{
  margin-bottom: 6px;
  color: #000000;
  font-size: 12px;
  transform: scale(0.9);
  transform-origin:0% 50% !important;
}
.reciperTab{
  page-break-after:always;
  width: 100%;
  td,th{
    height: auto !important;
    box-sizing: border-box;
    text-align: center;
    font-size: 12px;
    color: #000;
  }
  th{
    height: 30px !important;
  }
  .cols{
    white-space: nowrap !important;
  }
}
.row_class{
  height: 35px !important;
  max-height: 35px !important;
  td{
    line-height: 1.4 !important;
  }
  td span{
    line-height: 1.4 !important;
    white-space: pre-wrap !important;
  }
}
</style>
