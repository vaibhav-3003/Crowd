import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import {UserContext} from '../context/UserContext';
import { Link } from 'react-router-dom';
import {NotePencil } from '@phosphor-icons/react'

const Chats = () => {
  const {user} = useContext(UserContext)
  const {showChatList,chatListLoading,chats} = useContext(ChatContext)
  const [chat,setChat] = useState([])

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

  useEffect(()=>{
    const showChats = async()=>{
      await showChatList()
    }
    showChats()
  },[])

  return (
    <div className="w-full lg:min-w-[380px] lg:w-[380px]">
      <div className="flex items-center justify-between mt-8">
        <h3 className="text-xl font-bold mx-4">{user.username}</h3>
        <button className="rounded-full hover:scale-110 active:scale-90 duration-300 ease-in-out text-gray-500 hover:bg-gray-100 p-2 mr-2">
          <NotePencil size={25} weight="regular" />
        </button>
      </div>

      {/* messages */}
      <div className="mt-4 flex flex-col">
        <h4 className="text-md font-semibold text-gray-800 mx-4">Messages</h4>
        <div className="mt-5 flex flex-col gap-3 overflow-y-auto">
          {chats
            ? chats.map((chat) => {
                return (
                  <Link
                    className="flex items-center px-3 py-2 hover:bg-blue-gray-50 hover:cursor-pointer z-20"
                    key={chat._id}
                    to={`/direct/t/${chat._id}`}
                  >
                    <div>
                      <img
                        src={chat.members[1].avatar.url}
                        alt="profile"
                        className="w-[60px] rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <h5 className="text-md font-semibold text-gray-800">
                        {chat.members[1].name}
                      </h5>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500">
                          {chat.messages[chat.messages.length - 1].type==='image'? 'sent an image': chat.messages[chat.messages.length - 1].message}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className="mx-1 text-xl">&#183;</span>
                          {convertDateToTimeAgo(
                            chat.messages[chat.messages.length - 1].createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Chats