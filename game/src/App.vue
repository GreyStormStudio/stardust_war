<template>
    <router-view></router-view>
</template>
<style></style>
<script>
import { io } from 'socket.io-client';
import { defineComponent } from 'vue';
const socket = io('',{path: '/ws'});

socket.on("connect", () => {
});
//添加事件模拟发送登录
socket.emit('Login','user','pwd')
</script>