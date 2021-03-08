<template>
  <div class="up_box">
    <a-upload
       :accept="accept"
       list-type="picture-card"
       :file-list="fileList"
       @preview="handlePreview"
       :customRequest="customRequest"
       :remove="removes"
       :multiple="multiple"
     >
       <slot v-if="fileList.length<max_num"></slot>
   </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
     <img alt="example" style="width: 100%" :src="previewImage" />
   </a-modal>
  </div>
</template>

<script>
  import {
    put
  } from "../../assets/js/upload.js"
  export default{
    name: 'uploads',
    props:{
      accept:{
        type:String,
        default:"image/*"
      },
      max_num:{
        type:Number,
        default:1
      },
      de_fileList:{
        type:Array,
        default: function () {
          return []
        }
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        fileList:[],
        previewVisible: false,
        previewImage: '',
      }
    },
    watch: {
      de_fileList:{ //深度监听，可监听到对象、数组的变化
        handler (newV, oldV) {
          this.fileList = newV
        },
        immediate:true
       }
    },
    created(){
    },
    methods:{
      handleCancel() {
        this.previewVisible = false;
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },
      customRequest(action) {
        if(this.max_num!==-1){
         if (this.fileList.length >= this.max_num) {
           return this.$message.error('最多只能上传' + this.max_num + "个文件")
         }
        }
        const file = action.file;
        var fileName = parseInt(Math.random() * 10000) + file.name;
        this.fileList.push({
          uid:this.$commonJs.randoms(),
          name: fileName,
          status:'uploading',
          url: ""
        })
        put(fileName, file).then(result => {
          this.fileList.forEach((it) => {
            if (it.name == fileName) {
              it.url = result.url
              it.status = "done"
            }
          })
          this.$emit("getImg",this.fileList)
        }).catch(e => {
          put(fileName, file).then(result => {
            this.fileList.forEach((it) => {
              if (it.name == fileName) {
                it.url = result.url
                it.status = "done"
              }
            })
            this.$emit("getImg",this.fileList)
          })
        })
      },
      removes(e){          //删除
        this.fileList.forEach((item,index)=>{
          if(item.uid==e.uid){
             this.fileList.splice(index,1)
          }
        })
         this.$emit("getImg",this.fileList)
      }
    }
  }
</script>

<style lang="scss">
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.ant-upload-picture-card-wrapper{
  display: flex;
  flex-wrap: wrap;
}
.up_box{
  width: 100%;
}
.cardsOne{
  width: 169px;
  height: 110px;
  border-radius: 5px;
  background: url(../../assets/image/cardOne.png) 100% 100% no-repeat;
  background-size: cover;
  overflow: hidden;
  >div{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #fff !important;
    >i,>div{
      color: #fff !important;
    }
    >div{
      font-weight: bold;
      font-size: 16px;
    }
  }
}
.cardsTwo{
  background: url(../../assets/image/cardTwo.png) 100% 100% no-repeat;
  background-size: cover;
}
</style>
