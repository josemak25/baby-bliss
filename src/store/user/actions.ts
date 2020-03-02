import {
  USER_TYPES,
  UserAction,
  UserResponseInterface,
  RegistrationRequestType,
  USER_ACTION_TYPES
} from './types';

import API from '../../lib/api';

const registrationStarted = () => ({ type: USER_TYPES.REGISTER_USER_STARTED });

const registrationSuccess = (payload: UserResponseInterface): UserAction => ({
  type: USER_TYPES.REGISTER_USER_SUCCESS,
  payload
});

const registrationError = (errors: UserResponseInterface): UserAction => ({
  type: USER_TYPES.REGISTER_USER_ERROR,
  payload: errors
});

const loginStarted = () => ({ type: USER_TYPES.LOGIN_USER_STARTED });

const loginSuccess = (payload: UserResponseInterface): UserAction => ({
  type: USER_TYPES.LOGIN_USER_SUCCESS,
  payload
});

const loginError = (error: UserResponseInterface): UserAction => ({
  type: USER_TYPES.LOGIN_USER_ERROR,
  payload: error
});

export default function userActions(type: string) {
  type UserLoginType = { username: string; password: string };

  return async (
    dispatch: any,
    payload: UserLoginType | RegistrationRequestType
  ) => {
    // To unsubscribe to these update, just use the functions:

    switch (type) {
      case USER_ACTION_TYPES.LOGIN_USER:
        try {
          dispatch(loginStarted());

          const request = await API.post({
            path: '/auth/login',
            payload
          });

          const response: UserResponseInterface = await request.json();

          if (response.statusCode === 200) {
            return dispatch(loginSuccess(response));
          }

          dispatch(loginError(response));
        } catch (error) {
          dispatch(loginError(error));
        }
        break;

      case USER_ACTION_TYPES.REGISTER_USER:
        try {
          dispatch(registrationStarted());
          const request = await API.post({
            path: '/users',
            payload
          });

          const response: UserResponseInterface = await request.json();

          if (response.statusCode === 200) {
            return dispatch(registrationSuccess(response));
          }
          dispatch(registrationError(response));
        } catch (error) {
          dispatch(registrationError(error));
        }
        break;
      default:
        break;
    }
  };
}
