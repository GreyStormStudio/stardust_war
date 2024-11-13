<template>
  <router-view></router-view>
</template>
<style>
</style>
<script>
export default {
  created() {
    //跳过了账号登录状态检测,直接跳转到登录页
    if (this.$route.path == '/') {
      this.$router.push('/login');
    }
  }
}
</script>