<template>
    <router-view></router-view>
</template>
<style></style>
<!-- <script src="./scripts/cilent.ts"></script> -->
<script>
import { io } from 'socket.io-client';
import { defineComponent } from 'vue';
export default defineComponent({
    setup() {
        const socket = io('', { path: '' })
    }
})
</script>