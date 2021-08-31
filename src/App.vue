<template>
  <div class="example">
    {{ msg }}
    <div>
      <img :src="url_img" alt="" class="imgs">
    </div>
    <router-link to="/my">my</router-link>
    <router-link to="/">home</router-link>
    <router-view/>
  </div>
  
</template>

<script>
import imgs from './assets/logo.png';
export default {
  data () {
    return {
      msg: 'Hello world!',
      url_img:imgs
    }
  },
  created(){
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.example {
  color: red;
}
.imgs{
  width:200px;height:200px;
}
</style>