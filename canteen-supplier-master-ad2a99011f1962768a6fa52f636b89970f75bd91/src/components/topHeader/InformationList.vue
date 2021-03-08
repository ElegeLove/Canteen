<template>
  <div class="allPads">
      <div class="messageList"  @click="lookAll" v-for="(item,index) in datas" :key="index">
          <div class="rig">
            <div class="danshen">{{item.content}}</div>
            <div>{{item.create_time}}</div>
          </div>
      </div>
      <a-empty v-if="datas.length==0" description="暂无消息"/>
      <div class="lookAll" @click="lookAll">
         <span>查看全部</span>
         <a-icon type="right" />
      </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    props:["datas"],
    methods:{
      lookAll(){           //查看全部
        this.$emit("messCheck",'messShow')
        localStorage.setItem('openKey','work_items')
        localStorage.setItem('cheakKey','Announcement')
         this.$router.push({
        	path: '/BusinessTraining/Announcement',
        	query: { type: '0'}
        });
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
