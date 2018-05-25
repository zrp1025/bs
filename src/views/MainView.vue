<!-- 红：#c74637  黄：#aa9960 褐: #3a3837  绿: #5c8084 蓝: #17344a -->
<template>
  <div>
    <nav-header></nav-header>
    <div class="content" style="position:relative;top:-90px;">
      <div>
        <swiper :options="swiperOption" ref="mySwiper">
         <swiper-slide>  <img src="./../assets/img/bg.jpg" style="width:100%;height:500px;" /></swiper-slide>
         <swiper-slide>  <img src="./../assets/img/bg1.jpg" style="width:100%;height:500px;" /></swiper-slide>
         <swiper-slide>  <img src="./../assets/img/bg2.jpg" style="width:100%;height:500px;" /></swiper-slide>
         <swiper-slide>  <img src="./../assets/img/bg4.jpg" style="width:100%;height:500px;" /></swiper-slide>
         <swiper-slide>  <img src="./../assets/img/bg6.jpg" style="width:100%;height:500px;" /></swiper-slide>
       </swiper>
      </div>
      <div class="bgtext" style="z-index:2;" @click="badCartOpen">
        <p>#在Thinking</p>
        <p style="margin-left:3em;">阅书，读己......</p>
      </div>
      <div class="classify" style="position:relative;top:-4px;">
        <div class="new classbox" @click='toNewBook'>
          <div class="classbox-book1">
            <div>New Arrivals</div>
            <div>新书速递</div>
            <div>View all></div>
          </div>
          <div class="screen1">
          </div>
        </div>
        <div class="best classbox" @click='toBestBook'>
          <div class="classbox-book2">
            <div>Best Sellers</div>
            <div>畅销书籍</div>
            <div>View all></div>
          </div>
          <div class="screen2"></div>
        </div>
        <div class="kid classbox" @click='toKidBook'>
          <div class="classbox-book3">
            <div>Kid Books</div>
            <div>儿童书籍</div>
            <div>View all></div>
          </div>
          <div class="screen3"></div>
        </div>
      </div>
      <div class="featured">
        <div class="featuredtitle">
          <p id="p1">最受关注图书榜单</p>
          <p id="p2">Featured Products</p>
        </div>
        <div class="showbook">
          <div v-for="item in bookList">
            <book-show @toOneBook="toOneBook(item)" :imgb="item.images.large" :name='item.title' :author='item.author[0]' :publisher='item.publisher' :price='item.price' @addcart="addcart(item)"></book-show>
          </div>
        </div>
      </div>
      <MessageBox :modalShow='sucCartshow' >
        <div style="display:flex;align-items:center;flex-direction:column;">
          <svg class="icon" aria-hidden="true" style="font-size:100px;">
            <use xlink:href="#icon-chenggong"></use>
          </svg>
          <p style="color:#aa9960;font-size:2em;font-weight:400;position:absolute;top:110px;">
            加入购物车成功
          </p>
        </div>
      </MessageBox>
      <MessageBox :modalShow='badCartshow' >
        <div style="display:flex;align-items:center;flex-direction:column;">
          <svg class="icon" aria-hidden="true" style="font-size:80px;margin-top:20px;">
            <use xlink:href="#icon-shibai2"></use>
          </svg>
          <p style="color:#c74637;font-size:1em;font-weight:400;position:absolute;top:130px;">
            加入购物车失败
          </p>
        </div>
      </MessageBox>
      <MessageBox :modalShow='onLogin' >
        <div style="display:flex;align-items:center;flex-direction:column;">
          <svg class="icon" aria-hidden="true" style="font-size:70px;margin-top:20px;">
            <use xlink:href="#icon-cuowu"></use>
          </svg>
          <p style="color:#aa9960;font-size:2em;font-weight:400;position:absolute;top:110px;">
            未登录，请先登录
          </p>
        </div>
      </MessageBox>
    </div>
    <Bottom></Bottom>
  </div>

</template>
<script>
import NavHeader from "@/components/NavHeader"
import axios from 'axios'
import BookShow from '@/components/BookShow'
import MessageBox from "@/components/messageBox"
import 'swiper/dist/css/swiper.css'
import Bottom from "@/components/bottom"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      msg: 'a',
      bookList: [{image:'1'}],
      large:'large',
      swiperOption: {
        autoplay:{
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        effect : 'fade',
        fadeEffect: {
          crossFade: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      },
      sucCartshow:false,
      badCartshow:false,
      onLogin:false
    }
  },
  components: {
    BookShow,
    swiper,
    swiperSlide,
    MessageBox,
    NavHeader,
    Bottom
  },
  computed: {
    booksList:function(){
      return this.bookList
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },

  methods: {
    getBookList() {
      if (this.bookList.length<2) {
        axios.get('/v2/book/search?tag=高分&2018&count=9').then((response)=>{
          let res = response.data.books;
          this.bookList=res;
          console.log(res);

        }).catch((error)=>{
          console.log(error);
        });
      }
    },
    toNewBook(){
      this.$router.push({
        path:'/booklist?tag=新书'
      })
    },
    toBestBook(){
      this.$router.push({
        path:'/booklist?tag=畅销'
      })
    },
    toKidBook(){
      this.$router.push({
        path:'/booklist?tag=儿童'
      })
    },
    addcart(bookmessage){
      axios.post('/users/addcart',{bookmessage:bookmessage}).then((response)=>{
        let res = response.data;
        if (res.status==1) {
          this.badCartOpen()
        }else if (res.status==0) {
          this.sucCartOpen()
        }else if (res.status=="10001") {
          this.noLoginOpen()
        }
        console.log(res);
      })
    },
    sucCartOpen(){
      this.sucCartshow=true;
      setTimeout(this.sucCartClose,1500);
    },
    sucCartClose(){
      this.sucCartshow=false;
    },
    badCartOpen(){
      this.badCartshow=true;
      setTimeout(this.badCartClose,1500);
    },
    badCartClose(){
      this.badCartshow=false;
    },
    noLoginOpen(){
      this.onLogin=true;
      setTimeout(this.noLoginClose,1500);
    },
    noLoginClose(){
      this.onLogin=false;
    },
    toOneBook(item){
      this.$router.push({
        path:'/books?id='+item.id
      })
    }
  },
  mounted() {
    this.getBookList();
  },
  updated(){

  }

}
</script>
<style scoped>
.content {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  right: 0;
  height: auto;
  z-index: 3;
  margin-bottom: -650px;
  /* margin-top: 5px; */
}
.classify{
  /* width: 98%; */
  width: 100%;
  height: 400px;
  background: #ccc;
  margin: 0 auto;
}
.classbox{
  width: 33.33%;
  height: 400px;
  float: left;
  cursor: pointer;
}
.classbox-book1{
  width: 70%;
  height: 90%;
  margin: 5% 15%;
  position: relative;
  background-image: url('https://img3.doubanio.com/lpic/s29702554.jpg');
  background-size: 100% 100%;
}
.classbox-book1 div,.classbox-book2 div,.classbox-book3 div{
  position: relative;
  top: 80%;
  z-index: 20;
  font-size: 28px;
  font-weight: 700;
  line-height: 30px;
  color: #aa9960;
  text-shadow: 3px 3px #000;
}
.classbox-book1 div:nth-last-child(1),.classbox-book2 div:nth-last-child(1),.classbox-book3 div:nth-last-child(1){
  color: #fff;
  font-size: 15px;
}
.classbox-book2{
  width: 70%;
  height: 90%;
  margin: 5% 15%;
  position: relative;
  background-image: url('https://img3.doubanio.com/lpic/s29376146.jpg');
  background-size: 100% 100%;
}
.classbox-book3{
  width: 70%;
  height: 90%;
  margin: 5% 15%;
  position: relative;
  background-image: url('https://img3.doubanio.com/lpic/s3570190.jpg');
  background-size: 100% 100%;
}
/* .screen{
  width: 100%;
  height: 40%;
  background-color: #c74637dd;
  position: relative;
  top: -41%;
} */
.screen1{
  width: auto;
  height: 120px;
  border-bottom: 0 solid transparent;
  border-left: 401px solid #c74637dd;
  border-top: 200px solid transparent;
  position: relative;
  top: -81%;
}
.screen2{
  width: auto;
  height: 120px;
  border-bottom: 0 solid transparent;
  border-left: 401px solid #3a3837dd;
  border-top: 200px solid transparent;
  position: relative;
  top: -81%;
}
.screen3{
  width: auto;
  height: 120px;
  border-bottom: 0 solid transparent;
  border-left: 401px solid #5c8084dd;
  border-top: 200px solid transparent;
  position: relative;
  top: -81%;
}
.new{
  background-color: #c74637;
}
.best{
  background-color: #3a3837;
}
.kid{
  background-color: #5c8084;
}
.featured{
  height: auto;
  width: 100%;
}
.featuredtitle{
  height: 60px;
  width: 98%;
  border-bottom: 5px solid #aa9960;
  margin: 0 auto;
}
.featuredtitle p{
  margin: 0;
}
#p1{
  color: #aa9960;
  font-weight: bold;
  font-size: 25px;
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
.bgtext{
  position: absolute;
  top:230px;
  right: 12%;
}
.bgtext p{
  line-height: 45px;
  color: snow;
  font-size: 25px;
  text-shadow: #000 0.1em 0.1em 0.2em
}
</style>
