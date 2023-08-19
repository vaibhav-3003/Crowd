import { createContext, useReducer } from "react";
import reducer from '../reducers/postReducer'
import axios from 'axios'

const initialState = {
    loading: false,
    error: null
}

const PostContext = createContext(initialState)

const PostProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(reducer,initialState)

    const uploadPost = async(caption,image)=>{
        try {
            dispatch({type:'POST_UPLOAD_REQUEST'})
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
        } catch (error) {
            dispatch({type:'POST_UPLOAD_FAIL',payload:error.response.data.message})
        }
    }
    
    return <PostContext.Provider value={{...state,uploadPost}}>
        {children}
    </PostContext.Provider>
}

export {PostContext,PostProvider}