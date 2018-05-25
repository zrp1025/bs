<template>
<div>
  <div v-for="oneuser in alllist">
    <div v-for="(order,index) in oneuser.orderList">
      <div class="card">
        <div style="padding:10px 40px;">
          <div class="" style="float:left;">
            <div class="titlefont">
              订单：{{order.orderId}}
            </div>
            <div class="titlefont">
              用户名：{{oneuser.userName}}
            </div>
            <div class="titlefont">
              总价格：{{order.orderTotal}}元
            </div>
            <div class="titlefont">
              收货人：{{order.addressInfo.userName}} |
              收获地址：{{order.addressInfo.streetName}} |
              联系电话：{{order.addressInfo.tel}}
            </div>
          </div>
          <div style="float:right;margin-top:10px;">
            <div v-if="order.orderStatus==0?true:false">
              <svg class="icon" style="cursor:pointer" aria-hidden="true" v-if="order.orderStatus==0?true:false" >
                <use xlink:href="#icon-daifahuo"></use>
              </svg>
              未发货
            </div>
            <div v-if="order.orderStatus==1?true:false">
              <svg class="icon" style="cursor:pointer" aria-hidden="true" v-if="order.orderStatus==1?true:false">
                <use xlink:href="#icon-yifahuo"></use>
              </svg>
              已发货
            </div>
          </div>
        </div>
        <ul class="list" style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid green">
          <li>商品信息</li>
          <li>商品名称</li>
          <li>购买数量</li>
        </ul>
        <div v-for="goods in order.goodsList">
          <ul :class="[index%2==1?'bggray':'bgwhilte','list']" id="lie" style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center">
            <li><img v-lazy='goods.img' style="height:80px;width:60px;text-align:left" /></li>
            <li>《{{goods.productName}}》</li>
            <li>{{goods.productNum}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      msg: '',
      alllist: []
    }
  },
  components: {

  },
  computed: {

  },
  methods: {
    getallmessge() {
      axios.get('/users/all').then((response) => {
        let res = response.data;
        if (res.status == '1') {
          console.log(res.msg);
          console.log(res.result);
        } else {
          this.alllist = res.result;
          console.log(this.alllist);
        }
      })
    },
    sendOut(order) {
      console.log(order);
    }
  },
  mounted() {
    this.getallmessge();
  }
}
</script>
<style scoped>
.list li {
  width: 120px;
  list-style: none;
}
#lie:hover {
  background-color: #aa9960;
}
.bggray{
  /* background-color: #0002; */
  /* border-bottom: 2px solid #ccc; */
}
.bgwhilte{
  /* border-bottom: 2px solid #ccc; */
  /* background-color: #0002; */
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
}
.submit:hover{
  background: #d85748;
}
.card{
  width: 90%;
  min-height: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  /* background-color: #64ab8a; */
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 20px;
}
.titlefont{
  font-size: 17px;
  color: #3a3837;
}
</style>
