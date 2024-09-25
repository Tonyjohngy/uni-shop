<template>
  <view>
    <view class="search-container">
      <uni-search-bar :inverted="true" @input="input" :radius="100" :cancel-button="none" placeholder="请输入搜索内容"
        maxlength="200px">
      </uni-search-bar>
    </view>
    <view class="sugg-list" v-if="keyword.length !== 0">
      <view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="goToList(item)">
        <view class="sugg-name">{{ item.goods_name }}</view>
        <uni-icons type="right" size="16px"></uni-icons>
      </view>
    </view>
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
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // 获取输入数据，并做防抖操作
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
      },
      // 跳转详情页
      goToList(item) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?query=${item.goods_name}`,
        });
      },
      // 新的搜索词加入记录列表
      getHistoryList() {
        // this.historyList.push(this.keyword)
        const set = new Set(this.historyList)
        set.delete(this.keyword)
        set.add(this.keyword)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清除历史记录
      clearHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      goToTag(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?id=${item.goods_id}`
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
  .search-container {
    position: sticky;
    top: 0;
    z-index: 999;
  }

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

  .search-history-container {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

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