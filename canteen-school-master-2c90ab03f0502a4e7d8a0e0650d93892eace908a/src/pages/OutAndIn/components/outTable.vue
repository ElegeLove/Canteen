<template>
    <div class="printTable" id="printTable" style="width: 100%;">
      <div v-for="(it,ix) in info.table" style="width: 100%;" class="lists">
        <div class="titles">学校食堂食品及原辅材料出库单</div>
        <div class="peersons">
          <span>食堂名称：{{info.abbreviation}}</span>
          <span>{{info.date}}第{{++ix}}页共{{info.table.length}}页</span>
        </div>
        <table
          cellpadding="0"
          cellspacing="0"
          style="width: 100%;border-color: #000000;table-layout: fixed;"
          border="1"
        >
          <thead  class="headers">
            <tr>
              <td style="width: 58.3px;"><span>产品<br/>代码</span></td>
              <td style="width: 88px;"><span>产品名称</span></td>
              <td style="width: 185.5px;"><span>产地品牌生产商</span></td>
              <td style="width: 105.6px;"><span>等级规格</span></td>
              <td style="width: 105.6px;"><span>生产日期</span></td>
              <td style="width: 105.6px;"><span>出库日期</span></td>
              <td style="width: 50.3px;"><span>单位</span></td>
              <td style="width: 58.3px;"><span>单价<br/>(元)</span></td>
              <td style="width: 63px;"><span>数量</span></td>
              <td style="width:71px;"><span>金额<br/>(元)</span></td>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in it.list" :key="index">
              <td><span>{{item.product_code}}</span></td>
              <td><span>{{item.product_name}}</span></td>
              <td><span>{{item.manufacturer}}</span></td>
              <td><span>{{item.grade}}</span></td>
              <td><span>{{item.production_time}}</span></td>
              <td><span>{{item.out_time_print}}</span></td>
              <td><span>{{item.unit}}</span></td>
              <td><span>{{item.unit_price}}</span></td>
              <td><span>{{item.out_count}}</span></td>
              <td><span>{{item.now_count}}</span></td>
            </tr>
            <tr>
              <td colspan="9" style="text-align: left;">
                <span style="justify-content: flex-start;transform-origin: 10%;">总金额合计(大写)：{{it.total_amount}}</span>
              </td>
              <td><span>{{it.subtotal_amount}}</span></td>
            </tr>
          </tbody>
        </table>
        <div class="foots">
           <span>领货人（签字）：</span>
           <span>监督人（签字）：</span>
           <span>库管员（签字）：</span>
           <span>食堂负责人（签字）：</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:['info']
};
</script>

<style scoped="scoped" lang="scss">
#printTable{
  position:absolute;
  width: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  display: none;
}
</style>
