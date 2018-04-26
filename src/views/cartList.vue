<template>
  <div id="wrapper">
    <table style="width:100%;height:50px;">
      <tr>
        <th>全选</th>
        <th>商品信息</th>
        <th>单价</th>
        <th>数量</th>
        <th>金额</th>
        <th>编辑</th>
      </tr>
      <tr style="width:100%;height:100px;" v-for="item in cartlist">
        <td>*</td>
        <td>{{item.productName}}</td>
        <td>{{item.salePrice}}</td>
        <td>{{item.productNum}}</td>
        <td>{{item.productNum*item.salePrice}}</td>
        <td>删除</td>
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
          console.log(this.cartlist);
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
    height: 500px;
    margin: 0 auto;
    background-color: pink;
    overflow-y: auto;
  }
  th{
    color: #aa9960;
  }
  td{
    text-align: center;
  }
</style>
