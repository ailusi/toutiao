<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="头条" fixed="true">
      <template #left> <img src="../../assets/cat.jpg" alt="logo" class="logo" /> </template>
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>
    <!-- 频道列表的标签页 -->
    <van-tabs v-model="active" sticky offset-top="1.22666667rem">
      <!-- // 循环渲染频道列表 -->
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">
        <!-- 渲染对应文章列表 -->
        <ArtList :channel-id="item.id" class="list"></ArtList>
      </van-tab>
      <!-- 频道管理的小图标 -->
      <van-icon name="plus" size="16" class="plus" />
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api/homeApi'
import ArtList from '@/components/ArtList/ArtList.vue'
export default {
  components: { ArtList },
  name: 'Home',
  data() {
    return {
      active: 0,
      userChannel: []
    }
  },
  created() {
    this.initUserChannel()
  },
  methods: {
    async initUserChannel() {
      const { data: res } = await getUserChannelAPI()
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  // padding-top: 46px;
  padding-bottom: 50px;
}
// logo 样式
.logo {
  height: 80%;
}
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}
// 频道管理小图标的定位
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
.list {
  padding-top: 40px;
}
</style>
