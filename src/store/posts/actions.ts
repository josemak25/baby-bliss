import API from '../../libs/api';
import {
  POST_TYPES,
  PostAction,
  CommentInterface,
  PostInterface,
  POST_ACTION_TYPES,
  ResponseInterface,
  LikeOrUnlikePostResponse,
  LikeCommentResponseInterface,
  LikeCommentResponse,
  PostCommentResponseInterface,
  LikeCommentType
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

const loadCommentsSuccess = (payload: CommentInterface[]): PostAction => ({
  type: POST_TYPES.LOAD_COMMENT_SUCCESS,
  payload
});

const likeComment = (payload: LikeCommentType) => ({
  type: POST_TYPES.LIKE_COMMENT,
  payload
});

const postComment = (payload: CommentInterface): PostAction => ({
  type: POST_TYPES.POST_COMMENT,
  payload
});

export default function postsActions(type: string) {
  return async (dispatch: any, payload: any) => {
    // To unsubscribe to these update, just use the functions:
    switch (type) {
      case POST_ACTION_TYPES.LOAD_BLOG_POSTS:
        try {
          dispatch(loadPostStarted());
          const request = await API.get('posts/blog', payload, 'v2');
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
          const request = await API.put({
            path: `/posts/${payload.id}/${payload.isLiked ? 'like' : 'unlike'}`,
            payload: null,
            authToken: payload.authToken
          });
          const response: LikeOrUnlikePostResponse = await request.json();
          if (response.statusCode === 200) {
            return;
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
            payload.authToken,
            ''
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

      case POST_ACTION_TYPES.REPLY_COMMENT:
        try {
          dispatch(loadPostStarted());
          const { commentId, id, content, authToken } = payload;
          const request = await API.post({
            path: `/posts/${id}/comments`,
            payload: { content, replyTo: commentId },
            authToken
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
          const request = await API.put({
            path: `/comments/${payload.id}/${
              payload.isLiked ? 'like' : 'unlike'
            }`,
            payload: null,
            authToken: payload.authToken
          });
          const response: LikeCommentResponse = await request.json();

          if (response.statusCode === 200) {
            return dispatch(
              likeComment({ likeCount: response.payload.likes, ...payload })
            );
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
