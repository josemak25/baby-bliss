import { USER_TYPES, UserInitialState, UserAction } from './types';

export const userInitialState: UserInitialState = {
  isLoading: false,
  errorMessage: null,
  user: {
    id: '',
    name: '',
    username: '',
    email: '',
    mobileNumber: '',
    address: '',
    avatar: '',
    userInterest: [''],
    createdAt: null,
    isModerator: false,
    isApproved: false,
    deleted: false,
    state: '',
    dueDateStart: null,
    dueDateEnd: null,
    hasBirthHospital: false,
    hasHealthMaintenanceOrg: false,
    hasInterestInAntenatalServices: false,
    isAdmin: false
  },
  token: null
};

export default function userReducer(
  state = userInitialState,
  action: UserAction
) {
  switch (action.type) {
    case USER_TYPES.LOGIN_USER_STARTED:
      return { ...state, isLoading: true };

    case USER_TYPES.LOGIN_USER_SUCCESS:
    case USER_TYPES.REGISTER_USER_SUCCESS:
    case USER_TYPES.LOAD_FROM_STORE: {
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        user: action.payload.payload,
        token: action.payload.token
      };
    }

    case USER_TYPES.REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message
      };
    }
    case USER_TYPES.LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message
      };
    }

    default:
      return state;
  }
}
