<template>
  <!-- 商品item组件 -->
  <view class="cart-item">
    <view class="cart-item-left">
      <radio></radio>
      <image :src="item.goods_small_logo">
    </view>
    <view class="cart-item-right">
      <view class="item-description">{{item.goods_name}}</view>
      <view class="item-num">
        <text>￥{{item.goods_price}}</text>
        <uni-number-box v-model="item.goods_count" />
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
    }
  }
</script>

<style lang="scss">
  .cart-item {
    border: 1px solid #efefef;
    display: flex;
    padding: 10px 4px;

    // 商品左侧
    .cart-item-left {
      display: flex;
      align-items: center;

      image {
        width: 100px;
        height: 100px;
      }
    }

    // 商品右侧
    .cart-item-right {
      padding-left: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .item-description {
        font-size: 12px;
      }

      .item-num {
        display: flex;
        justify-content: space-between;
        color: #c00000;
      }
    }
  }
</style>