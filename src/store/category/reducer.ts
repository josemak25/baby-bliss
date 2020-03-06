import dummyCategory from '../../libs/postCategories.json';

import {
  CategoryInitialState,
  PostCategoryAction,
  POST_CATEGORY_TYPES
} from './types';

const category = dummyCategory.category.map(category => {
  category['key'] = category.title;
  return category;
});

export const categoryInitialState: CategoryInitialState = {
  isLoading: false,
  error: null,
  category
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
        category: [...state.category, action.payload]
      };
    }

    case POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
