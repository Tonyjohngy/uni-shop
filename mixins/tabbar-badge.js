import {
  mapGetters
} from "vuex"
export default {
  onShow() {
    this.setBadge()
  },
  computed: {
    ...mapGetters('my_cart', ['total'])
  },
  watch: {
    total: {
      handler(newValue) {
        this.setBadge()
      }
    }
  },

  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }

}