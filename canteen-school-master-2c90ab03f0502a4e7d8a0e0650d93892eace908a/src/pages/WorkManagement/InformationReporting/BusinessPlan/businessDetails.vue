<template>
  <div>
    <goback title="返回"/>
    <div class="boxs detiles">
      <div class="top_boxsd">
        <div>学校：xx学校</div>
        <div>年份：2020年</div>
        <div>月份：07月</div>
      </div>
       <p>学生营养改善计划实施情况月报表</p>
       <div class="boxspad">
          <div class="titles">
            <span>本月午餐就餐人数</span>
            <div></div>
          </div>
          <div class="iptBox">
            <p>其中食堂供餐人数分为</p>
            <div>
              <div>
                <p>农村留守儿童：30人</p>
              </div>
              <div>
                <p>非寄宿贫困学生：50人</p>
              </div>
              <div>
                <p>免费提供人数：10人</p>
              </div>
            </div>
          </div>
          <div class="titles">
            <span>本月蛋奶食用人数</span>
            <div></div>
          </div>
          <div class="iptBox">
            <p>其中食堂供餐人数分为</p>
            <div>
              <div>
                <p>农村留守儿童：10人</p>
              </div>
              <div>
                <p>非寄宿贫困学生：6人</p>
              </div>
              <div>
                <p>免费提供人数：20人</p>
              </div>
            </div>
          </div>
          <div class="titles">
            <span>本月其他食品就餐人数</span>
            <div></div>
          </div>
          <div class="iptBox">
            <p>其中食堂供餐人数分为</p>
            <div>
              <div>
                <p>农村留守儿童：30人</p>
              </div>
              <div>
                <p>非寄宿贫困学生：90人</p>
              </div>
              <div>
                <p>免费提供人数：60人</p>
              </div>
            </div>
          </div>
          <div class="titles">
            <span>本月惠及实际学生人数</span>
            <div></div>
          </div>
          <div class="divBoxs">
            <div>
              <span>农村留守儿童：</span>
              <div>人</div>
            </div>
            <div>
              <span>非寄宿贫困学生：</span>
              <div>人</div>
            </div>
            <div>
              <span>免费提供人数：</span>
              <div>人</div>
            </div>
          </div>
          <div class="allNum">合计：人</div>
          <div class="titles">
            <span>本月惠及实际学生人</span>
            <div></div>
          </div>
          <div class="iptBox">
            <div>
              <div>
                <p>农村留守儿童：10人</p>
              </div>
              <div>
                <p>非寄宿贫困学生：50人</p>
              </div>
              <div>
                <p>免费提供人数：100人</p>
              </div>
            </div>
          </div>
          <div class="allNum">合计：人次</div>
          <div class="titles">
            <span>本月投入计划投入资金</span>
            <div></div>
          </div>
          <div class="iptBox">
            <div>
              <div>
                <p>本月午餐投入资金（元）：80人</p>
              </div>
              <div>
                <p>本月蛋奶投入资金（元）：90人</p>
              </div>
              <div>
                <p>本月其他食品投入资金（元）：120人</p>
              </div>
            </div>
          </div>
          <div class="allNum">合计：元</div>
       </div>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    components:{
      goback
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/businessReform.scss';
</style>
