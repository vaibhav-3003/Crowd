import React, { useContext, useEffect, useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import Crowd from '../assets/Crowd.png'
import {Input,IconButton, Button, Spinner} from '@material-tailwind/react'
import { EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline";
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from '../context/UserContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({user}) => {
    if(user){
      return <Navigate to={'/'}/>
    }

    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isConfPassVisible, setIsConfPassVisible] = useState(false);
    const {isLoading,userRegister,registerError} = useContext(UserContext)

    const registerSchema = z
      .object({
        username: z
          .string()
          .min(3,"Username must contain atleast 3 characters")
          .max(50)
          .regex(/^[a-zA-Z0-9_][a-zA-Z0-9_.]*$/, {
            message:
              "Username must not start with speacial character and can only contain letters, numbers, '_', '.', and '-'",
          }),
        name: z.string(),
        email: z.string().email(),
        password: z
          .string()
          .min(8, "Password must contain atleast 8 characters")
          .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])/, {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
          }),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      watch,
    } = useForm({
      resolver: zodResolver(registerSchema),
    });

    const pass = watch("password");
    const confPass = watch("confirmPassword");

    const handleRegister = async(data)=>{
      await userRegister(data)
      
      if (registerError) {
        toast.error(registerError, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

  return (
    <div className="w-full min-h-full max-h-auto bg-gray-50 flex justify-center md:items-center lg:items-start pb-8">
      <div className="w-11/12 md:w-[360px] mt-12 flex flex-col gap-4">
        <div className="border border-gray-300 py-5 flex flex-col items-center gap-10 px-7">
          <Link to="/">
            <img src={Crowd} alt="logo" className="w-36" />
          </Link>
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div>
              <Input
                color="blue-gray"
                label="username"
                required
                autoComplete="off"
                {...register("username")}
                className="nunito"
              />
              {errors.username && (
                <div className="text-red-600 text-sm mt-2">
                  <p>Username must have</p>
                  <ul className="list-disc ml-5">
                    <li>not start with special character</li>
                    <li>
                      only contains letters, numbers and '_', '.', and '-'"
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <Input
                color='blue-gray'
                label="name"
                required
                autoComplete="off"
                {...register("name")}
                className="nunito"
              />
              {errors.className && (
                <span className="text-red-800 block mt-2 text-sm">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div>
              <Input
                color='blue-gray'
                label="email"
                type="email"
                required
                autoComplete="off"
                {...register("email")}
                className="nunito"
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
                  label="password"
                  type={isPassVisible ? "text" : "password"}
                  className="nunito pr-10"
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
                <div className="text-red-600 text-sm mt-2">
                  <p>Password must have</p>
                  <ul className="list-disc ml-5">
                    <li>must have atleast 8 characters</li>
                    <li>one uppercase, one lowercase, one number and one special character</li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <div className="relative flex w-full">
                <Input
                  color='blue-gray'
                  label="confirm password"
                  type={isConfPassVisible ? "text" : "password"}
                  className="nunito pr-10"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  required
                  autoComplete="off"
                  {...register("confirmPassword")}
                />

                <IconButton
                  variant="text"
                  size="sm"
                  className={
                    confPass
                      ? "block !absolute right-1 top-1 rounded"
                      : "hidden !absolute right-1 top-1 rounded"
                  }
                  onClick={() => setIsConfPassVisible(!isConfPassVisible)}
                >
                  {isConfPassVisible ? (
                    <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </IconButton>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-800 block mt-2 text-sm">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>
            <Button
              className="nunito bg-primary rounded-full w-full flex justify-center items-center gap-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isLoading ? <Spinner className="w-4 h-4" /> : null}
              Register
            </Button>
          </form>
        </div>
        <div className="border w-full border-gray-300 py-5 flex justify-center items-center">
          <Link to="/account/login" className="text-sm">
            Already have an account ?{" "}
            <span className="text-blue-500 font-bold hover:underline">
              Log in
            </span>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register
