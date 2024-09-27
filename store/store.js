import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduelUser from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    my_cart: moduleCart,
    my_user: moduelUser,
  }
})

export default store