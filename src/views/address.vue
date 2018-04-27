<template>
  <div>
    <nav-header></nav-header>
    <div id="wrapper" >
      <div class="title">
        <div>
          填写并核对订单信息:
        </div>
        <div>
          新增收货地址
        </div>
      </div>
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
    <div style="width:100%;height:70px;display:flex;flex-direction:row;">
      <div class="checkbtn">货到付款</div>
      <div class="btn">在线支付</div>
    </div>
    <div id="bottombar" style="display:flex;align-items:flex-end;flex-direction:column;margin-right:30px;">
      <div style="display:flex;flex-direction:row;align-items:center">
        <div>1</div>
        <div>件商品，总商品价格为¥600</div>
      </div>
      <div>运费：0.00</div>
      <div>寄送至：{{selectAddress.streetName}}&nbsp&nbsp&nbsp&nbsp{{selectAddress.userName}}&nbsp&nbsp&nbsp&nbsp&nbsp {{selectAddress.tel}}</div>
      <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%">
        <div style="display:flex;flex-direction:row;align-items:center"><div style="margin-left:15px;">应付金额：</div><div style="font-size:2em;color:#c74637">¥ 99.0</div></div>
        <div class="submit" >提交订单</div>

      </div>
    </div>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 40px;
  }
  .btn{
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 #dad8be;
    color: #666;
    background-color: #f2f2f2;
    font-weight: 900;
    margin-left: 15px;
  }
  .btn:hover{
    background: #aa9960;
  }
  .checkbtn{
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 #dad8be;
    color: #666;
    background-color: #aa9960;
    font-weight: 900;
    margin-left: 15px;
  }
  .submit{
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 #dad8be;
    color: #fff;
    background-color: #c74637;
    font-weight: 900;
    margin-left: 15px;
  }
  .submit:hover{
    background: #d85748;
  }
  #bottombar div{
    margin-top: 10px;
  }
</style>
