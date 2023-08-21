import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Avatar,Button } from '@material-tailwind/react'
import { useState } from 'react'
import { BookmarkIcon } from "@heroicons/react/24/outline";
import UserPosts from '../components/UserPosts'
import SavedPosts from '../components/SavedPosts'

const Profile = () => {
    const {username} = useParams()
    const {user,userProfile,loadUser,loadUserWithUsername} = useContext(UserContext)

    const [tab,setTab] = useState('posts')
    
    useEffect(()=>{
        const userFunc = async () => {
            await loadUser();
            await loadUserWithUsername(username);
        };
        userFunc();
    },[])

  return (
    <div className="md:ml-16 lg:ml-72">
      <div className="w-full md:w-3/4 mx-auto py-10 flex justify-center items-center flex-wrap md:justify-start gap-8">
        <Avatar
          src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
          className="w-[10rem] h-[10rem]"
        />
        <div className="flex flex-col justify-center items-center md:ml-16">
          <div className="flex gap-5 items-center">
            <h2 className="text-2xl">{username}</h2>
            <Button className="nunito normal-case text-sm font-normal">
              Edit Profile
            </Button>
          </div>
          <div className="flex gap-5 md:gap-8 mt-5">
            <p>{user && user.posts.length} posts</p>
            <p>{user && user.followers.length} followers</p>
            <p>{user && user.following.length} following</p>
          </div>
          <div className="mt-4">
            <p>{user && user.name}</p>
          </div>
          {user && user.bio && (
            <div className="mt-4">
              <p>{user.bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 md:mt-12 px-8 md:px-20">
        <div className="border-t border-gray-500 flex justify-center items-center">
          <div className="flex gap-8 justify-center items-center">
            <button
              className={
                tab === "posts"
                  ? "text-sm text-black font-bold border-t border-black py-2 flex items-center justify-center gap-1"
                  : "text-sm text-gray-500 font-bold py-2 flex items-center justify-center gap-1"
              }
              onClick={()=>setTab('posts')}
            >
              <svg
                aria-label=""
                className={tab==='posts'?"text-black":'text-gray-500'}
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="15"
                role="img"
                viewBox="0 0 24 24"
                width="15"
              >
                <rect
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  width="18"
                  x="3"
                  y="3"
                ></rect>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="9.015"
                  x2="9.015"
                  y1="3"
                  y2="21"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="14.985"
                  x2="14.985"
                  y1="3"
                  y2="21"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21"
                  x2="3"
                  y1="9.015"
                  y2="9.015"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21"
                  x2="3"
                  y1="14.985"
                  y2="14.985"
                ></line>
              </svg>
              <span>POSTS</span>
            </button>

            <button
              className={
                tab === "saved"
                  ? "text-sm text-black font-bold border-t border-black py-2 flex items-center justify-center gap-1"
                  : "text-sm text-gray-500 font-bold py-2 flex items-center justify-center gap-1"
              }
              onClick={()=>setTab('saved')}
            >
              <BookmarkIcon className="h-4 w-4" />
              <span>SAVED</span>
            </button>
          </div>
        </div>

        <div>
          {
            user && tab==='posts' ? <UserPosts posts={user.posts}/> : <SavedPosts />
          }
        </div>
      </div>
    </div>
  );
}

export default Profile
