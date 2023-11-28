import React, { useContext, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Avatar,Button, Spinner } from '@material-tailwind/react'
import { useState } from 'react'
import { BookmarkIcon } from "@heroicons/react/24/outline";
import UserPosts from '../components/UserPosts'
import SavedPosts from '../components/SavedPosts'
import { PostContext } from '../context/PostContext'
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'

const Profile = () => {
    const {username} = useParams()
    const {dispatch,user,userProfile,loadUserWithUsername,followAndUnfollow,userFollowed,userLoading,isFollowed} = useContext(UserContext)
    const {posts,fetchUserPosts,loading} = useContext(PostContext)

    const [tab,setTab] = useState('posts')

    const [follow,setFollow] = useState(isFollowed)
    const [savedPosts,setSavedPosts] = useState([])

    const followUser = async()=>{
      await userFollowed(username);
      if (isFollowed) {
        dispatch({
          type: "SET_FOLLOWED",
          payload: "not following",
        });
      } else {
        dispatch({ type: "SET_FOLLOWED", payload: "following" });
      }
      await followAndUnfollow(userProfile._id)
    }
    
    useEffect(()=>{
        const userFunc = async () => {
            await loadUserWithUsername(username);
            
          };

        const postFunc = async()=>{
          await fetchUserPosts(username);
        }

        const followed = async()=>{
          await userFollowed(username);
        }
        userFunc();
        postFunc();
        followed()
    },[username])

    useEffect(()=>{
      setFollow(isFollowed)
    },[isFollowed,dispatch])

    useEffect(()=>{
      setSavedPosts(userProfile && userProfile.savedPosts)
    },[userProfile])

  return userLoading ? (
    <LoadingPage />
  ) : userProfile ? (
    <div className="md:ml-16 lg:ml-72 pb-24 min-h-screen max-h-auto">
      <div className="w-full px-8 md:px-20 py-10 flex flex-wrap md:flex-nowrap justify-center  md:justify-start gap-8">
        <Avatar
          src={userProfile && userProfile.avatar.url}
          className="w-[10rem] h-[10rem] hover:cursor-pointer"
          onClick={() => window.avatar_modal.showModal()}
        />
        <dialog id="avatar_modal" className="modal">
          <form
            method="dialog"
            className="modal-box h-[300px] md:h-[500px] p-0 rounded-none"
          >
            <img
              src={userProfile && userProfile.avatar.url}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start md:ml-16">
          <div className="flex gap-5 justify-center items-center flex-wrap md:justify-start">
            <h2 className="text-2xl">{userProfile && userProfile.username}</h2>
            <div className="flex items-center gap-2">
              {user && user.username === username ? (
                <Link to={`/${username}/edit`}>
                  <Button className="bg-primary nunito normal-case text-sm font-normal rounded-full">
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button
                  className={`nunito normal-case text-sm font-normal w-28 rounded-full p-2 ${
                    follow
                      ? "bg-none border-primary text-primary"
                      : "bg-primary text-white"
                  }`}
                  variant={follow ? "outlined" : "filled"}
                  onClick={followUser}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
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
                  ? "text-sm text-primary border-t border-primary py-2 flex items-center justify-center gap-1"
                  : "text-sm text-gray-500 font-bold py-2 flex items-center justify-center gap-1"
              }
              onClick={() => setTab("posts")}
            >
              <svg
                aria-label=""
                className={tab === "posts" ? "text-primary" : "text-gray-500"}
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

            {user && user.username === username && (
              <button
                className={
                  tab === "saved"
                    ? "text-sm text-primary border-t border-primary py-2 flex items-center justify-center gap-1"
                    : "text-sm text-gray-500 font-bold py-2 flex items-center justify-center gap-1"
                }
                onClick={() => setTab("saved")}
              >
                <BookmarkIcon className="h-4 w-4" />
                <span>SAVED</span>
              </button>
            )}
          </div>
        </div>

        <div>
          {user && posts && tab === "posts" ? (
            loading ? (
              <div className="w-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <UserPosts posts={posts} />
            )
          ) : tab === "saved" ? (
            loading ? (
              <div className="w-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <SavedPosts posts={savedPosts} />
            )
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <ErrorPage />
  );
}

export default Profile
