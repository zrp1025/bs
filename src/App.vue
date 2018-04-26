<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader"
export default {
  name: 'App',
  data(){
    return {

    }
  },
  components:{
    NavHeader,
  },
  methods:{

  }
}
</script>

<style>
#app {
  font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
  font-family: Helvetica, Tahoma, Arial, '宋体',"PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 80px;
}
body{
  margin: 0;
  padding: 0;
  background-color: snow;
}
</style>
