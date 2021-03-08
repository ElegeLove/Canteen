<template>
  <!-- 打印 -->
  <table class="table printTable" cellpadding="0" cellspacing="0" id="indexTable" border="1">
    <thead>
      <tr>
        <th colspan="13" class="textCenter pl10">学校食堂存货盘存表</th>
      </tr>
      <tr>
        <th colspan="13" align="left" style="min-width: 1000px;">
          &emsp;食堂名称：{{list.name}}&emsp;&emsp;盘点日期：{{list.time}}&emsp;&emsp;金额单位：&nbsp;&nbsp;&nbsp;&nbsp;元
        </th>
      </tr>
      <tr>
        <th rowspan="2">序号</th>
        <th rowspan="2">产品代码</th>
        <th rowspan="2" width="180">产品名称</th>
        <th rowspan="2" width="250">产地品牌生产商</th>
        <th rowspan="2">等级规格</th>
        <th rowspan="2">单位</th>
        <th rowspan="2">单价<br/>(元)</th>
        <th colspan="2">账面</th>
        <th colspan="2">盘存</th>
        <th colspan="2">盘盈</th>
      </tr>
      <tr>
        <th>数量</th>
        <th>金额</th>
        <th>数量</th>
        <th>金额</th>
        <th>数量</th>
        <th>金额</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in list.data" :key="index">
        <td align="center">{{index+1}}</td>
        <td align="center">{{item.product_code}}</td>
        <td align="center">{{item.product_name}}</td>
        <td align="center">{{item.manufacturer}}</td>
        <td align="center">{{item.grade}}</td>
        <td align="center">{{item.unit}}</td>
        <td align="center">{{item.unit_price}}</td>
        <td align="center">{{item.stock}}</td>
        <td align="center">{{item.total_price}}</td>
        <td align="center">{{item.take_inventory_number}}</td>
        <td align="center">{{item.take_inventory_price}}</td>
        <td align="center">{{item.inventory_surplus_number}}</td>
        <td align="center">{{item.inventory_surplus_price}}</td>
      </tr>
      <tr>
        <td colspan="8" class="textLeft">
          &emsp;盘存金额合计(大写)：{{list.add_total}}
        </td>
        <td align="center">{{list.total_price}}</td>
        <td align="center">X</td>
        <td align="center">{{list.take_inventory_price}}</td>
        <td align="center">X</td>
        <td align="center">{{list.inventory_surplus_price}}</td>
      </tr>
      <tr>
        <td colspan="13" class="textLeft">
          <span class="pl10">&emsp;盘盈(亏)金额合计(大写)：{{list.del_total}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="13">
          &emsp;系统操作员（签字）：&emsp;&emsp;&emsp;&emsp;库管员（签字）：&emsp;&emsp;&emsp;&emsp;盘点监督（签字）：
        </td>
      </tr>
      <tr>
        <td colspan="13">
          &emsp;食堂会计（签字）：&emsp;&emsp;&emsp;&emsp;&emsp;食堂负责人（签字）：
        </td>
        <!-- <td colspan="4" class="pl10 textLeft" style="border-right:0 none;">
          <span class="span-item"></span>
        </td>
        <td colspan="9" class="pl10 textLeft" style="border-left:0 none;">
          <span class="span-item"></span>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["list"],
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/Procurement/printTable.scss";

.span-item {
  width: 25%;
  display: inline-block;
  text-align: left;
}
</style>
