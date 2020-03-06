import {
  CategoryInitialState,
  PostCategoryAction,
  POST_CATEGORY_TYPES,
  CategoryInterface,
  PostCategoryResponse
} from './types';

const getPostCategoryStarted = () => ({
  type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_STARTED
});

const getPostCategorySuccess = (payload: PostCategoryResponse) => ({
  type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_SUCCESS,
  payload
});

const getPostCategoryError = (error: PostCategoryResponse) => ({
  type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR,
  payload: error
});

export default function postCategoryActions() {
  return (dispatch: any, type: string) => {};
}
