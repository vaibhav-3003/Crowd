import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
} from "@material-tailwind/react";
import {
  HeartIcon as OutlineHeart,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHeart,
} from "@heroicons/react/24/solid"
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { usePostState } from '../context/PostContext';

const PostPage = () => {
    const {id} = useParams()
    const [comment, setComment] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
    const [iconBoxVisible,setIconBoxVisible] = useState(false)
    const {fetchPost,post,loading,comments,commentOnPost,ownerComment,likePost,postLiked,isPostLiked,dispatch,likes,increaseLikes,decreaseLikes} = useContext(PostContext)

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1200);
      };
      handleResize();
      window.addEventListener("resize", handleResize);

      const userPost = async () => {
        await fetchPost(id);
      };

      const likedPost = async()=>{
        await postLiked(id);
      }

      userPost();
      likedPost();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); 

    const handleIconBox = ()=>{
      setIconBoxVisible(!iconBoxVisible)
    }

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

    const setLikes = async()=>{
      
      await likePost(id)
      if(isPostLiked){
        dispatch({type:'SET_POST_LIKED', payload: {message: 'Unliked'}})
        decreaseLikes()
      }else{
        dispatch({ type: "SET_POST_LIKED", payload: { message: "Liked" } });
        increaseLikes()
      }
    }

  return (
    <>
      {isMobile ? (
        <div className="ml-0 md:ml-28 lg:ml-72 pb-20 ">
          <div className="px-4 py-3 border-b flex items-center sticky top-0 bg-gray-50 z-20">
            <Link to={"/"}>
              <ChevronLeftIcon className="w-6 h-6 font-bold" />
            </Link>
            <h3 className="text-center w-full text-xl font-bold">Post</h3>
          </div>

          {loading ? (
            <div className="w-full py-5 flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            post && (
              <div>
                {/* profile show */}
                <div className="flex-none w-full px-4 py-3 flex justify-between items-center">
                  <Link
                    to={`${post.owner.username}`}
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
                  <Menu>
                    <MenuHandler>
                      <IconButton className="mr-4 rounded-full" variant="text">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                      </IconButton>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem className="nunito text-red-500">
                        Delete
                      </MenuItem>
                      <MenuItem className="nunito">Edit</MenuItem>
                      <MenuItem className="nunito">About this account</MenuItem>
                    </MenuList>
                  </Menu>
                </div>

                <div className="w-full mt-2">
                  <img
                    src={post && post.image.url}
                    alt="post image"
                    className="w-full object-cover"
                  />

                  {/* like,comment,save */}
                  <div className="flex justify-between items-center px-4 mt-2">
                    <div className="flex gap-2">
                      {isPostLiked ? (
                        <IconButton variant="text" className="rounded-full">
                          <SolidHeart className="w-6 h-6" />
                        </IconButton>
                      ) : (
                        <IconButton variant="text" className="rounded-full">
                          <OutlineHeart className="w-6 h-6" />
                        </IconButton>
                      )}
                      <Link to={`/p/${id}/comments`}>
                        <IconButton variant="text" className="rounded-full">
                          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                        </IconButton>
                      </Link>
                    </div>
                    <IconButton variant="text" className="rounded-full">
                      <BookmarkIcon className="w-6 h-6" />
                    </IconButton>
                  </div>

                  {/* likes */}
                  <div className="flex gap-2 items-center px-4 mt-1">
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
                                  src={user.image.url}
                                />
                              );
                            })
                        : post.likes.length > 0 &&
                          post.likes.map((user) => {
                            return (
                              <Avatar
                                variant="circular"
                                alt="user"
                                className="w-7 h-7"
                                src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                                key={user._id}
                              />
                            );
                          })}
                    </div>

                    <p className="font-semibold text-sm">
                      {likes} likes
                    </p>
                  </div>
                  <p className="text-xs uppercase mt-1 px-4">
                    {post && formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="px-8 md:ml-20 md:px-8 lg:ml-72 flex justify-center min-h-screen max-h-full py-20">
          {loading ? (
            <Spinner />
          ) : (
            post &&
            comments && (
              <div className="flex grow justify-center">
                <div className="w-1/2 h-full">
                  <img
                    src={post && post.image.url}
                    alt="post image"
                    className="w-full object-cover h-full"
                  />
                </div>
                <div className="flex flex-col w-1/2 px-4 relative">
                  {/* profile show */}
                  <div className="flex-none w-full py-3 flex justify-between items-center border-b">
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
                    <Menu>
                      <MenuHandler>
                        <IconButton
                          className="mr-4 rounded-full"
                          variant="text"
                        >
                          <EllipsisHorizontalIcon className="w-5 h-5" />
                        </IconButton>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem className="nunito text-red-500">
                          Delete
                        </MenuItem>
                        <MenuItem className="nunito">Edit</MenuItem>
                        <MenuItem className="nunito">
                          About this account
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>

                  {post.comments.length === 0 ? (
                    <div className="border-b flex-grow flex flex-col overflow-auto justify-center items-center" key={post._id}>
                      <h2 className="text-3xl font-semibold">
                        No comments yet.
                      </h2>
                      <p className="mt-2">Start the conversation</p>
                    </div>
                  ) : (
                    <div className="border-b flex-grow flex flex-col overflow-auto pt-2 px-2" key={post._id}>
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
                        <IconButton variant="text" className="rounded-full" onClick={setLikes}>
                          {isPostLiked && isPostLiked ? (
                            <SolidHeart className="w-6 h-6 text-red-500" />
                          ) : (
                            <OutlineHeart className="w-6 h-6" />
                          )}
                        </IconButton>
                        <IconButton variant="text" className="rounded-full">
                          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                        </IconButton>
                      </div>
                      <IconButton variant="text" className="rounded-full">
                        <BookmarkIcon className="w-6 h-6" />
                      </IconButton>
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

                      <p className="font-semibold text-sm">
                        {likes} likes
                      </p>
                    </div>
                    <p className="text-xs uppercase mt-1">
                      {post && formatDate(post.createdAt)}
                    </p>

                    <div className="py-5 flex items-center">
                      <Avatar
                        variant="circular"
                        alt="user 1"
                        className="w-10 h-9"
                        src={post && post.owner.avatar.url}
                      />
                      <form
                        className="flex items-center w-full"
                        onSubmit={postComment}
                      >
                        <textarea
                          type="text"
                          placeholder="Add a comment..."
                          className="outline-none py-1 px-2 grow resize-none"
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
                                className="font-bold p-2"
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
                            <FaceSmileIcon className="w-6 h-6 text-gray-600" />
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
    </>
  );
}

export default PostPage
