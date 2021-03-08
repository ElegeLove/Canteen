<template>
  <div class="printTable" id="printTable">
    <div>
      <table class="table" cellpadding="0" cellspacing="0" border="1">
        <thead>
          <tr>
            <th colspan="9"> 学校食堂{{ baseInfo.year }}年 {{ baseInfo.semester }} 学期{{ baseInfo.month }} 月食品及原辅材料{{baseInfo.self_purchase==1?'非定点采购':'定点采购'}}汇总统计表</th>
          </tr>
          <tr>
            <th colspan="9" align="left">
              &emsp;食堂名称：{{ baseInfo.school_name }}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 供应商名称：{{ baseInfo.supplier_name }}
            </th>
          </tr>
          <tr>
            <th>产品代码</th>
            <th>产品名称</th>
            <th>产地品牌生产商</th>
            <th>等级规格</th>
            <th>计量单位</th>
            <th>单价（元）</th>
            <th>数量</th>
            <th>金额（元）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in info" :key="index">
            <td align="center">{{ item.product_code }}</td>
            <td align="center">{{ item.product_name }}</td>
            <td align="center">{{ item.manufacturer }}</td>
            <td align="center">{{ item.grade }}</td>
            <td align="center">{{ item.unit }}</td>
            <td align="center">{{ item.unit_price }}</td>
            <td align="center">{{ item.now_count }}</td>
            <td align="center">{{ item.total_price }}</td>
          </tr>
          <tr>
            <td  align="center">金额合计</td>
            <td colspan="7" class="textLeft pl10">&emsp;大写：{{ baseInfo.total_price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info:{
      type:Array,
      default:()=>[]
    },
    baseInfo:{
      type:Object,
      default:()=>{
        return {
          total_price:0,
          year:'',
          semester:'',
          month:''
        }
      }
    }
  },
};
</script>


<style>
@import "../../../../assets/css/Procurement/myPrintTable.scss";
</style>
