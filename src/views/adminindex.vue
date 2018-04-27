<template>
<div id="container">
  <div id="middle">
    <div id="middle_content">
      middle_content<br>主内容区域<br>主内容区域
      fasdf
    </div>
  </div>
  <div id="left">
    <img src="@/assets/img/admin.png" style="border-radius:50px;margin-top:30px;" width="100px" height="100px" />
    <img src="@/assets/img/title.png" width="80%" height="80px" />
    <div class="navbox" >
      TIETGEN
    </div>
    <div class="navbox" style="background:#17344a">
      TIETGEN
    </div>
    <div class="navbox" style="background:#aa9960">
      TIETGEN
    </div>
    <div class="navbox" style="background:#c74637">
      TIETGEN
    </div>
    <div class="navbox" style="background:#64ab8a">
      TIETGEN
    </div>
    <div class="navbox" style="background:#a8a8ac">
      TIETGEN
    </div>
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

  },
  mounted() {

  }
}
</script>
<style scoped>
#container {
  overflow: hidden;
  margin: 10px 0;
  margin-top: -80px;
}

#left {
  border: 1px solid #ddd;
  float: left;
  width: 200px;
  margin-left: -100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #3a3837
}

#middle {
  float: left;
  width: 100%;
}

#middle_content {
  border: 1px solid red;

  height: 600px;
  margin: 0 0 0 210px;
}
.navbox{
  width: 100%;
  height: 70px;
  background: #5c8084;
  color: #fff;
  font-size: 1.5em;
  font-weight: 900;
  line-height: 70px;
  text-align: center;
  cursor: pointer;
}
.navbox:hover{
  color:pink
}
</style>
