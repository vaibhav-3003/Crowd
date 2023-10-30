import React, { useContext, useEffect } from 'react'
import {UserContext} from '../context/UserContext';
import { Link, useLocation } from 'react-router-dom';
import {NotePencil } from '@phosphor-icons/react'
import CreateChatModal from './CreateChatModal';

const Chats = ({chats}) => {
  const {user,theme} = useContext(UserContext)

  const location = useLocation()

  const convertDateToTimeAgo = (dateString) => {
    const messageTime = new Date(dateString);
    const currentTime = new Date();

    const timeDifference = Math.floor((currentTime - messageTime) / 1000); // in seconds

    if (timeDifference < 60) {
      return `${timeDifference}s`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes}m`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours}h`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days}d`;
    }
  };

  return (  
    <div className={`w-full min-w-full lg:min-w-[380px] lg:w-[380px] border-r ${theme==='dark' && 'border-dark'} ${(window.innerWidth <= 1024 && location.pathname.slice(0,10)==='/direct/t/') ? 'hidden':'block'}`}>
      <div className="flex items-center justify-between mt-8">
        <h3 className="text-xl font-bold mx-4">{user.username}</h3>
        <label htmlFor='chat_modal' className={`rounded-full hover:scale-110 active:scale-90 duration-300 ease-in-out text-gray-500 ${theme==='light'?'hover:bg-gray-100':'hover:bg-dark'} p-2 mr-2`}>
          <NotePencil size={25} weight="regular" />
        </label>
      </div>

      {/* messages */}
      <div className="mt-4 flex flex-col">
        <h4 className={`text-md font-semibold ${theme==='light'?'text-gray-800':'text-gray-500'} mx-4`}>Messages</h4>
        <div className="mt-5 flex flex-col gap-3 overflow-y-auto">
          {chats &&
             chats.map((chat) => {
              if (!chat._id) {
                return null;
              }
                return (
                  chat.messages.length > 0 && (
                    <Link
                      className={`flex items-center px-3 py-2 ${
                        theme === "dark"
                          ? "hover:bg-dark"
                          : "hover:bg-blue-gray-50"
                      } hover:cursor-pointer z-20`}
                      key={chat._id}
                      to={`/direct/t/${chat._id}`}
                    >
                      <div>
                        <img
                          src={
                            chat.members.find(
                              (member) => member._id !== user._id
                            ).avatar.url
                          }
                          alt="profile"
                          className="w-[60px] h-[60px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h5
                          className={`text-md font-semibold ${
                            theme === "light" ? "text-black" : "text-gray-500"
                          }`}
                        >
                          {
                            chat.members.find(
                              (member) => member._id !== user._id
                            ).name
                          }
                        </h5>
                        <div className="flex items-center">
                          <p className="text-sm text-gray-500">
                            {chat.messages &&
                            chat.messages[chat.messages.length - 1].type ===
                              "image"
                              ? "sent an image"
                              : chat.messages &&
                                chat.messages[chat.messages.length - 1].type ===
                                  "like"
                              ? "sent a like"
                              : chat.messages[chat.messages.length - 1].message
                                  .length < 30
                              ? chat.messages[chat.messages.length - 1].message
                              : chat.messages[
                                  chat.messages.length - 1
                                ].message.slice(0, 31) + "..."}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <span className="mx-1 text-xl">&#183;</span>
                            {chat.messages &&
                              convertDateToTimeAgo(
                                chat.messages[chat.messages.length - 1]
                                  .createdAt
                              )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                );
              })}
        </div>
      </div>
      <CreateChatModal/>
    </div>
  );
}

export default Chats
