export default {
  namespaced: true,
  state: () => ({
    // {goods_id,goods_name,goods_count,goods_small_logo,goods_price,goods_state}
    // 购物商品列表
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // 新增购物车
    addCate(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('my_cart/saveToStorage')
    },
    // 改变商品选中状态
    changeGoodsStatus(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
      }
      this.commit('my_cart/saveToStorage')
    },
    // 删除商品
    deleteCartItem(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('my_cart/saveToStorage')
    },
    // 保存购物车商品到localStorage
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 改变商品数目
    changeBoxNum(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
      }
      this.commit('my_cart/saveToStorage')
    },
    // 全选中购物车商品
    allChecked(state, newValue) {
      const checkResult = state.cart.map(x => x.goods_state = newValue)
      this.commit('my_cart/saveToStorage')
    }
  },
  actions: {},
  getters: {
    // 商品总数
    total(state) {
      let c = 0
      c = state.cart.reduce((sum, goods) => sum += goods.goods_count, 0)
      return c
    },
    // 选中总数
    totalRadio(state) {
      const goodsState = state.cart.filter(x => x.goods_state === true)
      let c = goodsState.reduce((sum, x) => sum += x.goods_count, 0)
      return c
    },
    // 选中的总共价格
    totalPrice(state) {
      let c = state.cart.filter(x => x.goods_state === true)
        .reduce((sum, x) => sum += x.goods_price * x.goods_count, 0).toFixed(2)
      return c
    }
  }
}