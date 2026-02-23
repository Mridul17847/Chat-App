import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js"; 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const userSocketMap = {}; 

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) 
    userSocketMap[userId] = socket.id;
    socket.join(userId);
    
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", ({ receiverId }) => {
    io.to(receiverId).emit("typing", {
      senderId: userId,
    });
  });

  socket.on("stopTyping", ({ receiverId }) => {
    io.to(receiverId).emit("stopTyping", {
      senderId: userId,
    });
  });

  socket.on("disconnect", async () => {
    console.log("A user disconnected", socket.id);

    if (userId) {
      delete userSocketMap[userId];

      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
