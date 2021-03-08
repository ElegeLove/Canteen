<template>
  <div>
    <goback title="返回"/>
    <div class="boxs">
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
                <p>农村留守儿童</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>非寄宿贫困学生</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>免费提供人数</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
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
                <p>农村留守儿童</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>非寄宿贫困学生</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>免费提供人数</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
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
                <p>农村留守儿童</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>非寄宿贫困学生</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>免费提供人数</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
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
                <p>农村留守儿童</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>非寄宿贫困学生</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
              </div>
              <div>
                <p>免费提供人数</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>人</span>
                </div>
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
                <p>本月午餐投入资金（元）</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>元</span>
                </div>
              </div>
              <div>
                <p>本月蛋奶投入资金（元）</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>元</span>
                </div>
              </div>
              <div>
                <p>本月其他食品投入资金（元）</p>
                <div>
                  <a-input placeholder="请输入" />
                  <span>元</span>
                </div>
              </div>
            </div>
          </div>
          <div class="allNum">合计：元</div>
          <div class="btnBox">
            <a-button>取消</a-button>
            <a-button type="primary" html-type="submit">提交</a-button>
          </div>
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
