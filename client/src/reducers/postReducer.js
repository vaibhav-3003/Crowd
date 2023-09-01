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
      
      case 'SET_POST_LIKED':
        if(action.payload.message==='Liked'){
          return {
            ...state,
            isPostLiked: true,
          };
        }else{
          return {
            ...state,
            isPostLiked: false,
          };
        }

      case 'INCREASE_LIKES':
        return {
          ...state,
          likes: state.likes + 1
        }
      
      case 'DECREASE_LIKES':
        return {
          ...state,
          likes: state.likes - 1
        }
      
      case 'SET_FOLLOWING_POSTS':
        console.log(action.payload)
        return {
          ...state,
          followingPosts: action.payload
        }
        
    }
}

export default PostReducer