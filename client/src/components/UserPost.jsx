import React from 'react'

const UserPost = ({imageSrc}) => {
  return (
    <div className="w-full h-full">
      <img src={imageSrc} alt="post" className="aspect-square object-cover" />
    </div>
  );
}

export default UserPost
