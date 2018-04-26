<template>
  <div class="booklist">
    <div class="featured">
      <div class="featuredtitle">
        <p id="p1">{{msg}}TOP100榜单</p>
        <p id="p2">Featured Products</p>
      </div>
      <div class="showbook">
        <div v-for="item in bookList">
          <book-show @toOneBook="toOneBook(item)" :imgb="item.images['large']" :name='item.title' :author='item.author[0]' :publisher='item.publisher' :price='item.price' @addcart="addcart(item)"></book-show>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookShow from '@/components/BookShow'

import axios from 'axios'
  export default{
    data(){
      return {
        msg:'',
        bookList:[],
        lastTag:''
      }
    },
    components:{
      BookShow
    },
    computed:{

    },
    watch:{
      msg:function(){
        // location.reload();
      }
    },
    methods:{
      init(){
        this.msg=this.$route.query.tag;
        this.lastTag=this.$route.query.tag;
      },
      getBookList(){
        axios.get('/v2/book/search?q='+this.msg+"&count=100&start=2").then((response)=>{
          let res = response.data;
          this.bookList=res.books;
        }).catch((error)=>{
          console.log(error);
        });
      },
      addcart(bookmessage){
        axios.post('/users/addcart',{bookmessage:bookmessage}).then((response)=>{
          let res = response.data;
          console.log(res);
        })
      },
      toOneBook(item){
        this.$router.push({
          path:'/books?id='+item.id
        })
      }
    },
    mounted(){
      this.init();
      this.getBookList();

    }
  }
</script>
<style scoped>
.booklist {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  right: 0;
  height: auto;
  margin-top: 5px;
}
.featured{
  height: auto;
  width: 100%;
}
.featuredtitle{
  background-color: #c74637;
  height: 100px;
  width: 98%;
  margin: 0 auto;
}
.featuredtitle p{
  margin: 0;
}
#p1{
  color: #fff;
  font-weight: bold;
  font-size: 50px;
  text-align: center;
}
#p2{
  color: #999;
  font-weight: 700;
  font-size: 20px;
  margin-left: 50px;
}
.showbook{
  height: auto;
  width: 98%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
