<template>
<div id="container">
  <div id="middle">
    <div id="middle_content">
      <router-view></router-view>
    </div>
  </div>
  <div id="left">
    <img src="@/assets/img/admin.png" style="border-radius:120px;margin-top:30px;" width="120px" height="120px" />
    <img src="@/assets/img/title.png" width="80%" height="100px" />
    <div class="navbox" @click="toalllist" >
      查询所有订单
    </div>
    <div class="navbox" @click="tonosend" style="background:#17344a">
      未发货
    </div>
    <div class="navbox" @click="toissend" style="background:#aa9960">
      已发货
    </div>
    <div class="navbox" @click="toalluser" style="background:#c74637">
      管理用户信息
    </div>
    <!-- <div class="navbox" style="background:#64ab8a">
      TIETGEN
    </div>
    <div class="navbox" style="background:#a8a8ac">
      TIETGEN
    </div> -->
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  components: {},
  computed: {

  },
  methods: {
    toalllist(){
      this.$router.push({
        path:'/admin'
      })
    },

    tonosend(){
      this.$router.push({
        path:'/adminnosend'
      })
    },

    toissend(){
      this.$router.push({
        path:'/adminissend'
      })
    },
    toalluser(){
      this.$router.push({
        path:'/adminalluser'
      })
    },

  },
  mounted() {

  }
}
</script>
<style scoped>
#container {
  /* overflow: hidden; */
  margin: 10px 0;
  margin-top: -80px;
}

#left {
  border: 1px solid #ddd;
  float: left;
  width: 200px;
  margin-left: -100%;
  height: auto;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #3a3837
}

#middle {
  overflow-y: auto;
  float: left;
  width: 100%;
}

#middle_content {
  height: 600px;
  margin: 0 0 0 210px;
}
.navbox{
  width: 100%;
  height: 70px;
  background: #5c8084;
  color: #fff;
  font-size: 1em;
  font-weight: 900;
  line-height: 70px;
  text-align: center;
  cursor: pointer;
  position: relative;
  top: 80px;
}
.navbox:hover{
  color:pink;
}
</style>
