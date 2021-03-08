<template>
  <div class="padd">
    <div class="searchBo">
      <div>
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
      <div>
        <span>状态：</span>
        <a-select
            label-in-value
            :default-value="{ key: '全部' }"
            style="width: 150px"
          >
            <a-select-option :value="item" v-for="(item,index) in semester" :key="index">{{item}}</a-select-option>
        </a-select>
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
              <a-button type="primary" @click="Live(1)" v-if="index==0">开启直播</a-button>
              <a-button type="primary" @click="Live(2)" v-else>关闭直播</a-button>
            </div>
          </div>
        </a-col>
     </a-row>
     <a-modal
       v-model="liveShow"
       :title="liveType==1?'对象选择':'确认关闭'"
       centered
       @ok="openSub"
     >
      <div class="quitSele" v-if="liveType==1">
        <span>公示至：</span>
        <a-select placeholder="请选择公示对象" style="width: 220px">
          <a-select-option :value="item" v-for="(item,index) in semester" :key="index">{{item}}</a-select-option>
        </a-select>
      </div>
      <p v-else class="closeTxt">关闭后他人将无法观看此摄像头直播画面</p>
     </a-modal>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        semester:["全部","1学期"],
        liveShow:false,
        liveType:""
      }
    },
    methods:{
      Live(type){             //开启直播
        this.liveType = type
        this.liveShow = true;
      },
      openSub(){
        this.liveShow = false;
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/BrightKitchen/LiveBroadcast/index.scss';
</style>
