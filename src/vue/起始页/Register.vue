<template>
    <div class="register">
        <!-- <h1>这是注册页</h1> -->
        用户名:<input id="username" type="text">
        账号:<input id="account" type="text">
        <!-- 邮箱? -->
        密码:<input id="password" type="password">
        确认密码:<input id="check_password" type="password">
        <!-- 验证码? -->
        <button id="submit" @click="">注册(没写)</button>

    </div>
</template>
<style>
.register{
    display: flex;
    flex-direction: column;
    gap:10px;
    width: 300px;
}  
</style>