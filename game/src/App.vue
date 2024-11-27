<template>
    <router-view></router-view>
</template>
<style></style>
<script>
import { io } from 'socket.io-client';
import { defineComponent } from 'vue';
const socket = io('',{path: '/ws'});

socket.on("connect", () => {
  console.log('Connected:', socket);
});
</script>