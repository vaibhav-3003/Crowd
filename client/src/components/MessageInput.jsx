import React,{useContext, useRef, useState} from 'react'
import { PaperPlaneRight } from "@phosphor-icons/react";
import { ChatContext } from '../context/ChatContext';

const MessageInput = ({chat}) => {
  const [message,setMessage] = useState('')
  const formRef = useRef()

  const {messageLoading,sendMessage} = useContext(ChatContext)

  const send = async(e)=>{
    e.preventDefault()
    
    await sendMessage({
      sender: chat.members[0]._id,
      receiver: chat.members[1]._id,
      message,
      type: "text"
    })
    
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if(message.length > 0){
        send(e)
      }
      e.preventDefault();
    }
  };

  return (
    <div className="border w-full p-4">
      <form
        className="w-full border border-gray-300 px-4 py-2.5 rounded-full flex items-center justify-center"
        onSubmit={sendMessage}
        ref={formRef}
      >
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="outline-0 resize-none w-full"
          placeholder="Your message..."
        />
        {message.length > 0 ? (
          <button
            type="submit"
            className="rounded-full hover:scale-110 active:scale-90 text-primary duration-300 ease-in-out"
            disabled={messageLoading}
          >
            <PaperPlaneRight size={22} weight="fill" />
          </button>
        ) : (
          <div>All</div>
        )}
      </form>
    </div>
  );
}

export default MessageInput
