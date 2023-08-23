import React from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    const {id} = useParams()
  return (
    <div className='lg:ml-72'>
      {id}
    </div>
  )
}

export default PostPage
