import API from '../../lib/api';
import {
  POST_TYPES,
  PostAction,
  CommentInterface,
  PostInterface,
  POST_ACTION_TYPES,
  ResponseInterface,
  LikeOrUnlikePostResponse,
  LikeCommentResponseInterface,
  LikeComentResponse,
  PostCommentResponseInterface
} from './types';

const loadPostStarted = () => ({ type: POST_TYPES.LOAD_POST_STARTED });

const loadPostSuccess = (payload: PostInterface[]): PostAction => ({
  type: POST_TYPES.LOAD_POST_SUCCESS,
  payload
});

const loadPostError = (error: string): PostAction => ({
  type: POST_TYPES.LOAD_POST_ERROR,
  payload: error
});

const likeOrUnlikePostSuccess = (payload: LikeOrUnlikePostResponse) => ({
  type: POST_TYPES.LIKE_OR_UNLIKE_POST,
  payload
});

const loadCommentsSuccess = (payload: CommentInterface[]): PostAction => ({
  type: POST_TYPES.LOAD_COMMENT_SUCCESS,
  payload
});

const likeComment = (likeCount: number, postId: string) => ({
  type: POST_TYPES.LIKE_COMMENT,
  payload: { likeCount, postId }
});

const postComment = (payload: CommentInterface): PostAction => ({
  type: POST_TYPES.POST_COMMENT,
  payload
});

export default function postsActions(type: string) {
  return async (dispatch: any, payload: any) => {
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
            path: `/posts/${payload.id}/${payload.isLiked ? 'like' : 'unlike'}`,
            payload: null,
            authToken: payload.authToken
          });

          const response: LikeOrUnlikePostResponse = await request.json();
          if (response.statusCode === 200) {
            return dispatch(
              likeOrUnlikePostSuccess({
                likeCount: response.payload.likes,
                ...payload
              })
            );
          }
          dispatch(loadPostError(response.message));
        } catch (error) {
          dispatch(loadPostError(error));
        }
        break;
      case POST_ACTION_TYPES.LOAD_POST_COMMENTS:
        try {
          dispatch(loadPostStarted());

          const request = await API.get(
            `/posts/${payload.postId}/comments`,
            payload.authToken
          );
          const response: LikeCommentResponseInterface = await request.json();

          if (response.statusCode === 200) {
            return dispatch(loadCommentsSuccess(response.payload));
          }
          dispatch(loadPostError(response.message));
        } catch (error) {
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.POST_COMMENT:
        try {
          dispatch(loadPostStarted());
          const request = await API.post({
            path: `/posts/${payload.id}/comments`,
            payload: { content: payload.content },
            authToken: payload.authToken
          });

          const response: PostCommentResponseInterface = await request.json();
          if (response.statusCode === 200) {
            return dispatch(postComment(response.payload));
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
            path: `/posts/${payload.id}/like`,
            payload: null,
            authToken: payload.authToken
          });

          const response: LikeComentResponse = await request.json();

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
