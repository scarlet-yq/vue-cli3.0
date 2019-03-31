<template>
  <div class="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import * as types from './store/types';

  export default {
    name: 'app',
    mounted() {
      this.$store.dispatch(types.DO_GET_USER_INFO);
    }
  }
</script>

<style lang="less">
  .main {
    .ivu-layout.ivu-layout-has-sider {
      height: 100%;
    }
  }
</style>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  html, body,.app  {
    height: 100%;
  }
</style>
