<template>
  <!-- 打印 -->
  <div  id="warrantTables" style="width: 100%;">
    <div v-for="(it,ix) in info.table" style="width: 100%;" :key="ix" class="lists">
      <div class="titles">学校食堂食品及原辅材料定点配送交接单</div>
      <div class="peersons">
        <span>食堂名称：{{info.school_name}}</span>
        <span>{{info.time}}第{{++ix}}页共{{info.table.length}}页</span>
      </div>
      <table
        cellpadding="0"
        cellspacing="0"
        style="width: 800px;border-color: #000000;table-layout: fixed;"
        border="1"
      >
        <thead class="headers">
          <tr>
            <td rowspan="2" style="width: 58.3px;"><span>产品<br/>代码</span></td>
            <td rowspan="2" style="width: 88px;"><span>产品名称</span></td>
            <td rowspan="2" style="width: 185.5px;"><span>产地品牌生产商</span></td>
            <td rowspan="2" style="width: 105.6px;"><span>等级<br/>规格</span></td>
            <td rowspan="2" style="width: 105.6px;"><span>生产<br/>日期</span></td>
            <td rowspan="2" style="width: 105.6px;"><span>保质<br/>期至</span></td>
            <td rowspan="2" style="width: 50.3px;"><span>单位</span></td>
            <td rowspan="2" style="width: 58.3px;"><span>单价<br/>(元)</span></td>
            <td colspan="2" style="width: 134px;"><span>实际配送</span></td>
          </tr>
          <tr>
            <td style="width: 63px;"><span>数量</span></td>
            <td style="width: 71px;"><span>金额(元)</span></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in it.list" :key="index">
            <td><span>{{item.product_code}}</span></td>
            <td><span>{{item.product_name}}</span></td>
            <td><span>{{item.manufacturer}}</span></td>
            <td><span>{{item.grade}}</span></td>
            <td><span>{{item.production_time}}</span></td>
            <td><span>{{item.expiration_time}}</span></td>
            <td><span>{{item.unit}}</span></td>
            <td><span>{{item.unit_price}}</span></td>
            <td><span>{{item.now_count}}</span></td>
            <td><span>{{item.school_total_price}}</span></td>
          </tr>
          <tr>
            <td colspan="9" style="text-align: left;">
              <span style="justify-content: flex-start;transform-origin: 10%;">实际配送金额总合计(大写)：{{ info.big_total_money }}</span>
            </td>
            <td><span>{{it.subtotal_amount}}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="foots">
         <span>定点供应商（章）：{{info.supplier_name}}</span>
          <span>送货人（签字）：</span>
          <span>学校收货人（签字）：</span>
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
.titles{
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
  margin-bottom: 12px;
  transform: scale(1.2);
  box-sizing: border-box;
  padding-left: 150px;
}
.peersons{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 40px 0 15px;
  font-size: 12px;
  color: #000000;
  margin-bottom: 10px;
  >span{
    transform-origin:20% 50% !important;
    display: inline-block;
    transform: scale(0.9);
    white-space: nowrap;
  }
}
.foots{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
  padding: 0 60px 0 15px;
  font-size: 12px;
  margin-top:10px ;
  color: #000000;
  >span{
    transform-origin:20% 50% !important;
    display: inline-block;
    transform: scale(0.8);
    white-space: nowrap;
  }
}
tbody>tr{
  height:29px !important;
}
thead>tr{
  height: 28px !important;
}
tbody>tr>td{
  height: 29px !important;
  font-size: 13px;
  position: relative !important;
  >span{
   position: absolute !important;
   left: 0 !important;
   top: 0 !important;
   width: 100% !important;
   display: flex !important;
   align-items: center !important;
   justify-content: center;
   height: 29px !important;
   word-break:break-all !important;
   transform: scale(0.7);
  }
}
.headers>tr>td{
  height: 28px !important;
  font-size: 12px;
  box-sizing: border-box;
  padding: 0px 0;
  >span{
    transform-origin:20% 50% !important;
    white-space: nowrap;
    display: inline-block;
    transform: scale(0.8);
  }
}
td{
  color: #000000;
  text-align: center;
}
#warrantTables{
  // position:absolute;
  // width: 100%;
  // z-index: -1;
  // top: 0;
  // left: 0;
  width: 100%;
  position: absolute;
  top: 0;
  left: -100000px;
  z-index: -999;
}
.lists{
  height:620px;
}

</style>