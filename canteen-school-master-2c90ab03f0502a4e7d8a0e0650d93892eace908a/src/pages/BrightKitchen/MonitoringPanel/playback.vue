<template>
  <div class="playBack">
    <div>
        <div class="seles">
          <span>食堂：</span>
          <a-select
              label-in-value
              :default-value="{ key: '全部' }"
              style="width: 150px"
            >
              <a-select-option :value="item" v-for="(item,index) in semester" :key="index">{{item}}</a-select-option>
          </a-select>
        </div>
        <div class="topRig">
          <span>摄像头：</span>
          <a-input placeholder="区域名称/摄像头编号"/>
           <a-button type="primary">搜索</a-button>
        </div>
    </div>
    <a-row class="live_box">
       <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" :xxl="6" v-for="(item,index) in 6" :key="index">
         <div>
           <div class="liveScreen">
             <a-icon type="play-circle" />
           </div>
           <div class="conts">
             <p class="danshen">食堂1</p>
             <p class="danshen">蔬菜操作间</p>
             <p class="danshen">摄像头编号：526325</p>
           </div>
         </div>
       </a-col>
    </a-row>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        semester:["全部","1学期"],
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/BrightKitchen/MonitoringPanel/playback.scss';
</style>
