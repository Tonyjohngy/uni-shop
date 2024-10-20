<template>
  <view class="search-container" :style="{'background-color':bgc}">
    <view @click="searchHandler()" class="search-box" :style="{'border-radius':radius+'px'}">
      <!-- uni-icons uniapp图标 -->
      <uni-icons type="search" size="20"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      bgc: {
        type: String,
        default: '#c00000',
      },
      // 边框弧度
      radius: {
        type: Number,
        default: 30,
      },
    },
    methods: {
      // 传递数据给父组件点击跳转
      searchHandler() {
        this.$emit('click')
      }
    }
  }
</script>
<style lang="scss">
  // 搜索容器样式
  .search-container {
    height: 50px;
    padding: 0 10px;
    // width: 100%;
    display: flex;
    align-items: center;

    // 搜索圆框
    .search-box {
      width: 100%;
      height: 30px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 15px;
      }
    }
  }
</style>