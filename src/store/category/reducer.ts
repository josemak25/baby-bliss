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
  communityPosts: {},
  generalPosts: []
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
      //Add this question to the appropriate community posts
      const categoryPosts = [
        action.payload,
        ...state.communityPosts[action.payload.category._id]
      ];

      return {
        ...state,
        isLoading: false,
        error: null,
        communityPosts: {
          ...state.communityPosts,
          [action.payload.category._id]: categoryPosts
        },
        generalPosts: [action.payload, ...state.generalPosts] //also add this question to the general post collection
      };
    }

    case POST_CATEGORY_TYPES.LOAD_GENERAL_POSTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        generalPosts: [...action.payload]
      };
    }

    case POST_CATEGORY_TYPES.LIKE_OR_UNLIKE_USER_POST: {
      //action.payload.categoryId property will be undefined if this action is for general post
      let posts = [];
      const { categoryId, postIndex, likeCount } = action.payload;
      posts = categoryId
        ? state.communityPosts[categoryId]
        : state.generalPosts;

      const oldNoOfLikes = posts[postIndex].noOfLikes;
      const newNoOfLikes = oldNoOfLikes + likeCount;
      posts[postIndex].noOfLikes = newNoOfLikes < 0 ? 1 : newNoOfLikes;
      posts[postIndex].isLiked = !posts[postIndex].isLiked;

      //If the categoryId is present update the community post else update the general post
      const update = categoryId
        ? {
            communityPosts: {
              ...state.communityPosts,
              [categoryId]: posts
            }
          }
        : { generalPosts: posts };

      return {
        ...state,
        isLoading: false,
        error: null,
        ...update
      };
    }

    case POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
