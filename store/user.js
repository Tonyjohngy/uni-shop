export default {
  namespaced: true,
  state: () => ({
    // 用户地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // token用户登录
    token: uni.getStorageSync('token') || '',
    // 用户信息
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 重定向位置
    redirectInfo: null,
  }),
  mutations: {
    // 更新地址方法
    updateAddress(state, address) {
      state.address = address
      this.commit('my_user/saveAddress')
    },
    // 保存地址方法
    saveAddress(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('my_user/saveUserInfo')
    },
    // 保存用户信息
    saveUserInfo(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新token
    updateToken(state, token) {
      state.token = token
      this.commit('my_user/saveToken')
    },
    // 保存token
    saveToken(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新重定向地址
    UpdateRedirect(state, redirectInfo) {
      state.redirectInfo = redirectInfo
    },

  },
  actions: {},
  getters: {
    // 生成详细地址
    addressStr(state) {
      if (state.address.provinceName === '') return
      return state.address.provinceName + state.address.cityName + state.address.detailInfo
    },

  }
}