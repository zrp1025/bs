<template>
  <div>
    <nav-header></nav-header>
    <div id="wrapper" >
      <div class="title">
        <div>
          填写并核对订单信息:
        </div>
        <div style="cursor: pointer;" @click="inaddOpen">
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
                <svg class="icon" aria-hidden="true" @click="modalOpen(index)">
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
        <td><img v-lazy='item.img' style="height:80px;width:60px;text-align:left" /></td>
        <td>《{{item.productName}}》</td>
        <td>{{item.salePrice}}</td>
        <td>{{item.productNum}}</td>
        <td style="color:#c74637;font-size:1.2em;font-weight:900">{{item.productNum*parseFloat(item.salePrice)}}</td>
      </tr>
    </table>
    <div class="title">支付方式:</div>
    <div style="width:100%;height:70px;display:flex;flex-direction:row;">
      <div :class="[pay==='在线支付'?'checkbtn':'btn']" @click="payMethod(2)" >在线支付</div>
      <div :class="[pay==='货到付款'?'checkbtn':'btn']" @click="payMethod(1)">货到付款</div>
    </div>
    <div id="bottombar" style="display:flex;align-items:flex-end;flex-direction:column;margin-right:30px;">
      <div style="display:flex;flex-direction:row;align-items:center">
        <div>1</div>
        <div>件商品，总商品价格为¥{{total}}</div>
      </div>
      <div>运费：0.00</div>
      <div style="color:#c74637">优惠：每满100减30活动(5.26-5.30)</div>
      <div>寄送至：{{selectAddress.streetName}}&nbsp&nbsp&nbsp&nbsp{{selectAddress.userName}}&nbsp&nbsp&nbsp&nbsp&nbsp {{selectAddress.tel}}</div>
      <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%">
        <div style="display:flex;flex-direction:row;align-items:center"><div style="margin-left:15px;">应付金额：</div><div style="font-size:2em;color:#c74637">¥ {{total-parseInt(total/100)*30}}<label style="font-size:0.5em">(已优惠{{parseInt(total/100)*30}}元)</label></div></div>
        <div class="submit" @click="toClosing" >提交订单</div>

      </div>
    </div>
    <SModal :modalShow='checkDelete' @modalClose='modalClose'>
      <div class="modal">
        <svg class="icon" aria-hidden="true" style="font-size:70px;margin-top:40px;">
          <use xlink:href="#icon-cuowu"></use>
        </svg>
        <div><h1 style="color:#aa9960">是否确认删除</h1></div>
        <div class="modalBtn">
          <div class="textbtn" style="margin-bottom:10px;" @click='deleteAddress(msg)' >立即删除</div>
          <div class="textbtn" style="margin-bottom:10px;" @click='modalClose' >取消</div>
        </div>
      </div>
    </SModal>

    <Modal :modalShow='inaddShow' @modalClose='inaddClose'>
      <div class="bg">
        <div style="font-size:30px;margin: 40px 100px;font-Weight:500;color:#a65b44;">新增收获地址</div>
        <div>
          <label style="color:#a65b44" for="userName">&nbsp&nbsp&nbsp&nbsp收货人：</label>
          <input id="userName" class="input" type="text" placeholder="请输入收货人名" v-model="userName" />
        </div>
        <div>
          <label style="color:#a65b44" for="streetName">收获地址：</label>
          <input id="streetName" class="input" type="text" placeholder="请输入地址" v-model="streetName" />
        </div>
        <div>
          <label style="color:#a65b44" for="tel">联系电话：</label>
          <input id="tel" class="input" type="number" placeholder="请输入联系电话" v-model="tel" />
        </div>
          <div class="skybgbtn" style="margin-bottom:10px;" @click='addAddress' >添加地址</div>
      </div>
    </Modal>

  </div>
</template>
<script>
import SModal from "@/components/SModal";
import Modal from "@/components/Modal";
import NavHeader from "@/components/NavHeader";
import axios from "axios";
export default {
  data() {
    return {
      msg: "",
      addresslist: [],
      checkIndex: "0",
      selectAddress: "",
      cartlist: [],
      pay: '在线支付',
      checkDelete: false,
      inaddShow: false,
      userName:'',
      streetName:'',
      tel:'',

    };
  },
  components: {
    NavHeader,
    SModal,
    Modal
  },
  computed: {
    checkgoods() {
      let goods = [];
      this.cartlist.forEach(item => {
        if (item.checked == 1) {
          goods.push(item);
        }
      });
      return goods;
    },
    total() {
      let n = 0;
      this.checkgoods.forEach(item => {
        n += item.productNum * parseFloat(item.salePrice);
      });
      return n;
    }
  },
  methods: {
    getAddress() {
      axios.get("/users/address").then(response => {
        let res = response.data;
        if (res.status == 1) {
          console.log(res.msg);
        } else {
          this.addresslist = res.result;
          this.cartlist = res.cart;
          this.cartlist.map(x => {
            x.img =
              "https://images.weserv.nl/?url=" + x.productImage.substring(8);
            return x;
          });
          this.selectAddress = this.addresslist[0];
          console.log(this.addresslist);
          console.log(this.cartlist);
        }
      });
    },
    addAddress() {
      let data = {
        addressId: parseInt(Math.random()*100000),
        userName: this.userName,
        streetName: this.streetName,
        postCode: '1231231231',
        tel: this.tel,
        isDefault: false
      }
      axios.post('/users/addAddress',{data}).then(response => {
        let res = response.data;
        if (res.status == 0) {
          this.inaddClose();
          this.getAddress();
        }
      })
    },
    checkAddress(item, index) {
      this.checkIndex = index;
      this.selectAddress = item;
    },
    deleteAddress(index) {
      axios.post('/users/deleteAddress',{index}).then(response => {
        let res = response.data;
        this.modalClose();
        this.getAddress();
      });

    },
    payMethod(type) {
      if (type === 1) {
        this.pay = '货到付款'
      } else {
        this.pay = '在线支付'
      }
      console.log(this.pay);

    },
    toClosing() {
      this.$router.push({
        name: "Closing",
        params: {
          address: this.selectAddress,
          goods: this.checkgoods,
          payMethod: this.pay
        }
      });
    },
    modalClose() {
      this.checkDelete = false;
    },
    modalOpen(data) {
      this.checkDelete = true;
      this.msg = data;
    },
    inaddClose() {
      this.inaddShow = false;
    },
    inaddOpen() {
      this.inaddShow = true;
    },
  },
  mounted() {
    this.getAddress();
  }
};
</script>
<style scoped>
#wrapper {
  width: 100%;
  /* height: 400px; */
  margin: 0 auto;
  border-top: 5px solid #c74637;
  padding-top: 30px;
}
.addtr {
  background: #fff;
  cursor: pointer;
  text-align: center;
}
.checkaddtr {
  background-color: #ffffe0;
  text-align: center;
  cursor: pointer;
}
.addtr:hover {
  background-color: #ffffe0;
}
.del:hover {
  color: skyblue;
}
.title {
  color: #aa9960;
  font-weight: 900;
  font-size: 1.2em;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 40px;
}
.btn {
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
.btn:hover {
  background: #aa9960;
}
.checkbtn {
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
.submit {
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
.submit:hover {
  background: #d85748;
}
#bottombar div {
  margin-top: 10px;
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
.skybgbtn {
  width: 304px;
  height: 40px;
  border-radius: 5px;
  color: #a65b44;
  background-color: #c79d8f;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.skybgbtn:hover {
  background-color: #d8ae9f;
}
.input{
  width:290px;
  height:40px;
  /* border-radius:20px; */
  /* border:1px solid #1e90ff; */
  margin-bottom: 10px;
  padding-left: 10px;
  background: none;
  border:none;
  border-bottom: 1px solid #a65b44;
}
.bg{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
