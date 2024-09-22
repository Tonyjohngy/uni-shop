<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator :url="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" class="swiper-item">
          <img :src="item.image_src" />
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item ,index) in navList" :key="index" @click="navClickHandler(item)">
        <img class="nav-img" :src="item.image_src" />
      </view>
    </view>
    <view class="floor-list">
      <view v-for=" (item,index) in floorLsit" :key="index" class="floor-item">
        <view class="floor-title">
          <img :src="item.floor_title.image_src" mode="widthFix" />
        </view>
        <view class="floor-product">
          <view class="left-product-box">
            <view class="left-product-item">
              <img :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
                mode="widthFix" alt="" />
            </view>
          </view>
          <view class="right-product-box">
            <view class="right-product-item" v-for=" (pItem,i) in item.product_list" :key="i" v-if="i!==0">
              <img :src="pItem.image_src" :style="{width: pItem.image_width + 'rpx'}" mode="widthFix" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
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
      this.getNavList()
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
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg('分类导航列表获取失败', 1500)
        this.navList = res.message
      },
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.floorLsit = res.message
        console.log(this.floorLsit);
      },
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15rpx 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

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