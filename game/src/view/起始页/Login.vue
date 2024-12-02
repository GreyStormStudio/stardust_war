<template>
    <div class="background">
        <div class="window">
            <h3>Stardust War|星尘战争</h3>
            <form @submit.prevent="login">
                <div class="form-group">
                    <input type="text" name="username" placeholder="用户名" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="密码" class="form-control" v-model="password">
                </div>
                <div class="form-group buttons">
                    <button type='submit' class="btn login-btn">登录</button>
                    <button type='button' class="btn register-btn" @click="go_register">注册</button>
                </div>
                <div class="form-group">
                    <router-link to="/forget"><span class="forget">忘记密码?</span></router-link>
                    <router-link to="/constellation"><span class="enter-game">进入游戏</span></router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { useUserInfoStore,useGameInfoStore } from '../../store';
import * as c from '../../../../share/CONSTANT'
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login() {
            //this.$socket.emit('deldb')
            this.$socket.emit('Login', this.username, this.password)
            this.$socket.once('LoginResult', (result) => {
                switch (result.rep) {
                    case c.USERNAME_NOT_FOUND:
                        alert('用户名不存在!')
                        break;
                    case c.PASSWORD_INCORRECT:
                        alert('密码错误!')
                        break;
                    case c.OK:
                        //alert('登录成功!')
                        useUserInfoStore().setUserInfo({
                            username: this.username
                        });
                        useGameInfoStore().setGameInfo({
                            storage:result.val.storage,
                            ship:result.val.ship
                        })
                        console.log(result.val.ship)
                        this.$router.push('/constellation')
                        break;
                    default:
                        alert('发生未知错误')
                        break;
                }
            })
        },
        go_register() {
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped>
body,
html {
    margin: 0;
    height: 100%;
    font-family: 'Arial', sans-serif; /* 设置默认字体 */
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/src/public/背景/bg2.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.window {
    width: 90%;
    max-width: 400px;
    height: auto;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 40px;
    box-sizing: border-box;
    border-radius: 8px;
}

h3 {
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-control {
    width: 100%;
    padding: 12px;
    margin-bottom: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.btn {
    padding: 12px; /* 调整内边距 */
    border: none;
    background-color: #5cb85c; /* 调整按钮颜色 */
    color: white;
    border-radius: 4px; /* 圆角边框 */
    cursor: pointer;
    font-size: 1em; /* 调整字体大小 */
}

.login-btn,
.register-btn {
    width: 150px;
    margin: 0 20px;
}

.enter-game,.forget{
    display: block;
    margin-top: 10px;
    color: #888;
    cursor: pointer;
    text-decoration: none;
}

@media (min-width: 600px) {
    .window {
        width: 50%;
    }
}
</style>