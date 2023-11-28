import React, { useContext, useEffect } from 'react'
import Post from '../components/Post'
import { PostContext } from '../context/PostContext'
import { Spinner } from '@material-tailwind/react'
import logo_light from "../assets/Crowd.png";
import logo_dark from "../assets/logo_dark.png";
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom';
import { MessengerLogo } from '@phosphor-icons/react';

const Home = () => {
  const {getFollowingPosts,followingPosts,loading} = useContext(PostContext)
  const {theme} = useContext(UserContext)

  useEffect(()=>{
    const postOfFollowings = async()=>{
      await getFollowingPosts()
    }

    postOfFollowings()
  },[])

  return (
    <div className="md:px-28 min-h-screen max-h-auto">
      <div className="pb-20 md:pb-5 md:ml-5 lg:ml-72">
        <div className="py-6 mb-4 px-3 flex justify-between md:justify-center items-center">
          <img
            src={theme === "light" ? logo_light : logo_dark}
            alt="logo"
            className="w-20 md:w-24"
          />
          <Link to="/direct/inbox" className='md:hidden'>
            <MessengerLogo
              size={28}
              className={`${
                theme === "light" ? "text-gray-800" : "text-gray-500"
              }`}
            />
          </Link>
        </div>
        {loading ? (
          <div className="py-4 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              {loading ? (
                <Spinner />
              ) : (
                followingPosts &&
                followingPosts.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      id={post._id}
                      avatar={post.owner.avatar.url}
                      username={post.owner.username}
                      source={post.image.url}
                      likes={post.likes.length}
                      caption={post.caption}
                      post={post}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center py-4">
          {followingPosts.length === 0 ? (
            <p
              className={`text-md md:text-lg ${
                theme === "light" ? "text-gray-800" : "text-gray-500"
              }`}
            >
              Follow users to see posts
            </p>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}

export default Home
