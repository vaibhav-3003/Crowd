import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Avatar,Button } from '@material-tailwind/react'
import { useState } from 'react'
import { BookmarkIcon } from "@heroicons/react/24/outline";
import UserPosts from '../components/UserPosts'
import SavedPosts from '../components/SavedPosts'
import { PostContext } from '../context/PostContext'
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'

const Profile = () => {
    const {username} = useParams()
    const {user,userProfile,loadUserWithUsername,userLoading,error} = useContext(UserContext)
    const {posts,fetchUserPosts} = useContext(PostContext)

    const [tab,setTab] = useState('posts')

    const [follow,setFollow] = useState(false)
    
    useEffect(()=>{
        const userFunc = async () => {
            await loadUserWithUsername(username);
          };

        const postFunc = async()=>{
          await fetchUserPosts(username);
        }
        userFunc();
        postFunc()
    },[])


  return (
    <>
      {userLoading ? (
        <LoadingPage />
      ) : error && error==='User not found' ? (
        <ErrorPage />
      ) : (
        <div className="md:ml-16 lg:ml-72 pb-20">
          <div className="w-full md:w-3/4 mx-auto py-10 flex justify-center items-center flex-wrap md:justify-start gap-8">
            <Avatar
              src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
              className="w-[10rem] h-[10rem]"
            />
            <div className="flex flex-col justify-center items-center md:items-start md:justify-start md:ml-16">
              <div className="flex gap-5 items-center">
                <h2 className="text-2xl">{username}</h2>
                {user && user.username === username ? (
                  <Button className="nunito normal-case text-sm font-normal">
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className="nunito normal-case text-sm font-normal w-28 rounded-full"
                    variant={follow ? "outlined" : "filled"}
                    onClick={() => setFollow(!follow)}
                  >
                    {follow ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
              <div className="flex gap-5 md:gap-8 mt-5">
                <p>{userProfile && userProfile.posts.length} posts</p>
                <p>{userProfile && userProfile.followers.length} followers</p>
                <p>{userProfile && userProfile.following.length} following</p>
              </div>
              <div className="mt-4">
                <p>{userProfile && userProfile.name}</p>
              </div>
              {userProfile && userProfile.bio && (
                <div className="mt-4">
                  <p>{userProfile.bio}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 px-8 md:px-20">
            <div className="border-t border-gray-500 flex justify-center items-center">
              <div className="flex gap-8 justify-center items-center">
                <button
                  className={
                    tab === "posts"
                      ? "text-sm text-black font-bold border-t border-black py-2 flex items-center justify-center gap-1"
                      : "text-sm text-gray-500 font-bold py-2 flex items-center justify-center gap-1"
                  }
                  onClick={() => setTab("posts")}
                >
                  <svg
                    aria-label=""
                    className={tab === "posts" ? "text-black" : "text-gray-500"}
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
                  onClick={() => setTab("saved")}
                >
                  <BookmarkIcon className="h-4 w-4" />
                  <span>SAVED</span>
                </button>
              </div>
            </div>

            <div>
              {user && posts && tab === "posts" ? (
                <UserPosts posts={posts} />
              ) : tab === "saved" ? (
                <SavedPosts />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile
