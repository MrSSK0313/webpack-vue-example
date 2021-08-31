<template>
  <div class="example1">{{ yy }}</div>
</template>

<script>
export default {
  data () {
    return {
      yy: 'Hello world!1111'
    }
  }
}
</script>

<style lang="less" scoped>
.example1 {
  color: red;
}
::placeholder {
    color: gray;
  }
  @media (min-resolution: 2dppx) {
    .image {
      background-color: yellow;
    }
  }
</style>