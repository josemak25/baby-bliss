import dummyCategory from '../../libs/postCategories.json';

import {
  CategoryInitialState,
  PostCategoryAction,
  POST_CATEGORY_TYPES
} from './types';

const categories = dummyCategory.category.map(category => {
  category['key'] = category.title;
  return category;
});

export const categoryInitialState: CategoryInitialState = {
  isLoading: false,
  error: null,
  categories: categories,
  communityPosts: {}
};

export default function PostCategoryReducer(
  state = categoryInitialState,
  action: PostCategoryAction
) {
  switch (action.type) {
    case POST_CATEGORY_TYPES.GET_POST_CATEGORY_STARTED: {
      return { ...state, isLoading: true };
    }

    case POST_CATEGORY_TYPES.FETCH_CATEGORIES_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        communityPosts: { ...state.communityPosts, ...action.payload }
      };
    }

    case POST_CATEGORY_TYPES.POST_QUESTION: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }

    case POST_CATEGORY_TYPES.LIKE_OR_UNLIKE_USER_POST: {
      const posts = state.communityPosts[action.payload.categoryId];
      const oldNoOfLikes = posts[action.payload.postIndex].noOfLikes;
      const newNoOfLikes = oldNoOfLikes + action.payload.likeCount;

      posts[action.payload.postIndex].noOfLikes =
        newNoOfLikes < 0 ? 1 : newNoOfLikes;

      return {
        ...state,
        isLoading: false,
        error: null,
        communityPosts: {
          ...state.communityPosts,
          [action.payload.categoryId]: posts
        }
      };
    }

    case POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
