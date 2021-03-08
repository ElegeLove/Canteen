<template>
  <div class="up_box">
    <a-upload
       :action="config.endpoint"
       :data="config"
       :accept="accept"
       list-type="picture-card"
       :file-list="fileList"
       @change="uploads"
       @preview="handlePreview"
       :beforeUpload="beforeUpload"
     >
       <slot v-if="fileList.length<max_num"></slot>
   </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
     <img alt="example" style="width: 100%" :src="previewImage" />
   </a-modal>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  export default{
    name: 'uploads',
    props:{
      accept:{
        type:String,
        default:"image/*"
      },
      max_num:{
        type:Number,
        default:100
      },
      de_fileList:{
        type:Array,
        default: function () {
          return []
        }
      }
    },
    data(){
      return{
        fileList:[],
        config:{
          accessKeyId:"STS.NUtQSCVJ1wsDtxZG2UzqeUt1o",
          bucket:"campus-canteen",
          accessKeySecret:"9xbNkA7TnhfQ3aiqGrnbZj6fLhEdTvnnreNAstjYqcBs",
          endpoint:"https://school-canteen.oss-cn-hangzhou.aliyuncs.com",
          key:"default.png",
          stsToken:"CAIS+wF1q6Ft5B2yfSjIr5bBGun3u5UQwLGvdl7rozIAdv5JurGajTz2IH1KeXNpBewYs/k2mGpU6P4ZlqJ4T55IQ1Dza8J148zeeKh+y8yT1fau5Jko1beHewHKeTOZsebWZ+LmNqC/Ht6md1HDkAJq3LL+bk/Mdle5MJqP+/UFB5ZtKWveVzddA8pMLQZPsdITMWCrVcygKRn3mGHdfiEK00he8TojuPznmJPBtEaH3Qeim7Uvyt6vcsT+Xa5FJ4xiVtq55utye5fa3TRYgxowr/oo0fYdpWuZ44zEXwMNvU3dKZPJ6tloJQN3Z6w3AKtJqfLxj+3MXEZ7QglNoRqAAReDpx2cOSP/66qTTeQdxPmxNws+OShx7gW+cE49TvRtkS+hDN/kYowP2k2PUFZ7ZXxAhiUa0s882ZGgi7WzxZUqC8Z28vMKi1JYWBWJwJwXPCanKcBLRNND/Ra+BlxN5iPVWxGrPhwAp8CPAV+45wuKCq06jiXvagb7UJRPGT8x"
          ,success_action_status:201
        },
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
    computed: {
      ...mapState(['uploadConfig'])
    },
    mounted(){
       if(this.uploadConfig){       //上传配置信息
         var {AccessKeyId,bucket,AccessKeySecret,endpoint,SecurityToken} = this.uploadConfig
         this.config = {
           accessKeyId:AccessKeyId,
           bucket:bucket,
           accessKeySecret:AccessKeySecret,
           endpoint:endpoint,
           key:"default.png",
           stsToken:SecurityToken,
           success_action_status:201
         }
       }
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
      beforeUpload(e){        //上传之前
        this.config.key = e.name
      },
      uploads(e){        //上传中
        var fileList = e.fileList
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = this.config.endpoint+'/'+this.config.key
          }
          return file;
        });
        this.fileList = e.fileList
        if(e.file.status=="done"&&e.file.response){
          this.$emit('getImg',this.fileList)
        }else if(e.file.status=="removed"){
          this.$emit('getImg',this.fileList)
        }
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
</style>
