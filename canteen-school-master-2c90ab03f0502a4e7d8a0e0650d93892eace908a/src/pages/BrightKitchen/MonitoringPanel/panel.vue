<template>
  <div class="panels">
    <div class="seachBox">
      <div class="lefs">
        <div class="searBox">
          <span>食堂：</span>
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">食堂1</a-radio>
            <a-radio :value="2">食堂2</a-radio>
          </a-radio-group>
        </div>
        <div class="topRig">
          <span>摄像头：</span>
          <a-input placeholder="区域名称/摄像头编号"/>
           <a-button type="primary">搜索</a-button>
        </div>
      </div>
      <div class="timTxt">2019-06-18     15:20:15</div>
    </div>
    <video class="videos" controls="controls"></video>
  </div>
</template>

<script>
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/BrightKitchen/MonitoringPanel/index.scss';
</style>
