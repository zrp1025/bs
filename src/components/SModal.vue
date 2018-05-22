<template>
  <div>
    <transition name="modal">
    <div class="modal" v-show="modalShow">
      <slot></slot>
    </div>
  </transition>
  <div class="overlay" v-show="modalShow" @click="modaClose"></div>
  </div>

</template>
<script>
  export default{
    props:['modalShow'],
    data(){
      return {
        msg:'',

      }
    },
    components:{

    },
    computed:{

    },
    methods:{
      modaClose(){
        this.$emit('modalClose')
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .modal-enter{
    transform: scale(0.8,0.8);
    opacity: 0;
  }
  .modal-enter-active{
    transition: all 0.7s ease-out;
  }
  .modal-leave-active{
    transition: all 0.7s ease-out;
    transform: scale(1.3,1.3);
    opacity: 0;
  }
  .modal{
    position:fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    min-width: 400px;
    width:40%;
    min-height: 200px;
    height: 60%;
    z-index: 201;

  }
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 200;
  }
</style>
