import React, { useEffect } from 'react'
import {
 MessengerLogo,

} from "@phosphor-icons/react";
import { useLocation, useNavigate } from 'react-router-dom';
import MessageInbox from '../components/MessageInbox';
import CreateChatModal from '../components/CreateChatModal';

const Messages = () => {
  const location = useLocation()
  const naviagte = useNavigate()

  useEffect(()=>{
    if(location.pathname==='/direct/t/undefined'){
      naviagte('/direct/inbox')
    }
  },[location.pathname])
  return (
    <div className="w-full">
      {location.pathname === "/direct/inbox" ? (
        <div className="w-full h-full hidden lg:flex flex-col items-center justify-center">
          <div className="rounded-full border-gray-500 border-2 w-[120px] h-[120px] flex justify-center items-center">
            <MessengerLogo weight="thin" className="w-20 h-20 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-center mt-3">Your Messages</h3>
          <p className="text-center text-gray-600">
            Send private messages to a friend.
          </p>
            <label
              htmlFor="chat_modal"
              className="mt-3 text-white rounded-lg cursor-pointer bg-primary normal-case px-4 py-2 text-sm"
            >
              Send message
            </label>
        </div>
      ) : location.pathname.slice(0, 9) === "/direct/t" ? (
        <MessageInbox />
      ) : null}
      <CreateChatModal />
    </div>
  );
}

export default Messages
