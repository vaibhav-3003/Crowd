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

const Post = ({image}) => {
  return (
    <div className="w-full md:w-[468px]">
      {/* Post Header */}
      <div className="mb-2">
        <div className="flex flex-col gap-6">
          <Link className="w-fit flex items-center gap-3">
            <Avatar
              src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
              alt="avatar"
            />
            <div>
              <p
                to="/user/id"
                className="hover:text-blue-600 hover:underline"
              >
                Tania Andrew
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Post Image */}
      <div>
        <img
          src={image}
          alt="post"
          className="md:rounded-md mb-2"
        />
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
      <div className='py-1'>
        <p className='font-bold text-sm'>12 Likes</p>
      </div>

      {/* Post Caption */}
      <div className='py-1'>
        <p>
          <Link to='/user/id' className='font-bold'>username</Link> Caption
        </p>
      </div>
    </div>
  );
}

export default Post
