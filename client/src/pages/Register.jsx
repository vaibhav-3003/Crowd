import React, { useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import Crowd from '../assets/Crowd.png'
import {Input,IconButton, Button} from '@material-tailwind/react'
import { EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline";
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = ({user}) => {
    if(user){
      return <Navigate to={'/'}/>
    }

    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isConfPassVisible, setIsConfPassVisible] = useState(false);

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

    const handleRegister = (data)=>{
      console.log(data)
    }

  return (
    <div className="w-full min-h-full max-h-auto bg-gray-50 flex justify-center md:items-center lg:items-start pb-8">
      <div className="w-11/12 md:w-[360px] mt-20 flex flex-col gap-4">
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
                label="username"
                required
                autoComplete="off"
                {...register("username")}
                className="nunito"
              />
              {errors.username && (
                <span className="text-red-800 block mt-2 text-sm">
                  {errors.username?.message}
                </span>
              )}
            </div>
            <div>
              <Input
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
                <span className="text-red-800 block mt-2 text-sm">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div>
              <div className="relative flex w-full">
                <Input
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
              className="nunito w-full"
              type="submit"
              disabled={isSubmitting}
            >
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
    </div>
  );
}

export default Register
