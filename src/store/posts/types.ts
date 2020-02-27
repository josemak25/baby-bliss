/*
 **************************************************************
 ************************* POSTS TYPES ************************
 **************************************************************
 */

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
  payload: { postId: string; comment: string };
};

// TYPESCRIPT TYPES
export type PostInitialState = {
  isLoading: boolean;
  error?: any;
  posts?: any[]; // post object interface when post object structure is identified
};

export type PostAction =
  | { type: POST_TYPES.LOAD_POST_STARTED; payload: null }
  | { type: POST_TYPES.LOAD_POST_SUCCESS; payload: any[] } // add post object interface type here when response of structure is defined
  | { type: POST_TYPES.LOAD_POST_ERROR; payload: string }
  | { type: POST_TYPES.LIKE_POST; payload: string }
  | { type: POST_TYPES.LIKE_COMMENT; payload: string }
  | {
      type: POST_TYPES.COMMENT_ON_POST;
      payload: CommentInterface | any;
    }; // add post body when response is identified
