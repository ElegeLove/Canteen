import { mapState,mapMutations,mapActions} from 'vuex';

1\获取state
computed: {
     ...mapState(['token'])
}

2\调用Mutations和Actions
methods:{
  ...mapMutations(['setToken']),
  ...mapActions(["mouSetToken"])
}

使用:this.mouSetToken("kos")

 //原始旧方法
   // this.$store.commit("setToken","更新了")      //触发mutations
   // this.$store.dispatch("mouSetToken","12")           //触发action
