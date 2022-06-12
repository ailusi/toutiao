<template>
  <div class="login-container">
    <van-nav-bar title="头条登录" fixed />
    <van-form @submit="login">
      <van-field v-model="form.mobile" name="手机号" label="手机号" placeholder="手机号" :rules="rules.mobile" />
      <van-field v-model="form.code" type="password" name="密码" label="密码" placeholder="密码" :rules="rules.code" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/userAPI.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        // 用户手机号码
        mobile: '',
        // 用户密码
        code: ''
      },
      // 表单的校验规则对象
      rules: {
        // 手机号的校验规则
        mobile: [
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'onBlur' }
        ],
        // 密码的校验规则
        code: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }]
      }
    }
  },

  methods: {
    // 2. 映射 mutations 中的方法
    // ...mapMutations(['updateTokenInfo']),this.$store.commit('updateTokenInfo')
    ...mapMutations(['updateTokenInfo']),
    async login() {
      const { data: res } = await loginAPI(this.form)

      if (res.message === 'OK') {
        // 3. 把登录成功的结果，存储到 vuex 中
        this.updateTokenInfo(res.data)
        // 4. 登录成功后，跳转到主页
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 46px;
}
</style>
