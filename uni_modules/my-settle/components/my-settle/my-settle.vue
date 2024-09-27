<template>
  <view class="settle-box">
    <view class="settle-left">
      <label @click="changeClicked">
        <radio color="#c00000" :checked="isAllChecked"></radio>
      </label>
      <text>全选</text>
    </view>
    <view class="settle-mid">合计：<text>￥{{totalPrice}}</text></view>
    <view class="settle-right">
      结算({{totalRadio}})
    </view>
  </view>
</template>
<script>
  import {
    // mapState,
    mapMutations,
    mapGetters
  } from "vuex"

  export default {

    props: {

    },

    computed: {
      ...mapGetters('my_cart', ['totalRadio', 'total', 'totalPrice']),
      isAllChecked() {
        return this.totalRadio === this.total
      }
    },
    methods: {
      ...mapMutations('my_cart', ['allChecked']),
      changeClicked() {
        this.allChecked(!this.isAllChecked)
      }
    },
    watch: {},
    onLoad() {}
  }
</script>
<style lang="scss">
  .settle-box {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;

    .settle-left {
      display: flex;
      align-items: center;
      padding-left: 5px;
    }

    .settle-mid {
      min-width: 100px;

      text {
        color: #c00000
      }
    }

    .settle-right {
      // height: 100%;
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>