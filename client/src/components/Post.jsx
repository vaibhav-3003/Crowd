import React, { useContext, useEffect, useRef, useState } from 'react'
import { Avatar } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { IconButton } from "@material-tailwind/react";
import {
  HeartIcon as OutlineHeart,
  BookmarkIcon as OutlineBookMark,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { SpeakerHigh,SpeakerSlash,SpeakerX,Play } from '@phosphor-icons/react';
import { HeartIcon as SolidHeart,BookmarkIcon as SolidBookMark } from "@heroicons/react/24/solid";
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';

const Post = ({id,avatar,username,source,likes,caption,post}) => {

  const {
    postSaved,
    likePost,
  } = useContext(PostContext); 

  const {theme,user} = useContext(UserContext)
  const [isLiked,setIsLiked] = useState(post && post.likes.includes(user._id))
  const [isSaved,setIsSaved] = useState(post && post.saved.includes(user._id))

  const[isPlaying,setIsPlaying] = useState(true)
  const[isMuted,setIsMuted] = useState(true)
  const[isSound,setIsSound] = useState(undefined)

  const videoPlayer = useRef()

  const savePost = async(id)=>{
    await postSaved(id)
    setIsSaved(!isSaved)
  }

  const setLikes = async (id) => {
    await likePost(id);
    setIsLiked(!isLiked)
  };
  const handlePlayingVideo = () => {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      videoPlayer.current.pause();
    } else {
      videoPlayer.current.play();
    }
  };

  const handleSound = () => {
    setIsMuted(!isMuted);

    if (isMuted) {
      videoPlayer.current.muted = false;
    } else {
      videoPlayer.current.muted = true;
    }
  };

  useEffect(() => {
    const canPlayAudio =
      videoPlayer.current &&
      videoPlayer.current.canPlayType("audio/mp4") !== "";
    if (canPlayAudio) {
      setIsSound(true);
    } else {
      setIsSound(false);
    }
  }, [videoPlayer.current]);

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
        {post.type === "video" ? (
          <div className="relative">
            <video
              src={source}
              alt="post"
              className="w-full min-h-[468px] object-cover cursor-pointer"
              ref={videoPlayer}
              onClick={handlePlayingVideo}
              autoPlay
              loop
              muted
              onLoadedData={() => {
                videoPlayer.current.play();
              }}
            />
            <button
              type="button"
              className="absloute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onClick={handlePlayingVideo}
            >
              {!isPlaying && <Play size={80} color="#fff" weight="fill" />}
            </button>

            {isSound ? (
              <button
                type="button"
                className="rounded-full p-1.5 bg-dark absolute bottom-3 right-3 active:opacity-90"
                onClick={handleSound}
              >
                {isMuted ? (
                  <SpeakerSlash size={15} color="#fff" />
                ) : (
                  <SpeakerHigh size={15} color="#fff" />
                )}
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full p-1.5 bg-dark absolute bottom-3 right-3 active:opacity-90"
              >
                <SpeakerX size={15} color="#fff" />
              </button>
            )}
          </div>
        ) : (
            <img
              src={source}
              alt="post"
              className="md:rounded-md mb-2 aspect-square object-cover"
            />
        )}
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
