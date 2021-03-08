<template>
  <a-page-header
    class="headers"
    :title="title"
    :sub-title="subtit"
    @back="() => $router.go(-1)"
  />
</template>

<script>
  export default{
    props:{
      title: {
        type: String,
        default: ""
      },
      subtit: {
        type: String,
        default: ""
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .headers{
    border: 1px solid rgb(235, 237, 240);
    height: 96px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 40px;
  }
  /deep/ .ant-page-header-heading-title{
    white-space: nowrap;
  }
  /deep/ .ant-page-header-heading-sub-title{
    font-size: 16px;
    color: #333333;
    margin-left: 20px;
  }
</style>
