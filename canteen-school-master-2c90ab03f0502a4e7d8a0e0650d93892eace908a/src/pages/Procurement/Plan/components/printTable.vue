<template>
  <!-- 打印 -->
  <table class="table" cellpadding="0" cellspacing="0" id="printTable" border="1">
    <thead>
      <tr>
        <th colspan="11" class="textLeft pl10">
          学校食堂{{info.year}}年{{info.semester}}学期第{{info.school_week}}周食品及原辅材料采购计划总表({{info.time}})
        </th>
      </tr>
      <tr>
        <th colspan="8" align="left">
            &emsp;食堂名称： &emsp;&emsp;&emsp;&emsp;&emsp;编制人：&emsp;&emsp;&emsp;&emsp;审核人：&emsp;&emsp;&emsp;&emsp;日期：&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp; 日
        </th>
      </tr>
      <tr>
        <th>产品代码</th>
        <th>产品名称</th>
        <th>计量单位</th>
        <th>单价(元)</th>
        <th>数量</th>
        <th>金额(元)</th>
        <th>定点供应商名称</th>
        <th width="180">备注</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in info.procurementDetail" :key="index">
        <td align="center">{{item.code}}</td>
        <td align="center">{{item.name}}</td>
        <td align="center">{{item.unit||item.school_unit}}</td>
        <td align="center">{{item.unit_price}}</td>
        <td align="center">{{item.real_quantity}}</td>
        <td align="center">{{item.price}}</td>
        <td align="center">{{item.supplier}}</td>
        <td align="center">{{item.remark || ''}}</td>
      </tr>
      <tr>
        <td align="center">金额合计</td>
        <td colspan="4" class="textLeft">
          &emsp;大写：{{info.total_price}}
        </td>
        <td></td>
        <td colspan="4" align="center">x</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["info"],
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/Procurement/printTable.scss";
</style>
