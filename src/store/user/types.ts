/*
 **************************************************************
 ************************* USER TYPES *************************
 **************************************************************
 */

// USER TYPES
export enum USER_TYPES {
  STARTED = 'STARTED',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  LOGIN_USER_STARTED = 'LOGIN_USER_STARTED',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  ERROR = 'ERROR',
  LOAD_FROM_STORE = 'LOAD_FROM_STORE',
  COMPLETE_PROFILE = 'COMPLETE_PROFILE',
  LOGOUT = 'LOGOUT',
  UPDATE_PROFILE = 'UPDATE_PROFILE'
}

// POSTS ACTION TYPES
export enum USER_ACTION_TYPES {
  LOGIN_USER = 'LOGIN_USER',
  REGISTER_USER = 'REGISTER_USER',
  COMPLETE_PROFILE = 'COMPLETE_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE'
}

export interface UserInterface {
  id: string;
  name: string;
  username: string;
  email: string;
  mobileNumber: string;
  address?: string | null;
  avatar: string;
  userInterest: string[];
  createdAt: Date;
  isModerator: boolean;
  isApproved: boolean;
  deleted: boolean;
  state?: string | null;
  dueDateStart: Date;
  dueDateEnd: Date;
  hasBirthHospital: boolean;
  hasHealthMaintenanceOrg: boolean;
  hasInterestInAntenatalServices: boolean;
  isAdmin: boolean;
}

export interface UserResponseInterface {
  statusCode: number;
  message: string;
  payload: UserInterface;
  errors?: any;
  token?: string | null;
}

export interface UserStoredProfileInterface {
  payload: UserInterface;
  token: string;
}

export type RegistrationRequestType = {
  name: string;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
};

// TYPESCRIPT TYPES
export type UserInitialState = {
  isLoading: boolean;
  errorMessage?: any;
  token: string;
  user: UserInterface;
};
export type UserAction =
  | { type: USER_TYPES.STARTED }
  | { type: USER_TYPES.REGISTER_USER_SUCCESS; payload: UserResponseInterface } // add user object interface type here when response of structure is defined
  | { type: USER_TYPES.LOGIN_USER_STARTED }
  | { type: USER_TYPES.LOGIN_USER_SUCCESS; payload: UserResponseInterface }
  | { type: USER_TYPES.COMPLETE_PROFILE; payload: UserResponseInterface }
  | { type: USER_TYPES.LOAD_FROM_STORE; payload: UserStoredProfileInterface }
  | { type: USER_TYPES.ERROR; payload: any }
  | { type: USER_TYPES.LOGOUT }
  | { type: USER_TYPES.UPDATE_PROFILE; payload: UserResponseInterface };
