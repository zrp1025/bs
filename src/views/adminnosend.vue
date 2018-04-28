<template>
<div>
  <ul class="list" style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center">
    <li>商品信息</li>
    <li>书名</li>
    <li>数量</li>
    <li>名字</li>
    <li style="width:200px;">地址</li>
    <li>电话</li>
    <li>状态</li>
  </ul>
  <div v-for="oneuser in alllist">
    <div v-for="order in oneuser.orderList">
      <ul :class="[index%2==1?'bggray':'bgwhilte','list']" id="lie"  style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center" v-for="(goods,index) in order.goodsList">
        <li><img :src='goods.img' style="height:80px;width:60px;text-align:left" /></li>
        <li>《{{goods.productName}}》</li>
        <li>{{goods.productNum}}</li>
        <li>{{order.addressInfo.userName}}</li>
        <li style="width: 200px;">{{order.addressInfo.streetName}}</li>
        <li>{{order.addressInfo.tel}}</li>
        <li>
          <svg class="icon" style="cursor:pointer" aria-hidden="true">
            <use xlink:href="#icon-daifahuo"></use>
          </svg>
        </li>
      </ul>
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
        } else {
          this.alllist = res.result;
          console.log(this.alllist);
        }
      })
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
  background-color: #f7f7f7;
}
.bgwhilte{
  background-color: #fff;
}
</style>
