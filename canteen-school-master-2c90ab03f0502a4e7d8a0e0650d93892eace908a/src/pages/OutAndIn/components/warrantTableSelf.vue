<template>
  <!-- 打印 -->
  <div  id="warrantTableSelf" style="width: 100%;">
    <div v-for="(it,ix) in info.table" style="width: 100%;" :key="ix" class="lists">
      <div class="titles">学校食堂食品及原辅材料入库单（自购）</div>
      <div class="peersons">
        <span>食堂名称：{{info.main_info.school_name}}</span>
        <span>{{info.date}}第{{++ix}}页共{{info.table.length}}页</span>
      </div>
      <table
        cellpadding="0"
        cellspacing="0"
        style="width: 100%;border-color: #000000;table-layout: fixed;"
        border="1"
      >
        <thead class="headers">
          <tr>
            <td style="width: 58.3px;"><span>产品<br/>代码</span></td>
            <td style="width: 88px;"><span>产品名称</span></td>
            <td style="width: 185.5px;"><span>产地品牌生产商</span></td>
            <td style="width: 105.6px;"><span>等级<br/>规格</span></td>
            <td style="width: 105.6px;"><span>生产日期</span></td>
            <td style="width: 105.6px;"><span>保质期至</span></td>
            <td style="width: 50.3px;"><span>单位</span></td>
            <td style="width: 58.3px;"><span>单价<br/>(元)</span></td>
            <td style="width: 63px;"><span>数量</span></td>
            <td style="width:71px;"><span>金额<br/>(元)</span></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in it.list" :key="index">
            <td align="center"><span>{{item.product_code}}</span></td>
            <td align="center"><span>{{item.product_name}}</span></td>
            <td align="center"><span>{{item.manufacturer}}</span></td>
            <td align="center"><span>{{item.grade}}</span></td>
            <td align="center"><span>{{item.production_time}}</span></td>
            <td align="center"><span>{{item.expiration_time}}</span></td>
            <td align="center"><span>{{item.unit_meterage}}</span></td>
            <td align="center"><span>{{item.unit_price}}</span></td>
            <td align="center"><span>{{item.now_count}}</span></td>
            <td align="center"><span>{{item.total_price}}</span></td>
          </tr>
          <tr>
            <td colspan="9" style="text-align: left;">
             <span style="justify-content: flex-start;transform-origin: 10%;letter-spacing: 6px;">总金额合计(大写)：{{ it.total_amount }}</span>
            </td>
            <td><span>{{it.subtotal_amount}}</span></td>
          </tr>
          <tr>
            <td colspan="10" style="text-align: left;">
              <span
              style="justify-content: flex-start;transform-origin: 10%;letter-spacing: 6px;"
              >供应商证照号：{{info.main_info.code}}&emsp;&emsp;供应商地址及联系方式：{{info.main_info.supplier_address}}({{info.main_info.supplier_phone}})</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="foots">
         <span>采购员(签字)：</span>
         <span>验收监督人(签字)：</span>
         <span>库管员(签字)：</span>
         <span>食堂负责人(签字)：</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
};
</script>

<style lang="scss" scoped>
#warrantTableSelf{
  position:absolute;
  width: 100%;
  z-index: -1;
  top: 0;
  left: 0;
}

</style>
