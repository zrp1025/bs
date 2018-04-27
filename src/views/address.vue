<template>
  <div>
    <nav-header></nav-header>
    <div id="wrapper" >
      <div class="title">填写并核对订单信息:</div>
          <table style="width:100%;height:50px;">
            <tr>
              <th>收货人</th>
              <th>收货地址</th>
              <th>手机号</th>
              <th>编辑</th>
            </tr>
            <tr  v-for="(item,index) in addresslist" :class="[checkIndex==index?'checkaddtr':'addtr']" @click="checkAddress(item,index)" style="width:100%;height:30px;">
              <td class="addname">{{item.userName}}</td>
              <td class="addadd">{{item.streetName}}</td>
              <td class="addtel">{{item.tel}}</td>
              <td class="del">
                <svg class="icon" aria-hidden="true" @click="deleteAddress">
                  <use xlink:href="#icon-shanchu"></use>
                </svg>
              </td>
            </tr>
          </table>
    </div>
    <div class="title">购物清单:</div>
    <table style="width:100%;height:50px;overflow-y:auto">
      <tr>
        <th>商品信息</th>
        <th>书名</th>
        <th>单价</th>
        <th>数量</th>
        <th>总价(元)</th>
      </tr>
      <tr style="width:100%;height:100px;text-align:center" v-for="item in checkgoods">
        <td><img :src='item.img' style="height:80px;width:60px;text-align:left" /></td>
        <td>《{{item.productName}}》</td>
        <td>{{item.salePrice}}</td>
        <td>{{item.productNum}}</td>
        <td style="color:#c74637;font-size:1.2em;font-weight:900">{{item.productNum*parseFloat(item.salePrice)}}</td>
      </tr>
    </table>
    <div class="title">支付方式:</div>

  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader"
import axios from 'axios';
  export default{
    data(){
      return {
        msg:'',
        addresslist:[],
        checkIndex:'0',
        selectAddress:'',
        cartlist:[]
      }
    },
    components:{
      NavHeader
    },
    computed:{
      checkgoods(){
        let goods=[];
        this.cartlist.forEach((item)=>{
          if (item.checked==1) {
            goods.push(item);
          }
        });
        return goods;
      }
    },
    methods:{
      getAddress(){
        axios.get('/users/address').then((response)=>{
          let res = response.data;
          if (res.status==1) {
            console.log(res.msg);
          }else {
            this.addresslist=res.result;
            this.cartlist=res.cart;
            this.cartlist.map(
              (x) => {
                x.img='https://images.weserv.nl/?url='+x.productImage.substring(8);
                return x
              }
            );
            this.selectAddress=this.addresslist[0];
            console.log(this.addresslist);
            console.log(this.cartlist);
          }
        })
      },
      checkAddress(item,index){
          this.checkIndex = index;
          this.selectAddress = item;
      },
      deleteAddress(){
        alert('abc')
      }
    },
    mounted(){
      this.getAddress();
    },

  }
</script>
<style scoped>
  #wrapper{
    width: 100%;
    /* height: 400px; */
    margin: 0 auto;
    border-top: 5px solid #c74637;
    padding-top: 30px;
  }
  .addtr{
    background: #fff;
    cursor: pointer;
    text-align: center;
  }
  .checkaddtr{
    background-color: #FFFFE0;
    text-align: center;
    cursor: pointer;
  }
  .addtr:hover{
    background-color: #FFFFE0
  }
  .del:hover{
    color: skyblue
  }
  .title{
    color:#aa9960;
    font-weight:900;
    font-size:1.2em;
    margin-left: 15px;
  }
</style>
