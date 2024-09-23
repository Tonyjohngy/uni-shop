<template>
  <view class="scroll-view-container">

    <scroll-view class="left-sroll-view" scroll-y="true" :style="{height: wh+'px'}">
      <!-- block 单纯的包裹作用 没有渲染作用-->
      <view v-for="(item,index) in cateList" :key="index" @click="changeActive(index)"
        :class="['left-sroll-item', index===active ? 'active' :'']">
        {{item.cat_name}}
      </view>
    </scroll-view>

    <scroll-view class="right-sroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTap">
      <view class="item-lv2-list" v-for="(item2 ,index2) in cateLevelTwo" :key="index2">
        <view class="item-lv2-item">
          {{item2.cat_name}}
        </view>
        <view class="item-lv3-list">
          <view class="item-lv3-item" v-for="(item3 ,index3) in item2.children" :key="index3"
            @click="goToGoodsList(item3)">
            <image style="width: 60px; height: 60px;" :src="item3.cat_icon"></image>
            <text>{{ item3.cat_name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        cateLevelTwo: [],
        active: 0,
        scrollTap: 0,
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg('左侧导航列表获取失败', 1500)
        this.cateList = res.message
        this.cateLevelTwo = res.message[0].children
      },
      changeActive(index) {
        this.active = index
        this.cateLevelTwo = this.cateList[index].children
        this.scrollTap = this.scrollTap === 0 ? 1 : 0
      },
      goToGoodsList(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?id=${item.cat_id}`
        })
      }
    }

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-sroll-view {
      width: 120px;
    }

    .left-sroll-item {
      background-color: #f7f7ff;
      line-height: 50px;
      text-align: center;
      font-size: 12px;

      &.active {
        background-color: #fff;
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 25px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }

    .right-sroll-view {
      .item-lv2-list {
        .item-lv2-item {
          font-size: 12px;
          text-align: center;
          line-height: 50px;
          font-weight: 700;
        }

        .item-lv3-list {

          display: flex;
          flex-wrap: wrap;

          .item-lv3-item {
            display: flex;
            width: 33.33%;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            image {
              width: 60px;
              height: 60px;
            }

            text {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>