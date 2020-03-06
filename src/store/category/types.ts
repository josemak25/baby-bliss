/*
 **************************************************************
 ****************** POST CATEGORY TYPES ***********************
 **************************************************************
 */

// POST CATEGORY ACTION TYPES
export enum POST_CATEGORY_TYPES {
  GET_POST_CATEGORY_STARTED = 'GET_POST_CATEGORY_STARTED',
  GET_POST_CATEGORY_SUCCESS = 'GET_POST_CATEGORY_SUCCESS',
  GET_POST_CATEGORY_ERROR = 'GET_POST_CATEGORY_ERROR'
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
      type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR;
      payload: object;
    };
