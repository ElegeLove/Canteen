<template>
   <div class="box" v-if="loading">
      <a-spin tip="加载中..." size="large">
      </a-spin>
    </div>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  export default{
    computed: {
      ...mapState(['loading'])
    },
  }
</script>

<style scoped="scoped">
.box{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11111111111;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.3);
}
</style>
