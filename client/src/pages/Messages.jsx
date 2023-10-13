import React from 'react'
import {
  ChatCircleDots,

} from "@phosphor-icons/react";
import { Button } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import MessageInbox from '../components/MessageInbox';

const Messages = () => {
  const location = useLocation()
  return (
    <div className="w-full">
      {location.pathname==='/direct/inbox' ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="rounded-full border-gray-500 border-2 w-[120px] h-[120px] flex justify-center items-center">
            <ChatCircleDots weight="thin" className="w-20 h-20 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-center mt-3">Your Messages</h3>
          <p className="text-center text-gray-600">
            Send private messages to a friend.
          </p>
          <Button className="mt-3 bg-primary normal-case px-4 py-2 text-sm">
            Send message
          </Button>
        </div>
      ) : (
        location.pathname.slice(0,9) ==='/direct/t' ?<MessageInbox/>:null
      )}
    </div>
  );
}

export default Messages
