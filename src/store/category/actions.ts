import API from '../../lib/api';
import { ResponseInterface, PostInterface } from '../posts/types';
import {
  POST_CATEGORY_TYPES,
  CategoryInterface,
  PostCategoryResponse,
  CATEGORY_ACTION_TYPES,
  LikeOrUnlikePostResponse
} from './types';

const getPostCategoryStarted = () => ({
  type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_STARTED
});

const fetchCategoriesPostSuccess = (categoryPosts: any) => ({
  type: POST_CATEGORY_TYPES.FETCH_CATEGORIES_POST_SUCCESS,
  payload: categoryPosts
});

const postQuestion = () => ({
  type: POST_CATEGORY_TYPES.POST_QUESTION
});

const getPostCategoryError = (error: string) => ({
  type: POST_CATEGORY_TYPES.GET_POST_CATEGORY_ERROR,
  payload: error
});

const loadPostSuccess = (payload: PostInterface[]) => ({
  type: POST_CATEGORY_TYPES.LOAD_GENERAL_POSTS_SUCCESS,
  payload
});

export default function postCategoryActions(type: string) {
  return async (dispatch: any, payload: any) => {
    switch (type) {
      case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_POSTS:
        try {
          dispatch(getPostCategoryStarted());
          //Iterate through all the category Ids and fetch their posts respectively
          const requestPromises: Promise<
            any
          >[] = payload.categories.map((category: CategoryInterface) =>
            API.get(`/posts?categories=${category._id}`, payload.authToken, '')
          );
          const requests: any[] = await Promise.all(requestPromises);
          const dispatchPayload = {};
          for (let index = 0; index < payload.categories.length; index++) {
            const response: PostCategoryResponse = await requests[index].json();
            const { id: categoryId } = payload.categories[index];
            dispatchPayload[categoryId] = response.payload;
          }
          dispatch(fetchCategoriesPostSuccess(dispatchPayload));
        } catch (error) {
          dispatch(getPostCategoryError(error));
        }
        break;

      case CATEGORY_ACTION_TYPES.LIKE_POST:
        try {
          const request = await API.put({
            path: `/posts/${payload.id}/${payload.isLiked ? 'like' : 'unlike'}`,
            payload: null,
            authToken: payload.authToken
          });
          const response: LikeOrUnlikePostResponse = await request.json();
          if (response.statusCode === 200) {
            return;
          }
          dispatch(getPostCategoryError(response.message));
        } catch (error) {
          dispatch(getPostCategoryError(error));
        }
        break;

      case CATEGORY_ACTION_TYPES.POST_QUESTION:
        try {
          dispatch(getPostCategoryStarted());
          const request = await API.post({
            path: `/posts`,
            payload: payload.userQuestion,
            authToken: payload.authToken
          });
          const response: LikeOrUnlikePostResponse = await request.json();
          if (response.statusCode === 200) {
            return dispatch(postQuestion());
          }
          dispatch(getPostCategoryError(response.message));
        } catch (error) {
          dispatch(getPostCategoryError(error));
        }
        break;

      case CATEGORY_ACTION_TYPES.LOAD_GENERAL_POSTS:
        try {
          dispatch(getPostCategoryStarted());
          const request = await API.get(`/posts`, payload, '');
          const response: ResponseInterface = await request.json();
          if (response.statusCode === 200) {
            return dispatch(loadPostSuccess(response.payload));
          }
          dispatch(getPostCategoryError(response.message));
        } catch (error) {
          dispatch(getPostCategoryError(error));
        }
        break;
      default:
        break;
    }
  };
}
