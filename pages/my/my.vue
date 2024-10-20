<template>
  <view class="my-container">
    <!-- 没有token就显示登录页面 -->
    <my-login v-if="!token"></my-login>
    <!-- 有token就显示个人信息页面 -->
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  import badgeMixins from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    // mapMutations,
  } from "vuex"

  export default {
    mixins: [badgeMixins],
    data() {
      return {

      };
    },
    computed: {
      ...mapState('my_user', ['token']),
    },
    onLoad() {
      console.log(this.token);
    }
  }
</script>

<style lang="scss">
  .my-container {
    height: 100%;
  }
</style>