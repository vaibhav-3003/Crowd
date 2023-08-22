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
            return {
                ...state,
                user: action.payload.user
            }

        case 'SET_LOGIN_ERROR':
            return {
              ...state,
              loginError: action.payload.response.data.message,
            };
        case 'SET_REGISTER_ERROR':
            return {
              ...state,
              registerError: action.payload.response.data.message,
            };
        case 'SET_USER_ERROR':
            return {
              ...state,
              error: action.payload,
            };

        case 'SET_USER_WITH_USERNAME':
            return {
              ...state,
              userProfile: action.payload.user,
            };
    
        default:
            return {
                ...state,
            };
    }
}

export default UserReducer