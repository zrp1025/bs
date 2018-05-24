<template>
  <div class="">
    <div class="overlay"></div>
    <div class="modal">
      <div style="font-size:30px;margin: 40px 0;font-Weight:500;color:#a65b44;">管理员登录</div>
      <div v-if="loginerror" style="margin-right:90px;color:red">用户名或者密码错误</div>
      <input class="input" type="text" placeholder="请输入用户名" v-model="user" />
      <input class="input" type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
      <div class="skybgbtn" style="margin-bottom:10px;" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      msg: "",
      user: "",
      password: "",
      loginerror: false
    };
  },
  components: {},
  computed: {},
  methods: {
    login() {
      axios
        .get("/users/adminlogin", {
          params: {
            user: this.user,
            pass: this.password
          }
        })
        .then(response => {
          let res = response.data;
          if (res.status == 0) {
            alert("登录成功");
            this.$router.push({
              path: "/admin"
            });
          } else {
            this.loginerror = true;
            alert("登录失败");
          }
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.wrapper {
  margin-top: -80px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background-image: url("./../assets/img/bg5.jpg");
  background-size: cover;
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fffe;
  border-radius: 10px;
  width: 30%;
  height: 50%;
  z-index: 201;
}
.input {
  width: 290px;
  height: 40px;
  /* border-radius:20px; */
  /* border:1px solid #1e90ff; */
  margin-bottom: 10px;
  padding-left: 10px;
  background: none;
  border: none;
  border-bottom: 1px solid #a65b44;
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
</style>
