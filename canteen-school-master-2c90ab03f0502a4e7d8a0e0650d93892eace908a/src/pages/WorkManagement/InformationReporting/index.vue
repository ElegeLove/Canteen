<template>
  <div class="alls">
    <div class="boxs" v-for="(item,index) in boxData" :key="index">
      <p>{{item.title}}</p>
      <div class="tit_box">
        <span class="bg_color"></span>
        <div>当前：{{item.nows}}</div>
      </div>
      <a-row class="lists">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" :xxl="4" v-for="(it,ix) in item.arr"
        :key="ix">
          <img src="../../../assets/image/overs.png"  v-if="it.status==1"/>
          <img src="../../../assets/image/faile.png" v-else/>
          <div @click="goRoute(it)" :class="{'success':it.status==1,'faile':it.status==0}">
            <img :src="it.icon" />
            <span>{{it.name}}</span>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boxData: [{
            title: "每月上报",
            nows:'9月',
            arr: [
              {
                icon: require('../../../assets/image/ic_xxgk@2x.png'),
                name: "信息公开",
                route: "Disclosure",
                status:1,
                keys:"information_disclosure"
              },
              {
                icon: require('../../../assets/image/ic_gzjl@2x.png'),
                name: "工作记录",
                route: "t_WorkRecord",
                status:1,
                keys:"work_record"
              },
              {
                icon: require('../../../assets/image/ic_ygbb@2x.png'),
                name: "营改月报表",
                route:'t_BusinessPlan/t_ReportForm',
                status:1,
                keys:"nutrition_month"
              },
              // {
              //   icon: require('../../../assets/image/ic_sfgl@2x.png'),
              //   name: "收费管理",
              //   route:"t_ChargeManagement",
              //   status:1,
              //   keys:"charge"
              // },
              {
                icon: require('../../../assets/image/baos.png'),
                name: "支出结构报表",
                route:"t_ExpenditureStructure",
                status:1,
                keys:"charge"
              }
            ]
          },
          {
            title: "每学期上报",
            nows:'2020秋季学期',
            arr: [
              {
                icon: require('../../../assets/image/ic_xxqk@2x.png'),
                name: "学校基本情况",
                route: "t_BasicInformation",
                status:1,
                keys:"school"
              },
              {
                icon: require('../../../assets/image/ic_stzz@2x.png'),
                name: "食堂组织机构",
                route:"t_CanteenOrganization",
                status:1,
                keys:"canteen_organization"
              },
              {
               icon: require('../../../assets/image/ic_ddgy@2x.png'),
                name: "定点供应商",
                route:"t_DesignatedSupplier",
                status:1,
                keys:"designated_supplier"
              }, {
                icon: require('../../../assets/image/shop.png'),
                name: "超市管理",
                route:"t_OvertimeManagement",
                status:1,
                keys:"supermarket"
              }, {
                icon: require('../../../assets/image/ic_zys@2x.png'),
                name: "直饮水",
                route:"t_DrinkingWater",
                status:1,
                keys:"direct_drinking_water"
              }, {
                icon: require('../../../assets/image/ic_qsgl@2x.png'),
                name: "寝室管理",
                route:"t_DormitoryManagement",
                status:1,
                keys:"dormitory"
              },
              {
                icon: require('../../../assets/image/iconZhi.png'),
                name: "制度建设",
                route: "t_SystemConstruction",
                status:1,
                keys:"system_construction"
              },
              {
                icon: require('../../../assets/image/conXU.png'),
                name: "许可管理",
                route: "t_LicenseManagement",
                status:1,
                keys:"license"
              },
              {
                icon: require('../../../assets/image/ic_csgl@2x.png'),
                name: "场所管理",
                route:"t_SiteManagement",
                status:1,
                keys:"site"
              },
              {
                icon: require('../../../assets/image/ic_zybzd@2x.png'),
                name: "作业本征订",
                route: "t_BookSubIndex",
                status:1,
                keys:"exercise_book"
              },
               {
                icon: require('../../../assets/image/ic_ygjh@2x.png'),
                name: "营改花名册",
                route: "t_BusinessPlan",
                status:1,
                keys:"nutrition_roster"
              },
               {
                icon: require('../../../assets/image/wesd.png'),
                name: "劳务人员管理",
                route:"t_LaborPersonnel",
                status:1,
                keys:"labor"
              },
            ]
          }
        ]
      }
    },
    created(){
      localStorage.removeItem("routesKey");
      this.getLoad()
    },
    methods: {
      getLoad(){          //获取数据
        this.$store.commit("sch_setLoaing",true)
        this.$http.InformationIndex().then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          var topArr = ["information_disclosure","work_record","nutrition_month","charge"]
          var botArr = ["school","canteen_organization","designated_supplier","supermarket","direct_drinking_water","dormitory","system_construction",
              "license","site","exercise_book","nutrition_roster","labor"
          ]
          if(res.code==1){
            this.boxData[0].nows = res.data.month;
            this.boxData[1].nows = res.data.semester;
            this.boxData.forEach((item)=>{
              item.arr.forEach((it)=>{
                it.status = res.data[it.keys]
              })
            })
          }
        })
      },
      goRoute(item) {
        this.$router.push({
          path: "/ManagementPanel/" + item.route
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/InformationReporting/index.scss';
</style>
