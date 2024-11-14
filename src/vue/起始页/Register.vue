<template>
    <div class="background">
        <div class="window">
            <h3>Stardust War|星尘战争</h3>
            <form action="">
                <div class="form-group">
                    <input type="text" name="username" placeholder="用户名" class="form-control">
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="密码" class="form-control">
                </div>
                <div class="form-group">
                    <input type="password" name="confirmPassword" placeholder="确认密码" class="form-control">
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="电子邮件" class="form-control">
                </div>
                <div class="form-group">
                    <input type="text" name="emailCode" placeholder="验证码" class="form-control">
                </div>
                <div class="form-group">
                    <button type='button' class="btn" style="width:100px;">注册</button><br/>
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
