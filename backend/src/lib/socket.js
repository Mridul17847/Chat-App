import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js"; // ✅ import user model

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// Store online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    // ✅ Store socket
    userSocketMap[userId] = socket.id;

    // ✅ Join personal room (important for typing)
    socket.join(userId);

    // ✅ Mark user online in DB
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });
  }

  // Send updated online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ===============================
  // ✅ TYPING EVENTS
  // ===============================

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

  // ===============================
  // ✅ DISCONNECT
  // ===============================

  socket.on("disconnect", async () => {
    console.log("A user disconnected", socket.id);

    if (userId) {
      delete userSocketMap[userId];

      // ✅ Update DB with last seen time
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
