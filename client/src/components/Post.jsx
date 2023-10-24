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

const Post = ({id,avatar,username,image,likes,caption}) => {

  const {
    dispatch,
    postSaved,
    isPostSaved,
    isSaved,
    likePost,
    postLiked,
    isPostLiked,
    increaseLikes,
    decreaseLikes,
  } = useContext(PostContext); 

  const {theme} = useContext(UserContext)

  const savePost = async(id)=>{
    if(isSaved){
      dispatch({type:'SET_SAVED',payload:'false'})
    }else{
      dispatch({ type: "SET_SAVED", payload: "true" });
    }
    await postSaved(id)
  }

  useEffect(()=>{
    const getSaved = async()=>{
      await isPostSaved(id)
    }
    getSaved()
  },[])

  useEffect(()=>{
    const likedPost = async () => {
      await postLiked(id);
    };
    likedPost()
  },[isSaved])

  const setLikes = async () => {
    await likePost(id);
    if (isPostLiked) {
      dispatch({ type: "SET_POST_LIKED", payload: { message: "Unliked" } });
      decreaseLikes();
    } else {
      dispatch({ type: "SET_POST_LIKED", payload: { message: "Liked" } });
      increaseLikes();
    }
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
            {isPostLiked ? (
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
