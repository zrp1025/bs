<template>
  <div>
    <transition name="modal">
    <div class="modal" v-show="modalShow">
      <slot></slot>
    </div>
  </transition>
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
    transform: scale(0.8,0.8);
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
    border: 1px solid #ddd;
    min-width: 200px;
    width:30%;
    min-height: 200px;
    height: 30%;
    z-index: 201;
    border-radius: 20px;
  }
</style>
