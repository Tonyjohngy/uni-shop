// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
// 由于平台的限制，小程序项目中不支持 axios，而且原生的 wx.request() API 功能较为简单，
// 不支持拦截器等全局定制的功能。因此，建议在 uni-app 项目中使用 @escook/request-miniprogram 第三方包发起网络数据请求。
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http

// 请求之前等待数据时的处理
$http.beforeRequest = function(options) {
    uni.showLoading({
      title: '数据加载中...'
    })
    if (options.url.indexOf('/my/') !== -1) {
      options.header = {
        Authorization: store.state.my_user.token
      }
    }
  },
  // 请求之后的处理
  $http.afterRequest = function() {
    uni.hideLoading()
  },
  // 请求失败默认提示
  uni.$showMsg = function(title = '请求数据失败！', duration = 1500) {
    uni.showToast({
      title,
      duration,
      icon: 'none'
    })
  },

  // 请求的根路径
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif