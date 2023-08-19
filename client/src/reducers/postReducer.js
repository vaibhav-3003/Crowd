const PostReducer = (state,action)=>{
    switch(action.type){
        case 'POST_UPLOAD_REQUEST':
            console.log('request...')
            return {
                ...state,
                loading: true
            }
        case 'POST_UPLOAD_SUCCESS':
            return{
                ...state,
                loading: false,
                error: null
            }
        case 'POST_UPLOAD_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
}

export default PostReducer