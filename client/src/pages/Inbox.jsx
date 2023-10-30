import React, { useContext,useEffect } from 'react'
import Chats from '../components/Chats'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'

const Inbox = () => {

  const {showChatList,chats} = useContext(ChatContext)
  
  useEffect(() => {
    const showChats = async () => {
      await showChatList();
    };
    showChats();
  }, []);

  return (
    <div className='min-h-screen max-h-auto md:ml-[95px] flex'>
      <Chats chats={chats}/>
      <Messages />
    </div>
  )
}

export default Inbox
