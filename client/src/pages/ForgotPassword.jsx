import { useContext, useEffect,useState } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import Crowd from '../assets/Crowd.png'
import { LockSimple, Eye, EyeSlash } from "@phosphor-icons/react";
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = ({user})=>{
    const navigate = useNavigate()

    const {forgotPassword,isLoading,resetPassword,resetPasswordError} = useContext(UserContext)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [isPassVisible,setIsPassVisible] = useState(false)
    const [isConfirmPassVisible,setIsConfirmPassVisible] = useState(false)

    const {token} = useParams()

    const handleForgotPassword = async(e,email)=>{
      e.preventDefault()

      await forgotPassword(email)
    }

    const handleChangePassword = async(e,password,token)=>{
      e.preventDefault()
    
      await resetPassword(password,token)

      if(resetPasswordError){
        toast.error(resetPasswordError, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[navigate,user])

    useEffect(()=>{
      if(resetPasswordError){
       toast.error(resetPasswordError, {
         position: toast.POSITION.TOP_CENTER,
       });
      }
    },[resetPasswordError])
    return (
      <div className="w-full min-h-screen max-h-auto bg-white flex flex-col items-center text-black">
        <div className="w-full p-4 border sticky top-0">
          <div className="w-3/4 mx-auto">
            <Link to="/">
              <img src={Crowd} alt="logo" className="w-20" />
            </Link>
          </div>
        </div>

        {token ? (
          <div className="w-[400px] border bg-white mt-10 p-4">
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
            <p className="text-sm text-center mt-2 opacity-60">
              Enter your new password below:
            </p>
            <form className="w-full p-4 mt-4" onSubmit={(e)=>handleChangePassword(e,password,token)}>
              <div className="relative flex w-full">
                <Input
                  color="blue-gray"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isPassVisible ? "text" : "password"}
                  label="password"
                  className="nunito pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  required
                  autoComplete="off"
                />

                <IconButton
                  variant="text"
                  size="sm"
                  className={
                    password.length > 0
                      ? "block !absolute right-1 top-1 rounded"
                      : "hidden !absolute right-1 top-1 rounded"
                  }
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? (
                    <EyeSlash className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </IconButton>
              </div>
              <div className="relative flex w-full mt-6">
                <Input
                  color="blue-gray"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={isConfirmPassVisible ? "text" : "password"}
                  label="confirm password"
                  className="nunito pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  required
                  autoComplete="off"
                />

                <IconButton
                  variant="text"
                  size="sm"
                  className={
                    confirmPassword.length > 0
                      ? "block !absolute right-1 top-1 rounded"
                      : "hidden !absolute right-1 top-1 rounded"
                  }
                  onClick={() => setIsConfirmPassVisible(!isConfirmPassVisible)}
                >
                  {isConfirmPassVisible ? (
                    <EyeSlash className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </IconButton>
              </div>
              <button
                className="bg-primary w-full text-white p-2 mt-6 rounded-md text-sm disabled:opacity-70"
                disabled={
                  !password || !confirmPassword || password !== confirmPassword
                }
              >
                Reset Password
              </button>
            </form>
          </div>
        ) : (
          <div className="w-[400px] border bg-white mt-10">
            <div className="flex flex-col justify-center items-center">
              <LockSimple
                size={100}
                className="text-black border-2 border-black rounded-full p-4 mt-5"
                weight="thin"
              />
              <h3 className="text-lg font-bold mt-4">Trouble logging in?</h3>
              <p className="text-sm text-gray-500 mt-1 w-4/5 text-center">
                Enter your email we'll send you a link to get back into your
                account.
              </p>
              <form
                className="w-4/5 flex flex-col justify-center items-center"
                onSubmit={(e) => handleForgotPassword(e, email)}
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  className="border p-2 mt-4 w-full bg-gray-50 text-sm outline-none rounded-md"
                />
                <button
                  className="bg-primary w-full text-white p-2 mt-4 rounded-md text-sm disabled:opacity-70 flex justify-center items-center gap-2"
                  disabled={email.length === 0}
                >
                  {isLoading && <Spinner className="w-4" />}
                  Send login Link
                </button>
              </form>
              <div className="divider w-4/5 mx-auto mt-8 mb-5">OR</div>
              <Link
                to="/account/register"
                className="text-sm font-bold hover:text-gray-500"
              >
                <h3>Create new account</h3>
              </Link>

              <Link
                to="/"
                className="w-full text-sm font-bold bg-gray-50 hover:bg-gray-100 border p-3 text-center mt-10"
              >
                <h3>Back to Login</h3>
              </Link>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    );
}

export default ForgotPassword;