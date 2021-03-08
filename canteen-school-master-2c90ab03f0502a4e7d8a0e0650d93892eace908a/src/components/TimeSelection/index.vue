<template>
  <div class="selecs">
    <span>{{title}}：</span>
    <a-date-picker
       v-model="start_time"
      :disabled-date="disabledStartDate"
      valueFormat="YYYY-MM-DD"
      placeholder="选择日期"
      @openChange="handleStartOpenChange"
      @change="getTim"
    />
    <p class="liness">—</p>
    <a-date-picker
      v-model="end_time"
      :disabled-date="disabledEndDate"
      valueFormat="YYYY-MM-DD"
      placeholder="选择日期"
      :open="endOpen"
      @openChange="handleEndOpenChange"
      @change="getTim"
    />
  </div>
</template>

<script>
  import moment from "moment";
  export default{
    props:["title"],
    data(){
      return{
        start_time:null,
        end_time:null,
        endOpen: false
      }
    },
    methods:{
      handleStartOpenChange(open) {
        if (!open) {
          this.endOpen = true;
        }
      },
      handleEndOpenChange(open) {
        this.endOpen = open;
      },
      disabledEndDate(endValue) {
        const startValue = moment(this.start_time);
        if (!endValue || !startValue) {
          return false;
        }
        return startValue.valueOf() >= endValue.valueOf();
      },
      disabledStartDate(startValue) {
        const endValue = moment(this.end_time);
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      },
      getTim(){
        this.$emit('getTims',{start_time:this.start_time,end_time:this.end_time});
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.selecs{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right:30px ;
  >p,>span{
    white-space: nowrap;
    font-size: 14px;
    margin-bottom: 0;
    color: #333333;
  }
  >input{
    width: 180px;
  }
  >.ant-calendar-picker{
    width: 180px;
  }
}
.liness{
  width: 30px !important;
  text-align: center;
}
</style>
