<template>
  <view class="goods-item">
    <!-- 左侧 -->
    <view class="goods-item-left">
      <radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="handlerChangeRadio"></radio>
      <image :src="item.goods_small_logo || defaultPic"></image>
    </view>
    <!-- 右侧 -->
    <view class="goods-item-right">
      <view class="goods-title">{{item.goods_name}}</view>
      <view class="item-num">
        <view class="goods-price">￥{{fixedPrice}}</view>
        <uni-number-box v-if="showNumBox" :min="1" :value="item.goods_count" @change="handlerChangeNum" />
      </view>
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
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNumBox: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 默认图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

      }
    },
    methods: {

      handlerChangeRadio() {
        this.$emit('change-radio', {
          goods_id: this.item.goods_id,
          goods_state: !this.item.goods_state,
        })
      },
      handlerChangeNum(val) {
        this.$emit('change-num', {
          goods_id: this.item.goods_id,
          goods_count: +val
        })
      },

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

    .goods-item-left {
      display: flex;
      align-items: center;

      image {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-title {
        font-size: 13px;
      }

      .item-num {
        display: flex;
        justify-content: space-between;

        .goods-price {
          font-size: 16px;
          color: #c00000;
        }

      }

    }

  }
</style>