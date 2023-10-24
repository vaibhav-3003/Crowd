const ChatReducer = (state,action)=>{
    switch(action.type){
        case 'SET_CHAT_ID':
            return{
                ...state,
                chatId: '123456'
            }
        
        case 'SET_CHATLIST_LOADING_TRUE':
            return{
                ...state,
                chatListLoading: true
            }

        case 'SET_CHATLIST_LOADING_FALSE':
            return{
                ...state,
                chatListLoading: false
            }
    
        case 'SET_CHATS':
            return{
                ...state,
                chats: action.payload.chats
            }
        
        case 'SET_ERROR':
            return{
                ...state,
                chatError: action.payload
            }
        
        case 'SET_CHAT_LOADING_TRUE':
            return{
                ...state,
                chatLoading: true
            }

        case 'SET_CHAT_LOADING_FALSE':
            return{
                ...state,
                chatLoading: false
            }
        
        case 'SET_CHAT':
            return{
                ...state,
                chat: action.payload.chat,
            }
        
        case 'SET_MESSAGE_LOADING_TRUE':
            return{
                ...state,
                messageLoading: true
            }
        
        case 'SET_MESSAGE_LOADING_FALSE':
            return{
                ...state,
                messageLoading: false
            }
        
        case 'SET_NEW_CHAT':
            return{
                ...state,
                newChat: action.payload.chat
            }
        
        default:
            return{
                ...state
            }
    }
}

export default ChatReducer