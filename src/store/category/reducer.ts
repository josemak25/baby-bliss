import dummyCategory from '../../libs/postCategories.json';
import { PostInterface } from '../posts/types.js';

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
      //action.payload.categoryId property will be null if this action is for general posts
      let { categoryId, postIndex, likeCount } = action.payload;
      let updatedCommunity = null;
      let updatedGeneral = null;

      if (categoryId) {
        //Here we are clear it category post that has this action
        const updatedCategoryPosts = updateCollection(
          state.communityPosts[categoryId],
          postIndex,
          likeCount
        );
        //Go ahead to update this post in the general posts as well
        const generalPostIndex = state.generalPosts.findIndex(
          post => post._id === updatedCategoryPosts[postIndex]._id
        );

        const updatedGeneralPosts = updateCollection(
          state.generalPosts,
          generalPostIndex,
          likeCount
        );
        updatedCommunity = {
          communityPosts: {
            ...state.communityPosts,
            [categoryId]: updatedCategoryPosts
          }
        };
        updatedGeneral = { generalPosts: updatedGeneralPosts };
      } else {
        //Here we are clear it general post that has this action
        console.log(action.payload);

        const updatedGeneralPosts2 = updateCollection(
          state.generalPosts,
          postIndex,
          likeCount
        );
        //Go ahead to update this post in the category posts as well
        const { category, _id: postId } = state.generalPosts[postIndex];

        const generalPostIndex = state.communityPosts[category._id].findIndex(
          (post: PostInterface) => post._id === postId
        );
        const updatedCategoryPosts2 = updateCollection(
          state.communityPosts[categoryId],
          generalPostIndex,
          likeCount
        );
        updatedCommunity = {
          communityPosts: {
            ...state.communityPosts,
            [categoryId]: updatedCategoryPosts2
          }
        };
        updatedGeneral = { generalPosts: updatedGeneralPosts2 };
      }

      return {
        ...state,
        isLoading: false,
        error: null,
        ...updatedCommunity,
        ...updatedGeneral
      };
    }

    case POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}

const updateCollection = (
  posts: PostInterface[],
  postIndex: number,
  likeCount: number
) => {
  const oldNoOfLikes = posts[postIndex].noOfLikes;
  const newNoOfLikes = oldNoOfLikes + likeCount;
  posts[postIndex].noOfLikes = newNoOfLikes < 0 ? 1 : newNoOfLikes;
  posts[postIndex].isLiked = !posts[postIndex].isLiked;
  return posts;
};
