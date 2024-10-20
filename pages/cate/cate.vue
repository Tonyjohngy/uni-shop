<template>
  <view>
    <!-- 跳转搜索组件 -->
    <my-search></my-search>
    <view class="scroll-view-container">
      <!-- scroll-view 滚动组件
       scroll-y/scroll-x 滚动方向
       @scrolltoupper: 滚动到顶部时的回调函数。
       @scrolltolower: 滚动到底部时的回调函数。
       -->
      <!-- 左侧的滚动视图区域  -->
      <scroll-view class="left-sroll-view" scroll-y="true" :style="{height: wh+'px'}">
        <!-- block 单纯的包裹作用 没有渲染作用-->
        <view v-for="(item,index) in cateList" :key="index" @click="changeActive(index)"
          :class="['left-sroll-item', index===active ? 'active' :'']">
          {{item.cat_name}}
        </view>
      </scroll-view>
      <!-- 右侧的滚动视图区域  -->
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
  </view>

</template>

<script>
  import badgeMixins from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMixins],
    data() {
      return {
        // 屏幕高度
        wh: 0,
        // 一级分类数据目录
        cateList: [],
        // 二级商品分类目录
        cateLevelTwo: [],
        // 激活项
        active: 0,
        // 滚动页面顶部
        scrollTap: 0,
      };
    },
    onLoad() {
      // 获取手机系统信息
      const sysInfo = uni.getSystemInfoSync()
      // 系统屏幕高度减去tarBar高度
      this.wh = sysInfo.windowHeight - 50
      // 渲染商品分类列表
      this.getCateList()
    },
    methods: {
      // 获取商品分类列表
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg('左侧导航列表获取失败', 1500)
        this.cateList = res.message
        this.cateLevelTwo = res.message[0].children
      },
      // 切换激活项
      changeActive(index) {
        this.active = index
        this.cateLevelTwo = this.cateList[index].children
        this.scrollTap = this.scrollTap === 0 ? 1 : 0
      },
      // 跳转商品列表页面
      goToGoodsList(item) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?cid=${item.cat_id}`
        })
      }
    }

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    // 左侧滚动样式
    .left-sroll-view {
      width: 120px;
    }

    // 左侧滚动选项
    .left-sroll-item {
      background-color: #f7f7ff;
      line-height: 50px;
      text-align: center;
      font-size: 12px;

      // 激活项样式
      &.active {
        background-color: #fff;
        position: relative;

        // 渲染激活项之前红色边线
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

    //右侧滚动栏样式 
    .right-sroll-view {

      // 二级分类列表，分类标题
      .item-lv2-list {
        .item-lv2-item {
          font-size: 12px;
          text-align: center;
          line-height: 50px;
          font-weight: 700;
        }

        //三级列表以及分类选项
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