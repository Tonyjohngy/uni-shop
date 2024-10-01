<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>
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