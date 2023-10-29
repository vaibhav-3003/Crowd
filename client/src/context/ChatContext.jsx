import { createContext, useContext, useReducer } from "react"
import reducer from '../reducers/chatReducer.js'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";

const initialState = {
    chats : [],
    chatListLoading: false,
    chatLoading: true,
    chatError: null,
    chat: null,
    messageLoading: false,
    newChat:{},
}


const ChatContext = createContext(initialState)

const ChatProvider = ({children})=>{

    const navigate = useNavigate();
    const [state,dispatch] = useReducer(reducer,initialState)
    const {user} = useContext(UserContext)

    const setChatId = ()=>{
        dispatch({type:'SET_CHAT_ID'})
        navigate('direct/t/123456')
    }

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const showChatList = async()=>{
        try {
            dispatch({type: 'SET_CHATLIST_LOADING_TRUE'})
            const {data} = await axios.post('http://localhost:4000/api/v1/user/chats',{
                userId: user._id
            },config)
            dispatch({type: 'SET_CHATS',payload: data})
            dispatch({ type: "SET_CHATLIST_LOADING_FALSE" });
        } catch (error) {
            dispatch({ type: "SET_CHATLIST_LOADING_FALSE" });
            dispatch({type: 'SET_ERROR',payload: error.response.data.message})
        }
    }

    const loadChat = async(chatId)=>{
        try{
            dispatch({type: 'SET_CHAT_LOADING_TRUE'})
            if(chatId!==undefined){
                const { data } = await axios.get(
                  `http://localhost:4000/api/v1/chat/${chatId}`,
                  config
                );
                dispatch({ type: "SET_CHAT", payload: data });
                dispatch({ type: "SET_CHAT_LOADING_FALSE" });
                return 
            }
            
        }catch(error){
            dispatch({ type: "SET_CHAT_LOADING_FALSE" });
            dispatch({
              type: "SET_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    const sendMessage = async({sender,receiver,message,type,files})=>{
        try {
            dispatch({type: 'SET_MESSAGE_LOADING_TRUE'})
            const {data} = await axios.post('http://localhost:4000/api/v1/send/message',{
                senderId:sender,
                receiverId:receiver,
                text:message,
                files,
                type
            },config)
            dispatch({type: 'SET_MESSAGE_LOADING_FALSE'})
        } catch (error) {
            dispatch({ type: "SET_MESSAGE_LOADING_FALSE" });
            dispatch({
              type: "SET_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    const createChat = async({sender,receiver})=>{
        try {
            const { data } = await axios.post(
              "http://localhost:4000/api/v1/create/chat",
              {
                senderId: sender,
                receiverId: receiver,
              },
              config
            );
            dispatch({type:'SET_NEW_CHAT',payload:data})
        } catch (error) {
            dispatch({
              type: "SET_ERROR",
              payload: error.response.data.message,
            });
        }
    }

    return <ChatContext.Provider value={{...state,setChatId,showChatList,loadChat,sendMessage,createChat}}>
        {children}
    </ChatContext.Provider>
}

export {ChatContext,ChatProvider}