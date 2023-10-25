import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { IconButton } from "@material-tailwind/react";
import {
  HeartIcon as OutlineHeart,
  BookmarkIcon as OutlineBookMark,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart,BookmarkIcon as SolidBookMark } from "@heroicons/react/24/solid";
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import LazyLoad from 'react-lazyload'

const Post = ({id,avatar,username,image,likes,caption,post}) => {

  const {
    postSaved,
    likePost,
  } = useContext(PostContext); 

  const {theme,user} = useContext(UserContext)
  const [isLiked,setIsLiked] = useState(post && post.likes.includes(user._id))
  const [isSaved,setIsSaved] = useState(post && post.saved.includes(user._id))

  const savePost = async(id)=>{
    await postSaved(id)
    setIsSaved(!isSaved)
  }

  const setLikes = async (id) => {
    await likePost(id);
    setIsLiked(!isLiked)
  };

  return (
    <div className="w-full md:w-[468px]">
      {/* Post Header */}
      <div className="mb-2 px-2">
        <div className="flex flex-col gap-6">
          <Link className="w-fit flex items-center gap-3" to={`/${username}`}>
            <Avatar src={avatar} alt="avatar" className="w-9 h-9" />
            <div>
              <span>{username}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Post Image */}
      <div>
        <LazyLoad height={200}>
          <img
            src={image}
            alt="post"
            className="md:rounded-md mb-2 aspect-square object-cover"
          />
        </LazyLoad>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center py-1">
        <div>
          <IconButton
            variant="text"
            className="rounded-full hover:scale-110 active:scale-75 duration-300 ease-in-out transition-all"
            onClick={() => setLikes(id)}
          >
            {isLiked ? (
              <SolidHeart className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeart className="w-6 h-6 text-red-500" />
            )}
          </IconButton>
          <Link to={`/p/${id}`}>
            <IconButton variant="text" className="rounded-full">
              <ChatBubbleOvalLeftIcon
                className={`w-6 h-6 scale-110 ${
                  theme === "light" ? "text-black" : "text-gray-500"
                }`}
              />
            </IconButton>
          </Link>
        </div>
        <IconButton
          variant="text"
          className="rounded-full hover:scale-110 active:scale-75 duration-300 ease-in-out transition-all text-primary"
          onClick={() => savePost(id)}
        >
          {isSaved ? (
            <SolidBookMark className="w-6 h-6" />
          ) : (
            <OutlineBookMark className="w-6 h-6" />
          )}
        </IconButton>
      </div>

      {/* No of Likes */}
      <div className="py-1 px-3">
        <p className="font-bold text-sm">{likes} Likes</p>
      </div>

      {/* Post Caption */}
      <div className="py-1 px-3">
        <p>
          <Link to={`/${username}`} className="font-bold">
            {username}
          </Link>{" "}
          <span className="text-sm">{caption}</span>
        </p>
      </div>
    </div>
  );
}

export default Post
