import React, { useContext, useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import loginAnimation from '../animations/login.json'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import Crowd from '../assets/Crowd.png'
import {Input,IconButton,Button} from '@material-tailwind/react'
import {z} from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from '../context/UserContext'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({user}) => {

  const navigate = useNavigate();

  const [isPassVisible,setIsPassVisible] = useState(false)
  const {userLogin,loginError} = useContext(UserContext)
  const [error,setError] = useState(loginError)

  const loginSchema = z.object({
    email: z.string().email('Invalid email format').min(5,'Email is too short'),
    password: z.string().min(8,'Password must be atleast 8 characters')
  })

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const pass = watch('password')

  const handleLogin = async(data)=>{
    await userLogin(data)
    if (error) {
      toast.error(loginError, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="w-full min-h-screen max-h-auto flex justify-center items-center px-5 md:px-0 bg-gray-50">
      <div className="w-full md:w-1/2 mx-auto flex lg:gap-8">
        <div className="hidden w-0 lg:w-1/2 lg:flex justify-center items-center lg:px-5">
          <div className="mockup-phone bg-[#946CF3]">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 text-white bg-[#946CF3]">
                <Lottie animationData={loginAnimation} className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center border border-gray-300 py-5">
            <div className="w-full flex justify-center items-center p-2">
              <Link to="/">
                <img src={Crowd} alt="logo" className="w-36" />
              </Link>
            </div>

            <form
              className="w-full pt-10 pb-5 flex justify-center items-center"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="w-4/5 flex flex-col gap-6">
                <div className="w-full">
                  <Input
                    color='blue-gray'
                    label="email"
                    type="email"
                    className="nunito"
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
                    color='blue-gray'
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
                        <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-500" />
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
            <Link
              to="/accounts/password/reset"
              className="text-sm text-gray-500 hover:text-blue-600 hover:underline"
            >
              Forgot Password ?
            </Link>
          </div>

          <div className="border w-full border-gray-300 py-5 flex justify-center items-center">
            <Link to="/account/register" className="text-sm">
              Don't have an account ?{" "}
              <span className="text-blue-500 font-bold hover:underline">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login