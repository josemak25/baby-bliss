import dummyCategory from '../../libs/postCategories.json';

import {
  CategoryInitialState,
  PostCategoryAction,
  POST_CATEGORY_TYPES
} from './types';
import { PostInterface } from '../posts/types.js';

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

    case POST_CATEGORY_TYPES.GET_POST_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        category: [...state.categories, action.payload]
      };
    }

    case POST_CATEGORY_TYPES.FETCH_CATEGORIES_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        communityPosts: { ...state.communityPosts, ...action.payload }
      };
    }

    case POST_CATEGORY_TYPES.LIKE_OR_UNLIKE_POST: {
      const posts: PostInterface[] = state.communityPosts[action.payload.id];
      console.log('action.payload.id', action.payload.id);
      console.log(state.communityPosts);

      posts[action.payload.postIndex].noOfLikes = action.payload.likeCount;

      return {
        ...state,
        isLoading: false,
        error: null,
        communityPosts: {
          ...state.communityPosts,
          ...state.communityPosts[action.payload.id]
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
