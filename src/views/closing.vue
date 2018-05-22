<template>
  <div>
    <NavHeader></NavHeader>
    <div class="wrapper">
      <div>
        支付金额：<label class="price">¥{{total-parseInt(total/100)*30}}</label>
        <div>订单号：{{timestamp}}</div>
        <div>常用支付方式：</div>

        <div class="paytype">
          <div class="pay" @click="choicepaytype('ali')">
            <svg :class="['icon', paytype === 'ali'?'checkpay':'payicon']" aria-hidden="true">
              <use xlink:href="#icon-alipay"></use>
            </svg>
          </div>
          <div class="pay" @click="choicepaytype('wechat')">
            <svg :class="['icon', paytype === 'wechat'?'checkpay':'payicon']" aria-hidden="true" >
              <use xlink:href="#icon-weixinzhifu"></use>
            </svg>
          </div>
          <div @click="toPay" class="submit">
            立即支付
          </div>
        </div>
      </div>
      <div class="payimg" >
        <div class="graytext">
          <p>请进行扫码支付</p>
          {{pay}}
        </div>
        <div class="down">
          <img src="@/assets/img/wechat.jpeg" style="width:120px;height:120px" v-if="paytype === 'wechat'" />
          <div class="graytext" v-if="paytype === 'wechat'">
            <p>打开手机微信</p>
            <p>扫一扫进行支付</p>
          </div>
          <img src="@/assets/img/ali.jpeg" style="width:120px;height:120px" v-if="paytype === 'ali'" />
          <div class="graytext" v-if="paytype === 'ali'">
            <p>打开手机支付宝</p>
            <p>扫一扫进行支付</p>
          </div>
        </div>
      </div>
    </div>
    <MessageBox :modalShow='successPay' >
      <div style="display:flex;align-items:center;flex-direction:column;">
        <svg class="icon" aria-hidden="true" style="font-size:100px;">
          <use xlink:href="#icon-chenggong"></use>
        </svg>
        <p style="color:#aa9960;font-size:2em;font-weight:400;position:absolute;top:110px;">
          支付成功
        </p>
      </div>
    </MessageBox>
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader";
import MessageBox from "@/components/messageBox"
import axios from "axios";
export default {
  data() {
    return {
      cartlist: [],
      timestamp: '',
      address: '',
      goods: '',
      pay: '',
      paytype: 'ali',
      successPay: false
      };
  },
  components: {
    NavHeader,
    MessageBox
  },
  computed: {
    checkgoods(){
      let goods=[];
      this.cartlist.forEach((item)=>{
        if (item.checked==1) {
          goods.push(item);
        }
      });
      return goods;
    },
    total(){
      let n=0;
      this.checkgoods.forEach((item)=>{
        n += item.productNum*parseFloat(item.salePrice);
      })
      return n
    },
    data(){
      return {
        orderId: this.timestamp,
        orderTotal: this.total,
        addressInfo: this.address,
        goodsList: this.goods,
        orderStatus: '0',
        createDate: this.orderId
      }
    }
  },
  methods: {
    getinit(){
      axios.get('/users/cartlist').then(res => {
        this.cartlist = res.data.result;
        console.log(res.data.result);
      });
      this.timestamp = new Date().getTime().toString() + parseInt(Math.random()*100000000).toString()
    },
    toPay(){
      var params = this.data;
      axios.post('/users/pay',{data:params}).then(response => {
        let res = response.data;
        console.log(res);
      }).catch(e => {
        console.log(e);
      });
      this.sucOpen();
    },
    choicepaytype(type){
      this.paytype = type;
    },
    sucOpen(){
      this.successPay=true;
      setTimeout(this.sucClose,3000);
    },
    sucClose(){
      this.successPay=false;
      this.$router.push({
        path:'/'
      });
    },
  },
  mounted() {
    this.getinit();
    this.address = this.$route.params.address;
    this.goods = this.$route.params.goods;
    this.pay = this.$route.params.payMethod;
    this.address.payMethod = this.pay;
    console.log(this.address);
  }
};
</script>
<style scoped>
  .wrapper{
    display: flex;
    justify-content: space-around;
    width: 95%;
    height: 450px;
    padding: 20px;
    background-color: #fff;
  }
  .price{
    font-size: 2em;
    color: #c74637;
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
  .paytype {
    width: 250px;
    height: 160px;
    background-color: #fff;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .payicon{
    font-size:50px;
    height: 30px;
    padding: 3px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .checkpay{
    font-size:50px;
    height: 30px;
    padding: 3px;
    background-color: #fff;
    border: 1px solid black;
  }
  .payimg{
    width: 300px;
    height: 250px;
    background-color: #fff;
    padding-top: 20px;
    padding-left: 40px;
  }
  .graytext p{
    color: #ccc
  }
  .down {
    display: flex;
    justify-content: space-around;
  }
</style>
