<template>
  <div class="content" >
    <div style="margin-left:5%;color:#777">图书>详情页</div>
    <div class="topbox">
      <div class="topleft">
        <img v-lazy="hcimg" style="width:100%;height:100%"/>
      </div>
      <div class="topmiddle">
        <h1>{{book.title}}</h1>
        <div id="author">作者：{{book.author[0]}}</div>
        <div id="price">价格：{{book.price}}</div>
        <div id="publisher">出版社：{{book.publisher}}</div>
        <div id="binding">装帧：{{book.binding}}</div>
        <div id="isbn">ISBN：{{book.isbn10}}</div>
        <div id="average">豆瓣评分：{{book.average}}</div>
        <div class="btn">
          <div class="yellowbgbtn">加入购物车</div>
          <div class="redbgbtn">立即购买</div>
        </div>
        <div>
          <div class="bookmsg">
            {{book.summary}}
          </div>
        </div>
      </div>
      <div class="topright">

      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:["book","imgb"],
    data(){
      return {
        msg:''
      }
    },
    components:{

    },
    computed:{
      hcimg(){
        let i = this.imgb.slice(7);
        return 'https://images.weserv.nl/?url='+i
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>
<style scoped>
  .content{
    width: 100%;
    height: 100%;
    border-top: 5px solid #c74637;
    padding-top: 40px;
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
    width: 18%;
    /* min-width: 200px; */
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  .btn{
    width: 300px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .yellowbgbtn{
    width:130px;height:40px;border-radius:5px;color:#f2f2f2;background-color:#c79d8f;text-align:center;line-height:40px;cursor: pointer;
  }
  .yellowbgbtn:hover{background-color: #d8ae9f}

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
</style>
