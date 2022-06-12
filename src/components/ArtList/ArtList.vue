<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <!-- 渲染文章列表 -->
        <ArtItem v-for="item in artlist" :key="item.art_id" :article="item" @remove-article="removeArticle"></ArtItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from '@/api/homeApi'
import ArtItem from '@/components/ArtItem/ArtItem.vue'
export default {
  name: 'ArtList',
  data() {
    return {
      // 文章列表
      artlist: [],
      // 文章时间戳
      timestamp: Date.now(),
      loading: false,
      finished: false,
      // 是否正在进行下拉刷新的请求
      isLoading: false
    }
  },
  created() {
    this.initArtList()
  },
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 初始化文章的列表数据
    async initArtList(isRefrsh) {
      // 请求 API 接口
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp)
      if (res.message === 'OK') {
        // 为时间戳重新赋值
        this.timestamp = res.data.pre_timestamp
        // 是否下拉刷新
        if (isRefrsh) {
          // 下拉刷新
          // 1. “新数据”在前，“旧数据”在后
          this.artlist = [...res.data.results, ...this.artlist]
          // 2. 重置 isLoading 为 false
          this.isLoading = false
        } else {
          // 上拉加载
          // 1. “旧数据”在前，“新数据”在后
          this.artlist = [...this.artlist, ...res.data.results]
          // 2. 重置 loading 为 false
          this.loading = false
        }
        // 3. 判断所有的数据是否已加载完毕
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    // 加载更多的数据
    onLoad() {
      console.log('触发了上拉加载更多')
      this.initArtList()
    },
    onRefresh() {
      this.initArtList(true)
    },
    removeArticle(id) {
      // 炸楼操作
      // 对原数组进行filter方法进行过滤
      this.artlist = this.artlist.filter((item) => item.art_id.toString() !== id)
      // 判断剩余数据的文章数量是否小于10
      if (this.artlist.length < 10) {
        // 主动请求下一页数据
        this.initArtList()
      }
    }
  },
  components: {
    ArtItem
  }
}
</script>

<style lang="less" scoped></style>
