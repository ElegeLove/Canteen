<template>
  <div>
    <div class="flexAlls">
      <div class="flexBox">
        <div>
          <span>年份：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              v-model="postData.calendar_id"
              @change="searchs('mounth')"
            >
              <a-select-option :value="item.id" v-for="(item,index) in yearData" :key="index">{{item.year}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>月份：</span>
          <a-select
              default-value='全部'
              placeholder="请选择"
              v-model="postData.month"
              :disabled="postData.calendar_id==''?true:false"
               @change="searchs"
              style="width: 120px"
            >
              <a-select-option :value="item.id" v-for="(item,index) in mounths" :key="index">{{item.month_name}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>状态：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              placeholder="请选择"
              @change="searchs"
              v-model="postData.is_set"
            >
              <a-select-option :value="item.id" v-for="(item,index) in statusData" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="downTips">
        <span>注：请下载模板，根据模板填写进行上报</span>
        <a-button type="primary" @click="downLoads">下载模板</a-button>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
       :pagination="pagination"
        bordered
        @change="pageCheck"
        :rowKey="(record,index)=>{return index}"
       :loading="loading">
        <div slot="action" slot-scope="text,row" class="actiosn main_color">
          <span v-if="row.status==2" @click="whiteForm(row)">上报</span>
          <div v-else >
            <span @click="downLoa(row)">下载</span>
            <span @click="whiteForm(row)">重新上报</span>
          </div>
        </div>
     </a-table>
     <impmodule ref="upfile" @getFiles="getFile"/>
  </div>
</template>

<script>
  import impmodule from "../../../../components/ImportModule.vue"
  import {put} from "../../../../assets/js/upload.js"
  export default{
    data(){
      return{
        yearData:[{id:"",year:"全部"}],
        mounths:[],
        statusData:[{id:"",name:"全部"},{id:2,name:"未填写"},{id:1,name:"已填写"}],
        downloadUrl:"",             //模板
        columns:[
          { title: '年份', width: 200, dataIndex: 'year', key: 'year',align:"center",fixed: 'left',
            customRender: (value, row, index) => {
              return value+"年"
            }
          },
          { title: '月份', dataIndex: 'month', key: 'month', width: "50%",align:"center",
            customRender: (value, row, index) => {
              return value+"月"
            }
          },
          { title: '状态', dataIndex: 'status_text', key: 'status_text', width: "50%",align:"center" },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            align:"center",
            scopedSlots: { customRender: 'action' },
          },
        ],
        data:[],
        loading:true,
        pagination:{
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          calendar_id:"",
          month:undefined,
          is_set:""
        },
        upData:{        //上报的数据
          id:"",
          calendar_id:"",
          month:""
        }
      }
    },
    components:{
      impmodule
    },
    created(){
      this.getSearchs("year");
      this.getList();
      this.getDownUrl()
    },
    methods:{
      getDownUrl(call){           //获取模板
        this.$http.CommonDownloadTemplate().then((res)=>{
          if(res.code==1){
            this.downloadUrl = res.data.nutrition_month;
            if(call!==undefined){
              call()
            }
          }
        })
      },
      downLoads(){         //下载模板
        if(this.downloadUrl!==''){
          window.open(this.downloadUrl)
        }else{
          this.getDownUrl(()=>{
             window.open(this.downloadUrl)
          })
        }
      },
      getSearchs(type,id){           //获取搜索条件
         this.$http.RecipesGetSearchMonth({id}).then((res)=>{
            if(res.code==1){
              if(type=='year'){
                 this.yearData = this.yearData.concat(res.data);
              }else{
                var mounths = [{month:"",month_name:"全部"}]
                var newsd = JSON.parse(JSON.stringify(res.data))
                newsd.forEach((item)=>{
                  item.month_name = item.month
                })
                this.mounths = mounths.concat(newsd)
              }
            }
         })
      },
      searchs(type){            //搜索
        if(type=="mounth"){
          this.getSearchs('mounth',this.postData.calendar_id)
          this.postData.month = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.InformationNutritionMonthList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },

      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
      whiteForm(item){        //上报
        this.upData.id = item.id;
        this.upData.calendar_id = item.calendar_id;
        this.upData.month = item.month;
         this.$refs.upfile.upFile();
      },
      getFile(file){          //获取上报文件
          const hide = this.$message.loading('上传中', 0);
         var fileName = parseInt(Math.random() * 10000) + file.name;
         put(fileName, file).then(result => {
          var formData = new FormData();
          var {id,calendar_id,month} = this.upData;
          formData.append("id",id);
          formData.append("calendar_id",calendar_id);
          formData.append("month",month);
          formData.append("file_url",result.url);
          formData.append("file",file);
          this.$http.InformationNutritionMonth(formData).then((res)=>{
            setTimeout(hide, 0);
            if(res.code==1){
              this.getList()
            }
          }).catch(()=>{
            setTimeout(hide, 0);
          })
         }).catch(e => {
           setTimeout(hide, 0);
         })
      },
      downLoa(item){          //下载
        window.open(item.file)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/ImprovementPlan.scss';
</style>
