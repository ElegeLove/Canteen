<template>
  <div>
    <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" title="查看详情" @back="() => this.$router.back()" />
    <div class="boxss">
       <a-row>
         <a-col class="modulesBox">
            <div>
              <div class="txtBox">
                <span>用户名（登录账号）：</span>
                <div>{{allData.username}}</div>
              </div>
              <div class="txtBox">
                <span>职位权限：</span>
                <div>{{allData.role_name}}</div>
              </div>
              <div class="txtBox">
                <span>手机号码：</span>
                <div>{{allData.mobile}}</div>
              </div>
              <div class="txtBox">
                <span>登录密码：</span>
                <div>*****</div>
              </div>
              <div class="txtBox">
                <span>用户状态：</span>
                <div>{{allData.status==0?'禁用':'启用'}}</div>
              </div>
				<div class="txtBox">
				  <span>管理范围：{{allData.relation_school.length==0?'全部学校':''}}</span>
				</div>
			  <div class="table_box" v-if="allData.relation_school.length!=0">
			    <a-table
			    :pagination="false"
			    :rowKey="(record,index)=>{return record.id}"
			    bordered
			    :data-source="item"
			    :columns="columns"
			    v-for="(item,index) in show_tab"
			    :key="index"
			    >
			    </a-table>
			  </div>
            </div>
         </a-col>
       </a-row>
    </div>
  </div>
</template>

<script> 
  export default{
    data(){
      return{
        allData:{
			relation_school:[]
		},
		columns: [{
		    title: '学校代码',
		    dataIndex: 'code',
		    align: "center",
		    key: "code",
		  },
		  {
		    title: '学校名称',
		    dataIndex: 'abbreviation',
		    align: "center",
		    key: "abbreviation",
		  }
		],
		show_tab:[[],[]]
      }
    }, 
    created(){
      this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){
        // this.$store.commit("setLoaing",true)
        this.$http.RoleUserDetails({id}).then((res)=>{
           // this.$store.commit("setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
			this.subNums()
          }
        })
      },
	  subNums(){            //分割数
		  var len = this.allData.relation_school.length/2;
		  var nums = 0
		  if (parseInt(len) === parseFloat(len)){
		    nums = len;
		  }else{
		    nums = len+0.5
		  }
		  this.show_tab = this.group(this.allData.relation_school,nums);
	  },
	  group(array, subGroupLength) {      //切割数据
	      let index = 0;
	      let newArray = [];
	      while(index < array.length) {
	          newArray.push(array.slice(index, index += subGroupLength));
	      }
	      return newArray;
	  },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/ConfigurationManagement/UserManagement/lookDetails.scss';
</style>
