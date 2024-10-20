//微信小程序的TabBar共享信息
import {
  mapGetters
} from "vuex"
export default {
  onShow() {
    this.setBadge()
  },
  // 显示购物车购物总数
  computed: {
    ...mapGetters('my_cart', ['total'])
  },
  // 一旦变化则更新数据
  watch: {
    total: {
      handler(newValue) {
        this.setBadge()
      }
    }
  },
  // 设置购物车小红点数据
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }

}