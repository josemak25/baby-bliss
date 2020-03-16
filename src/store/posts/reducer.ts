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
      const { postIndex, likeCount } = action.payload;
      const oldNoOfLikes = state.posts[postIndex].noOfLikes;
      const newNoOfLikes = oldNoOfLikes + likeCount;

      state.posts[postIndex].noOfLikes = newNoOfLikes < 0 ? 1 : newNoOfLikes;
      state.posts[postIndex].isLiked = !state.posts[postIndex].isLiked;

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
      const { userId, commentIndex } = action.payload;
      state.comments[commentIndex].likes.push(userId);
      return {
        ...state,
        isLoading: false,
        error: null,
        comments: state.comments
      };
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
