import { Avatar, Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Input,Textarea } from "@material-tailwind/react";
import { UserContext } from '../context/UserContext';

const EditProfile = () => {
    const {username} = useParams()
    const {loadUserWithUsername,userProfile} = useContext(UserContext)
    const [profileImage,setProfileImage] = useState(null)

    const {
      register,
      handleSubmit,
      setValue
    } = useForm();

    const editProfile = (data) => {
      console.log(data)
    }

    const handleProfileChange = async(e)=>{
      const file = e.target.files[0];

      const Reader = new FileReader();

      Reader.onload = (e) => {
        if (Reader.readyState === 2) {
          setProfileImage(Reader.result);
        }
      };

      Reader.readAsDataURL(file);

      
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
      }
    }, [userProfile, setValue]); 

  return (
    <div className="md:ml-20 lg:ml-72 h-full">
      <div className="w-full h-full py-5">
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto md:border md:mt-5 py-5">
          <h2 className="text-3xl font-semibold text-center">Edit Profile</h2>
          <div className="mt-5 flex flex-col gap-4 justify-center items-center">
            <Avatar
              src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
              className="w-[10rem] h-[10rem]"
            />
            <div className='w-full flex flex-col justify-center items-center'>
              <h3 className="text-xl">{userProfile && userProfile.username}</h3>
              <button onClick={() => window.my_modal_2.showModal()} className='text-sm mt-2 text-gray-700'>
                Change Profile Photo
              </button>
            </div>
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle"
            >
              <form method="dialog" className="modal-box bg-white p-0">
                <div className="border flex flex-col justify-center items-center pt-5 gap-4">
                  <Avatar
                    src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
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
                      <button>Cancel</button>
                    </div>
                  </div>
                </div>
              </form>
            </dialog>
          </div>

          <form
            className="w-full md:w-3/4 mx-auto px-10 md:px-5 mt-7 flex flex-col gap-5"
            onSubmit={handleSubmit(editProfile)}
          >
            <Input label="name" className="nunito" {...register("name")} />
            <Textarea label="bio" className="nunito" {...register("bio")} />
            <Button
              className="nunito text-sm font-normal normal-case"
              type="submit"
              variant="gradient"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile
