<template>
  <view class="goods-detail-container" v-if="goodsDetail.goods_name">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
      class="goods-swiper">
      <swiper-item v-for="(item,index) in goodsDetail.pics" :key="index">
        <image @click="preview(index)" :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    <view class="goods-description">
      <view class="goods-price">￥{{goodsDetail.goods_price}}</view>
      <view class="goods-title-body">
        <view class="title">{{goodsDetail.goods_name}}</view>
        <view class="collection">
          <uni-icons type="star" size="20px"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="goods-freight">快递：免运费</view>
      <view class="goods-pic">
      </view>
    </view>
    <!--rich-text  -->
    <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>

    <!-- uni-goods-nav  商品导航组件 
    fill: 是否填充整个宽度，设置为 true 或 false。
    options: 左侧选项的配置数组，每个选项包含 icon 和 text 属性。
    buttonGroup: 右侧按钮组的配置数组，每个按钮包含 text、backgroundColor 和 color 属性。
    @click: 点击左侧选项时的回调函数，参数 e 包含点击的选项信息。
    @buttonClick: 点击右侧按钮时的回调函数，参数 e 包含点击的按钮信息。
    -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from "vuex"
  export default {
    data() {
      return {
        // 商品详情
        goodsDetail: [],
        // uni-goods-nav的参数
        options: [{
          icon: 'headphones',
          text: '客服'
        }, {
          icon: 'shop',
          text: '店铺',
          info: 0,
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    computed: {
      ...mapState('my_cart', ['cart']),
      ...mapGetters('my_cart', ['total'])
    },
    onLoad(options) {
      const goodsId = options.goods_id
      console.log(goodsId);
      this.getGoodsDetail(goodsId)
    },
    watch: {
      // 改变购物车商品总数
      total: {
        handler(newValue) {
          const findResult = this.options.find((x) => x.text === '购物车')
          if (findResult) {
            findResult.info = newValue
          }
        },
        // 加载页面执行一次
        immediate: true
      }
    },
    methods: {
      ...mapMutations('my_cart', ['addCate']),
      // 获取商品详情
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg')
        this.goodsDetail = res.message
      },
      // 排列商品图片
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsDetail.pics.map(url => url.pics_big)
        })
      },
      // 跳转购物车
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 加入购物车和跳转购物车
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goodsDetail.goods_id,
            goods_name: this.goodsDetail.goods_name,
            goods_price: this.goodsDetail.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsDetail.goods_small_logo,
            goods_state: true,
          }
          this.addCate(goods)
          this.options[2].info++
        }
        if (e.content.text === '立即购买') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .goods-detail-container {

    // 商品轮播图
    .goods-swiper {
      height: 750rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    // 商品描述
    .goods-description {
      padding: 10px;
      padding-right: 0;

      // 商品价格
      .goods-price {
        font-size: 18px;
        color: #c00000;
      }

      // 商品主体
      .goods-title-body {
        display: flex;
        font-size: 12px;
        justify-content: space-between;

        .title {
          padding-right: 10px;
        }

        .collection {
          display: flex;
          width: 120px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #999;
          border-left: 1px solid #efefef;
        }
      }

      .goods-freight {
        font-size: 12px;
        color: #999;
      }

    }

    .goods_nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>