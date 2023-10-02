import React, { useContext, useEffect } from 'react'
import UserPost from '../components/UserPost'
import { PostContext } from '../context/PostContext'
import { Spinner } from '@material-tailwind/react'
import UserPosts from '../components/UserPosts'

const Explore = () => {
    const {getAllPosts,allPosts,loading} = useContext(PostContext)

    useEffect(()=>{
        const allUsersPosts = async()=>{
            await getAllPosts()
        }
        allUsersPosts()
    },[])
  return (
    <div className="md:ml-20 lg:ml-72 pb-20 md:pb-0 min-h-screen max-h-auto">
      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <Spinner />
        </div>
      ) : (
        <div className='grid grid-cols-[minmax(320,1fr)] px-5'>
          <UserPosts posts={allPosts}/>
        </div>
      )}
    </div>
  );
}

export default Explore
