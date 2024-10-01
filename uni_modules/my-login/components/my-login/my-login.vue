<template>
  <view class="login-box">
    <view class="login-logo">
      <uni-icons type="contact-filled" size="100px" color="#AFAFAF"></uni-icons>
    </view>
    <button type="primary" class="login-btn" @click="getUserInfo">
      一键登录
    </button>
    <view class="login-text">
      <text>登录后享受更多权益</text>
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
      return {

      };
    },
    computed: {
      ...mapState('my_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('my_user', ['updateUserInfo', 'updateToken', 'UpdateRedirect']),
      getUserInfo(e) {
        uni.getUserProfile({
          desc: '请求授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log('获取用户信息成功', res.userInfo);
            // 在这里处理获取到的用户信息
            this.updateUserInfo(res.userInfo);
            this.getToken(res)
          },
          fail: (err) => {
            console.error('获取用户信息失败', err);
          }
        });
      },
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)

        if (err || res.errMsg !== 'login:ok') return uni.showError('登陆失败！')
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        console.log(query)
        const {
          data: loginRes
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        console.log(loginRes);


        // 换取 token
        // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // uni.$showMsg('登录成功')


        // 由于接口限制报404错误不能使用 自动生成或者写死token
        // if (loginRes.status !== 200) return uni.$showMsg('登陆失败！')
        //预设随机字符串
        // let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789'
        // const msg = loginRes.msg || {}
        // if (loginRes.meta.status === 400) {
        //   // 模拟token
        //   for (let i = 1; i < chars.length; i++) {
        //     const n = chars.charAt(Math.floor(Math.random() * chars.length))
        //     msg.token += n
        //   }
        // }
        // this.updateToken(msg.token.replace('undefined', 'Bearer'))
        this.updateToken(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        )
        this.switchBack()
      },
      switchBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.UpdateRedirect(null)
            }
          })
        }
      },
    }
  }
</script>
<style lang="scss">
  .login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-logo {
      margin-top: 90px;
    }

    .login-btn {
      margin-top: 10px;
      width: 300px;
      height: 40px;
      background-color: #c00000;
      border-radius: 40px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }

    .login-text {
      margin-top: 10px;
      color: gray;
      font-size: 12px;

    }
  }
</style>