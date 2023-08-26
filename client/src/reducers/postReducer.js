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
        console.log(action.payload.post.comments)
        return {
          ...state,
          post: action.payload.post,
          comments: action.payload.post.comments,
          ownerComment: action.payload.post.ownerComment
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
    }
}

export default PostReducer