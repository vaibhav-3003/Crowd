import { createContext, useReducer } from "react";
import reducer from '../reducers/postReducer'

const initialState = {
    loading: false,
}

const PostContext = createContext(initialState)

const PostProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(reducer,initialState)
    
    return <PostContext.Provider value={{...state,}}>
        {children}
    </PostContext.Provider>
}

export {PostContext,PostProvider}