import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon,FaceSmileIcon } from '@heroicons/react/24/outline'
import { IconButton,Avatar,Button } from '@material-tailwind/react'
import { useState } from 'react'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const PostComments = () => {
    const {id} = useParams()

    const [comment,setComment] = useState('')

    const [iconBoxVisible, setIconBoxVisible] = useState(false);

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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none px-4 py-3 border-b flex items-center sticky top-0 bg-gray-50">
        <Link to={`/p/${id}`}>
          <ChevronLeftIcon className="w-6 h-6 font-bold" />
        </Link>
        <h3 className="text-center w-full text-xl font-bold">Comments</h3>
      </div>

      <div className="w-full h-full grow flex flex-col items-center border-b">
        <h2 className="text-2xl font-bold mt-4">No comments yet.</h2>
        <p>Start the conversation</p>
      </div>

      <div className="py-5 px-4 flex items-center">
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
  );
}

export default PostComments
