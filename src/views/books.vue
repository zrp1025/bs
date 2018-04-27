<template>
    <!-- <OneBookShow :book="bookList" :imgb="bookList.image" /> -->
    <div class="content" >
      <div style="margin-left:5%;color:#777">图书>详情页</div>
      <div class="topbox">
        <div class="topleft" v-for="item in bookList">
          <img :src="hcimg" style="width:100%;height:100%" />
        </div>
        <div class="topmiddle">
          <h1 style="color:#aa9960">《{{bookList[0].title}}》</h1>
          <div id="author">作者：{{bookList[0].author[0]}}</div>
          <div id="price">价格：{{bookList[0].price}}</div>
          <div class="btn">
            <div class="yellowbgbtn">加入购物车</div>
            <div class="redbgbtn">立即购买</div>
          </div>
          <div>
            <div class="bookmsg">
              {{bookList[0].summary}}
            </div>
          </div>
        </div>
        <div class="topright">
          <div id="average">豆瓣评分：<div id="score">{{bookList[0].rating.average}}</div></div>
          <div id="origin">原作名：{{bookList[0].origin_title}}</div>
          <div id="publisher">出版社：{{bookList[0].publisher}}</div>
          <div id="translator">译者：{{bookList[0].translator[0]}}</div>
          <div id="pubdate">出版时间：{{bookList[0].pubdate}}</div>
          <div id="binding">装帧：{{bookList[0].binding}}</div>
          <div id="isbn">ISBN：{{bookList[0].isbn10}}</div>
        </div>
      </div>
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
      hcimg(){
        return 'https://images.weserv.nl/?url='+this.bookList[0].images.large.substring(8)
      }
    },
    methods:{
      init(){
        this.id = this.$route.query.id;
      },
      getBookList() {
        axios.get('/v2/book/'+this.id)
        .then( (response) =>{
          console.log(response.data);
          this.bookList.push(response.data);
          console.log(this.bookList.images.large.substring(8));

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
.content{
  width: 100%;
  height: 100%;
  border-top: 5px solid #c74637;
  padding-top: 40px;
  /* padding-bottom: 70px; */
  /* background-image: url('./../assets/img/341.png'); */
  /* background-size: 100% 100%; */
  /* background-repeat: no-repeat; */
}
.topbox{
  width: 90%;
  min-width: 700px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topleft{
  width: 30%;
  /* min-width: 200px; */
  height: 100%;
  min-height: 200px;

}
.topmiddle{
  overflow-y: scroll;
  width:50%;
  /* min-width: 300px; */
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
}
.topright{
  width: 20%;
  /* min-width: 200px; */
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between ; */
}
.topright div{
  margin-bottom: 10px;
}
.btn{
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.yellowbgbtn{
  width:130px;height:40px;border-radius:5px;color:#f2f2f2;background-color:#aa9960;text-align:center;line-height:40px;cursor: pointer;
}
.yellowbgbtn:hover{background-color: #bbaa71}

.redbgbtn{
  width:130px;height:40px;border-radius:5px;color:#f2f2f2;background-color:#c74637;text-align:center;line-height:40px;cursor: pointer;
}
.redbgbtn:hover{background-color: #d85748}
.bookmsg{
  height: 120px;
  color: #777;
  width: 100%;
  padding-top: 10px
}
#score{
  font-size: 2.5em;
  font-weight: 900;
  color: #aa9960;
}
div{
  color: #777;
}
#author{
  margin-bottom: 10px;
}
#price{
  margin-bottom: 10px;
  color: #c74637;
  font-size: 2em;
}
</style>
