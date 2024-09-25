<template>
  <view class="goods-item" @click="goToDetail(item)">
    <view class="img-box">
      <image :src="item.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-description">
      <view class="goods-title">{{item.goods_name}}</view>
      <view class="goods-price">￥{{fixedPrice}}</view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        // 默认图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    methods: {
      goToDetail(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?$id={item.goods_id}`,
          success: res => {},
          fail: () => {},
          complete: () => {}
        });
      }
    },
    computed: {
      fixedPrice() {
        return Number(this.item.goods_price).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: left;
    padding: 5px;
    border-bottom: 1px solid #efefef;

    .img-box {

      image {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-description {
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-title {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }

  }
</style>