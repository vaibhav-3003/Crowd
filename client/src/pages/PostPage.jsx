import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { IconButton,Avatar,Button } from '@material-tailwind/react'
import {
  HeartIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const PostPage = () => {
    const {id} = useParams()
    const [comment, setComment] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
    const [iconBoxVisible,setIconBoxVisible] = useState(false)

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

  return (
    <>
      {isMobile ? (
        <div className='ml-0 md:ml-28 lg:ml-72'>Mobile View</div>
      ) : (
        <div className="px-8 md:ml-20 md:px-8 lg:ml-72 flex justify-center min-h-screen max-h-auto py-20">
          <div className="flex grow justify-center">
            <div className="w-1/2 h-full">
              <img
                src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                alt=""
                className="w-full object-cover h-full"
              />
            </div>
            <div className="flex flex-col w-1/2 px-4 relative">
              {/* profile show */}
              <div className="flex-none w-full py-3 flex justify-between items-center border-b">
                <Link className="flex items-center justify-center gap-2">
                  <Avatar
                    variant="circular"
                    alt="user 1"
                    className="w-10 h-10"
                    src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                  />
                  <span>vaibhavmahajan30</span>
                </Link>
                <button className="mr-4">...</button>
              </div>

              <div className="border-b flex-grow flex flex-col overflow-auto justify-center items-center">
                <h2 className="text-3xl font-semibold">No comments yet.</h2>
                <p className="mt-2">Start the conversation</p>
              </div>

              <div className="px-4">
                {/* Post actions */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <IconButton variant="text" className="rounded-full">
                      <HeartIcon className="w-6 h-6" />
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
                    <Avatar
                      variant="circular"
                      alt="user 1"
                      className="w-7 h-7"
                      src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                    />
                    <Avatar
                      variant="circular"
                      alt="user 2"
                      className="w-7 h-7"
                      src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                    />
                    <Avatar
                      variant="circular"
                      alt="user 3"
                      className="w-7 h-7"
                      src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                    />
                  </div>

                  <p className="font-semibold text-sm">16 likes</p>
                </div>
                <p className="text-xs uppercase mt-1">Date</p>

                <div className="py-5 flex items-center">
                  <Avatar
                    variant="circular"
                    alt="user 1"
                    className="w-9 h-9"
                    src="https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
                  />
                  <textarea
                    type="text"
                    placeholder="Add a comment..."
                    className="outline-none py-1 px-2 grow resize-none"
                    rows={1}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="flex justify-center items-center">
                    {comment.length > 0 && (
                      <Button variant="text" className="font-bold p-2">
                        Post
                      </Button>
                    )}

                    <IconButton
                      variant="text"
                      className="rounded-full"
                      onClick={handleIconBox}
                    >
                      <FaceSmileIcon className="w-6 h-6 text-gray-600" />
                    </IconButton>
                  </div>

                  {iconBoxVisible && (
                    <div className="absolute bottom-20 right-0">
                      <Picker data={data} onEmojiSelect={addEmoji} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostPage
