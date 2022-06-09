<template>
  <div>
    <!-- Home 和 User 的路由占位符 -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">home</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/login">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="less" scoped></style>
