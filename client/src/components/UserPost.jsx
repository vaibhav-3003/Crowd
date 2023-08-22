import React from 'react'
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

const UserPost = ({imageSrc,likes,comments}) => {
  return (
    <div className="w-full h-full relative group cursor-pointer">
      <img src={imageSrc} alt="post" className="aspect-square object-cover" />
      <div className="hidden absolute inset-0 w-full h-full border bg-black bg-opacity-40 group-hover:block">
        <div className="w-full h-full flex justify-center items-center gap-4 text-gray-200">
          <div className="flex gap-1 items-center justify-center">
            <HeartIcon className="w-7 h-7" />
            <span className="text-lg">{likes}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <ChatBubbleOvalLeftIcon className="w-7 h-7" />
            <span className="text-lg">{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPost
