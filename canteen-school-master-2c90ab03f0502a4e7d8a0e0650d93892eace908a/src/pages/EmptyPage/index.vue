<template>
    <div class="box">
      <p class="titles">404</p>
      <div class="eve">
        <div class="eve-face">
          <div class="eve-skin">
            <div class="left-eye">
              <div class="pupil"></div>
            </div>
            <div class="right-eye">
              <div class="pupil"></div>
            </div>
          </div>
        </div>
        <div class="eve-body"></div>
        <div class="eve-left-hand"></div>
        <div class="eve-right-hand"></div>
      </div>
      <div class='container'  @click="goBack">
       <div class='btn'>
           返回
       </div>
      </div>
    </div>
</template>

<script>
  export default{
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/EmptyPage.scss';
</style>
