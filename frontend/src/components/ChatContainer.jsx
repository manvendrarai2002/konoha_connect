import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

// Sub-component for rendering a single message
const Message = ({ message, isSender, senderProfilePic, receiverProfilePic }) => {
  const { text, image, createdAt } = message;
  const chatBubbleClass = isSender ? "chat-bubble-primary" : "chat-bubble";

  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full border border-neutral">
          <img
            alt="User avatar"
            src={isSender ? senderProfilePic : receiverProfilePic}
          />
        </div>
      </div>
      <div className="chat-header text-xs opacity-60 mb-1">
        <time>{formatMessageTime(createdAt)}</time>
      </div>
      <div className={`chat-bubble flex flex-col font-ninja ${chatBubbleClass}`}>
        {image && (
          <img
            src={image}
            alt="Attached image"
            className="sm:max-w-[250px] rounded-md mb-2"
          />
        )}
        {text && <p>{text}</p>}
      </div>
    </div>
  );
};

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-[3_3_0%] flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-[3_3_0%] flex flex-col">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <Message
              key={message._id}
              message={message}
              isSender={isSender}
              senderProfilePic={authUser.profilePic || "/avatar.png"}
              receiverProfilePic={selectedUser.profilePic || "/avatar.png"}
            />
          );
        })}
        {/* Empty div for auto-scrolling to the end */}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};
export default ChatContainer;