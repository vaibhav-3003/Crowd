import React,{createContext, useEffect, useReducer} from 'react'
import reducer from '../reducers/userReducer.js'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    isLoading: false,
    userLoading:true,
    loginError: null,
    registerError: null,
    error:null,
    resetPasswordError:null,
    user:null,
    userProfile: null,
    isFollowed: null,
    allUsers: [],
    filteredUsers: [],
    theme: localStorage.getItem("theme") || "light"
}

const UserContext = createContext(initialState)

const UserProvider = ({children})=>{

    const [state,dispatch] = useReducer(reducer,initialState)

    const loadUser = async()=>{
        dispatch({type:'SET_USER_LOADING_TRUE'})
        try {
            const {data} = await axios.get('http://localhost:4000/api/v1/me',{
                withCredentials: true
            })
            dispatch({ type: "SET_USER", payload: data });
            dispatch({ type: "SET_USER_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_USER_LOADING_FALSE" });
        }
    }

    const loadAllUsers = async()=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const {data} = await axios.get('http://localhost:4000/api/v1/users',{
                withCredentials: true
            })
            dispatch({type:'SET_ALL_USERS',payload: data.users})
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({type:'SET_LOADING_FALSE'})
            dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    const userLogin = async(data)=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const res = await axios.post('http://localhost:4000/api/v1/login',data)
            const user = res.data

            Cookies.set("token", user.token, { expires: 90 });

            dispatch({ type: "SET_USER", payload: user });
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_LOADING_FALSE" });
            dispatch({type: 'SET_LOGIN_ERROR',payload: error})
        }
    }

    const userRegister = async(data)=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const res = await axios.post('http://localhost:4000/api/v1/register',data)
            const user = res.data

            Cookies.set("token", user.token, { expires: 90 });

            dispatch({ type: "SET_USER", payload: user });
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_LOADING_FALSE" });
            dispatch({type: 'SET_REGISTER_ERROR',payload: error})
        }
    }

    const loadUserWithUsername = async(username)=>{
        dispatch({ type: "SET_USER_LOADING_TRUE" });
        try {
          const { data } = await axios.get(`http://localhost:4000/api/v1/user/${username}`);

          dispatch({ type: "SET_USER_WITH_USERNAME", payload: data });
          dispatch({ type: "SET_USER_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_USER_LOADING_FALSE" });
          dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    const changeProfilePhoto = async(image)=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const {data} = await axios.put('http://localhost:4000/api/v1/update/profile/photo',{
                avatar: image
            },{
                withCredentials: true
            })
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({type:'SET_LOADING_FALSE'})
            dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    const updateProfile = async(values)=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const {data} = await axios.put('http://localhost:4000/api/v1/update/profile',{
                name: values.name,
                bio: values.bio
            },{
                withCredentials: true
            })
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({type:'SET_LOADING_FALSE'})
            dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    const followAndUnfollow = async(id)=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const {data} = await axios.get(`http://localhost:4000/api/v1/follow/${id}`,{
                withCredentials: true
            })
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({type:'SET_LOADING_FALSE'})
            dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    const userFollowed = async(username)=>{
        try {
            dispatch({type:'SET_LOADING_TRUE'})
            const {data} = await axios.get(`http://localhost:4000/api/v1/followed/${username}`,{
                withCredentials: true
            })
            dispatch({type: 'SET_FOLLOWED',payload: data.message})
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({type:'SET_LOADING_FALSE'})
            dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    const toggleTheme = ()=>{
        if(state.theme === 'light'){
            localStorage.setItem('theme','dark')
            dispatch({type:'SET_THEME',payload: 'dark'})
        }else{
            localStorage.setItem('theme','light')
            dispatch({type:'SET_THEME',payload: 'light'})
        }
    }

    const logout = async () => {
      try {
        dispatch({ type: "SET_LOADING_TRUE" });
        Cookies.remove("token");
        dispatch({type: 'SET_USER_NULL'})
        dispatch({ type: "SET_LOADING_FALSE" });
      } catch (error) {
        dispatch({ type: "SET_LOADING_FALSE" });
        dispatch({
          type: "SET_USER_ERROR",
          payload: error.response.data.message,
        });
      }
    };

    const deleteProfileImage = async()=>{
        try {
            dispatch({type:'SET_LOADING_TRUE'})
            const {data} = await axios.delete('http://localhost:4000/api/v1/delete/profile/photo',{
                withCredentials: true
            })
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({ type: "SET_LOADING_FALSE" });
            dispatch({
              type: "SET_USER_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    const forgotPassword = async(email)=>{
        try {
            dispatch({type:'SET_LOADING_TRUE'})
            const {data} = await axios.post('http://localhost:4000/api/v1/forgot/password',{
                email,
            })
            dispatch({type:'SET_LOADING_FALSE'})
        } catch (error) {
            dispatch({ type: "SET_LOADING_FALSE" });
            dispatch({
              type: "SET_USER_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    const resetPassword = async(password,token)=>{
        try {
            dispatch({ type: "SET_LOADING_TRUE" });
            const {data} = await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`,{
                password,
            })
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_LOADING_FALSE" });
            dispatch({
              type: "SET_RESET_PASSWORD_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    useEffect(()=>{
        const user = async()=>{
            await loadUser()
            await loadAllUsers()
        }
        user()
    },[])

    return (
        <UserContext.Provider value={{...state,dispatch,userLogin,userRegister,loadUser,loadUserWithUsername,changeProfilePhoto,updateProfile,followAndUnfollow,userFollowed,toggleTheme,logout,deleteProfileImage,forgotPassword,resetPassword}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider}