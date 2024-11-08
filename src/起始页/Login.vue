<template>
    <div class="login">
        <!-- <h1>这是登录页</h1> -->
        账号:<input id="account" type="text">
        密码:<input id="password" type="password">
        <button id="submit" @click="">登入(没写)</button>
        <button id="admin_test" @click="testingame">忽略账号,直接测试</button>
    </div>
</template>
<style>
.login{
    display: flex;
    flex-direction: column;
    gap:10px;
    width: 300px;
}  
</style>
<script>
import {mapActions} from 'vuex';
export default{
    methods:{
        ...mapActions(['updateIsGame']),
        testingame(){
            this.$router.push('/game');
            this.updateIsGame(true);
        }
    }
}
</script>