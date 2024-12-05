import { Server } from 'socket.io';
import { updataResource, updataEngine, init, saveAlldata } from './core';
import { Engine } from '../scripts/PhysicsEngine';

import * as fn from './functions'
class SocketEventsHandler {
    private io: Server
    constructor(io: Server) {
        this.io = io;
    }

    initializeEvents() {
        init()
        let time1 = Date.now();
        setInterval(() => {
            const time2 = Date.now();
            if (time2 - time1 >= 1000) {
                updataResource(); // 更新资源
                time1 = Date.now()
            }
            updataEngine(); // 更新引擎
        }, 16.667);

        this.io.on('connection', (socket) => {

            //#region 测试用代码
            setInterval(() => {
                socket.emit('ShipInfo', Engine.getRigidBodyByLabel('User001'))
            }, 16.667)
            socket.on('clearStorage', (username) => {
                fn.clearStorage(username)
            })
            socket.on('deldb', () => {
                fn.deldb()
                console.log('数据库已清除')
            })
            //#endregion
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
            socket.on('RequestData', (username, key) => {
                fn.RequestData(username, key).then(result => {
                    socket.emit('RequestDataResult', result)
                })
            })
            //监听船

            socket.on('RequestShipData', (username) => {
                socket.emit('ShipInfo', Engine.rigidBodies.get(username))
            })

            // 监听用户断开连接事件
            socket.on('disconnect', () => {
                saveAlldata()
                console.log('user disconnected');
            });
        });
    }
}
export default SocketEventsHandler;
