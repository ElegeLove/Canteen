<template>
  <div id="printConsdf" style="width: 100%;">
    <table class="tablefths" cellspacing="0" cellpadding="0" border="1"
     v-if="printData!==''">
       <thead>
          <tr class="headOne">
            <td colspan="8">学校食堂{{printData.calendar.year}}年{{printData.calendar.semester}}学期第{{printData.week.weeks}}周{{printData.type_text}}带量食谱公示表（ {{printData.week.start_time}}-{{printData.week.end_time}}）</td>
          </tr>
          <tr class="headTwo">
            <td  colspan="8">
              <span>食堂名称：{{printData.abbreviation}}</span>
              <span>编制人(签字)：</span>
              <span>审定人(签字)：</span>
            </td>
          </tr>
       </thead>
      <tbody class="allerstys">
        <tr v-for="(item,index) in printData.food" :key="index">
          <td class="fgh">{{item.week}}</td>
          <td class="allsTabfg" colspan="7">
            <table border="0" cellpadding="0" cellspacing="0"
              v-for="(it,ix) in item.menu" :key="ix"
              class="food_tab"
            >
                <tr style="border: 0;" class="nobors">
                  <td  v-for="(is,xx) in it.name" :key="xx" style="height: 30px;" width="100" class="name_heig">{{is.name}}</td>
                </tr>
                <tr class="line_tr">
                  <td v-for="(ir,xx) in it.cai" :key="xx" style="position: relative;" class="rela_tive">
                   <table border="0" cellpadding="0" cellspacing="0" class="lin_tab">
                      <tr style="height: 100%;" class="cont_tr">
                        <td width="30" class="cirl_line">
                          主要食材<div class="linesdxc"></div>
                        </td>
                        <td class="cai_names">
                          <span  v-for="(ik,ikx) in ir" :key="ikx" class="sapnsdfgs">
                           {{ik.name}}{{ik.budget}}{{ik.unit}}<br/>
                          </span>
                          <span v-if="ir.length==0" class="sapnsdfgs nobots"></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
            </table>
          </td>
        </tr>
       </tbody>
    </table>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    props:["printData"]
  }
</script>

<style scoped="scoped" lang="scss">
  .allsTabfg{
    >.rtys:nth-of-type(1){
      border-top: 0 !important;
    }
  }
  .rtys{
    width: 100% !important;
    >tr:nth-of-type(1){
      border-top: 0 !important;
      td{
        border-top: 0 !important;
      }
    }
  }
#printConsdf{
  th,td {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    text-align: center;
  }
}
.linesdxc{
  position:absolute;
  width: 2px;
  height: 100% !important;
  top: 0;
  left: 30px;
  border-left: 1px solid #000000 !important;
}


  .allerstys{
    >table:not(:last-child){
      .borded{
        border-bottom: 0 !important;
      }
    }
    >table:first-child{
      border-top: 0;
    }
  }
  .sapnsdfgs{
    border-bottom: 1px solid #000;
  }
#printConsdf{
  position: relative !important;
  width: 100% !important;
  z-index: -2;
  top: 0;
  left: 0;
}
.tablefths{
  width: 100% !important;
  td{
    text-align: center;
    font-size: 14px;
    color: #000;
  }
  thead>.headOne{
    text-align: center;
    >td{
      font-size: 18px !important;
      font-weight: bold;
      box-sizing: border-box;
      padding:10px 0;
    }
  }
  thead>.headTwo{
    span{
      display: inline-block;
      margin-right: 140px;
      white-space: nowrap;
    }
    td{
      text-align: left;
      box-sizing: border-box;
      padding: 6px 5px;
    }
  }
}
</style>
