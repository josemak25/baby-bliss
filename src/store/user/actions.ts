import { USER_TYPES, UserAction } from './types';

const registrationStarted = () => ({ type: USER_TYPES.REGISTER_USER_STARTED });

const registrationSuccess = (payload: any) => ({
  type: USER_TYPES.REGISTER_USER_SUCCESS,
  payload
});

const registrationError = (error: string) => ({
  type: USER_TYPES.REGISTER_USER_ERROR,
  payload: error
});

const loginStarted = () => ({ type: USER_TYPES.LOGIN_USER_STARTED });

const loginSuccess = (payload: any) => ({
  type: USER_TYPES.LOGIN_USER_SUCCESS,
  payload
});

const loginError = (error: string) => ({
  type: USER_TYPES.LOGIN_USER_ERROR,
  payload: error
});

export default function userActions() {
  return (dispatch: any) => {
    // To unsubscribe to these update, just use the functions:
  };
}
