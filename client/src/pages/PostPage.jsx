import React,{useState,useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  IconButton,
  Avatar,
  Button,
  Spinner,
} from "@material-tailwind/react";

import {
  DotsThreeOutline,
  Trash,
  NotePencil,
  Heart,
  ChatCircle,
  Smiley,
  CaretLeft,
  Play,
  SpeakerHigh,
  SpeakerSlash,
  SpeakerX
} from "@phosphor-icons/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import DeleteModal from '../components/DeleteModal';
import EditPostModal from '../components/EditPostModal';

const PostPage = () => {
    const {id} = useParams()
    const [comment, setComment] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
    const [iconBoxVisible,setIconBoxVisible] = useState(false)
    const {fetchPost,post,loading,comments,commentOnPost,ownerComment,likePost,likes} = useContext(PostContext)
    const {theme,user} = useContext(UserContext)
    const [isLiked,setIsLiked] = useState(post && post.likes.some(like=>like._id===user._id))

    const [isPlaying,setIsPlaying] = useState(true)
    const[isMuted,setIsMuted] = useState(true)
    const [isSound, setIsSound] = useState(undefined);
    const videoPlayer = useRef()

    
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1200);
      };
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); 

    useEffect(()=>{
      const userPost = async () => {
        await fetchPost(id);
      };
      userPost();
    },[id])

    useEffect(()=>{
      setIsLiked(post && post.likes.some((like) => like._id === user._id));
    },[post])

    const handleIconBox = ()=>{
      setIconBoxVisible(!iconBoxVisible)
    }

    useEffect(()=>{
      const canPlayAudio = videoPlayer.current && videoPlayer.current.canPlayType("audio/mp4") !== "";
      if(canPlayAudio){
        setIsSound(true)
      }else{
        setIsSound(false)
      }
    },[videoPlayer.current])

    const addEmoji = (e)=>{
      const sym = e.unified.split("_")
      const codeArray = []
      sym.forEach((el)=>{
        codeArray.push("0x"+el)
      })
      let emoji = String.fromCodePoint(...codeArray)
      setComment(comment+emoji)
    }

    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
      );
      return formattedDate.toUpperCase();
    };

    const postComment = async(e)=>{
      e.preventDefault()

      await commentOnPost(id,comment)
      setComment('')
    }

    const setLikes = async(id)=>{
      await likePost(id)
      setIsLiked(!isLiked)
    }

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

  return (
    <>
      {isMobile ? (
        <div className="ml-0 md:ml-[97px] lg:ml-[273px] pb-24 ">
          <div
            className={`px-4 py-3 flex items-center sticky top-0 z-20 ${
              theme === "light" ? "bg-gray-50" : "bg-dark"
            }`}
          >
            <Link to={"/"}>
              <CaretLeft size={28} className="font-bold" />
            </Link>
            <h3 className="text-center w-full text-xl md:text-3xl font-bold">
              Post
            </h3>
          </div>

          {loading ? (
            <div className="w-full py-5 flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            post && (
              <div>
                {/* profile show */}
                <div className="flex-none w-full px-4 py-3 flex justify-between items-center mt-2">
                  <Link
                    to={`/${post.owner.username}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Avatar
                      variant="circular"
                      alt="user 1"
                      className="w-10 h-10 z-0"
                      src={post && post.owner.avatar.url}
                    />
                    <span>{post && post.owner.username}</span>
                  </Link>
                  {post.owner._id === user._id && (
                    <div className="dropdown dropdown-end">
                      <button tabIndex={0} className="text-gray-500">
                        <DotsThreeOutline size={20} />
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <label
                            htmlFor="delete_modal"
                            className="flex items-center text-red-500 gap-2"
                          >
                            <Trash size={20} />
                            <span>Delete</span>
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="edit_modal"
                            className="flex items-center gap-2"
                          >
                            <NotePencil size={20} />
                            <span>Edit</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="w-full mt-2">
                  {post.type === "video" ? (
                    <div className="relative">
                      <video
                        src={post.image.url}
                        alt="post"
                        className="w-full object-cover min-h-[500px] cursor-pointer"
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
                      src={post && post.image.url}
                      alt="post"
                      className="w-full object-cover min-h-[500px]"
                    />
                  )}

                  {/* like,comment,save */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <IconButton
                        variant="text"
                        className="rounded-full hover:scale-110 active:scale-75 duration-300 ease-in-out transition-all"
                        onClick={() => setLikes(id)}
                      >
                        {isLiked ? (
                          <Heart
                            size={28}
                            className="text-red-500"
                            weight="fill"
                          />
                        ) : (
                          <Heart
                            size={28}
                            className={`${theme === "dark" && "text-gray-500"}`}
                          />
                        )}
                      </IconButton>
                      <Link to={`/p/${id}/comments`}>
                        <IconButton variant="text" className="rounded-full">
                          <ChatCircle
                            size={28}
                            className={`${
                              theme === "light" ? "text-black" : "text-gray-500"
                            }`}
                          />
                        </IconButton>
                      </Link>
                    </div>
                  </div>

                  {/* likes */}
                  <div className="flex gap-2 items-center px-2">
                    <div className="flex items-center -space-x-3">
                      {post && post.likes.length > 3
                        ? post.likes
                            .reverse()
                            .slice(0, 3)
                            .map((user) => {
                              return (
                                <Avatar
                                  variant="circular"
                                  alt="user"
                                  className="w-7 h-7"
                                  src={user.avatar.url}
                                  key={user._id}
                                />
                              );
                            })
                        : post &&
                          post.likes.length > 0 &&
                          post.likes.reverse().map((user) => {
                            return (
                              <Avatar
                                variant="circular"
                                alt="user"
                                className="w-7 h-7"
                                src={user.avatar.url}
                                key={user._id}
                              />
                            );
                          })}
                    </div>
                    <p className="font-semibold text-sm">{likes} likes</p>
                  </div>

                  <p className="text-xs uppercase mt-2 px-2">
                    {post && formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="px-8 lg:ml-72 flex justify-center items-center min-h-screen max-h-full py-20">
          {loading ? (
            <Spinner />
          ) : (
            post &&
            comments && (
              <div className="flex grow justify-center min-h-[500px]">
                <div className="w-1/2 h-full">
                  {post.type === "video" ? (
                    <div className="relative">
                      <video
                        src={post.image.url}
                        alt="post"
                        className="w-full object-cover min-h-[500px] cursor-pointer"
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
                      src={post && post.image.url}
                      alt="post"
                      className="w-full object-cover min-h-[500px]"
                    />
                  )}
                </div>
                <div className="flex flex-col w-1/2 px-4 relative">
                  {/* profile show */}
                  <div
                    className={`flex-none w-full py-3 flex justify-between items-center border-b ${
                      theme === "dark" && "border-dark"
                    }`}
                  >
                    <Link
                      to={`/${post.owner.username}/`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Avatar
                        variant="circular"
                        alt="user 1"
                        className="w-10 h-10"
                        src={post && post.owner.avatar.url}
                      />
                      <span>{post && post.owner.username}</span>
                    </Link>
                    {post && post.owner._id === user._id && (
                      <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="text-gray-500">
                          <DotsThreeOutline size={20} />
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <label
                              htmlFor="delete_modal"
                              className="flex items-center text-red-500 gap-2"
                            >
                              <Trash size={20} />
                              <span>Delete</span>
                            </label>
                          </li>
                          <li>
                            <label
                              htmlFor="edit_modal"
                              className="flex items-center gap-2"
                            >
                              <NotePencil size={20} />
                              <span>Edit</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {post.comments.length === 0 ? (
                    <div
                      className={`border-b ${
                        theme === "dark" && "border-dark"
                      } flex-grow flex flex-col overflow-auto justify-center items-center`}
                      key={post._id}
                    >
                      <h2 className="text-3xl font-semibold">
                        No comments yet.
                      </h2>
                      <p className="mt-2">Start the conversation</p>
                    </div>
                  ) : (
                    <div
                      className={`border-b ${
                        theme === "dark" && "border-dark"
                      } flex-grow flex flex-col overflow-auto pt-2 px-2`}
                      key={post._id}
                    >
                      {/* comment box */}
                      <div className="w-full">
                        {/* owner comment */}
                        {ownerComment && (
                          <div className="w-3/4">
                            <div>
                              <Link
                                to={`/${post.owner.username}/`}
                                className="flex items-center gap-2 w-fit"
                              >
                                <Avatar
                                  variant="circular"
                                  alt="user 1"
                                  className="w-7 h-7"
                                  src={post && post.owner.avatar.url}
                                />
                                <span className="text-xs hover:text-blue-600 hover:underline">
                                  {post && post.owner.username}
                                </span>
                              </Link>
                            </div>
                            <div className="px-9">
                              <p className="text-sm">{ownerComment}</p>
                            </div>
                          </div>
                        )}

                        {/* other comments */}
                        <div className="w-full flex flex-col gap-3 mt-3 pb-4">
                          {post.comments.map((item) => {
                            return (
                              <div className="w-full" key={item._id}>
                                <div>
                                  <Link
                                    to={`/${item.user.username}/`}
                                    className="flex items-center gap-2 w-fit"
                                  >
                                    <Avatar
                                      variant="circular"
                                      alt="user 1"
                                      className="w-7 h-7"
                                      src={item.user.avatar.url}
                                    />
                                    <span className="text-xs hover:text-blue-600 hover:underline">
                                      {item.user.username}
                                    </span>
                                  </Link>
                                </div>
                                <div className="px-9">
                                  <p className="text-sm">{item.comment}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="px-4">
                    {/* Post actions */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <IconButton
                          variant="text"
                          className="rounded-full hover:scale-110 active:scale-75 duration-300 ease-in-out transition-all"
                          onClick={() => setLikes(id)}
                        >
                          {isLiked ? (
                            <Heart
                              size={28}
                              className="text-red-500"
                              weight="fill"
                            />
                          ) : (
                            <Heart
                              size={28}
                              className={`${
                                theme === "light"
                                  ? "text-black"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                        </IconButton>
                        <Link to={`/p/${id}`}>
                          <IconButton variant="text" className="rounded-full">
                            <ChatCircle
                              size={28}
                              className={`${
                                theme === "light"
                                  ? "text-black"
                                  : "text-gray-500"
                              }`}
                            />
                          </IconButton>
                        </Link>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="flex items-center -space-x-3">
                        {post && post.likes.length > 3
                          ? post.likes
                              .reverse()
                              .slice(0, 3)
                              .map((user) => {
                                return (
                                  <Avatar
                                    variant="circular"
                                    alt="user"
                                    className="w-7 h-7"
                                    src={user.avatar.url}
                                    key={user._id}
                                  />
                                );
                              })
                          : post &&
                            post.likes.length > 0 &&
                            post.likes.reverse().map((user) => {
                              return (
                                <Avatar
                                  variant="circular"
                                  alt="user"
                                  className="w-7 h-7"
                                  src={user.avatar.url}
                                  key={user._id}
                                />
                              );
                            })}
                      </div>

                      <p className="font-semibold text-sm">{likes} likes</p>
                    </div>
                    <p className="text-xs uppercase mt-1">
                      {post && formatDate(post.createdAt)}
                    </p>

                    <div className="py-5 flex items-center">
                      <Avatar
                        variant="circular"
                        alt="user 1"
                        className="w-10 h-9"
                        src={user && user.avatar.url}
                      />
                      <form
                        className="flex items-center w-full"
                        onSubmit={postComment}
                      >
                        <textarea
                          type="text"
                          placeholder="Add a comment..."
                          className="outline-none py-1 px-2 grow resize-none bg-transparent"
                          rows={1}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />
                        <div className="flex justify-center items-center">
                          {comment.length > 0 &&
                            (loading ? (
                              <Spinner className="w-10" />
                            ) : (
                              <Button
                                variant="text"
                                className={`font-bold p-2 ${
                                  theme === "light"
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                type="submit"
                                disabled={loading}
                              >
                                Post
                              </Button>
                            ))}

                          <IconButton
                            variant="text"
                            className="rounded-full"
                            onClick={handleIconBox}
                          >
                            <Smiley
                              size={28}
                              className={`${
                                theme === "light"
                                  ? "text-black"
                                  : "text-gray-500"
                              }`}
                            />
                          </IconButton>
                        </div>
                      </form>

                      {iconBoxVisible && (
                        <div className="absolute bottom-20 right-0">
                          <Picker data={data} onEmojiSelect={addEmoji} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <DeleteModal />
      <EditPostModal />
    </>
  );
}

export default PostPage
