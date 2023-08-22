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
    }
}

export default PostReducer