<template>
  <!-- 商品列表 -->
  <view>
    <view class="goods-container">
      <block v-for="(item,index) in goodsList" :key="index">
        <view @click="goToDetail(item)">
          <my-goods :item=item></my-goods>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //列表请求对象
        queryObj: {
          query: '',
          cid: '',
          pageNum: 1,
          pageSize: 20
        },
        //货物列表
        goodsList: [],
        //总条数
        total: 0,
        //节流阀开关
        isLoading: false,
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      //获取货物列表
      async getGoodsList(cd) {
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        //拼接商品信息
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        cd && cd()
        this.isLoading = false
      },
      //跳转详情页
      goToDetail(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`,
        });
      },
    },
    //下拉触底刷新
    onReachBottom() {
      if (this.isLoading) return
      if (this.queryObj.pageNum * this.queryObj.pageSize >= this.total) return uni.$showMsg('数据加载完毕!')
      this.queryObj.pageNum += 1
      this.getGoodsList()
    },
    //上拉刷新
    onPullDownRefresh() {
      this.queryObj.pageNum = 1
      this.isLoading = false
      this.goodsList = []
      this.total = 0
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },

  }
</script>

<style lang="scss">
  .goods-container {}
</style>