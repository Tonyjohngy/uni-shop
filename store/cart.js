export default {
  namespaced: true,
  state: () => ({
    // {goods_id,goods_name,goods_count,goods_small_logo,goods_price,goods_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addCate(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('my_cart/saveToStorage')
    },
    changeGoodsStatus(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
      }
      this.commit('my_cart/saveToStorage')
    },
    deleteCartItem(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('my_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    changeBoxNum(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
      }
      this.commit('my_cart/saveToStorage')
    },
    allChecked(state, newValue) {
      const checkResult = state.cart.map(x => x.goods_state = newValue)
      this.commit('my_cart/saveToStorage')
    }
  },
  actions: {},
  getters: {
    total(state) {
      let c = 0
      c = state.cart.reduce((sum, goods) => sum += goods.goods_count, 0)
      return c
    },
    totalRadio(state) {
      const goodsState = state.cart.filter(x => x.goods_state === true)
      let c = goodsState.reduce((sum, x) => sum += x.goods_count, 0)
      return c
    },
    totalPrice(state) {
      let c = state.cart.filter(x => x.goods_state === true)
        .reduce((sum, x) => sum += x.goods_price * x.goods_count, 0).toFixed(2)
      return c
    }
  }
}