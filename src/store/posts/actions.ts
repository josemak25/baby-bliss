import { POST_TYPES, PostAction, CommentInterface } from './types';

const loadPostStarted = () => ({ type: POST_TYPES.LOAD_POST_STARTED });

const loadPostSuccess = (payload: any): PostAction => ({
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

const commentOnPost = (payload: CommentInterface): PostAction => ({
  type: POST_TYPES.COMMENT_ON_POST,
  payload
});

export default function postsActions() {
  return (dispatch: any) => {
    // To unsubscribe to these update, just use the functions:
  };
}
