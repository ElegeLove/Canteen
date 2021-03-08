<template>
  <div class="allPads">
    <a-spin :spinning="spinning">
      <div class="messageList"  @click="lookAll" v-for="(item,index) in lists" :key="index">
          <div class="rig">
            <div class="danshen">{{item.content}}</div>
            <div>{{item.create_time}}</div>
          </div>
      </div>
      <a-empty v-if="lists.length==0" description="暂无消息"/>
      <div class="lookAll" @click="lookAll">
         <span>查看全部</span>
         <a-icon type="right" />
      </div>
    </a-spin>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        lists:[],
        spinning:true
      }
    },
    props:["dataIx"],
    created(){
      this.getList(1)
    },
    methods:{
      getList(e){         //获取数据   1是系统  2是预警
        this.spinning = true;
        var posts = e==1?'MessageIndex':'WarningIndex'
        this.$http[posts]().then((res)=>{
          this.spinning = false;
          if(res.code==1){
            var lists = JSON.parse(JSON.stringify(res.data.list));
            this.lists = lists;
          }
        })
      },
      lookAll(){           //查看全部
        this.$emit("messCheck",'messShow')
        if(this.dataIx==1){           //通知
          this.$router.push({path:"/ManagementPanel/t_NoticeNotice"})
        }else{              //预警
          this.$router.push({path:"/ManagementPanel/t_WarningNotice"})
        }
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.messageList{
  cursor: pointer;
  display: flex;
  height: 70px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  >.lef{
    margin-right: 10px;
    img{
      width: 40px;
      height: 40px;
    }
  }
  >.rig{
    font-size: 14px;
    >div{
      max-width: 240px;
    }
    >div:nth-of-type(1){
      font-size: 16px;
    }
  }
}
.lookAll{
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  height: 50px;
  >span{
    margin-bottom: 3px;
    margin-right: 7px;
  }
  justify-content: center;
}
.allPads{
  box-sizing: border-box;
  padding:0px 10px 0 10px;
}
</style>
