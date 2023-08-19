const PostReducer = (state,action)=>{
    switch(action.type){
        case 'POST_UPLOAD_REQUEST':
            console.log('request...')
            return {
                ...state,
                loading: true
            }
        case 'POST_UPLOAD_SUCCESS':
            console.log(action.payload)
            return{
                ...state,
                loading: false
            }
        case 'POST_UPLOAD_FAIL':
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
}

export default PostReducer