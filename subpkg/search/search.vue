<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-container">
      <uni-search-bar :inverted="true" @input="input" :radius="100" :cancel-button="none" placeholder="请输入搜索内容"
        maxlength="200px">
      </uni-search-bar>
    </view>
    <!-- 提示列表 -->
    <view class="sugg-list" v-if="keyword.length !== 0">
      <view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="goToList(item)">
        <view class="sugg-name">{{ item.goods_name }}</view>
        <uni-icons type="right" size="16px"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="search-history-container" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons @click="clearHistory" type="trash" size="20px"></uni-icons>
      </view>

      <view class="history-list">
        <uni-tag @click="goToTag(item)" :text="item" v-for="(item,index) in historys" :key="index"></uni-tag>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 防抖时间
        timer: null,
        //输入关键字
        keyword: '',
        // 搜索列表
        searchResults: [],
        // 历史记录
        historyList: []
      }
    },
    onLoad() {
      // 获取历史记录
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // 获取输入数据，并做防抖操作
      // setTimeout实现防抖，减轻后端压力，优化性能
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyword = e
          this.getSearchList()
        }, 500)
      },
      // 请求相关搜索列表
      async getSearchList() {
        if (this.keyword === '') {
          this.keyword = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', {
          query: this.keyword
        }, )
        if (res.meta.status !== 200) return uni.$showMsg('搜索请求失败！', 1500)
        this.searchResults = res.message.goods
        this.getHistoryList()
        console.log(this.historyList);
      },
      // 跳转详情页
      goToList(item) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?query=${item.goods_name}`,
        });
      },
      // 新的搜索词加入记录列表
      // 使用Set保存保证无需不重复，再逐一保存到数组结构，好排序
      getHistoryList() {
        // this.historyList.push(this.keyword)
        const set = new Set(this.historyList)
        set.delete(this.keyword)
        set.add(this.keyword)
        this.historyList = Array.from(set)
        // 保存到localStorage
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清除历史记录
      clearHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      // 跳转商品列表
      goToTag(item) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?query=${item}`
        })
      }
    },
    computed: {
      // 历史记录翻转处理
      historys() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  // 搜索样式
  .search-container {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  // 建议列表
  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #efefef;

      .sugg-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  // 历史记录样式
  .search-history-container {
    padding: 0 5px;

    // 历史记录标题
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    // 历史记录列表
    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        display: inline-block;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 12px;
        padding: 7px 10px;
        background-color: #fff;
        color: #000000;
      }
    }
  }
</style>