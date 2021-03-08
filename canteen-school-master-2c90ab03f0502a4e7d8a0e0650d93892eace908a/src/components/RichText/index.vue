<template>
  <div class="richBox">
    <a-spin :spinning="spinning">
    <quill-editor
        v-model="content"
        :options="editorOption"
        ref="QuillEditor">
    </quill-editor>
    </a-spin>
     <input type="file"
      ref="imgs"
      accept="image/*" class="uploads" style="display: none;" @change="uploadImgs">
      <input type="file"
       ref="videos"
       accept="video/*" class="upVideo" style="display: none;" @change="uploadVideo">
  </div>
</template>

<script>
 import {
   put
 } from "../../assets/js/upload.js"
 const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
      ]
  export default{
    props: {
       default_cont: {
         type: String,
         default: ''
       },
    },
    data(){
      return{
        spinning:false,
        content: '',
        editorOption: {
          placeholder:"请输入",
          modules: {
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar']
            },
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                    if (value) {
                      document.querySelector('.uploads').click()
                    } else {
                        this.quill.format('image', false);
                    }
                },
                'video':function(value){
                  if (value) {
                    document.querySelector('.upVideo').click()
                  } else {
                     this.quill.format('video', false);
                  }
                }
              }
            }
          }
        }
      }
    },
    mounted(){
      this.content = this.default_cont;
      this.$refs.QuillEditor.quill.blur();
    },
    methods:{
      getVal () {                     //返回内容
        return this.content
      },
      setVal(data){             //赋值
        this.content = data;
      },
      uploadImgs(e){            //上传图片
        var file = this.$refs.imgs.files[0];
        this.spinning = true
        this.upFile(file,'image')
      },
      uploadVideo(e){              //上传视频
        var file = this.$refs.videos.files[0];
        this.spinning = true
        this.upFile(file,'video')
      },
      upFile(file,type){
        put(parseInt(Math.random() * 10000) + file.name, file).then(result => {
          this.spinning = false
          this.insertImg(result.url,type)
        }).catch(e => {
          put(parseInt(Math.random() * 10000) + file.name, file).then(result => {
             this.spinning = false
             this.insertImg(result.url,type)
          })
        })
      },
      insertImg(url,type){         //插入图片
        var quill = this.$refs.QuillEditor.quill;
        let length = quill.getSelection().index;
        quill.insertEmbed(length,type,url);
        quill.setSelection(length+1);
      }
    }
  }
</script>
<style>
  p {
    margin: 10px;
  }
  .edit_container,
  .quill-editor {
    height: 300px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
  }
</style>
<style scoped="scoped" lang="scss">
.richBox{
  width: 95% !important;
  .quill-editor{
    width: 100% !important;
    height: 600px;
  }
}

</style>
