<template>
  <view class="settle-box">
    <!-- 结算组件 -->
    <view class="settle-left">
      <label @click="changeClicked">
        <radio color="#c00000" :checked="isAllChecked"></radio>
      </label>
      <text>全选</text>
    </view>
    <view class="settle-mid">合计：<text>￥{{totalPrice}}</text></view>
    <!-- 弹出支付二维码组件 -->
    <my-modal :visible="modalVisible" title="微信支付" :qrCodeImageUrl="qrCodeImageUrl" @close="closeModal"></my-modal>
    <view class="settle-right" @click="settlement">
      结算({{totalRadio}})
    </view>
  </view>
</template>
<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex"

  export default {

    props: {

    },
    data() {
      return {
        second: 3,
        timer: null,
        modalVisible: false,
        qrCodeImageUrl: ''
      };
    },
    computed: {
      ...mapGetters('my_cart', ['totalRadio', 'total', 'totalPrice']),
      ...mapState('my_user', ['address', 'token']),
      ...mapState('my_cart', ['cart']),
      isAllChecked() {
        return this.totalRadio === this.total
      }
    },
    methods: {
      ...mapMutations('my_cart', ['allChecked']),
      ...mapMutations('my_user', ['updateUserInfo', 'updateToken', 'UpdateRedirect']),
      // 改变全选商品
      changeClicked() {
        this.allChecked(!this.isAllChecked)
      },
      // 结算前的校验
      settlement() {
        if (!this.totalRadio) return uni.$showMsg('请勾选商品！')
        if (this.address === '{}') return uni.$showMsg('请选择收货地址！')
        if (!this.token) return this.delayNavigate()
        this.payOrder()
      },
      // 结算账单
      async payOrder() {
        const orderInfo = {
          order_price: 0.1,
          consignee_addr: this.address,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_number,
            goods_price: x.goods_price
          }))
        }
        this.showModal()
      },
      // 弹出二维码
      showModal() {
        this.qrCodeImageUrl =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQAAAAAUekxPAAAA5UlEQVR42u3Wuw7DMAgFUDZ+mQ02fpmhEgWiJlG6xXdq41qRdSrFLg+rlF/jRY/9vBkRe7DPAmBeMzh0Fgizer+b8CxAlqYJtBB1R1nPkmtc7trkqMc1bzct59x16Etd3bXOTlCF9HzmFWMTUSMRqm8ARl0+Iryde9mCM6Si6fMEmHpv0124x2DFrPrPMyoAHgqxZg5iO+pqwbp+qmeyw+oIqxEalXU2BdjUeFRUazeETev1lbO19bJtd6z1HnuOlsz4c0MEg8w65Z4wm6rUcw0tWE5yegdDWP9464+GOsCe/zT/ZW/nH5kFc1hE4wAAAABJRU5ErkJggg=='
        this.modalVisible = true

        // 接口无法在手机上使用 方便手机展示 把二维码写死
        // async showModal() {
        //   await uni.request({
        //     url: 'http://localhost:8080/orderservice/pay-log/createNative', // 使用绝对路径
        //     method: 'GET',
        //     success: (res) => {
        //       // this.qrCodeImageUrl = 'data:image/png;base64,' + res.data; 
        //       console.log(this.qrCodeImageUrl)
        //       this.modalVisible = true
        //     },
        //     fail: (err) => {
        //       console.error(err);
        //     }
        //   })


        // 由于素材的api出现问题所以以二维码图片来处理，以下是有api的正常方法
        // // 1.2 发起请求创建订单
        //   const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        //   if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        //   // 1.3 得到服务器响应的“订单编号”
        //   const orderNumber = res.message.order_number

        //    // 2. 订单预支付
        //    // 2.1 发起请求获取订单的支付信息
        //    const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
        //    // 2.2 预付订单生成失败
        //    if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
        //    // 2.3 得到订单支付相关的必要参数
        //    const payInfo = res2.message.pay

        //    // 3. 发起微信支付
        //    // 3.1 调用 uni.requestPayment() 发起微信支付
        //    const [err, succ] = await uni.requestPayment(payInfo)
        //    // 3.2 未完成支付
        //    if (err) return uni.$showMsg('订单未支付！')
        //    // 3.3 完成了支付，进一步查询支付的结果
        //    const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
        //    // 3.4 检测到订单未支付
        //    if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        //    // 3.5 检测到订单支付完成
        //    uni.showToast({
        //      title: '支付完成！',
        //      icon: 'success'
        //    })

      },
      // 关闭二维码
      closeModal() {
        this.modalVisible = false
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
      },
      // 如果没有登陆,3秒后跳转到登录页
      delayNavigate() {
        this.second = 3
        this.showTip(this.second)
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.UpdateRedirect({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
          }
          this.showTip(this.second)
        }, 1000)
      },
      // 提示跳转秒数
      showTip(n) {
        uni.showToast({
          icon: null,
          title: n + '秒后跳转登录',
          mask: true,
          duration: 1500,
        })
      }
    },
    watch: {},
    onLoad() {}
  }
</script>
<style lang="scss">
  // 结算组件样式
  .settle-box {
    position: sticky;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;

    // 左侧样式
    .settle-left {
      display: flex;
      align-items: center;
      padding-left: 5px;
    }

    // 中间样式
    .settle-mid {
      min-width: 100px;

      text {
        color: #c00000
      }
    }

    // 右侧样式
    .settle-right {
      // height: 100%;
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>