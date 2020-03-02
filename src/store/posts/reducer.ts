import { POST_TYPES, PostInitialState, PostAction } from './types';

export const postInitialState: PostInitialState = {
  isLoading: false,
  error: null,
  posts: []
};

export default function postReducer(
  state = postInitialState,
  action: PostAction
): PostInitialState {
  switch (action.type) {
    case POST_TYPES.LOAD_POST_STARTED: {
      return { ...state, isLoading: true };
    }

    case POST_TYPES.LOAD_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: [...state.posts, ...action.payload]
      };
    }

    case POST_TYPES.LOAD_POST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case POST_TYPES.LIKE_POST: {
      const clonedPosts = [...state.posts];

      const updatedPostIndex = state.posts.findIndex(
        post => post._id === action.payload.postId
      );

      clonedPosts[updatedPostIndex].noOfLikes = action.payload.likeCount;

      return {
        ...state,
        isLoading: false,
        error: null,
        posts: [...clonedPosts]
      };
    }

    case POST_TYPES.LIKE_COMMENT: {
      const { payload: commentId } = action;
      // send id to backend
    }

    case POST_TYPES.COMMENT_ON_POST: {
      const { postId, comment } = action.payload;
      // send id to backend
    }

    case POST_TYPES.LOAD_POST_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
