<template>
    <div class="background">
        <div class="window">
            <h3>Stardust War|星尘战争</h3>
            <form @submit.prevent="registerUser">
                <div class="form-group">
                    <input type="text" name="username" placeholder="用户名" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="密码" class="form-control" v-model="password">
                </div>
                <div class="form-group">
                    <input type="password" name="confirmPassword" placeholder="确认密码" class="form-control" v-model="confirmPassword">
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="电子邮件" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <input type="text" name="emailCode" placeholder="验证码" class="form-control" v-model="emailCode">
                </div>
                <div class="form-group">
                    <button type='submit' class="btn" style="width:100px;">注册</button><br/>
                    <router-link to="/"><span class="forget">已有账号? 登录</span></router-link>
                    <router-link to="/game">进入游戏</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
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
    background-image: url('/public/背景/bg4.jpg');
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
<script>
import db from '@/scritps/db/db'
import { putData } from '@/scritps/db/db';

export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            emailCode: ''
        };
    },
    methods: {
        registerUser() {
            // 检测用户名是否重复
            db.get(`users:${this.username}`, (err, value) => {
                if (!err) {
                    alert('用户名已存在，请选择其他用户名!');
                    return;
                }

                //防止有人不输名字
                if(this.username.length===0){
                    alert('请输入用户名!');
                    return;
                }

                // 检测密码是否符合条件（例如长度、复杂性等）
                if (this.password.length < 6) {
                    alert('密码必须至少包含6个字符且包含数字!');
                    return;
                }

                // 检测两次输入的密码是否一致
                if (this.password !== this.confirmPassword) {
                    alert('两次输入的密码不一致!');
                    return;
                }

                // 检测邮箱是否符合规则（简单的正则表达式验证）
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    alert('请输入有效的电子邮件地址!');
                    return;
                }

                // 检测验证码是否正确（这里假设验证码是 '123456'）
                if (this.emailCode !== '123456') {
                    alert('验证码错误!');
                    return;
                }

                // 如果上述都符合，则往level数据库db中添加玩家
                try{
                    putData(this.username,{password:this.password,email:this.email})//明文储存密码,仅测试用
                    this.$router.push('/Login')
                }
                catch(e){
                    alert('发生错误,注册失败!')
                }

            });
        }
    }
}
</script>