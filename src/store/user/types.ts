/*
 **************************************************************
 ************************* USER TYPES *************************
 **************************************************************
 */

// USER TYPES
export enum USER_TYPES {
  REGISTER_USER_STARTED = 'REGISTER_USER_STARTED',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
  LOGIN_USER_STARTED = 'LOGIN_USER_STARTED',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
}

// TYPESCRIPT TYPES
export type UserInitialState = {
  isLoading: boolean;
  error?: string | null;
  token?: null;
  user?: {}; // user object interface when user object structure is identified
};

export type UserAction =
  | { type: USER_TYPES.REGISTER_USER_STARTED; payload: null }
  | { type: USER_TYPES.REGISTER_USER_SUCCESS; payload: Object } // add user object interface type here when response of structure is defined
  | { type: USER_TYPES.REGISTER_USER_ERROR; payload: String }
  | { type: USER_TYPES.LOGIN_USER_STARTED; payload: null }
  | { type: USER_TYPES.LOGIN_USER_SUCCESS; payload: any }
  | { type: USER_TYPES.LOGIN_USER_ERROR; payload: String }; // add post body when response is identified
