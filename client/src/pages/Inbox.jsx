import React, { useContext, useState } from 'react'
import Chats from '../components/Chats'
import Messages from './Messages'

const Inbox = () => {
  return (
    <div className='min-h-screen max-h-auto md:ml-[95px] flex'>
      <Chats />
      <Messages/>
    </div>
  )
}

export default Inbox
