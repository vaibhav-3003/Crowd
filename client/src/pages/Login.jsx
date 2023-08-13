import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { loginUser } from '../Actions/User'

const Login = () => {

  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const dispatch = useDispatch()

  const togglePasswordVisibility = ()=>{
    setIsPasswordVisible((prevState) => !prevState);
  }

  const loginHandler = (e)=>{
    e.preventDefault()

    dispatch(loginUser(email,password))
  }

  return (
    <div className="w-full py-6">
      <h2 className="w-full py-4 text-center text-7xl">Login</h2>
      <form
        className="w-full flex flex-col gap-8 py-8 px-4 justify-center items-center"
        onSubmit={loginHandler}
      >
        <input
          type="email"
          placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full md:w-1/2 lg:w-1/4"
          required
        />
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full md:w-1/2 lg:w-1/4"
          required
        />
        <div className="w-full md:w-1/2 lg:w-1/4 flex justify-between items-center">
          <div className="flex items-center w-fit gap-2">
            <input
              type="checkbox"
              checked={isPasswordVisible}
              onChange={togglePasswordVisibility}
              className="checkbox"
            />
            <h4>Show Password</h4>
          </div>
          <Link to="/forgot/password" className="text-blue-600">
            Forgot Password ?
          </Link>
        </div>

        <button type="submit" className="btn w-full md:w-1/2 lg:w-1/4">
          Login
        </button>

        <Link to="/register" className="text-gray-500">
          Don't have an account ? Sign up
        </Link>
      </form>
    </div>
  );
}

export default Login
