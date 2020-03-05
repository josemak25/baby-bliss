/*
 **************************************************************
 ************************* POSTS TYPES ************************
 **************************************************************
 */

// POST OBJECT TYPE

type Category = {
  _id: string;
  title: string;
  id: string;
};

type User = {
  avatar: string;
  _id: string;
  name: string;
  username: string;
  id: string;
};

export interface PostInterface {
  images?: null[] | null;
  contentType: string;
  link?: null;
  category: Category;
  isFlagged: boolean;
  deleted: boolean;
  _id: string;
  topic: string;
  description: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  noOfComments: number;
  isLiked: boolean;
  noOfLikes: number;
  noOfViews: number;
  userId: string;
}

export interface CommentInterface {
  likes: any[];
  replyTo?: any;
  isDeleted: boolean;
  isFlagged: boolean;
  _id: string;
  content: string;
  user: User;
  post: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  isLiked: boolean;
  parent?: any;
}

export interface LikeCommentResponseInterface {
  statusCode: number;
  message: string;
  payload: CommentInterface[];
  error?: any;
}

export interface PostCommentResponseInterface {
  statusCode: number;
  message: string;
  payload: CommentInterface;
  error?: any;
}

// POSTS TYPES
export enum POST_TYPES {
  LOAD_POST_STARTED = 'LOAD_POST_STARTED',
  LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS',
  LOAD_POST_ERROR = 'LOAD_POST_ERROR',
  LIKE_OR_UNLIKE_POST = 'LIKE_OR_UNLIKE_POST',
  LIKE_COMMENT = 'LIKE_COMMENT',
  POST_COMMENT = 'POST_COMMENT',
  REPLY_POST_COMMENT = 'REPLY_POST_COMMENT',
  LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS'
}

// POSTS ACTION TYPES
export enum POST_ACTION_TYPES {
  LOAD_POSTS = 'LOAD_POSTS',
  LIKE_POST = 'LIKE_POST',
  UNLIKE_POST = 'UNLIKE_POST',
  POST_COMMENT = 'POST_COMMENT',
  REPLY_POST_COMMENT = 'REPLY_POST_COMMENT',
  LIKE_COMMENT = 'LIKE_COMMENT',
  LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS'
}

export type SaveCommentInterface = {
  statusCode: number;
  message: string;
  payload: { postId: string; comment: string };
  error?: any;
};

// TYPESCRIPT TYPES

export type ResponseInterface = {
  statusCode: number;
  message: string;
  payload: PostInterface[];
};

export type PostInitialState = {
  isLoading: boolean;
  error?: any;
  posts?: PostInterface[];
  comments?: CommentInterface[];
};

export type LikeOrUnlikePostResponse = {
  statusCode: number;
  message: string;
  payload: { likes: number };
};

export type LikeCommentResponse = LikeOrUnlikePostResponse;

export type LikeOrUnlikePostType = {
  likeCount: number;
  postId: string;
  postIndex: number;
};

export type LikeCommentType = {
  likeCount: number;
  commentId: string;
  commentIndex: number;
};
export type PostAction =
  | { type: POST_TYPES.LOAD_POST_STARTED; payload: null }
  | { type: POST_TYPES.LOAD_POST_SUCCESS; payload: PostInterface[] }
  | { type: POST_TYPES.LOAD_POST_ERROR; payload: string }
  | {
      type: POST_TYPES.LIKE_OR_UNLIKE_POST;
      payload: LikeOrUnlikePostType;
    }
  | { type: POST_TYPES.LIKE_COMMENT; payload: LikeCommentType }
  | {
      type: POST_TYPES.POST_COMMENT;
      payload: LikeCommentType | any;
    } // add post body when response is identified
  | { type: POST_TYPES.LOAD_COMMENT_SUCCESS; payload: CommentInterface[] }
  | { type: POST_TYPES.REPLY_POST_COMMENT; payload: LikeCommentType };
