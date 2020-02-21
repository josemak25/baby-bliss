import { USER_TYPES, UserInitialState, UserAction } from './types';

export const userInitialState: UserInitialState = {
  isLoading: false,
  error: null,
  token: null,
  user: {}
};

export default function userReducer(
  state = userInitialState,
  action: UserAction
) {
  switch (action.type) {
    case USER_TYPES.REGISTER_USER_STARTED:
    case USER_TYPES.LOGIN_USER_STARTED: {
      return { ...state, isLoading: true };
    }

    case USER_TYPES.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        token: action.payload
      };
    }

    case USER_TYPES.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token
      };
    }

    case USER_TYPES.REGISTER_USER_ERROR:
    case USER_TYPES.LOGIN_USER_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
