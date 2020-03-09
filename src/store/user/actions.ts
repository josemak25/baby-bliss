import API from '../../lib/api';

import {
  USER_TYPES,
  UserAction,
  UserResponseInterface,
  USER_ACTION_TYPES
} from './types';

const actionStarted = () => ({ type: USER_TYPES.STARTED });

const registrationSuccess = (payload: UserResponseInterface): UserAction => ({
  type: USER_TYPES.REGISTER_USER_SUCCESS,
  payload
});

const loginSuccess = (payload: UserResponseInterface): UserAction => ({
  type: USER_TYPES.LOGIN_USER_SUCCESS,
  payload
});

const profileSetupSuccess = (payload: UserResponseInterface): UserAction => ({
  type: USER_TYPES.COMPLETE_PROFILE,
  payload
});

const onError = (error: UserResponseInterface): UserAction => ({
  type: USER_TYPES.ERROR,
  payload: error
});

export default function userActions(type: string) {
  return async (dispatch: any, payload: any) => {
    // To unsubscribe to these update, just use the functions:

    switch (type) {
      case USER_ACTION_TYPES.LOGIN_USER:
        try {
          dispatch(actionStarted());
          const request = await API.post({
            path: '/auth/login',
            payload,
            authToken: null
          });
          const response: UserResponseInterface = await request.json();
          if (response.statusCode === 200) {
            return dispatch(loginSuccess(response));
          }
          dispatch(onError(response));
        } catch (error) {
          dispatch(onError(error));
        }
        break;

      case USER_ACTION_TYPES.REGISTER_USER:
        try {
          dispatch(actionStarted());
          const request = await API.post({
            path: '/users',
            payload,
            authToken: null
          });
          const response: UserResponseInterface = await request.json();

          if (response.statusCode === 200) {
            return dispatch(registrationSuccess(response));
          }
          dispatch(onError(response));
        } catch (error) {
          dispatch(onError(error));
        }
        break;

      case USER_ACTION_TYPES.COMPLETE_PROFILE:
        try {
          dispatch(actionStarted());
          console.log('PAYLOAD: ', payload);

          const request = await API.post({
            path: `/users/profile-setup/${payload.id}`,
            payload,
            authToken: null
          });
          const response: UserResponseInterface = await request.json();
          console.log('response', response);

          if (response.statusCode === 200) {
            return dispatch(profileSetupSuccess(response));
          }
          dispatch(onError(response));
        } catch (error) {
          dispatch(onError(error));
        }
        break;
      default:
        break;
    }
  };
}
