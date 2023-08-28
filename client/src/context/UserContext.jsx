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
    user:null,
    userProfile: null
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

    const userLogin = async(data)=>{
        dispatch({type:'SET_LOADING_TRUE'})
        try {
            const res = await axios.post('http://localhost:4000/api/v1/login',data)
            const user = res.data

            console.log(res)

            // Cookies.set("token", user.token, { expires: 90 });

            // dispatch({ type: "SET_USER", payload: user });
            // dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            // dispatch({ type: "SET_LOADING_FALSE" });
            // dispatch({type: 'SET_LOGIN_ERROR',payload: error})
            console.log(error)
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
        dispatch({ type: "SET_LOADING_TRUE" });
        try {
          const { data } = await axios.get(`http://localhost:4000/api/v1/user/${username}`);

          dispatch({ type: "SET_USER_WITH_USERNAME", payload: data });
          dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_LOADING_FALSE" });
          dispatch({type:'SET_USER_ERROR',payload: error.response.data.message})
        }
    }

    useEffect(()=>{
        const user = async()=>{
            await loadUser()
        }
        user()
    },[])

    return (
        <UserContext.Provider value={{...state,userLogin,userRegister,loadUser,loadUserWithUsername}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider}