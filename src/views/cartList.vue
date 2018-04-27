<template>
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
        <td><img :src='item.img' style="height:80px;width:60px;text-align:left" /></td>
        <td>{{item.productName}}</td>
        <td>{{item.salePrice}}</td>
        <td>{{item.productNum}}</td>
        <td>{{item.productNum*item.salePrice}}</td>
        <td>
          <svg class="icon" style="cursor:pointer" aria-hidden="true" @click="deletebook(item.productId)">
            <use xlink:href="#icon-shanchu-tianchong"></use>
          </svg>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
  export default{
    data(){
      return {
        msg:'',
        cartlist:[]
      }
    },
    components:{

    },
    computed:{

    },
    methods:{
      getCartList(){
        axios.get('/users/cartlist').then((response)=>{
          this.cartlist = response.data.result;
          this.cartlist.map(
            (x) => {
              x.img='https://images.weserv.nl/?url='+x.productImage.substring(8);
              return x
            }
          );
          console.log(this.cartlist);
        })
      },
      check(x){
        axios.post('/users/checked',{productId:x}).then((response)=>{
          let res = response.data;
          if (res.status=="1") {
            console.log(res.msg)
          }else if(res.status=="0"){
            console.log(res.msg);
            this.getCartList();
          }
        })
      },
      deletebook(x){
        axios.post('/users/deletebook',{productId:x}).then((response)=>{
          let res = response.data;
          if (res.status=="1") {
            console.log(res.msg)
          }else if(res.status=="0"){
            console.log(res.msg);
            this.getCartList();
          }
        })
      }
    },
    mounted(){
      this.getCartList();
    }
  }
</script>
<style scoped>
  #wrapper{
    width: 94%;
    height: 400px;
    margin: 0 auto;
    overflow-y: auto;
  }
  th{
    color: #aa9960;
  }
  td{
    text-align: center;
  }
</style>
