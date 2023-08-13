import React from 'react'
import { Link } from 'react-router-dom'

const User = ({userId,name,avatar}) => {
  return (
    <Link
      to={`/user/${userId}`}
      className="w-full py-3 flex items-center gap-4 hover:bg-primary px-4"
    >
      <div className="avatar">
        <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://imgs.search.brave.com/YuURFlMn0gTr-E7cpdpEyBrycdj6Q0ZzgF2bKZoKDBY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zcHJvdXRzb2Np/YWwuY29tL3VwbG9h/ZHMvMjAyMi8wNi9w/cm9maWxlLXBpY3R1/cmUuanBlZw" />
        </div>
      </div>
      <h4  className="text-center hover:underline">
        Vaibhav
      </h4>
    </Link>
  );
}

export default User
