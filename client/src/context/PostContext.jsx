import { createContext, useEffect, useReducer } from "react";
import reducer from '../reducers/postReducer'
import axios from 'axios'
import { useContext } from "react";

const initialState = {
    loading: false,
    error: null,
    posts:[],
    followingPosts:[],
    post: null,
    comments:null,
    ownerComment:null,
    likes: null,
    allPosts:[]
}

const PostContext = createContext(initialState)

const PostProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(reducer,initialState)

    const uploadPost = async(caption,post,type)=>{
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
                post,
                type
            },config)
            dispatch({type:'POST_UPLOAD_SUCCESS',payload:data})
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.log(error)
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

    const likePost = async(id)=>{
        try {
            const { data } = await axios.get(
              `http://localhost:4000/api/v1/post/like/${id}`,{
                withCredentials: true,
              }
            );
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.response.data.message });
        }
    }

    const getFollowingPosts = async()=>{
        try {
            dispatch({type: 'SET_LOADING_TRUE'})
            const {data} = await axios.get('http://localhost:4000/api/v1/posts',{
                withCredentials: true
            })
            dispatch({type: 'SET_FOLLOWING_POSTS',payload: data.posts})
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({type: 'SET_ERROR',payload:error.response.data.message})
        }
    }

    const postSaved = async(id)=>{
        try {
            const {data} = await axios.get(`http://localhost:4000/api/v1/save/post/${id}`,{
                withCredentials: true
            })
            // dispatch({type: 'SET_SAVED',payload: data.message})
        } catch (error) {
            dispatch({type: 'SET_ERROR',payload:error.response.data.message})
        }
    }

    const getAllPosts = async()=>{
        try {
            dispatch({type: 'SET_LOADING_TRUE'})
            const {data} = await axios.get('http://localhost:4000/api/v1/allposts',{
                withCredentials: true
            })
            dispatch({type: 'SET_ALL_POSTS',payload: data.posts})
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.log(error)
            dispatch({type: 'SET_ERROR',payload:error.response.data.message})
        }
    }

    const deletePost = async(id)=>{
        try {
            dispatch({type: 'SET_LOADING_TRUE'})
            const {data} = await axios.delete(`http://localhost:4000/api/v1/post/delete/${id}`,{
                withCredentials: true
            })
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.log(error)
            dispatch({type: 'SET_ERROR',payload:error.response.data.message})
        }
    }

    const updatePost = async(id,caption)=>{
        try {
            dispatch({type: 'SET_LOADING_TRUE'})
            const {data} = await axios.put(`http://localhost:4000/api/v1/post/update/${id}`,{
                caption,
            },{
                withCredentials: true
            })
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            dispatch({type: 'SET_ERROR',payload:error.response.data.message})
        }
    }

    useEffect(()=>{
        const getPosts = async()=>{
            await getFollowingPosts()
        }
        getPosts()
    },[])

    return <PostContext.Provider value={{...state,uploadPost,fetchUserPosts,fetchPost,commentOnPost,likePost,postSaved,getAllPosts,deletePost,updatePost,getFollowingPosts}}>
        {children}
    </PostContext.Provider>
}

// custom hook to update state from any component
export const usePostState = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostState must be used within a PostProvider");
  }
  return context;
};

export {PostContext,PostProvider}