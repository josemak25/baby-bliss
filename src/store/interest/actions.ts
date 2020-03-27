import {
  INTEREST_TYPES,
  InterestAction,
  InterestInterface,
  InterestResponseInterface
} from './types';

import API from '../../lib/api';
import { CONNECTION_TYPES } from '../connection/types';

const getUserInterestStarted = () => ({
  type: INTEREST_TYPES.SET_INTEREST_STARTED
});

const getUserInterestSuccess = (
  payload: InterestInterface[]
): InterestAction => ({
  type: INTEREST_TYPES.SET_INTEREST_SUCCESSES,
  payload
});

const getUserInterestError = (payload: any): InterestAction => ({
  type: INTEREST_TYPES.SET_INTEREST_ERROR,
  payload
});

export default async function userInterestActions(dispatch: any) {
  // Set mobile screen size to state:
  dispatch(getUserInterestStarted);

  try {
    const request = await API.get('/interests', 'null', '');
    const response: InterestResponseInterface = await request.json();
    if (response.statusCode === 200) {
      dispatch({ type: CONNECTION_TYPES.YES_CONNECTION });
      return dispatch(getUserInterestSuccess(response.payload));
    }
    dispatch(getUserInterestError(response.message));
  } catch (error) {
    if (error.message === 'Network request failed') {
      dispatch({ type: CONNECTION_TYPES.NO_CONNECTION });
    }
    dispatch(getUserInterestError(error));
  }
}
