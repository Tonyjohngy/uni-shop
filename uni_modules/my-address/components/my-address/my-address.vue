<template>
  <view class="address-box">
    <view class="address-button-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请输入收货地址+</button>
    </view>

    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">收货人：{{ address.userName }}</view>
        <view class="row1-right">电话：{{address.telNumber}}
          <uni-icons type="right"></uni-icons>
        </view>

      </view>
      <view class="row2">
        <view class="row2-left">收货地址：{{ addressStr }}</view>
      </view>
    </view>

    <image src="/static/uploads/cart_border@2x.png" class="address-bottom"></image>
  </view>
</template>
<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex"

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters('my_user', ['addressStr']),
      ...mapState('my_user', ['address']),
    },
    methods: {
      ...mapMutations('my_user', ['updateAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)

        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          this.updateAddress(succ)
        }
      },
    }
  }
</script>
<style lang="scss">
  .address-box {
    .address-button-box {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      button {}
    }

    .address-info-box {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      font-size: 12px;
      padding: 30px 10px;

      .row1 {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
      }
    }

    .address-bottom {
      width: 100%;
      height: 5px;
    }
  }
</style>