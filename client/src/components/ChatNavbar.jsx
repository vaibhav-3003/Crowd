import React from 'react'
import { Link } from 'react-router-dom';

const ChatNavbar = ({chat}) => {
  return (
    <div className="py-4 px-2">
      {
        chat && <div className='flex items-center'>
          <img
            src={chat.members[1].avatar.url}
            alt="profile"
            className='rounded-full w-[45px]'
          />
          <Link to={`/${chat.members[1].username}`}>
              <h3 className="text-lg font-bold mx-3">Vaibhav Mahajan</h3>
          </Link>
        </div>
      }
      
    </div>
  );
}

export default ChatNavbar
