<template>
  <div>
    <div class="fixeds">
      <el-upload class="upload-demo" action="" :on-change="handleChange" :on-remove="handleRemove" :on-exceed="handleExceed"
        :limit="limitUpload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
        <el-button type="primary">导入表格</el-button>
      </el-upload>
      <el-button type="primary" @click="exportExcel">导出表格</el-button>
      <el-button type="primary" @click="pringTab">打印</el-button>
    </div>
  </div>
</template>

<script>
  import print from "print-js"
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '张山',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '李四',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王五',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
        limitUpload: 1,
      }
    },
    created() {
      const loading = this.$loading({
        lock: true,
        text: '努力加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 700);
    },
    methods: {
      pringTab(){
          printJS({
                printable: 'printCons',
                type: 'html',
                //properties: [
                //    { field: 'name', displayName: '姓名', columnSize:`50%`},
                //    { field: 'sex', displayName: '性别',columnSize:`50%`},
                //],
                // header: `<p class="custom-p"> 名单 </p>`,
                // style: '#printCons {width: 600px;} ',
                // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
                // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
                // repeatTableHeader: true,
                // scanStyles:true,
                targetStyles: ['*'],
                ignoreElements:['no-print','bc','gb']
            })
      },
      exportExcel() { //导出excel
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('../outExcel/Export2Excel'); //注意这个Export2Excel路径
          const tHeader = ['日期', '地区', '姓名']; // 上面设置Excel的表格第一行的标题
          const filterVal = ['date', 'province', 'name']; // 上面的index、nickName、name是tableData里对象的属性key值
          const list = this.tableData; //把要导出的数据tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data,merges,'列表excel'); //最后一个是表名字
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },



      handleSelectionChange(e) {
        console.log(e)
      },
      handleChange(file, fileList) { //导入excel获取数据
        this.fileTemp = file.raw;
        if (this.fileTemp) {
          if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
            (this.fileTemp.type == 'application/vnd.ms-excel')) {
            this.importfxx(this.fileTemp);
          } else {
            this.$message({
              type: 'warning',
              message: '附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请上传附件！'
          })
        }
      },
      //超出最大上传文件数量时的处理方法
      handleExceed() {
        this.$message({
          type: 'warning',
          message: '超出最大上传文件数量的限制！'
        })
        return;
      },
      //移除文件的操作方法
      handleRemove(file, fileList) {
        this.fileTemp = null
      },
      importfxx(obj) {
        let _this = this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据

        this.file = event.currentTarget.files[0];

        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;

        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
            console.log('未处理的原始数据如下：');
            console.log(outdata);
            //此处可对数据进行处理
            let arr = [];
            outdata.map(v => {
              let obj = {}
              obj.code = v['Code']
              obj.name = v['Name']
              obj.pro = v['province']
              obj.cit = v['city']
              obj.dis = v['district']
              arr.push(obj)
            });
            _this.da = arr;
            _this.dalen = arr.length;
            return arr;
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
.fixeds{
  display: flex;
  align-items: center;
  button{
    margin-right: 20px;
  }
}
</style>
