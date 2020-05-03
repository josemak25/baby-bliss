import {
  ConnectionStateInterface,
  CONNECTION_TYPES,
  ConnectionAction
} from './types';

export const connectionInitialState: ConnectionStateInterface = {
  isConnected: true
};

export default function ScreenGridSizeReducer(
  state = connectionInitialState,
  action: ConnectionAction
) {
  switch (action.type) {
    case CONNECTION_TYPES.NO_CONNECTION: {
      return { ...state, isConnected: false };
    }
    case CONNECTION_TYPES.YES_CONNECTION: {
      return { ...state, isConnected: true };
    }
    default:
      return state;
  }
}
