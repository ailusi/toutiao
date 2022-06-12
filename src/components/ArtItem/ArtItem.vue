<template>
  <div>
    <!-- // 文章信息模板 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img alt="" class="thumb" v-if="article.cover.type === 1" v-lazy="article.cover.images[0]" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img alt="" class="thumb" v-for="(item, index) in article.cover.images" :key="index" v-lazy="item" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>{{ article.aut_name }} &nbsp;&nbsp; {{ article.comm_count }}评论 &nbsp;&nbsp; {{ article.pubdate | dateFormat }}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- // 反馈动作面板 -->
    <van-action-sheet v-model="show" cancel-text="取消" :closeable="false" get-container="body">
      <!-- 一级面板 -->
      <div v-if="isFirst">
        <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" @click="onCellClick(item.name)" />
      </div>
      <!-- 二级面板 -->
      <div v-else>
        <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
        <van-cell v-for="item in reports" :key="item.type" :title="item.label" clickable title-class="center-title" @click="reportArticle(item.type)" />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from '@/api/report.js'
import { dislikeArticleAPI, reportArticleAPI } from '@/api/homeApi'
export default {
  name: 'ArtItem',
  props: {
    // 文章的信息对象
    article: {
      type: Object, // 数据类型
      required: true // 必填项
    }
  },
  computed: {
    // 文章的id计算属性
    artId() {
      return this.article.art_id.toString()
    }
  },
  data() {
    return {
      // 是否展示面板
      show: false,
      // 第一个可选面板的可选内容
      actions: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }, { name: '拉黑作者' }],
      // 是否展示第一个面板
      isFirst: true,
      reports
    }
  },
  methods: {
    async onCellClick(name) {
      if (name === '不感兴趣') {
        // 调用 API 接口，将文章设置为不感兴趣
        const { data: res } = await dislikeArticleAPI(this.artId)
        if (res.message === 'OK') {
          // 炸楼操作,触发自定义事件，将文章id发给父组件
          this.$emit('remove-article', this.artId)
        }
        this.show = false
      } else if (name === '拉黑作者') {
        // console.log('拉黑作者')
        this.show = false
      } else if (name === '反馈垃圾内容') {
        // 展示二级面板
        this.isFirst = false
      }
    },
    // 举报文章（形参 type 是举报的类型值）
    async reportArticle(type) {
      // 1. 发起举报文章的请求
      const { data: res } = await reportArticleAPI(this.artId, type)
      if (res.message === 'OK') {
        // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        this.$emit('remove-article', this.artId)
      }
      // 3. 关闭动作面板
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
.center-title {
  text-align: center;
}
</style>
