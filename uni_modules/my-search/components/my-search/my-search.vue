<template>
  <view class="search-container" :style="{'background-color':bgc}">
    <view @click="searchHandler()" class="search-box" :style="{'border-radius':radius+'px'}">
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

      radius: {
        type: Number,
        default: 30,
      },
    },
    methods: {
      searchHandler() {
        this.$emit('click')
      }
    }
  }
</script>
<style lang="scss">
  .search-container {
    height: 50px;
    padding: 0 10px;
    // width: 100%;
    display: flex;
    align-items: center;

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