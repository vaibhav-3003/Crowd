const UserReducer = (state,action)=>{
    switch (action.type) {
        case 'SET_USER_LOADING_TRUE':
            return {
                ...state,
                userLoading: true
            };

        case 'SET_USER_LOADING_FALSE':
            return {
                ...state,
                userLoading: false
            };
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                isLoading: true
            };

        case 'SET_LOADING_FALSE':
            return {
                ...state,
                isLoading: false
            };
        
        case 'SET_USER':
            console.log(action.payload)
            return {
                ...state,
                user: action.payload.user
            }

        case 'SET_ERROR':
            return {
              ...state,
              error: action.payload.response.data.message,
            };
    
        default:
            return {
                ...state,
            };
    }
}

export default UserReducer