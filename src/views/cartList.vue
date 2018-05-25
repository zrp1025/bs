<template>
  <div>
    <nav-header></nav-header>
    <div id="wrapper">
      <table style="width:100%;height:50px;">
        <tr>
          <th>全选</th>
          <th>商品信息</th>
          <th>书名</th>
          <th>单价</th>
          <th>数量</th>
          <th>金额</th>
          <th>编辑</th>
        </tr>
        <tr style="width:100%;height:100px;" v-for="item in cartlist">
          <td style="cursor:pointer" @click="check(item.productId)">
            <svg class="icon" aria-hidden="true" v-if="item.checked==0">
              <use xlink:href="#icon-checkboxoutlineblank"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-if="item.checked==1">
              <use xlink:href="#icon-check-box-outline"></use>
            </svg>
          </td>
          <td><img v-lazy='item.img' style="height:80px;width:60px;text-align:left" /></td>
          <td>《{{item.productName}}》</td>
          <td>{{item.salePrice}}</td>
          <td>{{item.productNum}}</td>
          <td>{{item.productNum*parseFloat(item.salePrice)}}</td>
          <td>
            <svg class="icon" style="cursor:pointer" aria-hidden="true" @click="modalOpen(item.productId)">
            <!-- <svg class="icon" style="cursor:pointer" aria-hidden="true" @click="deletebook(item.productId)"> -->
              <use xlink:href="#icon-shanchu-tianchong"></use>
            </svg>
          </td>
        </tr>
      </table>
    </div>
    <div class="bottombar">
      <div style="color:#aa9960">
        已选择<label style="color:#c74637;font-size:1.3em">{{goodnum}}</label>件商品
      </div>
      <div>
        <div style="display:flex;flex-direction:row;align-items:center">
          <div style="color:#aa9960">总计(不含运费): </div>
          <div style="color:#c74637;font-size:1.5em;margin-right:20px;">¥{{total}}</div>
          <div class="btn" @click="toAddress">结算</div>
        </div>
      </div>
    </div>
    <SModal :modalShow='checkDelete' @modalClose='modalClose'>
      <div class="modal">
        <svg class="icon" aria-hidden="true" style="font-size:70px;margin-top:40px;">
          <use xlink:href="#icon-cuowu"></use>
        </svg>
        <div><h1 style="color:#aa9960">是否确认删除</h1></div>
        <div class="modalBtn">
          <div class="textbtn" style="margin-bottom:10px;" @click='deletebook(msg)' >立即删除</div>
          <div class="textbtn" style="margin-bottom:10px;" @click='modalClose' >取消</div>
        </div>
      </div>
    </SModal>
  </div>
</template>
<script>
import SModal from "@/components/SModal";
import NavHeader from "@/components/NavHeader";
import axios from "axios";
export default {
  data() {
    return {
      msg: "",
      cartlist: [],
      checkDelete: false
    };
  },
  components: {
    NavHeader,
    SModal
  },
  computed: {
    goodnum() {
      let i = 0;
      this.cartlist.forEach(item => {
        if (item.checked == "1") {
          i += parseFloat(item.productNum);
        }
      });
      return i;
    },
    total() {
      let i = 0;
      this.cartlist.forEach(item => {
        if (item.checked == "1") {
          i += parseFloat(item.productNum) * parseFloat(item.salePrice);
        }
      });
      return i;
    }
  },
  methods: {
    getCartList() {
      axios.get("/users/cartlist").then(response => {
        this.cartlist = response.data.result;
        this.cartlist.map(x => {
          x.img =
            "https://images.weserv.nl/?url=" + x.productImage.substring(8);
          return x;
        });
        console.log(this.cartlist);
      });
    },
    check(x) {
      axios.post("/users/checked", { productId: x }).then(response => {
        let res = response.data;
        if (res.status == "1") {
          console.log(res.msg);
        } else if (res.status == "0") {
          console.log(res.msg);
          this.getCartList();
        }
      });
    },
    deletebook(x) {
      axios.post("/users/deletebook", { productId: x }).then(response => {
        let res = response.data;
        if (res.status == "1") {
          console.log(res.msg);
        } else if (res.status == "0") {
          console.log(res.msg);
          this.modalClose();
          this.getCartList();
        }
      });
    },
    toAddress() {
      this.$router.push({
        path: "/address"
      });
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
    this.getCartList();
  }
};
</script>
<style scoped>
#wrapper {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  overflow-y: auto;
  border-top: 5px solid #c74637;
  padding-top: 30px;
}
th {
  color: #aa9960;
}
td {
  text-align: center;
}
.bottombar {
  width: 94%;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 #dad8be;
  color: #fff;
  background-color: red;
  font-weight: 900;
}
.btn:hover {
  background: #d00;
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
  border: 1px solid red;
  font-size: 20px;
}
.textbtn:hover {
  color: #c79d8f;
}
</style>
