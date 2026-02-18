import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
  error?.response?.data?.message || "Something went wrong"
);

    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
  error?.response?.data?.message || "Something went wrong"
);

    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  socket.off("newMessage");
  socket.off("typing");
  socket.off("stopTyping");

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;

    set({
      messages: [...get().messages, newMessage],
    });
  });

  socket.on("typing", ({ senderId }) => {
    if (senderId === selectedUser._id) {
      set({ isTyping: true });
    }
  });

  socket.on("stopTyping", ({ senderId }) => {
    if (senderId === selectedUser._id) {
      set({ isTyping: false });
    }
  });
},



unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;

  socket?.off("newMessage");
  socket?.off("typing");
  socket?.off("stopTyping");
},
  setSelectedUser: (selectedUser) =>
  set({
    selectedUser,
    isTyping: false, 
  }),
}));