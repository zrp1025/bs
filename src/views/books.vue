<template>
  <div>
    <OneBookShow :book="bookList" :imgb="bookList.image" />
  </div>

</template>
<script>
import axios from 'axios'
import OneBookShow from './oneBookShow'
  export default{
    data(){
      return {
        bookList:[],
        id:'',
        img:'',
      }
    },
    components:{
      axios,
      OneBookShow
    },
    computed:{

    },
    methods:{
      init(){
        this.id = this.$route.query.id;
      },
      getBookList() {
        axios.get('/v2/book/'+this.id)
        .then( (response) =>{
          console.log(response.data);
          this.bookList=response.data;

        })
        .catch(function (error) {
          console.log(error);
        });
      },

    },
    mounted(){
      this.init();
      this.getBookList();

    },

  }
</script>
<style scoped>

</style>
