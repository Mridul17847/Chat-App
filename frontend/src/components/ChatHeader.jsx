import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, isTyping } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  const formatLastSeen = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString();
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {isTyping ? (
                <span className="text-green-500">Typing...</span>
              ) : isOnline ? (
                "Online"
              ) : selectedUser?.lastSeen ? (
                `Last seen ${formatLastSeen(selectedUser.lastSeen)}`
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
