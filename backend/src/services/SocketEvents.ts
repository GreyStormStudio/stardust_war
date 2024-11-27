import { Server } from 'socket.io';
import * as fn from './functions'
class SocketEventsHandler {
    private io: Server
    constructor(io: Server) {
        this.io = io;
    }

    initializeEvents() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');

            // 监听登录事件
            socket.on('Login', (username, password) => {
                const result = fn.CheckLogin(username, password)
                console.log(`User ${username} is trying to log in with password:${password}`);
            });
            // 监听注册事件
            socket.on('Register', (email, username, password) => {
                const result = fn.CheckRegister(email, username, password)
                console.log(`User ${username} is trying to register with email:${email} and password: ${password}`);
            });

            //监听数据请求事件
            socket.on('ReadData', (username, isgameInfo) => {
                const result = fn.ReadData(username, isgameInfo)
                console.log(`User ${username} is trying to read ${isgameInfo ? 'Game' : 'User'} information`)
            })
            
            //监听数据更改事件
            socket.on('UpdateData',(username,data)=>{
                const result = fn.UpdateData(username,data)
                console.log(`User ${username} is trying to update data as ${data}`)
            })

            // 监听用户断开连接事件
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default SocketEventsHandler;
