import React, { useContext, useState,useRef } from 'react'
import { CloudArrowUpIcon,TrashIcon } from '@heroicons/react/24/solid';
import { PostContext } from '../context/PostContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../context/UserContext';
import {IconButton,Button} from '@material-tailwind/react';
import { Pause, Play, Smiley, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const CreatePost = () => {

  const [post,setPost] = useState(undefined)
  const [postType,setPostType] = useState('')
  const [caption,setCaption] = useState('')
  const [iconBoxVisible, setIconBoxVisible] = useState(false);

  const [isPlaying,setIsPlaying] = useState(true)
  const [isMuted,setIsMuted] = useState(true)

  const videoPlayer = useRef()

  const {uploadPost,loading,error} = useContext(PostContext)
  const {theme,user} = useContext(UserContext)

  const handleImageChange = (e)=>{
    const file = e.target.files[0]

    if(file.size / 1048576 > 10){
      toast.error("Image size is too high!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    const Reader = new FileReader();

    Reader.onload = (e)=>{
      if(Reader.readyState === 2){
        setPost(Reader.result)
      }
    }

    if (file.type.startsWith("image/")) {
      setPostType("image");
    } else if (file.type.startsWith("video/")) {
      setPostType("video");
    }

    Reader.readAsDataURL(file)
  }

  const submitHandler = async(e)=>{
    e.preventDefault()

    await uploadPost(caption,post,postType)

    if(error){
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      setCaption('')
    }else{
      toast.success('Post Uploaded Successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      setPost(undefined)
      setCaption('')
    }
  }

  const handleIconBox = () => {
    setIconBoxVisible(!iconBoxVisible);
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => {
      const code = parseInt(el, 16);
      if (!isNaN(code)) {
        codeArray.push(code);
      }
    });
    let emoji = String.fromCodePoint(...codeArray);
    console.log(emoji);
    setCaption(caption + emoji);
  };

  const handlePlayingVideo = ()=>{
    setIsPlaying(!isPlaying)

    if(isPlaying){
      videoPlayer.current.pause()
    }else{
      videoPlayer.current.play()
    }
  }

  const handleSound = ()=>{
    setIsMuted(!isMuted)

    if(isMuted){
      videoPlayer.current.muted = false
    }else{
      videoPlayer.current.muted = true
    }
  }

  const handleDelete = ()=>{
    setPost(undefined);

    if(isMuted===false){
      setIsMuted(true);
    }

    if(isPlaying===false){
      setIsPlaying(true);
    }
  }

  return (
    <div className="w-full pb-20 md:pb-0">
      <div className="md:ml-20 lg:ml-72 min-h-screen flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center py-4">
          Create Post
        </h2>

        <form
          onSubmit={submitHandler}
          className="w-full min-h-screen mah-h-auto flex flex-col items-center mb-2 md:mb-5 lg:mb-10"
        >
          <div
            className={`py-5 w-11/12 h-[350px] md:h-[400px] md:w-4/5 lg:w-3/4 mt-4 ${
              theme === "light" ? "bg-gray-200" : "bg-dark"
            } rounded-md px-4`}
          >
            {!post ? (
              <label className="cursor-pointer flex justify-center items-center h-full">
                <div className="py-4 w-full flex flex-col items-center justify-center h-full border-2 border-gray-500 border-dashed">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <CloudArrowUpIcon className="h-10 w-10 text-gray-500" />
                    </p>
                    <p className="text-lg">Click to Upload</p>
                  </div>
                  <p className="hidden sm:block mt-32  text-gray-400 ">
                    Use high-quality Images and Videos
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={handleImageChange}
                  className="w-0 h-0"
                  accept="image/*,video/*"
                />
              </label>
            ) : (
              <div className="relative h-full">
                {postType === "image" ? (
                  <img
                    src={post}
                    alt="uploaded-image"
                    className="h-full w-full bg-cover object-cover"
                  />
                ) : (
                  <div className="h-full w-full relative">
                    <video
                      src={post}
                      className="cursor-pointer h-full w-full bg-cover object-cover"
                      ref={videoPlayer}
                      onClick={handlePlayingVideo}
                      autoPlay
                    />
                    <button
                      type="button"
                      className="absloute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      onClick={handlePlayingVideo}
                    >
                      {!isPlaying && (
                        <Play size={80} color="#fff" weight="fill" />
                      )}
                    </button>

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
                  </div>
                )}

                <button
                  type="button"
                  className={`absolute bottom-3 left-3 p-2 rounded-full ${
                    theme === "light" ? "bg-white" : "bg-dark"
                  }  text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out`}
                  onClick={handleDelete}
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
            )}
          </div>

          {user && (
            <div className="py-4 w-11/12 md:w-4/5 lg:w-3/4 flex items-center gap-2">
              <img
                src={user.avatar.url}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{user.username}</span>
            </div>
          )}

          <div className="w-11/12 md:w-4/5 lg:w-3/4">
            <textarea
              cols="5"
              rows="8"
              className="w-full bg-transparent p-2 outline-none resize-none"
              placeholder="write a caption..."
              value={caption}
              maxLength={2200}
              onChange={(e) => setCaption(e.target.value)}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a caption")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <div className="flex justify-between items-center relative">
              <IconButton
                variant="text"
                className="rounded-full"
                onClick={handleIconBox}
              >
                <Smiley
                  size={24}
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-gray-500"
                  }`}
                />
              </IconButton>

              <p className="text-end text-xs mt-1">{caption.length}/2,200</p>
              {iconBoxVisible && (
                <div className="absolute bottom-14">
                  <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="px-4 py-2 rounded-full normal-case font-normal bg-primary w-full md:w-[250px] text-md mt-4"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatePost
