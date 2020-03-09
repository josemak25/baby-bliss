import {
  INTEREST_TYPES,
  InterestStateInterface,
  InterestAction
} from './types';

export const interestInitialState: InterestStateInterface = {
  isLoading: false,
  error: null,
  interests: []
};

export default function InterestReducer(
  state = interestInitialState,
  action: InterestAction
) {
  switch (action.type) {
    case INTEREST_TYPES.SET_INTEREST_STARTED: {
      return { ...state, isLoading: true };
    }

    case INTEREST_TYPES.SET_INTEREST_SUCCESSES: {
      return {
        ...state,
        isLoading: false,
        interests: action.payload
      };
    }

    case INTEREST_TYPES.SET_INTEREST_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
}
