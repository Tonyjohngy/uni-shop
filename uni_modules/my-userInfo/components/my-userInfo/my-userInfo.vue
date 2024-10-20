<template>
  <view class="userInfo-box">
    <!-- 用户头像 -->
    <view class="userInfo-top">
      <image :src="userInfo.avatarUrl" class="user-avatar"></image>
      <text>{{userInfo.nickName}}</text>
    </view>
    <!--收藏模块 -->
    <view class="panel-list">
      <view class="panel1">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏店铺</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>收藏商品</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>关注商品</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 订单模块 -->
      <view class="panel2">
        <view class="panel-title">
          <text>我的订单</text>
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png"></image>
            <text>代付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png"></image>
            <text>代收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 收货模块 -->
      <view class="panel3">
        <view class="panel-body">
          <view class="panel-item">
            <text>收货地址</text>
            <uni-icons type="right" size="30rpx"></uni-icons>
          </view>
          <view class="panel-item">
            <text>联系客服</text>
            <uni-icons type="right" size="30rpx"></uni-icons>
          </view>
          <view class="panel-item" @click="logout">
            <text>退出登录</text>
            <uni-icons type="right" size="30rpx"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import {
    mapState,
    mapMutations,
  } from "vuex"
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState('my_user', ['userInfo', 'address', 'token']),
    },
    methods: {
      ...mapMutations('my_user', ['updateAddress', 'updateUserInfo', 'updateToken', 'removeAddress']),
      // 退出登录
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确定退出登录？'
        }).catch(err => err)

        if (succ && succ.confirm) {
          this.updateAddress('{}')
          this.removeAddress()
          this.updateUserInfo('{}')
          this.updateToken('')
        }

      }
    },
    onLoad() {
      this.updateToken('111')
    }
  }
</script>
<style lang="scss">
  .userInfo-box {
    background-color: #f4f4f4;
    height: 100vh;

    // 用户模块
    .userInfo-top {
      width: 100%;
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      align-items: center;

      // 用户头像
      .user-avatar {
        margin-top: 40rpx;
        display: block;
        width: 180rpx;
        height: 180rpx;
        border-radius: 90rpx;
        border: 4rpx solid white;
        box-shadow: 0 2rpx 10rpx black;
      }

      text {
        margin-top: 10rpx;
        font-size: 36rpx;
        color: #fff;
      }
    }

    // 收藏模块
    .panel-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: -20rpx;

      .panel1 {
        height: 100rpx;
        width: 80%;
        background-color: #fff;
        border-radius: 6rpx;

        .panel-body {
          display: flex;
          justify-content: space-around;

          .panel-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 24rpx;
            padding: 20rpx 0;
          }
        }
      }

      // 订单模块
      .panel2 {
        margin-top: 10rpx;
        height: 200rpx;
        width: 80%;
        background-color: #fff;
        border-radius: 6rpx;

        .panel-title {
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 24rpx;
          border-bottom: 2rpx solid #efefef;
          margin-bottom: 20rpx;

          text {
            margin-left: 20rpx;
          }
        }

        .panel-body {
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 30rpx;

          .panel-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            image {
              width: 60rpx;
              height: 60rpx;
            }

            text {
              font-size: 24rpx;
            }
          }
        }
      }

      // 收货模块
      .panel3 {
        margin-top: 20rpx;
        background-color: #fff;
        width: 80%;
        border-radius: 12rpx;

        .panel-body {
          display: flex;
          flex-direction: column;


          .panel-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20rpx 15rpx;

            text {
              font-size: 24rpx;
            }
          }
        }
      }

    }
  }
</style>