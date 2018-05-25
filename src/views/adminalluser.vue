<template>
  <div>
    <ul class="list" style="width:95%;height:100px;display:flex;justify-content:space-between;align-items:center;">
      <li>用户ID</li>
      <li>用户名</li>
      <li>订单数量</li>
      <li>购物车商品数量</li>
      <li>编辑</li>
    </ul>
    <ul :class="[index%2==1?'bggray':'bgwhilte','list']" id="lie" style="width:95%;height:80px;display:flex;justify-content:space-between;align-items:center" v-for="(oneuser,index) in alllist" v-if="!oneuser.isAdmin" >
        <li>{{oneuser.userId}}</li>
        <li>{{oneuser.userName}}</li>
        <li>{{oneuser.orderList.length}}</li>
        <li>{{oneuser.cartList.length}}</li>
        <li>
          <svg class="icon" style="cursor:pointer" aria-hidden="true" @click="modalOpen(oneuser)">
            <use xlink:href="#icon-delete_member"></use>
          </svg>
        </li>
    </ul>
    <SModal :modalShow='checkDelete' @modalClose='modalClose'>
      <div class="modal">
        <svg class="icon" aria-hidden="true" style="font-size:70px;margin-top:40px;">
          <use xlink:href="#icon-cuowu"></use>
        </svg>
        <div><h1 style="color:#aa9960">是否确认删除</h1></div>
        <div class="modalBtn">
          <div class="textbtn" style="margin-bottom:10px;" @click='deleteUser(msg)' >立即删除</div>
          <div class="textbtn" style="margin-bottom:10px;" @click='modalClose' >取消</div>
        </div>
      </div>
    </SModal>
  </div>
</template>
<script>
import SModal from "@/components/SModal";
import axios from 'axios';
export default {
  data() {
    return {
      msg: '',
      alllist: [],
      checkDelete: false
    }
  },
  components: {
    SModal
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
    },
    deleteUser(userdata) {
      let data = {
        userName: userdata.userName,
        pass: userdata.userPwd
      }
      axios.post('/users/deleteuser',data).then(response => {
        let res = response.data;
        if (res.status=='1') {
          console.log(res);
        } else{
          console.log(res);
        }
      }).then(() => {
        this.getallmessge();
      })
    },
    modalClose() {
      this.checkDelete = false;
    },
    modalOpen(data) {
      this.checkDelete = true;
      this.msg = data;
    }
  },
  mounted() {
    this.getallmessge();
  },
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
.modal {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.modalBtn {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.textbtn {
  width: 154px;
  height: 38px;
  color: #c74637;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
  border: 1px solid #c74637;
  border-radius: 10px;
  font-size: 20px;
}
.textbtn:hover {
  color: #c79d8f;
}
</style>
