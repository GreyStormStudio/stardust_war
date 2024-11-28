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
                fn.CheckLogin(username, password).then(result => {
                    socket.emit('LoginResult', result)
                })
            });
            
            // 监听注册事件
            socket.on('Register', (email, username, password) => {
                fn.Register(email, username, password).then(result => {
                    socket.emit('RegisterResult', result)
                })
            });
            //监听注册检测事件
            socket.on('CheckRegister', (email, username) => {
                fn.CheckRegister(email, username).then(result => {
                    socket.emit('CheckRegisterResult', result);
                })
            })

            //监听数据请求事件
            socket.on('ReadData', (username, isgameInfo) => {
                fn.ReadData(username, isgameInfo).then(result => {
                    socket.emit('ReadData', result)
                })
            })

            //监听数据更改事件
            socket.on('UpdateData', (username, data) => {
                fn.UpdateData(username, data).then(result => {
                    socket.emit('UpdateData', result)
                })
            })

            // 监听用户断开连接事件
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default SocketEventsHandler;
