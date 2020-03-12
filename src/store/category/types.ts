import { ResponseInterface, PostInterface } from '../posts/types';

/*
 **************************************************************
 ****************** POST CATEGORY TYPES ***********************
 **************************************************************
 */

// POST CATEGORY ACTION TYPES
export enum POST_CATEGORY_TYPES {
  GET_POST_CATEGORY_STARTED = 'GET_POST_CATEGORY_STARTED',
  GET_POST_CATEGORY_SUCCESS = 'GET_POST_CATEGORY_SUCCESS',
  FETCH_CATEGORIES_POST_SUCCESS = 'FETCH_CATEGORIES_POST_SUCCESS',
  LIKE_OR_UNLIKE_USER_POST = 'LIKE_OR_UNLIKE_USER_POST',
  POST_QUESTION = 'POST_QUESTION',
  GET_POST_CATEGORY_ERROR = 'GET_POST_CATEGORY_ERROR',
  LOAD_GENERAL_POSTS_SUCCESS = 'LOAD_GENERAL_POSTS_SUCCESS '
}

export enum CATEGORY_ACTION_TYPES {
  LOAD_CATEGORIES_ACTION = 'LOAD_CATEGORY_ACTION',
  FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS',
  LIKE_POST = 'LIKE_POST',
  POST_QUESTION = 'POST_QUESTION',
  LOAD_GENERAL_POSTS = 'LOAD_GENERAL_POSTS'
}

//  POST CATEGORY ACTION TYPES
export interface CategoryInterface {
  categoryOf: string;
  _id: string;
  title: string;
  createdAt: string;
  __v: number;
  id: string;
  key?: string;
}

//  POST CATEGORY STATE TYPE
export type CategoryInitialState = {
  isLoading: boolean;
  error?: string | null;
  categories: CategoryInterface[];
  communityPosts: {};
  generalPosts: PostInterface[];
};

export type LikeOrUnlikePostResponse = {
  statusCode: number;
  message: string;
  payload: { likes: number };
};

export type LikeOrUnlikePostType = {
  likeCount: number;
  categoryId: string;
  postIndex: number;
};

export type QuestionType = {
  title: string;
  description: string;
  category: string;
  image: string;
};

export interface PostCategoryResponse {
  statusCode: number;
  message: string;
  payload: CategoryInterface[];
  error?: any;
}

export type PostCategoryAction =
  | {
      type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_STARTED;
      payload: CategoryInterface[];
    }
  | {
      type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_SUCCESS;
      payload: CategoryInterface[];
    }
  | {
      type: POST_CATEGORY_TYPES.FETCH_CATEGORIES_POST_SUCCESS;
      payload: { categoryPosts: CategoryInterface[]; categoryId: string };
    }
  | {
      type: POST_CATEGORY_TYPES.LOAD_GENERAL_POSTS_SUCCESS;
      payload: ResponseInterface[];
    }
  | {
      type: POST_CATEGORY_TYPES.LIKE_OR_UNLIKE_USER_POST;
      payload: LikeOrUnlikePostType;
    }
  | {
      type: POST_CATEGORY_TYPES.POST_QUESTION;
      payload: QuestionType;
    }
  | {
      type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR;
      payload: object;
    };
