<template>
  <div class="emptys" v-else>
    <img src="../../assets/image/noSearch.png" />
    <p>{{titles}}<slot></slot></p>
  </div>
</template>

<script>
  export default{
    props:["titles"]
  }
</script>

<style scoped="scoped" lang="scss">
.emptys{
  width: 100%;
  height: 100%;
  flex-direction: column;
  display:flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  >img{
    margin-top: 60px;
    width: 186px;
    height: 180px;
  }
  >p{
    font-size: 14px;
    color: #999999;
    margin-top: 40px;
  }
}

</style>
