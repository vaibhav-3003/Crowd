import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon,FaceSmileIcon } from '@heroicons/react/24/outline'
import { IconButton,Avatar,Button, Spinner } from '@material-tailwind/react'
import { useState } from 'react'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { PostContext } from '../context/PostContext'
import { useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const PostComments = () => {
    const {id} = useParams()

    const [comment,setComment] = useState('')

    const [iconBoxVisible, setIconBoxVisible] = useState(false);

    const {fetchPost,post,loading,comments,commentOnPost,ownerComment} = useContext(PostContext)

    const {user} = useContext(UserContext)

    const handleIconBox = () => {
      setIconBoxVisible(!iconBoxVisible);
    };

    const addEmoji = (e) => {
      const sym = e.unified.split("_");
      const codeArray = [];
      sym.forEach((el) => {
        codeArray.push("0x" + el);
      });
      let emoji = String.fromCodePoint(...codeArray);
      setComment(comment + emoji);
    };

    const postComment = async (e) => {
      e.preventDefault();

      await commentOnPost(id, comment);
      setComment("");
    };

    useEffect(()=>{
      const userPost = async () => {
        await fetchPost(id);
      };

      userPost();
    },[])

  return (
    <div className="flex flex-col lg:ml-72 md:ml-20 pb-16 md:pb-0 h-screen">
      <div
        className={`z-20 flex-none px-4 py-3 flex items-center sticky top-0 ${
          theme === "light" ? "bg-gray-50" : "bg-dark"
        } md:hidden justify-between`}
      >
        <Link to={`/p/${id}`}>
          <ChevronLeftIcon className="w-6 h-6 font-bold" />
        </Link>
        <h3 className="text-center text-xl font-bold">Comments</h3>
        <div></div>
      </div>

      {post && comments && post.comments.length === 0 ? (
        <div className={`border-b ${theme==='dark' && 'border-dark'} flex-grow flex flex-col overflow-auto justify-center items-center h-full`}>
          <h2 className="text-3xl font-semibold">No comments yet.</h2>
          <p className="mt-2">Start the conversation</p>
        </div>
      ) : (
        <div
          className={`border-b ${
            theme === "dark" && "border-dark"
          } flex-grow flex flex-col overflow-auto pt-2 px-2 md:pt-6 h-full`}
        >
          {/* comment box */}
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner className="w-10" />
            </div>
          ) : (
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
                        src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
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
                {post &&
                  comments &&
                  post.comments.map((item) => {
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
          )}
        </div>
      )}

      <div className="py-5 px-2 flex items-center">
        <Avatar
          variant="circular"
          alt="user 1"
          className="w-10 md:w-9 h-9"
          src={user.avatar.url}
        />
        <form className="flex items-center w-full" onSubmit={postComment}>
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
                    theme === "dark" && "text-gray-500"
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
              <FaceSmileIcon className="w-6 h-6 text-gray-600" />
            </IconButton>
          </div>
        </form>

        {iconBoxVisible && (
          <div className="absolute bottom-32 right-0">
            <Picker data={data} onEmojiSelect={addEmoji} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostComments
