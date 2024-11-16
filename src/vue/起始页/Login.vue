<template>
    <div class="background">
        <div class="window">
            <h3>Stardust War|星尘战争</h3>
            <form @submit.prevent="LoginUser">
                <div class="form-group">
                    <input type="text" name="username" placeholder="用户名" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="密码" class="form-control" v-model="password">
                </div>
                <div class="form-group">
                    <button type='submit' class="btn" style="width:100px;">登录</button>
                    <button type='button' class="btn" style="width:100px;" @click="go_register">注册</button><br/>
                    <router-link to="/forget"><span class="forget">忘记密码?</span></router-link>
                    <router-link to="/game">进入游戏</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { getData } from '@/scritps/db/db';

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods:{
        async LoginUser(){
            const value = await getData(this.username)
            if(value.password==this.password){
                this.$router.push('/game')
            }
            else{
                alert('用户名或密码错误!')
            }
        },
        go_register(){
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped>
body, html {
    margin: 0;
    height: 100%;
}
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background: linear-gradient(to bottom, #0ca1e1, #d785ee);*/
    background-image: url('/public/背景/bg2.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}
.window {
    width: 90%;
    max-width: 400px; /* 限制最大宽度 */
    height: auto;
    background: linear-gradient(to bottom, #808080, #FFFFFF);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
}
h3, .form-group, .register {
    text-align: center;
}
.form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
.btn {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
@media (min-width: 600px) {
    .window {
        width: 50%;
    }
}
</style>
