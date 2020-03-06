/*
 **************************************************************
 ******************* SCREEN GRID TYPES ************************
 **************************************************************
 */

// SCREEN GRID ACTION TYPES
export enum SCREEN_GRID_TYPES {
  GET_PHONE_GRID = 'GET_PHONE_GRID',
  SET_PHONE_GRID = 'SET_PHONE_GRID'
}

// SCREEN GRID TYPES
export type ScreenGridStateInterface = {
  cardSize: number;
  numOfColumn: number;
};

export type ScreenGridAction =
  | {
      type: SCREEN_GRID_TYPES.SET_PHONE_GRID;
      payload: ScreenGridStateInterface;
    }
  | {
      type: SCREEN_GRID_TYPES.GET_PHONE_GRID;
      payload: ScreenGridStateInterface;
    };
