<template>
  <div>
    <ul class="list" style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center;">
      <li>用户ID</li>
      <li>用户名</li>
      <li>订单数量</li>
      <li>购物车商品数量</li>
      <li>编辑</li>
    </ul>
    <ul :class="[index%2==1?'bggray':'bgwhilte','list']" id="lie" style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center" v-for="(oneuser,index) in alllist" >
      <li>{{oneuser.userId}}</li>
      <li>{{oneuser.userName}}</li>
      <li>{{oneuser.orderList.length}}</li>
      <li>{{oneuser.cartList.length}}</li>
      <li>
        <svg class="icon" style="cursor:pointer" aria-hidden="true">
          <use xlink:href="#icon-delete_member"></use>
        </svg>
      </li>
    </ul>
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
