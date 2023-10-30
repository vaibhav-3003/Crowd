import React, { useEffect,useState,useContext } from 'react'
import { UserContext } from '../context/UserContext';
import logo_light from "../assets/Crowd.png";
import logo_dark from "../assets/logo_dark.png";
import { Input, IconButton, Button } from "@material-tailwind/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Eye,EyeSlash } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';

const LoginModal = () => {
    const [isPassVisible, setIsPassVisible] = useState(false);
    const { userLogin, loginError,theme,loadUser } = useContext(UserContext);
    const {getFollowingPosts} = useContext(PostContext)
    const [error, setError] = useState('');
    const [isOpen,setIsOpen] = useState(true)

    const navigate = useNavigate()

    const loginSchema = z.object({
      email: z
        .string()
        .email("Invalid email format")
        .min(5, "Email is too short"),
      password: z.string().min(8, "Password must be atleast 8 characters"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      watch,
    } = useForm({
      resolver: zodResolver(loginSchema),
    });

    const pass = watch("password");

    const handleLogin = async (data) => {
      await userLogin(data);
      // if(error.length===0){
      //   setIsOpen(false)
      // }
      await loadUser()
      await getFollowingPosts()
      
      console.log(error)
      // navigate('/')
        
    };

    useEffect(()=>{
        setError(loginError)
        if (loginError) {
          setTimeout(() => {
            setError("");
          }, 3000);
        }
    },[loginError])
  return (
    <>
      {isOpen && (
        <dialog id="login_modal" className="modal">
          <div
            className={`modal-box ${
              theme === "light" ? "bg-white text-gray-800" : "text-gray-500"
            }`}
          >
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {error && <p className="text-red-500 my-2 text-center">{error}</p>}
            <div className="flex justify-center my-5">
              <img
                src={theme === "light" ? logo_light : logo_dark}
                alt="logo"
                className="w-28 md:w-36"
              />
            </div>

            <form
              className="w-full py-5 flex justify-center items-center"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="w-[300px] flex flex-col gap-8">
                <div className="w-full">
                  <Input
                    color={`${theme === "dark" ? "white" : "blue-gray"}`}
                    label="email"
                    type="email"
                    className={`nunito ${
                      theme === "dark" &&
                      "text-gray-500 placeholder:text-gray-500"
                    }`}
                    required
                    autoComplete="off"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-800 block mt-2 text-sm">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="relative flex w-full">
                    <Input
                      color={`${theme === "dark" ? "white" : "blue-gray"}`}
                      type={isPassVisible ? "text" : "password"}
                      label="password"
                      className="nunito pr-20"
                      containerProps={{
                        className: "min-w-0",
                      }}
                      required
                      autoComplete="off"
                      {...register("password")}
                    />

                    <IconButton
                      variant="text"
                      size="sm"
                      className={
                        pass
                          ? "block !absolute right-1 top-1 rounded"
                          : "hidden !absolute right-1 top-1 rounded"
                      }
                      onClick={() => setIsPassVisible(!isPassVisible)}
                    >
                      {isPassVisible ? (
                        <EyeSlash size={18} className="text-gray-500" />
                      ) : (
                        <Eye size={18} className="text-gray-500" />
                      )}
                    </IconButton>
                  </div>
                  {errors.password && (
                    <span className="text-red-800 block mt-2 text-sm">
                      {errors.password?.message}
                    </span>
                  )}
                </div>

                <Button
                  className="nunito normal-case text-md px-3 py-2 bg-primary rounded-full font-normal"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="cursor-default">close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default LoginModal
