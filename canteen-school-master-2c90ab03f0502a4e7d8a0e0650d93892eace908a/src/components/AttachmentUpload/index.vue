<template>
  <div class="upBox">
    <a-upload
     name="avatar"
    :multiple="multiple"
    :accept="accept"
    :file-list="fileArr"
    :remove="removes"
    class="avatar-uploader uplods"
     :customRequest="customRequest"
     >
      <a-button> <a-icon type="upload" />上传文件</a-button>
    </a-upload>
  </div>
</template>

<script>
  import {
    put
  } from "../../assets/js/upload.js"
  export default {
    props: {
      max: {
        type: Number,
        default: 1
      },
      multiple: {
        type: Boolean,
        default: true
      },
      accept:{
        type:String,
        default:".xls,.xlsx,.doc,.docx"
      },
      de_fileList:{
        type:Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        fileArr: []
      }
    },
    mounted(){
       this.fileArr = this.de_fileList
    },
    methods: {
      setlists(data){             //赋值数据
        this.fileArr = data;
      },
      customRequest(action) {
        if(this.max!==-1){
         if (this.fileArr.length >= this.max) {
           return this.$message.error('最多只能上传' + this.max + "个文件")
         }
        }
        const file = action.file;
        var fileName = parseInt(Math.random() * 10000) + file.name;
        this.fileArr.push({
          uid:this.$commonJs.randoms(),
          name: fileName,
          status:'uploading',
          url: ""
        })
        put(fileName, file).then(result => {
          this.fileArr.forEach((it) => {
            if (it.name == fileName) {
              it.url = result.url
              it.status = "done"
            }
          })
          this.$emit("getFile",this.fileArr)
        }).catch(e => {
          put(fileName, file).then(result => {
            this.fileArr.forEach((it) => {
              if (it.name == fileName) {
                it.url = result.url
                it.status = "done"
              }
            })
            this.$emit("getFile",this.fileArr)
          })
        })
      },
      removes(e){          //删除
        this.fileArr.forEach((item,index)=>{
          if(item.uid==e.uid){
             this.fileArr.splice(index,1)
          }
        })
         this.$emit("getFile",this.fileArr)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
/deep/ .ant-upload-list{
  width: 250px !important;
}
</style>
