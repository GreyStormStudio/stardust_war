import { Server } from 'socket.io';
import { updataResource } from './core';
import * as fn from './functions'
class SocketEventsHandler {
    private io: Server
    constructor(io: Server) {
        this.io = io;
    }

    initializeEvents() {
        const detaltime = 1 * 1000
        setInterval(() => {
            updataResource()
        }, detaltime)
        this.io.on('connection', (socket) => {
            //console.log('a user connected');
            
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
            socket.on('ReadData', (username) => {
                fn.ReadData(username).then(result => {
                    socket.emit('ReadDataResult', result)
                })
            })

            //监听数据更改事件
            socket.on('UpdateData', (username, data) => {
                fn.UpdateData(username, data).then(result => {
                    socket.emit('UpdateDataResult', result)
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
