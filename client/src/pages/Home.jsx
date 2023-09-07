import React, { useContext } from 'react'
import Post from '../components/Post'
import Suggestions from '../components/Suggestions'
import { useNavigate } from 'react-router-dom'
import { PostContext } from '../context/PostContext'
import { Spinner } from '@material-tailwind/react'

const Home = () => {
  const {followingPosts,loading} = useContext(PostContext)
  return (
    <div className="bg-gray-50 min-h-full max-h-auto md:px-28 py-10">
      <div className="pb-20 md:pb-5 md:ml-5 lg:ml-72">
        {loading ? (
          <div className='py-4 flex justify-center items-center'>
            <Spinner />
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              {
                followingPosts && followingPosts.map((post)=>{
                  return <Post 
                          key={post._id}
                          id = {post._id}
                          avatar={post.owner.avatar.url}
                          username={post.owner.username}
                          image={post.image.url}
                          likes={post.likes.length}
                          caption={post.caption}
                        />
                })
              }
            </div>
            <div className="hidden md:block">
              <Suggestions />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home
