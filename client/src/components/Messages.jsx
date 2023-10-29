import React, { useContext,useEffect,useState } from 'react'
import { UserContext } from '../context/UserContext';
import Lottie from "lottie-react";
import heartAnimation from '../animations/heart.json'

const Messages = ({chat}) => {
  const {user,theme} = useContext(UserContext)
  const [messages,setMessages] = useState(chat && chat.messages)
  

  useEffect(()=>{
    setMessages(chat && chat.messages)
  },[chat])


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
        messages && messages.map(message=>{
          return message.sender === user._id ? (
            message.type === "image" ? (
              <div
                className={`w-full flex ${
                  message.sender === user._id ? "justify-end" : "justify-start"
                } items-center`}
                key={message._id}
              >
                <div className="hover:bg-blue-gray-50 p-3 rounded-xl">
                  <img
                    src={message.file}
                    alt="image"
                    className="w-[200px] object-cover hover:cursor-pointer"
                  />
                  <p
                    className={` ${
                      message.sender === user._id ? "text-end" : "text-start"
                    } w-full text-xs opacity-50 mt-1`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </p>
                </div>
              </div>
            ) : message.type === "like" ? (
              <div
                className={`w-full flex ${
                  message.sender === user._id ? "justify-end" : "justify-start"
                } items-center`}
              >
                <div className="w-[220px]">
                  <Lottie animationData={heartAnimation} className="w-full" />
                  <p
                    className={` ${
                      message.sender === user._id ? "text-end" : "text-start"
                    } w-full text-xs opacity-50 mt-1`}
                  >
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
              <div
                className={`chat-bubble  ${
                  theme === "light" ? "bg-gray-100 text-gray-800" : "bg-dark text-white"
                }`}
              >
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
