import React, { useContext, useEffect } from 'react'
import Post from '../components/Post'
import Suggestions from '../components/Suggestions'
import { PostContext } from '../context/PostContext'
import { Spinner } from '@material-tailwind/react'
import Crowd from "../assets/Crowd.png";

const Home = () => {
  const {followingPosts,loading} = useContext(PostContext)

  return (
    <div className="bg-gray-50 min-h-full max-h-auto md:px-28">
      <div className="pb-20 md:pb-5 md:ml-5 lg:ml-72">
        <div className="py-6 px-3 flex justify-center items-center">
          <img src={Crowd} alt="logo" className="w-20 md:w-24" />
        </div>
        {loading ? (
          <div className="py-4 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              {followingPosts &&
                followingPosts.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      id={post._id}
                      avatar={post.owner.avatar.url}
                      username={post.owner.username}
                      image={post.image.url}
                      likes={post.likes.length}
                      caption={post.caption}
                    />
                  );
                })}
            </div>
            <div className="hidden md:block">
              <Suggestions />
            </div>
          </div>
        )}
      <div className='flex justify-center items-center py-4'><p className='text-lg text-gray-400'>No more Posts</p></div>
      </div>
    </div>
  );
}

export default Home
