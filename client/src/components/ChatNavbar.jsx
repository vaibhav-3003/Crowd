import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../context/UserContext'
import {ArrowLeft } from '@phosphor-icons/react'

const ChatNavbar = ({chat}) => {
  const {theme} = useContext(UserContext)
  return (
    <div
      className={`py-2 md:py-4 px-2 border-b ${
        theme === "dark" && "border-dark"
      }`}
    >
      {chat && (
        <div className="flex items-center gap-3">
          <Link to={'/direct/inbox'} className={`lg:hidden text-gray-500`}>
            <ArrowLeft size={26} />
          </Link>
          <div className='flex items-center'>
            <img
              src={chat.members[1].avatar.url}
              alt="profile"
              className="rounded-full w-[35px] h-[35px] md:w-[45px] md:h-[45px] object-cover"
            />
            <Link to={`/${chat.members[1].username}`}>
              <h3 className="text-md md:text-lg font-bold mx-2">
                {chat.members[1].name}
              </h3>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatNavbar
