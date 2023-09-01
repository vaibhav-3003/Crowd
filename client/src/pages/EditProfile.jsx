import { Avatar, Button, Spinner } from '@material-tailwind/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Input,Textarea } from "@material-tailwind/react";
import { UserContext } from '../context/UserContext';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate,Link } from 'react-router-dom';

const EditProfile = () => {
    const {username} = useParams()
    const {loadUserWithUsername,userProfile,changeProfilePhoto,error,updateProfile,isLoading} = useContext(UserContext)
    const [profileImage,setProfileImage] = useState(userProfile && userProfile.avatar.url)

    const profileModal = useRef(null)

    const navigate = useNavigate()

    const {
      register,
      handleSubmit,
      setValue,
    } = useForm();

    const editProfile = async(data) => {
      await updateProfile(data)
      navigate(`/${username}`)
    }

    const handleProfileChange = async(e)=>{
      const file = e.target.files[0];

      const Reader = new FileReader();

      Reader.onload = async(e) => {
        if (Reader.readyState === 2) {
          setProfileImage(Reader.result);
          await changeProfilePhoto(Reader.result)

          if(error){
            toast.error(error, {
              position: toast.POSITION.TOP_CENTER,
            });
          }else{
            toast.success('Profile Photo Changed', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        }
      };

      Reader.readAsDataURL(file);
      profileModal.current.checked = false
    }

    useEffect(()=>{
      const userFunc = async () => {
        await loadUserWithUsername(username);
      };

      userFunc()

    },[])

    useEffect(() => {
      if (userProfile) {
        setValue("name", userProfile.name);
        setValue("bio", userProfile.bio);
        setProfileImage(userProfile.avatar.url)
      }
    }, [userProfile, setValue]); 


  return (
    <div className="md:ml-20 lg:ml-72 pb-10 md:pb-4">
      <div className="px-4 py-3 border-b flex items-center sticky top-0 bg-gray-50 z-20 md:hidden">
        <Link to={`/${username}`}>
          <ChevronLeftIcon className="w-6 h-6 font-bold" />
        </Link>
        <h3 className="text-center w-full text-xl font-bold">Edit Profile</h3>
      </div>
      <div className="w-full h-full py-5">
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto md:border md:mt-5 py-5">
          <h2 className="text-3xl font-semibold text-center">Edit Profile</h2>
          <div className="mt-5 flex flex-col gap-4 justify-center items-center">
            <div className="relative">
              <Avatar src={profileImage} className="w-[10rem] h-[10rem]" />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <h3 className="text-xl">{userProfile && userProfile.username}</h3>
              <label
                htmlFor="profile_modal"
                className="mt-2 text-gray-600 cursor-pointer"
              >
                Change Profile Photo
              </label>
            </div>
            <input
              type="checkbox"
              id="profile_modal"
              className="modal-toggle"
              ref={profileModal}
            />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box bg-white p-0">
                <div className="border flex flex-col justify-center items-center pt-5 gap-4">
                  <Avatar
                    src={userProfile && userProfile.avatar.url}
                    className="w-[5rem] h-[5rem]"
                  />
                  <h3 className="text-xl font-bold">Profile Photo</h3>
                  <div className="w-full flex flex-col justify-center items-center">
                    <div className="py-2 border-t w-full flex justify-center items-center">
                      <label
                        htmlFor="upload_photo"
                        className="hover:cursor-pointer"
                      >
                        Upload Photo
                        <input
                          type="file"
                          id="upload_photo"
                          className="hidden"
                          onChange={handleProfileChange}
                        />
                      </label>
                    </div>
                    <div className="py-2 border-t w-full flex justify-center items-center">
                      <button
                        className="text-red-600"
                        onClick={() => console.log("remove")}
                      >
                        Remove Current Photo
                      </button>
                    </div>
                    <div className="py-2 border-t border-b w-full flex justify-center items-center">
                      <button
                        onClick={() => (profileModal.current.checked = false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="profile_modal">
                Close
              </label>
            </div>
          </div>

          <form
            className="w-full md:w-3/4 mx-auto px-10 md:px-5 mt-7 flex flex-col gap-5"
            onSubmit={handleSubmit(editProfile)}
          >
            <Input label="name" className="nunito" {...register("name")} />
            <Textarea label="bio" className="nunito" {...register("bio")} />
            <Button
              className="nunito text-sm font-normal normal-case flex justify-center items-center gap-2"
              type="submit"
              variant="gradient"
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="w-4" /> : null}
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile
