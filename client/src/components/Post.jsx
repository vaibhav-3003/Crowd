import React from 'react'
import { Avatar } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@material-tailwind/react";
import {
  faHeart as outlineHeart,
  faComment,
  faPaperPlane,
  faBookmark
} from '@fortawesome/free-regular-svg-icons'
import {
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons'

const Post = ({avatar,username,image,likes,caption}) => {
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
        <img src={image} alt="post" className="md:rounded-md mb-2 aspect-square object-cover" />
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center py-1">
        <div>
          <IconButton variant="text" className="rounded-full">
            <FontAwesomeIcon icon={outlineHeart} size="xl" />
          </IconButton>
          <IconButton variant="text" className="rounded-full">
            <FontAwesomeIcon icon={faComment} size="xl" />
          </IconButton>
          <IconButton variant="text" className="rounded-full">
            <FontAwesomeIcon icon={faPaperPlane} size="xl" />
          </IconButton>
        </div>
        <IconButton variant="text" className="rounded-full">
          <FontAwesomeIcon icon={faBookmark} size="xl" />
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
          <span className='text-sm'>{caption}</span>
        </p>
      </div>
    </div>
  );
}

export default Post
