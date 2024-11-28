<template>
    <router-view></router-view>
</template>
<style></style>
<script>
export default {
  created() {
    // 检测账号是否已经登录,如果没有登录则跳转到/login,反之跳转到/game
    if (this.$route.path === '/') {
      const isLoggedIn = this.checkLoginStatus(); // 假设有一个方法来检查登录状态
      console.log(isLoggedIn)
      if (!isLoggedIn) {
        this.$router.push('/login');
      } else {
        this.$router.push('/game');
      }
    }
  },
  methods: {
    checkLoginStatus() {
      const isLoggedIn = false//测试
      return isLoggedIn;
    }
  }
}
</script>