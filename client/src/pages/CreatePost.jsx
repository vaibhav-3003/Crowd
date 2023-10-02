import React, { useContext, useState } from 'react'
import { CloudArrowUpIcon,TrashIcon } from '@heroicons/react/24/solid';
import { Textarea,Button } from "@material-tailwind/react";
import { PostContext } from '../context/PostContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../context/UserContext';

const CreatePost = () => {

  const [image,setImage] = useState(undefined)
  const [caption,setCaption] = useState('')

  const {uploadPost,loading,error} = useContext(PostContext)
  const {theme} = useContext(UserContext)

  const handleImageChange = (e)=>{
    const file = e.target.files[0]

    if(file.size / 1048576 > 10){
      toast.error("Image size is too high!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    const Reader = new FileReader();

    Reader.onload = (e)=>{
      if(Reader.readyState === 2){
        setImage(Reader.result)
      }
    }

    Reader.readAsDataURL(file)
  }

  const submitHandler = async(e)=>{
    e.preventDefault()

    await uploadPost(caption,image)

    if(error){
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }else{
      toast.success('Post Uploaded Successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      setImage(undefined)
      setCaption('')
    }
  }

  return (
    <div className="w-full min-h-screen max-h-auto pb-20 md:pb-0">
      <div className="md:ml-20 lg:ml-72 flex flex-col items-center min-h-screen max-h-auto md:pb-0">
        <div className="w-full py-5 md:mb-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Create Post
          </h2>
        </div>

        {/* file input */}
        <form
          className={`py-5 w-11/12 h-[350px] md:h-[400px] md:w-4/5 lg:w-3/4 ${
            theme === "light" ? "bg-gray-200" : "bg-dark"
          } rounded-md px-4 mb-10`}
          onSubmit={submitHandler}
        >
          {!image ? (
            <label className="cursor-pointer flex justify-center items-center h-full">
              <div className="py-4 w-full flex flex-col items-center justify-center h-full border-2 border-gray-500 border-dashed">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <CloudArrowUpIcon className="h-10 w-10 text-gray-500" />
                  </p>
                  <p className="text-lg">Click to Upload</p>
                </div>
                <p className="hidden sm:block mt-32  text-gray-400 ">
                  Use high-quality JPG,SVG,PNG or GIF
                </p>
              </div>
              <input
                type="file"
                name="upload-image"
                onChange={handleImageChange}
                className="w-0 h-0"
                accept="image/*"
              />
            </label>
          ) : (
            <div className="relative h-full">
              <img
                src={image}
                alt="uploaded-image"
                className="h-full w-full bg-cover object-cover"
              />
              <button
                type="button"
                className={`absolute bottom-3 right-3 p-2 rounded-full ${
                  theme === "light" ? "bg-white" : "bg-dark"
                }  text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out`}
                onClick={() => setImage(undefined)}
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          )}
        </form>

        <form className="py-5 w-11/12 md:w-4/5 lg:w-3/4 px-4">
          <Textarea
            variant="standard"
            label="caption"
            className={`nunito ${
              theme === "light" ? "text-black" : "text-gray-500"
            } text-lg`}
            color="blue"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
            maxLength={2000}
          />
          <p className="text-sm text-gray-500 w-full text-end mt-1">
            {caption.length} / 2000
          </p>
          <Button
            className="bg-primary text-sm nunito w-full md:w-[200px] mt-5 mb-6 rounded-full"
            type="submit"
            disabled={loading}
          >
            Post
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreatePost
