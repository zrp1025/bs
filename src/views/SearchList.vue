<template>
  <div>
    <nav-header></nav-header>
    <div class="booklist">
      <div class="featured">
        <div style="margin-left:30px;color:#aa9960;">
          <p>全部商品 > 搜索"{{msg}}" 共{{bookList.length}}个结果</p>
        </div>
        <div class="showbook">
          <div v-for="item in bookList">
            <book-show @toOneBook="toOneBook(item)" :imgb="item.images['large']" :name='item.title' :author='item.author[0]' :publisher='item.publisher' :price='item.price' @addcart="addcart(item)"></book-show>
          </div>
        </div>
      </div>
    </div>
    <Bottom></Bottom>
  </div>

</template>
<script>
import NavHeader from "@/components/NavHeader"
import BookShow from '@/components/BookShow'
import Bottom from '@/components/bottom'
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
      BookShow,
      NavHeader,
      Bottom
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
        axios.get('/v2/book/search?q='+this.msg+"&count=30").then((response)=>{
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
      },
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
  position: relative;
  /* position: absolute; */
  margin-bottom: -650px;
  right: 0;
  height: auto;
  margin-top: 5px;
  z-index: 3;
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
