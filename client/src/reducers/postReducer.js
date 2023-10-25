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
      
      case 'SET_POST':
        return {
          ...state,
          post: action.payload.post,
          comments: action.payload.post.comments,
          ownerComment: action.payload.post.ownerComment,
          likes: action.payload.post.likes.length
        }

      case 'SET_COMMENT':
        if(action.payload.comment.hasOwnProperty('owner')){
          return {
            ...state,
            ownerComment:action.payload.comment.owner
          }
        }else{
          return {
            ...state,
            post:{
              ...state.post,
              comments: [...state.post.comments,action.payload.comment]
            }
          }
        }
      
      case 'SET_FOLLOWING_POSTS':
        return {
          ...state,
          followingPosts: action.payload
        }
      
      case 'SET_ALL_POSTS':
        return {
          ...state,
          allPosts: action.payload
        }
      
      default :{
        return {
          ...state
        }
      }
    }
}

export default PostReducer