<template>
  <div>
    <goback title="返回"/>
    <div class="padBox" v-if="scanf.length!==0">
      <div class="top_box">
        <div>
          <span>学校：xx学校</span>
        </div>
        <div>
          <span>学期：1学期</span>
        </div>
      </div>
      <div>
        <div class="titles">
          <span>生活饮水情况</span>
          <div></div>
        </div>
        <div class="contBox">
          <div class="lefs">
            <p>供水方式：{{allData.water_supply_mode_text}}</p>
            <div @click="goStaff">填写信息 / 修改</div>
          </div>
          <div class="rigs">
            <div>
              <img v-lazy="allData.water_certificate" @click="openImg(allData.water_certificate)"/>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="titles">
          <span>食品经营许可证信息</span>
          <div></div>
        </div>
        <div class="contBox">
          <div class="lefs">
            <p>许可证编号：{{allData.license_number}}</p>
            <p>许可项目：{{allData.license_projects}}</p>
            <p>有效起始日期：{{allData.start_time}}  至  {{allData.end_time}}</p>
            <div @click="goStaff">填写信息 / 修改</div>
          </div>
          <div class="rigs newIm">
            <div>
              <img v-lazy="allData.license_certificate" />
            </div>
          </div>
        </div>
      </div>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" @click="openImg(allData.license_certificate)"/>
      </a-modal>
    </div>
    <emptynum titles="暂无食堂" v-if="loadAll&&scanf.length==0">
       ，<span class="main_color adds" @click="goStaff">请前往添加</span>
    </emptynum>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  import emptynum from "../../../../components/EmptyNum/index.vue"
  export default{
    data(){
      return{
        typekey:0,
        scanf:[],
        allData:{},
        previewVisible: false,
        previewImage:'',
        loadAll:false,            //是否加载完成
        semester:["1学期"],
      }
    },
    components:{
      goback,emptynum
    },
    methods:{
      goStaff(){       //填写修改
        this.$router.push({path:"/ManagementPanel/CanteenStaff"})
      },
      getTab(){         //获取食堂
        this.$http.CommonGetCanteen().then((res)=>{
          if(res.code==1){
            this.scanf = res.data
            this.loadAll = true
            if(res.data.length!==0){
              this.getDetaile(res.data[0].id)
            }
          }
        })
      },
      getDetaile(id){          //获取详情
        this.$store.commit("sch_setLoaing",true)
         this.$http.CanteenInfo({id}).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
           if(res.code==1){
             this.allData = res.data
           }
         })
      },
      handleCancel(){
         this.previewVisible = false;
      },
      openImg(url){       //打开图片
        if(url==""){
          return false;
        }
       this.previewImage = url;
       this.previewVisible = true;
      },
    },
    created(){
      this.getTab()
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/LicenseManagement/index.scss';
</style>
