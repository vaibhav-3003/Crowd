import React from 'react'
import { Link } from 'react-router-dom'

const CreatePost = () => {
  return (
    <div className='px-4 flex items-center gap-4'>
      <Link to={`/account`}>
        <div className="avatar flex items-center">
          <div className="w-12 rounded-full">
            <img src="https://imgs.search.brave.com/YuURFlMn0gTr-E7cpdpEyBrycdj6Q0ZzgF2bKZoKDBY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zcHJvdXRzb2Np/YWwuY29tL3VwbG9h/ZHMvMjAyMi8wNi9w/cm9maWxlLXBpY3R1/cmUuanBlZw" />
          </div>
        </div>
      </Link>
      <Link to={`/create`} className='w-full flex items-center'>
        <div className='w-full rounded-full bg-transparent border-2 border-base-100 py-3 px-4'>
            <h4 className="">Start Post</h4>
        </div>
      </Link>
    </div>
  );
}

export default CreatePost
