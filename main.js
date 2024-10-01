// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http

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
  $http.afterRequest = function() {
    uni.hideLoading()
  },
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