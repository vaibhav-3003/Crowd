import React from 'react'
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';

const UserPost = ({source,likes,comments,postId,type}) => {
  return (
    <Link
      to={`/p/${postId}`}
      className="w-full h-full relative group cursor-pointer"
    >
      {type === "video" ? (
        <video src={source} alt="post" className="aspect-square object-cover" autoPlay muted loop/>
      ) : (
        <img src={source} alt="post" className="aspect-square object-cover" />
      )}

      <div className="hidden absolute inset-0 w-full h-full border bg-black bg-opacity-40 group-hover:block">
        <div className="w-full h-full flex justify-center items-center gap-6 text-gray-400">
          <div className="flex gap-1 items-center justify-center">
            <HeartIcon className="w-6 h-6" />
            <span className="text-lg">{likes}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
            <span className="text-lg">{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserPost
