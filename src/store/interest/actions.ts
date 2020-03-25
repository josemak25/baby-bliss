import {
  INTEREST_TYPES,
  InterestStateInterface,
  InterestAction,
  InterestInterface,
  InterestResponseInterface
} from './types';

import API from '../../lib/api';

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
      return dispatch(getUserInterestSuccess(response.payload));
    }
    dispatch(getUserInterestError(response.message));
  } catch (error) {
    dispatch(getUserInterestError(error));
  }
}
