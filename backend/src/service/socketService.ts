import io from 'socket.io-client';

class SocketService {
  private socket: any;

  constructor() {
    // 初始化 socket.io 客户端连接
    this.socket = io('http://localhost:7777');
  }

  // 设置 socket.io 连接
  public setupSocketConnection() {
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }

  // 发送事件到服务器
  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  // 监听服务器发送的事件
  public on(event: string, callback: Function) {
    this.socket.on(event, callback);
  }

  // 移除事件监听
  public off(event: string, callback: Function) {
    this.socket.off(event, callback);
  }
}

export default new SocketService();
