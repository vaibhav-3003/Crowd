import { createContext, useReducer } from "react";
import reducer from '../reducers/postReducer'
import axios from 'axios'

const initialState = {
    loading: false,
    error: null,
    posts:[],
    post: null,
    comments:null,
    ownerComment:null
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

    const fetchPost = async(id)=>{
        try {
            dispatch({type: 'SET_LOADING_TRUE'})
            const {data} = await axios.get(`http://localhost:4000/api/v1/post/${id}`,{
                withCredentials: true
            })
            dispatch({type: 'SET_POST',payload: data})
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({type:'SET_ERROR',payload: error.response.data.message})
        }
    }

    const commentOnPost = async(id,comment)=>{
        try {
          dispatch({ type: "SET_LOADING_TRUE" });
          const { data } = await axios.put(
            `http://localhost:4000/api/v1/post/comment/${id}`,{
              comment,
            },{
                withCredentials: true,
            }
          );
          dispatch({ type: "SET_COMMENT", payload: data });
          dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
          dispatch({ type: "SET_ERROR", payload: error.response.data.message });
        }
    }
    
    return <PostContext.Provider value={{...state,uploadPost,fetchUserPosts,fetchPost,commentOnPost}}>
        {children}
    </PostContext.Provider>
}

export {PostContext,PostProvider}