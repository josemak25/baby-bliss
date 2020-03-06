import {
  SCREEN_GRID_TYPES,
  ScreenGridStateInterface,
  ScreenGridAction
} from './types';

export const gridInitialState: ScreenGridStateInterface = {
  cardSize: 320,
  numOfColumn: 1
};

export default function ScreenGridSizeReducer(
  state = gridInitialState,
  action: ScreenGridAction
) {
  switch (action.type) {
    case SCREEN_GRID_TYPES.SET_PHONE_GRID: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}
