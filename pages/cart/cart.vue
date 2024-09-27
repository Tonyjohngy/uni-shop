<template>
  <view class="cart" v-if="cartList.length !== 0">
    <view class="cart-address">
      <my-address></my-address>
    </view>
    <view class="cart-title">
      <uni-icons type="shop" size="25px"></uni-icons>
      <text>购物车</text>
    </view>
    <view class="cart-box">
      <uni-swipe-action>
        <block v-for="(item,index) in cartList" :key="index">
          <uni-swipe-action-item :right-options="options" @click="deleteItem(item)">
            <my-goods :item="item" :showRadio=true :showNumBox=true @change-radio="handlerRadio"
              @change-num="handlerNum"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>

      <my-settle></my-settle>
    </view>
  </view>
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
        cartList: [],
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

      handlerRadio(e) {
        this.changeGoodsStatus(e)
      },
      handlerNum(e) {
        this.changeBoxNum(e)
      },
      deleteItem(item) {
        this.deleteCartItem(item.goods_id)
        this.cartList = this.cart
      },
      handlerSettle(e) {

      }
    },
    onLoad() {
      this.cartList = this.cart

    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    border: 1px solid #efefef;
    display: flex;
    justify-content: left;
    align-items: center;

    .uni-icons {
      padding-left: 5px;
    }

    text {
      padding-left: 5px;
    }
  }

  .null-shoplist {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    image {
      display: block;
      width: 90px;
      height: 90px;
    }

    text {
      color: gray;
      font-size: 18px;
      margin-top: 15px;
    }
  }
</style>