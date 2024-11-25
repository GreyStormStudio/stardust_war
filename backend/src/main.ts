import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // 监听客户端发送的 'chat message' 事件
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    // 广播消息给所有客户端（除了发送者）
    io.emit("chat message", msg);
  });

  // 监听客户端断开连接事件
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
