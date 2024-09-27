<template>
  <view>
    <!-- <my-search :bgc="'black'"></my-search> -->
    <!-- 搜索组件 -->
    <view class="search-box">
      <my-search @click="goToSearch()"></my-search>
    </view>
    <!-- 轮播图模块 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator :url="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" class="swiper-item">
          <image :src="item.image_src" />
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航模块 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item ,index) in navList" :key="index" @click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src" />
      </view>
    </view>
    <!-- 楼层模块 -->
    <view class="floor-list">
      <view v-for=" (item,index) in floorLsit" :key="index" class="floor-item">
        <view class="floor-title">
          <image :src="item.floor_title.image_src" mode="widthFix" />
        </view>
        <view class="floor-product">
          <view class="left-product-box">
            <navigator class="left-product-item" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
                mode="widthFix" alt="" />
            </navigator>
          </view>
          <view class="right-product-box">
            <navigator class="right-product-item" v-for=" (pItem,i) in item.product_list" :key="i" v-if="i!==0"
              :url="pItem.url">
              <image :src="pItem.image_src" :style="{width: pItem.image_width + 'rpx'}" mode="widthFix" />
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
  import badgeMixins from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMixins],
    data() {
      return {
        // 轮播图的数据列表
        swiperList: [],
        // 分类导航栏数据列表
        navList: [],
        // 楼层数据列表
        floorLsit: [],
      };
    },
    onLoad() {
      // 获取轮播图的数据列表
      this.getSwiperList()
      // 获取导航列表
      this.getNavList()
      // 获取楼层列表
      this.getFloorList()
    },
    methods: {
      // 获取轮播图的数据列表的方法
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      // 获取导航列表
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg('分类导航列表获取失败', 1500)
        this.navList = res.message
      },
      // 分类导航跳转
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层列表
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg('楼层列表获取失败', 1500)

        this.floorLsit = res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorLsit = res.message
      },
      // 搜索组件跳转
      goToSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  // 搜索拦实现吸顶效果
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  // 轮播图样式
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 分类导航样式
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15rpx 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 楼层样式
  .floor-product {
    display: flex;

    .floor-title {
      height: 60rpx;
      width: 100%;
    }

    .right-product-box {
      display: flex;
      flex-wrap: wrap;

      .right-product-item {
        display: flex;
        margin-left: 10rpx;
      }
    }
  }
</style>