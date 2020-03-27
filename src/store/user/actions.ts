import API from '../../lib/api';

import {
  USER_TYPES,
  UserAction,
  UserResponseInterface,
  USER_ACTION_TYPES
} from './types';
import { CONNECTION_TYPES } from '../connection/types';

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

const forgotPasswordSuccess = (): UserAction => {
  return {
    type: USER_TYPES.FORGOT_PASSWORD
  };
};

const onError = (error: string): UserAction => ({
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
            dispatch({ type: CONNECTION_TYPES.YES_CONNECTION });
            return dispatch(loginSuccess(response));
          }

          dispatch(onError(response.message));
        } catch (error) {
          if (error.message === 'Network request failed') {
            dispatch({ type: CONNECTION_TYPES.NO_CONNECTION });
          }
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
            dispatch({ type: CONNECTION_TYPES.YES_CONNECTION });
            return dispatch(registrationSuccess(response));
          }
          dispatch(onError(response.message));
        } catch (error) {
          if (error.message === 'Network request failed') {
            dispatch({ type: CONNECTION_TYPES.NO_CONNECTION });
          }
          dispatch(onError(error));
        }
        break;

      case USER_ACTION_TYPES.COMPLETE_PROFILE:
        try {
          dispatch(actionStarted());
          const { id, token, ...rest } = payload;

          const request = await API.put({
            path: `/users/profile-setup/${id}`,
            payload: rest.payload,
            authToken: token
          });

          const response: UserResponseInterface = await request.json();

          if (response.statusCode === 200) {
            dispatch({ type: CONNECTION_TYPES.YES_CONNECTION });
            return dispatch(profileSetupSuccess(response));
          }

          dispatch(onError(response.message));
        } catch (error) {
          if (error.message === 'Network request failed') {
            dispatch({ type: CONNECTION_TYPES.NO_CONNECTION });
          }
          dispatch(onError(error));
        }
        break;

      case USER_ACTION_TYPES.UPDATE_PROFILE:
        try {
          dispatch(actionStarted());

          const { id, token, ...rest } = payload;

          const request = await API.put({
            path: `/users/${id}`,
            payload: rest.payload,
            authToken: token
          });

          const response: UserResponseInterface = await request.json();

          if (response.statusCode === 200) {
            dispatch({ type: CONNECTION_TYPES.YES_CONNECTION });
            return dispatch(profileSetupSuccess(response));
          }

          dispatch(onError(response.message));
        } catch (error) {
          if (error.message === 'Network request failed') {
            dispatch({ type: CONNECTION_TYPES.NO_CONNECTION });
          }
          dispatch(onError(error));
        }
        break;

      case USER_ACTION_TYPES.FORGOT_PASSWORD:
        try {
          dispatch(actionStarted());

          const request = await API.post({
            path: '/auth/forgot-password',
            payload,
            authToken: null
          });
          const response: {
            statusCode: number;
            message: string;
          } = await request.json();

          if (response.statusCode === 200) {
            dispatch({ type: CONNECTION_TYPES.YES_CONNECTION });
            return dispatch(forgotPasswordSuccess());
          }
          dispatch(onError(response.message));
        } catch (error) {
          if (error.message === 'Network request failed') {
            dispatch({ type: CONNECTION_TYPES.NO_CONNECTION });
          }
          dispatch(onError(error));
        }
        break;
      default:
        break;
    }
  };
}
