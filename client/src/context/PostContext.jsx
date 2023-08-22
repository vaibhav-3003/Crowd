import { createContext, useReducer } from "react";
import reducer from '../reducers/postReducer'
import axios from 'axios'

const initialState = {
    loading: true,
    error: null,
    posts:[]
}

const PostContext = createContext(initialState)

const PostProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(reducer,initialState)

    const uploadPost = async(caption,image)=>{
        try {
            dispatch({ type: "SET_LOADING_TRUE" });
            const config = {
                withCredentials: true,
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const {data} = await axios.post('http://localhost:4000/api/v1/post/upload',{
                caption,
                image,
            },config)
            dispatch({type:'POST_UPLOAD_SUCCESS',payload:data})
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({
              type: "SET_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    const fetchUserPosts = async(username)=>{
        try {
            dispatch({type: 'SET_LOADING_TRUE'})
            const {data} = await axios.get(`http://localhost:4000/api/v1/${username}/posts`)
            dispatch({type: 'SET_USER_POSTS',payload: data})
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({type:'SET_ERROR',payload: error.response.data.message})
        }
    }
    
    return <PostContext.Provider value={{...state,uploadPost,fetchUserPosts}}>
        {children}
    </PostContext.Provider>
}

export {PostContext,PostProvider}