import {
  POST_TYPES,
  PostAction,
  CommentInterface,
  PostInterface,
  POST_ACTION_TYPES
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

const likePost = (postId: string): PostAction => ({
  type: POST_TYPES.LIKE_POST,
  payload: postId
});

const likeComment = (commentId: string): PostAction => ({
  type: POST_TYPES.LIKE_COMMENT,
  payload: commentId
});

const postComment = (payload: CommentInterface): PostAction => ({
  type: POST_TYPES.COMMENT_ON_POST,
  payload
});

export default function postsActions(type: string) {
  return async (dispatch: any) => {
    // To unsubscribe to these update, just use the functions:
    switch (type) {
      case POST_ACTION_TYPES.LOAD_POSTS:
        try {
          dispatch(loadPostStarted());
          const response = await fetch('');

          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          const responseData = await response.json();
          dispatch(loadPostSuccess(responseData));
        } catch (error) {
          console.log(error);
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.LIKE_POST:
        try {
          dispatch(loadPostStarted());
          const response = await fetch('');

          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          const responseData = await response.json();
          console.log('LIKE_POST', responseData);
          dispatch(likePost(responseData));
        } catch (error) {
          console.log(error);
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.POST_COMMENT:
        try {
          dispatch(loadPostStarted());
          const response = await fetch('');

          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          const responseData = await response.json();
          console.log('POST_COMMENT', responseData);
          dispatch(postComment(responseData));
        } catch (error) {
          console.log(error);
          dispatch(loadPostError(error));
        }
        break;

      case POST_ACTION_TYPES.LIKE_COMMENT:
        try {
          dispatch(loadPostStarted());
          const response = await fetch('');

          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          const responseData = await response.json();
          console.log('LIKE_COMMENT', responseData);
          dispatch(likeComment(responseData));
        } catch (error) {
          console.log(error);
          dispatch(loadPostError(error));
        }
        break;

      default:
        break;
    }
  };
}
