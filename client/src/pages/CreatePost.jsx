import React, { useContext, useState } from 'react'
import { CloudArrowUpIcon,TrashIcon } from '@heroicons/react/24/solid';
import { Textarea,Button } from "@material-tailwind/react";
import { PostContext } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [image,setImage] = useState(undefined)
  const [caption,setCaption] = useState('')

  const {uploadPost,loading,error} = useContext(PostContext)
  const navigate = useNavigate()

  const handleImageChange = (e)=>{
    const file = e.target.files[0]

    const Reader = new FileReader();

    Reader.onload = (e)=>{
      if(Reader.readyState === 2){
        setImage(Reader.result)
        console.log(Reader.result)
      }
    }

    Reader.readAsDataURL(file)
  }

  const submitHandler = async(e)=>{
    e.preventDefault()

    await uploadPost(caption,image)
    
  }
  

  return (
    <div className="w-full py-5 md:py-10 pb-20">
      <div className="md:ml-20 lg:ml-72 flex flex-col items-center">
        <div className="w-full py-5 md:mb-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Create Post
          </h2>
        </div>

        {/* file input */}
        <form className="py-5 w-11/12 h-[340px] md:w-4/5 md:h-[320px] lg:w-3/4 lg:h-[365px] bg-gray-200 rounded-md px-4 mb-10" onSubmit={submitHandler}>
          {!image ? (
            <label className="cursor-pointer">
              <div className="flex flex-col items-center justify-center h-full border-2 border-gray-500 border-dashed">
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
                className="absolute bottom-3 right-3 p-2 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                onClick={() => setImage(undefined)}
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          )}
          
          <div className="w-full py-5 mt-5">
            <Textarea
              variant="standard"
              label="caption"
              className="nunito"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              maxLength={2000}
            />
            <p className="text-sm text-gray-500 w-full text-end mt-1">
              {caption.length} / 2000
            </p>
          </div>
          <Button className="w-full md:w-36 mb-20 md:mb-10" type="submit">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost
