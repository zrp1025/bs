<template>
  <div>
    <NavHeader></NavHeader>
    <div class="wrapper">
      <div>
        支付金额：<label class="price">¥{{total-parseInt(total/100)*30}}</label>
        <div>订单号：{{timestamp}}</div>
        <div>
          {{address}}
          {{goods}}
          {{total}}
          {{pay}}
        </div>
      </div>
      <div>
        <div @click="toPay" class="submit">
          立即支付
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader";
import axios from "axios";
export default {
  data() {
    return {
      cartlist: [],
      timestamp: '',
      address: '',
      goods: '',
      pay: ''
      };
  },
  components: {
    NavHeader
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
      })
    }
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
    width: 100%;
    height: 450px;
    padding: 20px;
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
</style>
