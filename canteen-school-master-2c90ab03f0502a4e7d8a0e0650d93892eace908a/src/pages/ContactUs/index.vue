<template>
  <div class="box">
     <div class="tophead">
        <img src="../../assets/image/callLogo.png" />
        <div>
           <div>开中校</div>
           <span>客服在线时间：工作日09:00-18:00</span>
           <span>服务热线：400-500-600</span>
        </div>
     </div>
     <a-row class="cont">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
           <div class="codeBox">
              <div class="phoneCode">
                <img src="../../assets/image/ic_wx@2x.png" />
                <span>15826388370</span>
                <input type="text" v-model="videCode" id="copyInp" class="hisddens"/>
                <div @click="copys">点击复制</div>
              </div>
              <img src="../../assets/image/codes.jpg" class="saoCode"/>
           </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="codeBox">
            <div class="phoneCode">
                <img src="../../assets/image/ic_qq@2x.png" />
                <span>15826388370</span>
                <div @click="copys">点击复制</div>
              </div>
              <img src="../../assets/image/codes.jpg" class="saoCode"/>
          </div>
        </a-col>
      </a-row>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        videCode:"1582388340"
      }
    },
    methods:{
      copys(){
        var input = document.getElementById("copyInp");
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        this.$message.success(
          '复制成功',
          10,
        );
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/ContactUs.scss';
</style>
