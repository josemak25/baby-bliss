import { POST_TYPES, PostInitialState, PostAction } from './types';

export const postInitialState: PostInitialState = {
  isLoading: false,
  error: null,
  posts: [],
  comments: []
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
        posts: [...action.payload]
      };
    }

    case POST_TYPES.LOAD_POST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case POST_TYPES.LIKE_OR_UNLIKE_POST: {
      state.posts[action.payload.postIndex].noOfLikes =
        action.payload.likeCount;

      return {
        ...state,
        isLoading: false,
        error: null,
        posts: state.posts
      };
    }

    case POST_TYPES.LOAD_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        comments: [...action.payload]
      };
    }
    case POST_TYPES.LIKE_COMMENT: {
      // state.comments[action.payload.commentIndex].noOfLikes =
      //   action.payload.likeCount;
      // return {
      //   ...state,
      //   isLoading: false,
      //   error: null,
      //   comments: state.comments
      // };
    }

    case POST_TYPES.POST_COMMENT: {
      return {
        ...state,
        isLoading: false,
        error: null,
        comments: [...state.comments, action.payload]
      };
    }

    case POST_TYPES.LOAD_POST_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
