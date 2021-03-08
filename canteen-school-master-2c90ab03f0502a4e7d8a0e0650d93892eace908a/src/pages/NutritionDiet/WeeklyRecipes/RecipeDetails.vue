<template>
  <div>
     <backs title="食谱详情"/>
     <div class="boxs">
        <div class="tops">
          <p>{{allData.title}}</p>
          <div class="tim">
            <span>发送时间：</span>
            <div>{{allData.create_time_txt}}</div>
          </div>
          <div class="doc">
             <span>附件：</span>
             <!-- <p>{{item}}</p> -->
             <div>
               <viewer :images="allData.recipes_file">
                 <img :src="item" v-for="(item,index) in allData.recipes_file" :key="index"/>
               </viewer>
             </div>
             <!-- <a-button @click="dowms(item.url)">下载</a-button> -->
          </div>
        </div>
        <div class="cont" v-html="allData.explain">

        </div>
     </div>
  </div>
</template>

<script>//
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:{}
      }
    },
    components:{
      backs
    },
    created(){
       this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){         //获取详情
        this.$http.RecipesRecommendedRecipesInfo({id}).then((res)=>{
          if(res.code==1){
            this.allData = res.data;
            // var arr = []
            // this.allData.recipes_file.forEach((item)=>{
            //   arr.push({name:decodeURI(this.$commonJs.getType(item)),url:item})
            // })
            //  this.allData.recipes_file = arr;
          }
        })
      },
      dowms(item){        //下载
        window.open(item)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/WeeklyRecipes/RecipeDetails.scss';
</style>
