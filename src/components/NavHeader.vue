<template>
  <div class="header">
    <div class="content">
      <div class="nav-left">
        <div class="nav-box becheck" @click="backhome">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhuye"></use>
          </svg>
        </div>
        <!-- <div class="nav-box">
          待定
        </div>
        <div class="nav-box">
          待定
        </div>
        <div class="nav-box">
          待定
        </div> -->
      </div>
      <div id="logo" @click="backhome">
        <!-- <h1 class="hf">Book</h1>
        <h1 class="hl">shop</h1> -->
        <img src="./../assets/img/title.png" style="width:200px;height:100px;" />
      </div>

      <div class="nav-right">
        <div class="nav-box" @click='mdOpen'>
            <div style="line-height:80px;">
              {{loginName}}
              <svg class="icon" aria-hidden="true" v-show="!islogin">
                <use xlink:href="#icon-user"></use>
              </svg>
            </div>
        </div>
        <div class="nav-box" v-show="islogin" @click="logout">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuichu1"></use>
          </svg>
        </div>
        <div class="nav-box" @click="goCart">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuche"></use>
          </svg>
        </div>
        <div class="nav-text" style="width:240px;height:80px;margin-left:30px;">
          <div style="border:1px solid;height:40px;width:240px;margin-top:-10px;">
            <div style="line-height:40px;">
              <a :href="searchhref" id="searcha">
                <svg class="icon" style="width:20px;height:20px;margin-left:5px;cursor:pointer;" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </a>
              <input type="text" name="year" @keyup.enter="goSearch" v-model="searchValue" placeholder="搜索" style="color:#aa9960;font-size:16px;margin-left:5px;outline:none;width:160px;height:40px;border:none;background:none;"  />
              <svg class="icon" style="width:20px;height:20px;cursor:pointer;" aria-hidden="true" @click="clearSearch">
                <use xlink:href="#icon-closec"></use>
              </svg>
            </div>
          </div>
        </div>
        <!-- <div class="nav-box">
          <svg class="icon"  aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div> -->
      </div>
    </div>
    <Modal :modalShow='mdshow' @modalClose='mdClose'>
      <div class="bg">
        <img src="./../assets/img/sign2.png" style="width:280px;height:160px;position:absolute;top:20px;left:20px" />
        <div class="signon">
          <div style="font-size:30px;margin: 40px 100px;font-Weight:500;color:#a65b44;">用户登录</div>
          <div v-if="loginerror" style="margin-right:90px;color:red">用户名或者密码错误</div>
          <input class="input" type="text" placeholder="请输入用户名" v-model="user" />
          <input class="input" type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
          <div class="skybgbtn" style="margin-bottom:10px;" @click="login">登录</div>
          <div class="textbtn" @click="zcOpen">还没有注册？</div>
        </div>
      </div>
    </Modal>
    <Modal :modalShow='zcshow' @modalClose='zcClose'>
      <div class="bg">
        <img src="./../assets/img/sign2.png" style="width:280px;height:160px;position:absolute;top:20px;left:20px" />
        <div class="signon">
          <div style="font-size:30px;margin: 40px 100px;font-Weight:500;color:#a65b44;">用户注册</div>
          <input class="input" type="text" placeholder="请输入用户名" v-model="user" />
          <input class="input" type="password" placeholder="请输入密码" v-model="password" />
          <input class="input" type="password" placeholder="再次请输入密码" v-model="password1" @keyup.enter="signIn" />
          <div class="skybgbtn" style="margin-bottom:10px;" @click="signIn" >立即注册</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal"
import axios from 'axios'
  export default{
    data(){
      return {
        msg:'',
        mdshow:false,
        zcshow:false,
        user:'',
        password:'',
        password1:'',
        errTip:false,
        loginName:'',
        islogin:false,
        searchValue:'',
        loginerror:false
      }
    },
    components:{
      Modal,

    },
    computed:{
      searchhref(){
        return "http://localhost:8080/searchlist?tag="+this.searchValue
      }
    },
    mounted(){
      this.checkLogin()
    },
    methods:{
      backhome(){
        this.$router.push({
          path:'/'
        })
      },
      goCart(){
        if (this.islogin) {
          this.$router.push({
            path:'/cartlist'
          })
        }
      },
      mdClose(){
        this.mdshow=false;
      },
      mdOpen(){
        if (!this.islogin) {
          this.mdshow=true;
        }
      },
      zcClose(){
        this.zcshow=false;
      },
      zcOpen(){
          this.zcshow=true;
          this.mdshow=false;
      },
      clearSearch(){
        this.searchValue=''
      },
      goSearch(){
        location.href=this.searchhref
      },
      login(){
        if(this.user==''||this.password==''){
          this.errTip=true;
          alert('用户名或密码不能为空');
        }else{
          axios.get('/users/login',{
            params:{
              user:this.user,
              pass:this.password
            }
          }).then((response)=>{
            let res = response.data;
            if (res.status==1) {
              this.loginerror = true;
              this.errTip=true;
              console.log(res.msg);
            }else{
              //成功
              this.loginerror = false;
              this.mdClose();
              this.loginName=res.result;
              this.islogin=true;
              console.log(res.msg);
              console.log(res.data);
            }
          })
        }
      },
      logout(){
        axios.get('/users/logout').then((response)=>{
          let res = response.data;
          if (res.status==0) {
            this.islogin=false;
            this.loginName="";
            console.log(res.result);
          }
        })
        this.$router.push({
          path:'/'
        })
      },
      signIn(){
        if (this.user!=''&&this.password!='') {
          if (this.password!=this.password1) {
            alert("两个密码不相等")
          }else{
            axios.post("/users/signin",{userName:this.user,userPwd:this.password}).then((response)=>{
              let res = response.data;
              if (res.status=="1") {
                console.log(res.msg)
              }else if(res.status=="0"){
                console.log(res.msg);
                this.zcClose();
                this.login();
              }
            })
          }
        }else {
          alert('不能为空')
        }

      },
      checkLogin(){
        axios.get('users/checklogin').then((response)=>{
          let res = response.data;
          if (res.status==0) {
            this.loginName=res.result;
            this.islogin=true;
          }else{
            console.log(res.msg);
          }
        })
      }
    }
  }
</script>
<style scoped>
  .header{
    width: 100%;
    height: 80px;
    position: absolute;
    top: 0;
    z-index: 100;
    background: snow;
  }
  .content{
    height: 75px;
    width: 98%;
    /* border-bottom: 5px solid #aa9960; */
    margin: auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  #logo{
    width: 200px;
    height: 80px;
    cursor: pointer;
    margin-top: -13px;
    position:absolute;
    left:0; right:0;
margin:auto;
  }
  #logo h1{
    display: inline-block;
  }
  #logo:hover{
    transform: scale(1.2,1.2);
    transition: all 0.5s ease;
  }
  .hf{
    color: #c74637;
  }
  .hl{
    color: #aa9960;
  }
  .nav-left{
    height: 80px;
    width: auto;
    margin-left: 10px;
  }
  .nav-right{
    height: 80px;
  }
  .nav-left .nav-box{
    height: 80px;
    width: 80px;
    float: left;
    line-height: 80px;
    text-align: center;
  }
  .nav-right .nav-box{
    height: 80px;
    width: 80px;
    float: left;
    line-height: 80px;
    text-align: center;
  }
  .nav-box{
    color: #aa9960;
    cursor: pointer;
  }

  .nav-box:hover{
    background: #3a3837;
    color: #aa9960;
  }
  .nav-text{
    height: 80px;
    width: 200px;
    float: left;
    line-height: 80px;
    display: flex;
    align-items: center;
    color: #aa9960;
  }
  .becheck{
    background: #3a3837;
    color: #aa9960;
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
  .skybgbtn{
    width:304px;height:40px;border-radius:5px;color:#a65b44;background-color:#c79d8f;text-align:center;line-height:40px;cursor: pointer;
  }
  .skybgbtn:hover{background-color: #d8ae9f}
  .skytextbtn{
    width:304px;height:38px;border:1px solid #1e90ff;border-radius:2px;color:#1e90ff;background-color:#fff;text-align:center;cursor: pointer;line-height:40px
  }
  .textbtn{
    width:304px;height:38px;color:#a65b44;text-align:center;cursor: pointer;line-height:40px;
  }
  .textbtn:hover{color:#c79d8f}
  /* .ipt{
    background: none;
    border: none;
    border-bottom: 1px solid #ddd;
  } */
  .bg{
    height: 100%;
    width: 100%;
    background-image: url('./../assets/img/sign1.jpg');
    background-size:50% 100%;
    background-repeat: no-repeat;
  }
  .signon{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 60px;
  }
  #searcha{
    color: #aa9960;
  }
</style>
