import React, { useContext } from 'react'
import { PostContext } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const DeleteModal = () => {

    const {deletePost,post} = useContext(PostContext)
    const {user,theme} = useContext(UserContext)
    const navigate = useNavigate()

    const handleDeletePost = async(id)=>{
        await deletePost(id)
        navigate(`/${user.username}`)
    }
  return (
    <div>
      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-3xl text-center mt-4">Delete Post?</h2>
          <p className={`text-center my-2 ${theme==='dark'?'text-gray-600':'text-gray-500'} text-gray-600`}>Are you sure you want to delete this post?</p>
          <div className="modal-action flex gap-2">
            <label
              htmlFor="delete_modal"
              className="border-gray-500 border-2 text-white px-4 py-2 rounded-full hover:cursor-pointer"
            >
              Cancel
            </label>
            <label
              htmlFor="delete_modal"
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:cursor-pointer"
              onClick={() => handleDeletePost(post && post._id)}
            >
              Delete
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="delete_modal">
          Close
        </label>
      </div>
    </div>
  );
}

export default DeleteModal
