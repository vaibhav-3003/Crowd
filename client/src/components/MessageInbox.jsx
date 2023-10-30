import React, { useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom'
import ChatNavbar from './ChatNavbar'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { ChatContext } from '../context/ChatContext'

const MessageInbox = () => {
    const {chatId} = useParams()
    const {chat,loadChat} = useContext(ChatContext)

    useEffect(() => {
      const showChat = async () => {
        await loadChat(chatId);
      };
      showChat();
    }, [chatId]);

  return (
    <div className='flex flex-col h-full max-h-screen'>
      <ChatNavbar chat={chat}/>

      <Messages chat={chat}/>

      <MessageInput chat={chat}/>
    </div>
  )
}

export default MessageInbox
