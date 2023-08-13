import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as outlineHeart,
  faComment,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) => {

  const [isLike,setIsLike] = useState(false)

  console.log(isLike)

  const handleLikes = ()=>{
    setIsLike(!isLike)
  }

  return (
    <div>
      {/* Post Header */}
      <div className="w-full p-4">
        <Link to={`/user/`} className="w-full flex items-center gap-4 ">
          <div className="avatar">
            <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://imgs.search.brave.com/YuURFlMn0gTr-E7cpdpEyBrycdj6Q0ZzgF2bKZoKDBY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zcHJvdXRzb2Np/YWwuY29tL3VwbG9h/ZHMvMjAyMi8wNi9w/cm9maWxlLXBpY3R1/cmUuanBlZw" />
            </div>
          </div>
          <h4 className="text-center hover:underline">Vaibhav</h4>
        </Link>
      </div>

      {/* Post Caption */}
      <div className="w-full px-4">
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sed
          adipisci sint, minima ducimus enim hic autem est nisi odio quam qui
          expedita culpa fuga, suscipit, a mollitia quaerat cupiditate!
        </p>
      </div>

      {/* Post Image */}
      <div className="w-full px-4 mt-4 flex justify-center items-center">
        <img
          src="https://imgs.search.brave.com/YuURFlMn0gTr-E7cpdpEyBrycdj6Q0ZzgF2bKZoKDBY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zcHJvdXRzb2Np/YWwuY29tL3VwbG9h/ZHMvMjAyMi8wNi9w/cm9maWxlLXBpY3R1/cmUuanBlZw"
          alt=""
          className="w-full rounded-lg"
        />
      </div>

      {/* Post Actions */}
      <div className="w-full p-4 grid grid-cols-3 items-center">
        <button
          className={
            isLike ? "btn btn-ghost text-red-600" : "btn btn-ghost text-neutral"
          }
          onClick={handleLikes}
        >
          {isLike ? (
            <FontAwesomeIcon
              icon={solidHeart}
              className="text-red-600"
              size="lg"
            />
          ) : (
            <FontAwesomeIcon icon={outlineHeart} size="lg" />
          )}
          Like
        </button>

        <button className="btn btn-ghost">
          <FontAwesomeIcon icon={faComment} className="" size="lg" />
          Comment
        </button>

        {isDelete && (
          <button className="btn btn-ghost">
            <FontAwesomeIcon icon={faTrashCan} className="" size="lg" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Post
