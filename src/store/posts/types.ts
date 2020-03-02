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

// POSTS TYPES
export enum POST_TYPES {
  LOAD_POST_STARTED = 'LOAD_POST_STARTED',
  LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS',
  LOAD_POST_ERROR = 'LOAD_POST_ERROR',
  LIKE_POST = 'LIKE_POST',
  LIKE_COMMENT = 'LIKE_COMMENT',
  COMMENT_ON_POST = 'COMMENT_ON_POST'
}

// POSTS ACTION TYPES
export enum POST_ACTION_TYPES {
  LOAD_POSTS = 'LOAD_POSTS',
  LIKE_POST = 'LIKE_POST',
  POST_COMMENT = 'POST_COMMENT',
  LIKE_COMMENT = 'LIKE_COMMENT'
}

export type CommentInterface = {
  statusCode: number;
  message: string;
  payload: { postId: string; comment: string };
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
};

export type LikePostResponse = {
  statusCode: number;
  message: string;
  payload: { likes: number };
};

export type PostAction =
  | { type: POST_TYPES.LOAD_POST_STARTED; payload: null }
  | { type: POST_TYPES.LOAD_POST_SUCCESS; payload: PostInterface[] }
  | { type: POST_TYPES.LOAD_POST_ERROR; payload: string }
  | {
      type: POST_TYPES.LIKE_POST;
      payload: { likeCount: number; postId: string };
    }
  | { type: POST_TYPES.LIKE_COMMENT; payload: string }
  | {
      type: POST_TYPES.COMMENT_ON_POST;
      payload: CommentInterface | any;
    }; // add post body when response is identified
