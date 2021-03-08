<template>
  <!-- 打印 -->
  <div  id="warrantTable" style="width: 100%;">
    <div v-for="(it,ix) in info.table" style="width: 100%;height: 650px;" :key="ix" class="lists">
      <div class="titles"
      style="text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
  font-family:'微软雅黑';
  margin-bottom: 12px;
  transform: scale(1.2);
  box-sizing: border-box;
  padding-left: 80px;"
      >学校食堂食品及原辅材料入库单（定点采购）</div>
      <div class="peersons"
      style="display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 40px 0 15px;
  font-size: 15px;
  color: #000000;
  font-family:'微软雅黑';
  margin-bottom: 10px;"
      >
        <span
        style="transform-origin:20% 50% !important;
    display: inline-block;
    transform: scale(0.9);
    white-space: nowrap;"
        >食堂名称：{{info.main_info.school_name}}</span>
        <span
        style="transform-origin:20% 50% !important;
        display: inline-block;
        transform: scale(0.9);
        white-space: nowrap;"
        >定点供应商名称：{{info.main_info.supplier_name}}</span>
        <span
        style="transform-origin:20% 50% !important;
        display: inline-block;
        transform: scale(0.9);
        white-space: nowrap;"
        >{{info.date}}第{{++ix}}页共{{info.table.length}}页</span>
      </div>
      <table
        cellpadding="0"
        cellspacing="0"
        style="width: 100%;border-color: #000000;table-layout: fixed;"
        border="1"
      >
        <thead class="headers" style="font-family:'微软雅黑';">
          <tr style="height: 28px !important;">
            <td rowspan="2" style="width: 58.3px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
   style="transform-origin:20% 50% !important;
    white-space: nowrap;
    letter-spacing: 5px;
    display: inline-block;
    transform: scale(0.8);"
  >产品<br/>代码</span></td>
            <td rowspan="2" style="width: 88px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   letter-spacing: 5px;
   display: inline-block;
   transform: scale(0.8);"
  >产品名称</span></td>
            <td rowspan="2" style="width: 185.5px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span>产地品牌生产商</span></td>
            <td rowspan="2" style="width: 105.6px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   letter-spacing: 5px;
   display: inline-block;
   transform: scale(0.8);"
  >等级<br/>规格</span></td>
            <td rowspan="2" style="width: 105.6px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   display: inline-block;
   letter-spacing: 5px;
   transform: scale(0.8);"
  >生产<br/>日期</span></td>
            <td rowspan="2" style="width: 105.6px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   letter-spacing: 5px;
   display: inline-block;
   transform: scale(0.8);"
  >保质<br/>期至</span></td>
            <td rowspan="2" style="width: 50.3px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   display: inline-block;
   letter-spacing: 5px;
   transform: scale(0.8);"
  >单位</span></td>
            <td rowspan="2" style="width: 58.3px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   letter-spacing: 5px;
   display: inline-block;
   transform: scale(0.8);"
  >单价<br/>(元)</span></td>
            <td colspan="2" style="width: 134px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   display: inline-block;
   letter-spacing: 5px;
   transform: scale(0.8);"
  >产品入库</span></td>
          </tr>
          <tr style="height: 28px !important;">
            <td style="width: 63px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   display: inline-block;
   letter-spacing: 5px;
   transform: scale(0.8);"
  >数量</span></td>
            <td style="width:71px;height: 28px !important;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0px 0;color: #000000;
  text-align: center;"><span
  style="transform-origin:20% 50% !important;
   white-space: nowrap;
   letter-spacing: 5px;
   display: inline-block;
   transform: scale(0.8);"
  >金额(元)</span></td>
          </tr>
        </thead>
        <tbody style="font-family:'微软雅黑';">
          <tr v-for="(item, index) in it.list" :key="index" style="height:47.5px !important;">
            <td align="center"
            style="height: 47.5px !important;
  font-size: 15px;
  position: relative !important;"
            ><span
            style="position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center;
    height: 47.5px !important;
    letter-spacing: 2px;
    word-break:break-all !important;
    transform: scale(0.8);"
            >{{item.product_code}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            word-break:break-all !important;
            letter-spacing: 2px;
            transform: scale(0.8);"
            >{{item.product_name}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            word-break:break-all !important;
            letter-spacing: 2px;
            transform: scale(0.8);"
            >{{item.manufacturer}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            letter-spacing: 2px;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.grade}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            letter-spacing: 2px;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.production_time}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            letter-spacing: 2px;
            height: 47.5px !important;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.expiration_time}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            letter-spacing: 2px;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.unit_meterage}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            letter-spacing: 2px;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.unit_price}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            letter-spacing: 2px;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.now_count}}</span></td>
            <td align="center"
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            letter-spacing: 2px;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{item.total_price}}</span></td>
          </tr>
          <tr style="height:47.5px !important;">
            <td colspan="9" style="text-align: left;height: 47.5px !important;
            font-size: 15px;
            position: relative !important;">
              <span style="justify-content: flex-start;transform-origin: 10%;position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-start;
            letter-spacing: 2px;
            height: 47.5px !important;
            word-break:break-all !important;
            transform: scale(0.8);">总金额合计（大写）：{{ it.total_amount }}</span>
            </td>
            <td
            style="height: 47.5px !important;
            font-size: 15px;
            position: relative !important;"
            ><span
            style="position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            height: 47.5px !important;
            letter-spacing: 2px;
            word-break:break-all !important;
            transform: scale(0.8);"
            >{{it.subtotal_amount}}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="foots"
      style="display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
  font-family:'微软雅黑';
  padding: 0 60px 0 15px;
  font-size: 15px;
  margin-top:10px ;
  color: #000000;"
      >
         <span
         style="transform-origin:20% 50% !important;
    display: inline-block;
    transform: scale(0.8);
    white-space: nowrap;"
         >收货人（签字）：</span>
         <span
         style="transform-origin:20% 50% !important;
         display: inline-block;
         transform: scale(0.8);
         white-space: nowrap;"
         >验收监督人（签字）：</span>
         <span
         style="transform-origin:20% 50% !important;
         display: inline-block;
         transform: scale(0.8);
         white-space: nowrap;"
         >库管员（签字）：</span>
         <span
         style="transform-origin:20% 50% !important;
         display: inline-block;
         transform: scale(0.8);
         white-space: nowrap;"
         >食堂负责人（签字）：</span>
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
// .warp_page{
//   page-break-after: always;
// }
// .titles{
//   text-align: center;
//   font-weight: bold;
//   font-size: 24px;
//   color: #000000;
//   margin-bottom: 12px;
//   transform: scale(1.2);
//   box-sizing: border-box;
//   padding-left: 130px;
// }
// .peersons{
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   box-sizing: border-box;
//   padding: 0 40px 0 15px;
//   font-size: 12px;
//   color: #000000;
//   margin-bottom: 10px;
//   >span{
//     transform-origin:20% 50% !important;
//     display: inline-block;
//     transform: scale(0.9);
//     white-space: nowrap;
//   }
// }
// .foots{
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   box-sizing: border-box;
//   flex-wrap: wrap;
//   padding: 0 60px 0 15px;
//   font-size: 12px;
//   margin-top:10px ;
//   color: #000000;
//   >span{
//     transform-origin:20% 50% !important;
//     display: inline-block;
//     transform: scale(0.8);
//     white-space: nowrap;
//   }
// }
// tbody>tr{
//   height:47.5px !important;
// }
// thead>tr{
//   height: 28px !important;
// }
// tbody>tr>td{
//   height: 47.5px !important;
//   font-size: 13px;
//   position: relative !important;
//   >span{
//     position: absolute !important;
//     left: 0 !important;
//     top: 0 !important;
//     width: 100% !important;
//     display: flex !important;
//     align-items: center !important;
//     justify-content: center;
//     height: 47.5px !important;
//     word-break:break-all !important;
//     transform: scale(0.7);
//   }
// }
// .headers>tr>td{
//   height: 28px !important;
//   font-size: 12px;
//   box-sizing: border-box;
//   padding: 0px 0;
//   >span{
//     transform-origin:20% 50% !important;
//     white-space: nowrap;
//     display: inline-block;
//     transform: scale(0.8);
//   }
// }
// td{
//   color: #000000;
//   text-align: center;
// }
#warrantTable{
  position:absolute;
  width: 100%;
  z-index: -1;
  top: 0;
  left: 0;
}
// .lists{
//   // height:644px !important;
//   // margin: 0 20px;
// }

</style>
