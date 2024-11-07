<template>
  <div class="router">
    <span><router-link to="/">主页</router-link>|</span>
    <span v-if="!isgame"><router-link to="/login">登录</router-link>|</span>
    <span v-if="!isgame"><router-link to="/register">注册</router-link>|</span>
    <span v-if="isgame"><router-link to="/game">游戏</router-link>|</span>
    <span><router-link to="/about">关于</router-link></span>
  </div>
  <router-view/>
</template>
<style>
.router{
  a{
    color: blueviolet;
    text-decoration: none;
  }
  a:visited{
    color: blueviolet;
  }
}
</style>
<script>
import { mapState } from "vuex";
export default {
  computed:{
    ...mapState(['isgame'])
  }
}
</script>