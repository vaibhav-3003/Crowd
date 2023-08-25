const PostReducer = (state,action)=>{
    switch (action.type) {
      case "SET_LOADING_TRUE":
        return {
          ...state,
          loading: true,
        };

      case "SET_LOADING_FALSE":
        return {
          ...state,
          loading: false,
        };

      case "SET_ERROR":
        console.log(action.payload)
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case "SET_USER_POSTS":
        return {
          ...state,
          posts: action.payload.posts,
        };
      
      case 'SET_POST':
        console.log(action.payload.post)
        return {
          ...state,
          post: action.payload.post
        }
    }
}

export default PostReducer