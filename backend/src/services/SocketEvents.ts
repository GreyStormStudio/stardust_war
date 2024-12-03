import { Server } from 'socket.io';
import { updataResource, updataEngine } from './core';
import { Engine } from '../scripts/PhysicsEngine';

import * as fn from './functions'
class SocketEventsHandler {
    private io: Server
    constructor(io: Server) {
        this.io = io;
    }

    initializeEvents() {
        setInterval(() => {
            updataResource()
        }, 1000)//每秒加一次资源
        setInterval(() => {
            updataEngine()
        }, 16.6667)//每帧计算一次位置
        this.io.on('connection', (socket) => {
            /*socket.on('GetShipInfo', (id) => {
                if(object){
                    console.log(object)
                    console.log("___________________________________________")
                }
                else{
                    console.log('null')
                }
            })*/
            //console.log('a user connected');
            setInterval(() => {
                socket.emit('ShipInfo','User002',Engine.rigidBodies.get('User002'))
            }, 16.6667)
            
            socket.on('clearStorage', (username) => {
                fn.clearStorage(username)
            })
            socket.on('deldb', () => {
                fn.deldb()
                console.log('数据库已清除')
            })
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
