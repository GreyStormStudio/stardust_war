<template>
    <div class="background">
        <div class="window">
            <h3>Stardust War|星尘战争</h3>
            <form @submit.prevent="register">
                <div class="form-group">
                    <input type="text" name="username" placeholder="用户名" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="密码" class="form-control" v-model="password">
                </div>
                <div class="form-group">
                    <input type="password" name="confirmPassword" placeholder="确认密码" class="form-control"
                        v-model="confirmPassword">
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="电子邮件" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <input type="text" name="emailCode" placeholder="验证码" class="form-control" v-model="emailCode">
                    <button type="button" class="btn-send-code" @click="sendCode">发送验证码</button>
                </div>
                <div class="form-group">
                    <button type='submit' class="btn" style="width:100px;">注册</button><br />
                    <router-link to="/"><span class="forget">已有账号? 登录</span></router-link>
                    <router-link to="/game">进入游戏</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
body,
html {
    margin: 0;
    height: 100%;
    font-family: 'Arial', sans-serif;
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/src/public/背景/bg4.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.window {
    max-width: 400px;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 40px;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 20px;
}

h3 {
    color: #333;
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

.form-group {
    position: relative;
}

.form-control[name="emailCode"] {
    width: calc(100% - 100px);
}

.btn-send-code {
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    padding: 10px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
}

.btn {
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
}

.btn {
    width: 100%;
    background-color: #5cb85c;
    color: white;
}

a,
.forget {
    color: #888;
    text-decoration: none;
    margin-top: 10px;
    display: block;
    cursor: pointer;
}

@media (min-width: 600px) {
    .window {
        width: 50%;
    }
}
</style>


<script>
import * as c from '../../../../share/CONSTANT'
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
        check() {
            if (this.username.length === 0) {
                alert('请输入用户名!');
                return false;
            }//防止有人不输名字
            if (this.password.length < 6) {
                alert('密码必须至少包含6个字符且包含数字!');
                return false;
            }// 检测密码是否符合条件（例如长度、复杂性等）
            if (this.password !== this.confirmPassword) {
                alert('两次输入的密码不一致!');
                return false;
            }// 检测两次输入的密码是否一致
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
                alert('请输入有效的电子邮件地址!');
                return false;
            }// 检测邮箱是否符合规则（简单的正则表达式验证）
            return true
        },
        sendCode() {
            this.$socket.emit('CheckRegister', this.email, this.username)
            this.$socket.on('CheckRegisterResult', (result) => {
                switch (result) {
                    case c.USERNAME_EXISTS:
                        alert('用户名已存在!')
                        return false
                    case c.EMAIL_EXISTS:
                        alert('邮箱已被注册!')
                        return false
                    default:
                        return true;
                }
            })
            if (this.check()) {
                this.code = '123456'//发送并获取验证码
            }
        },
        register() {
            if(!this.check()){return;}
            // 检测验证码是否正确（这里假设验证码是 '123456'）
            if (this.emailCode !== '123456') {
                alert('验证码错误!');
            }
            else {
                this.$socket.emit('Register', this.email, this.username, this.password)
                this.$socket.on('RegisterResult', (result) => {
                    result == c.ERROR_UNDEFINED ? alert('注册失败,发生未知错误!') : this.$router.push('/login')
                })
            }
        }
    }
}
</script>