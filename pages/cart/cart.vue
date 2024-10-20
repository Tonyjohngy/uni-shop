<!-- 购物车页面 -->
<template>
  <!-- 有商品显示商品页面 -->
  <view class="cart" v-if="cartList.length !== 0">
    <!-- 收货地址 -->
    <view class="cart-address">
      <my-address></my-address>
    </view>
    <!-- 购物车标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="25px"></uni-icons>
      <text>购物车</text>
    </view>
    <!-- 购物车列表 -->
    <view class="cart-box">
      <uni-swipe-action>
        <block v-for="(item,index) in cartList" :key="index">
          <!-- uni-swipe-action-item 滑动操作
          right-options  右边滑动
           options：定义滑动后显示的操作按钮，可以设置按钮的文本、样式等。
           disabled：是否禁用滑动操作，默认为 false。
           autoClose：点击操作按钮后是否自动关闭滑动操作，默认为 true。
           -->
          <uni-swipe-action-item :right-options="options" @click="deleteItem(item)">
            <my-goods :item="item" :showRadio=true :showNumBox=true @change-radio="handlerRadio"
              @change-num="handlerNum"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 支付组件 -->
      <my-settle></my-settle>
    </view>
  </view>
  <!-- 没有商品时显示 -->
  <view v-else class="null-shoplist">
    <image src="/static/uploads/cart_empty@2x.png"></image>
    <text>空空如也~~</text>
  </view>
</template>

<script>
  import badgeMixins from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations,
  } from "vuex"


  export default {
    mixins: [badgeMixins],
    data() {
      return {
        // 商品列表
        cartList: [],
        // 滑动参数
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }],

      };
    },

    computed: {
      ...mapState('my_cart', ['cart']),
    },
    methods: {
      ...mapMutations('my_cart', ['addCate', 'changeGoodsStatus', 'deleteCartItem', 'changeBoxNum']),
      // 改变选中状态
      handlerRadio(e) {
        this.changeGoodsStatus(e)
      },
      // 改变商品数目
      handlerNum(e) {
        this.changeBoxNum(e)
      },
      // 删除商品
      deleteItem(item) {
        this.deleteCartItem(item.goods_id)
        this.cartList = this.cart
      },
    },
    onLoad() {
      this.cartList = this.cart

    }
  }
</script>

<style lang="scss">
  // 购物车标题
  .cart-title {
    height: 40px;
    border: 1px solid #efefef;
    display: flex;
    justify-content: left;
    align-items: center;

    // 购物车标题图标
    .uni-icons {
      padding-left: 5px;
    }

    // 购物车标题文字
    text {
      padding-left: 5px;
    }
  }

  // 没有商品显示页面
  .null-shoplist {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    // 没有商品显示图片
    image {
      display: block;
      width: 90px;
      height: 90px;
    }

    // 没有商品显示文字
    text {
      color: gray;
      font-size: 18px;
      margin-top: 15px;
    }
  }
</style>