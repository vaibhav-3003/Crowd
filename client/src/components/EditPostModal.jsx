import React, { useContext, useEffect, useRef, useState } from 'react'
import { PostContext } from '../context/PostContext';
import { Avatar } from '@material-tailwind/react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smiley,Play } from '@phosphor-icons/react';
import { UserContext } from '../context/UserContext';
import {IconButton} from '@material-tailwind/react';

const EditPostModal = () => {
    const {post,updatePost} = useContext(PostContext)
    const {theme} = useContext(UserContext)
    const [caption,setCaption] = useState('')
    const [iconBoxVisible, setIconBoxVisible] = useState(false);
    const [isPlaying,setIsPlaying] = useState(true)
    const videoPlayer = useRef()

    const handleEditPost = async(e,id,caption)=>{
      e.preventDefault()
      await updatePost(id,caption)
      window.edit_modal.checked = false
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
      setCaption(caption + emoji);
    };

    const handlePlayingVideo = () => {
      setIsPlaying(!isPlaying);

      if (isPlaying) {
        videoPlayer.current.pause();
      } else {
        videoPlayer.current.play();
      }
    };

  return (
    <div>
      <input type="checkbox" id="edit_modal" className="modal-toggle" />
      <div className="modal">
        <form
          className="modal-box p-0 max-w-[800px]"
          onSubmit={(e) => handleEditPost(e, post && post._id, caption)}
        >
          {/* header */}
          <div className="flex justify-between px-4 py-3 border-b border-gray-700">
            <label htmlFor="edit_modal" className="cursor-pointer">
              Cancel
            </label>
            <h2>Edit Info</h2>
            <button
              htmlFor="edit_modal"
              className="text-primary cursor-pointer"
              type="submit"
            >
              Done
            </button>
          </div>

          {/* body */}
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2">
              {post &&
                (post.type === "video" ? (
                  <div className='relative h-full'>
                    <video
                      src={post.image.url}
                      alt="post"
                      className="w-full h-full object-cover cursor-pointer"
                      autoPlay
                      ref={videoPlayer}
                      onClick={handlePlayingVideo}
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
                  </div>
                ) : (
                  <img
                    src={post.image.url}
                    alt="post"
                    className="w-full h-full object-cover"
                  />
                ))}
            </div>
            <div className="w-full md:w-1/2">
              {post && (
                <div className="w-full p-2">
                  <div className="w-full flex items-center gap-2 p-4">
                    <Avatar
                      variant="circular"
                      alt="user 1"
                      className="w-8 h-8 z-0"
                      src={post && post.owner.avatar.url}
                    />
                    <span className="text-sm">
                      {post && post.owner.username}
                    </span>
                  </div>
                  <div className="px-4">
                    <textarea
                      cols="5"
                      rows="7"
                      value={caption}
                      className="w-full bg-transparent outline-none resize-none"
                      placeholder="write a caption..."
                      maxLength={2200}
                      onChange={(e) => setCaption(e.target.value)}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter a caption")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <IconButton
                        variant="text"
                        className="rounded-full"
                        onClick={handleIconBox}
                      >
                        <Smiley
                          size={24}
                          className={`${
                            theme === "light" ? "text-black" : "text-gray-500"
                          }`}
                        />
                      </IconButton>

                      <p className="text-end text-xs mt-1">
                        {caption.length}/2,200
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {iconBoxVisible && (
            <div className="absolute bottom-0 left-10">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
        </form>
        <label className="modal-backdrop" htmlFor="edit_modal">
          Close
        </label>
      </div>
    </div>
  );
}

export default EditPostModal
