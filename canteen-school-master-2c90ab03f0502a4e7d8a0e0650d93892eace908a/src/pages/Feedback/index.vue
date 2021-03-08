<template>
  <div>
     <div class="tops">
        <span>帮助中心</span>
        <div>/</div>
        <span>意见反馈</span>
     </div>
     <div class="contentss">
        <div class="titles">反馈内容</div>
        <div class="conts">
            <textarea placeholder="您的每一条意见我们都将认真阅读" :rows="13" />
            <div class="uploads">
               <up-file @getImg="getImg" :max_num="3" :multiple="true">
                   <div>
                     <a-icon type="plus" />
                     <div class="ant-upload-text">上传图片</div>
                   </div>
                </up-file>
            </div>
        </div>
     </div>
     <div class="radiosBox">
       <p>请选择您对系统的满意程度</p>
       <a-radio-group name="radioGroup" :default-value="1">
           <a-radio :value="1"><img src="../../assets/image/iconone.png" class="icon"/>非常好用</a-radio>
           <a-radio :value="2"><img src="../../assets/image/icontwo.png" class="icon"/>感觉一般</a-radio>
           <a-radio :value="3"><img src="../../assets/image/iconthree.png" class="icon"/>不太好用</a-radio>
           <a-radio :value="4"><img src="../../assets/image/iconfore.png" class="icon"/>不想用了</a-radio>
         </a-radio-group>
     </div>
      <a-button type="primary" class="btns">提交反馈</a-button>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        fileList:[]
      }
    },
    methods:{
      handleChange(e){

      },
      getImg(){

      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/Feedback.scss';
</style>
