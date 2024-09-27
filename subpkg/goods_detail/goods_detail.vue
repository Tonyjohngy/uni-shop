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

    <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>

    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"
        @click="onClick" @buttonClick="buttonClick" />
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
        goodsDetail: [],
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
      total: {
        handler(newValue) {
          const findResult = this.options.find((x) => x.text === '购物车')
          if (findResult) {
            findResult.info = newValue
          }
        },
        immediate: true
      }
    },
    methods: {
      ...mapMutations('my_cart', ['addCate']),
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
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsDetail.pics.map(url => url.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
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
      }
    }
  }
</script>

<style lang="scss">
  .goods-detail-container {
    .goods-swiper {
      height: 750rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .goods-description {
      padding: 10px;
      padding-right: 0;

      .goods-price {
        font-size: 18px;
        color: #c00000;
      }

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