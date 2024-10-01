<template>
  <view class="userInfo-box">
    <view class="userInfo-top">
      <image :src="userInfo.avatarUrl" class="user-avatar"></image>
      <text>{{userInfo.nickName}}</text>
    </view>

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

      <view class="panel3">
        <view class="panel-body">
          <view class="panel-item">
            <text>收货地址</text>
            <uni-icons type="right" size="15px"></uni-icons>
          </view>
          <view class="panel-item">
            <text>联系客服</text>
            <uni-icons type="right" size="15px"></uni-icons>
          </view>
          <view class="panel-item" @click="logout">
            <text>退出登录</text>
            <uni-icons type="right" size="15px"></uni-icons>
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
      ...mapMutations('my_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确定退出登录？'
        }).catch(err => err)

        if (succ && succ.confirm) {
          this.updateAddress('{}')
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
    height: 555px;

    .userInfo-top {
      width: 100%;
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      align-items: center;

      .user-avatar {
        margin-top: 40px;
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid white;
        box-shadow: 0 1px 5px black;
      }

      text {
        margin-top: 5px;
        font-size: 18px;
        color: #fff;
      }
    }

    .panel-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: -10px;

      .panel1 {
        height: 50px;
        width: 80%;
        background-color: #fff;
        border-radius: 3px;

        .panel-body {
          display: flex;
          justify-content: space-around;

          .panel-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            padding: 10px 0;
          }
        }
      }

      .panel2 {
        margin-top: 5px;
        height: 100px;
        width: 80%;
        background-color: #fff;
        border-radius: 3px;

        .panel-title {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          border-bottom: 1px solid #efefef;
          margin-bottom: 10px;

          text {
            margin-left: 5px;
          }
        }

        .panel-body {
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 15px;

          .panel-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            image {
              width: 30px;
              height: 30px;
            }

            text {
              font-size: 12px;
            }
          }
        }
      }

      .panel3 {
        margin-top: 5px;
        background-color: #fff;
        width: 80%;
        border-radius: 3px;

        .panel-body {
          display: flex;
          flex-direction: column;


          .panel-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 5px;

            text {
              font-size: 12px;
            }
          }
        }
      }

    }
  }
</style>