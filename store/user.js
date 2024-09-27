export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('my_user/saveAddress')
    },
    saveAddress(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },
  actions: {},
  getters: {
    addressStr(state) {
      if (state.address.provinceName === '') return
      return state.address.provinceName + state.address.cityName + state.address.detailInfo
    },

  }
}