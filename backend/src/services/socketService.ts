import io from 'socket.io-client';

class SocketService {
    private socket: any;

    constructor() {
        this.socket = io();
    }

    public connect(): void {
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
    }

    // 登录
    public login(username: string, password: string): void {
        this.socket.emit('Login', username, password, (response: string) => {
            // 登录成功或登录失败
        });
    }

    // 注册
    public register(username: string, password: string, email: string): void {
        this.socket.emit('Register', username, password, email, (response: string) => {
            // 注册成功或注册失败
        });
    }

    // 获取游戏数据
    public getGameData(username: string, variable: string, callback: (data: any) => void): void {
        this.socket.emit('GetGameData', username, variable, (data: any) => {
            callback(data);
        });
    }

    // 获取用户信息
    public getUserInfo(username: string, variable: string, callback: (data: any) => void): void {
        this.socket.emit('GetUserInfo', username, variable, (data: any) => {
            callback(data);
        });
    }

    // 提交操作
    public commit(operation: string, data: any): void {
        this.socket.emit('Commit', operation, data);
    }

    // 断开连接
    public disconnect(): void {
        this.socket.disconnect();
    }
}

export default new SocketService();
