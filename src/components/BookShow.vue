<template>
  <div class="bookbox">
    <div class="bookinfo">
      <div class="bookimg">
        <img :src="hcimg" />
      </div>
      <div class="bookmsg">
        <p id="bname" @click="nameclick">《{{name}}》</p>
        <p>作者：{{author}}</p>
        <p>出版社：{{publisher}}</p>
        <p id='price'>¥ {{price}}</p>
        <div class="btn-in" @click="addclick">
          加入购物车
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg:''
      }
    },
    props:{
      imgb:"",
      name:'',
      author:'',
      publisher:'',
      price:''

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
      addclick(){
        this.$emit("addcart")
      },
      nameclick(){
        this.$emit("toOneBook")
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .bookbox{
    width: 410px;
    height: 300px;
  }
  .bookbox:hover{
    border:1px solid #eee;
  }
  .bookinfo{
    border: 1px solid snow;
    margin: 20px 20px;
    height: 260px;
  }
  .bookimg{
    width: 180px;
    height: 260px;
    float: left;
  }
  .bookimg img{
    width: 100%;
    height: 100%;
  }
  .bookmsg{
    float: right;
    width: 170px;
    height: 260px;
  }
  .bookmsg p{
    color: #aa9960;
    font-weight: 500;
    line-height: 18px;
    font-size: 13px;
  }
  #bname{
    cursor: pointer;
  }
  #bname:hover{
    color:#776634;
  }
  #price{
    font-size: 20px;
    font-weight: 700;
  }
  .bookmsg p:nth-child(1){
    margin-top: 25px;
    font-size: 18px;
  }
  .btn-in{
    width: 100px;
    height: 30px;
    border: 1px solid #dad8be;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 #dad8be;
    color: #aa9960
  }
  .btn-in:hover{
    background: #d6d4b9;
  }
</style>
