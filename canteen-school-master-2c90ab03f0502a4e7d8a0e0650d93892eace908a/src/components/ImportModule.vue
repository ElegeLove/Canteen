<template>
  <div style="display: none;">
     <input type="file" :accept="accept" ref="file" @change="getFile"/>
  </div>
</template>

<script>
  export default{
    props:{
      accept:{
        type:String,
        default:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      },
    },
    methods:{
      upFile(num){
        this.$refs.file.click()
      },
      getFile(e){
        let inputDOM = this.$refs.file.files[0];
        this.$emit("getFiles",inputDOM)
        this.$refs.file.value = ""
      }
    }
  }
</script>

<style>
</style>
