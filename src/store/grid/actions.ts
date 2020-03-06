import {
  SCREEN_GRID_TYPES,
  ScreenGridStateInterface,
  ScreenGridAction
} from './types';

const setScreenGridSize = (
  payload: ScreenGridStateInterface
): ScreenGridAction => ({
  type: SCREEN_GRID_TYPES.SET_PHONE_GRID,
  payload
});

export default function ScreenGridSizeActions(
  dispatch: any,
  payload: ScreenGridStateInterface
) {
  // Set mobile screen size to state:
  dispatch(setScreenGridSize(payload));
}
