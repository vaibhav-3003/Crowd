import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const Messages = ({chat}) => {
  const {user} = useContext(UserContext)

  const formatMessageTime = (timeString) => {
    const messageTime = new Date(timeString);
    const currentTime = new Date();
    const timeDifference = currentTime - messageTime;
    const dateThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    if (timeDifference < dateThreshold) {
      // Display time (HH:MM:SS) if it's within 7 days
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return messageTime.toLocaleString(undefined, options);
    } else {
      // Display date (YYYY-MM-DD) if it's older than 7 days
      return messageTime.toISOString().split("T")[0];
    }
  };

  return (
    <div className="flex-grow h-full w-full overflow-y-auto py-2 px-4">
      {
        chat && chat.messages.map(message=>{
          return message.sender === user._id ? (
            message.type === "image" ? (
              <div className="w-full flex justify-end items-center">
                <div className="hover:bg-blue-gray-50 p-3 rounded-xl">
                  <img
                    src={message.file}
                    alt="image"
                    className="w-[200px] object-cover hover:cursor-pointer"
                  />
                  <p className="text-end w-full text-xs opacity-50 mt-1">
                    {formatMessageTime(message.createdAt)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="chat chat-end" key={message._id}>
                <div className="chat-bubble bg-primary text-white">
                  {message.message}
                </div>
                <div className="chat-footer">
                  <time className="text-xs opacity-50">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            )
          ) : (
            <div className="chat chat-start" key={message._id}>
              <div className="chat-bubble bg-gray-100 text-gray-800">
                {message.message}
              </div>
              <div className="chat-footer">
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default Messages
