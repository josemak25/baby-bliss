import {
  POST_TYPES,
  PostAction,
  CommentInterface,
  PostInterface,
  POST_ACTION_TYPES,
  ResponseInterface,
  LikePostResponse
} from './types';
import API from '../../lib/api';

const loadPostStarted = () => ({ type: POST_TYPES.LOAD_POST_STARTED });

const loadPostSuccess = (payload: PostInterface[]): PostAction => ({
  type: POST_TYPES.LOAD_POST_SUCCESS,
  payload
});

const loadPostError = (error: string): PostAction => ({
  type: POST_TYPES.LOAD_POST_ERROR,
  payload: error
});

const likePostSuccess = (likeCount: number, postId: string) => ({
  type: POST_TYPES.LIKE_POST,
  payload: { likeCount, postId }
});

const likeComment = (likeCount: number, postId: string) => ({
  type: POST_TYPES.LIKE_COMMENT,
  payload: { likeCount, postId }
});

const postComment = (payload: CommentInterface): PostAction => ({
  type: POST_TYPES.COMMENT_ON_POST,
  payload
});

export default function postsActions(type: string) {
  return async (dispatch: any, payload: string) => {
    // To unsubscribe to these update, just use the functions:
    switch (type) {
      case POST_ACTION_TYPES.LOAD_POSTS:
        try {
          dispatch(loadPostStarted());

          const request = await API.get('/posts', payload);

          const response: ResponseInterface = await request.json();
          if (response.statusCode === 200) {
            return dispatch(loadPostSuccess(response.payload));
          }
          dispatch(loadPostError(response.message));
        } catch (error) {
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.LIKE_POST:
        try {
          dispatch(loadPostStarted());
          const request = await API.put({
            path: `/posts/${payload}/like`,
            payload: null,
            authToken: payload
          });

          const response: LikePostResponse = await request.json();
          console.log('LIKE', response);

          if (response.statusCode === 200) {
            return dispatch(likePostSuccess(response.payload.likes, payload));
          }
          dispatch(loadPostError(response.message));
        } catch (error) {
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.POST_COMMENT:
        try {
          dispatch(loadPostStarted());
          const request = await API.put({
            path: ``,
            payload: null,
            authToken: payload
          });

          const response: CommentInterface = await request.json();

          if (response.statusCode === 200) {
            return dispatch(postComment(response));
          }
          dispatch(loadPostError(response.message));
        } catch (error) {
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.LIKE_COMMENT:
        try {
          dispatch(loadPostStarted());
          const request = await API.put({
            path: ``,
            payload: null,
            authToken: payload
          });

          const response: LikePostResponse = await request.json();

          if (response.statusCode === 200) {
            return dispatch(likeComment(response.payload.likes, payload));
          }
          dispatch(loadPostError(response.message));
        } catch (error) {
          dispatch(loadPostError(error));
        }
        break;

      default:
        break;
    }
  };
}
