/*
 **************************************************************
 ******************* SCREEN GRID TYPES ************************
 **************************************************************
 */

//  INTEREST ACTION TYPE
export enum INTEREST_TYPES {
  SET_INTEREST_STARTED = 'SET_INTEREST_STARTED',
  SET_INTEREST_ERROR = 'SET_INTEREST_ERROR',
  SET_INTEREST_SUCCESSES = 'SET_INTEREST_SUCCESSES'
}

//  INTEREST INTERFACE TYPE
export interface InterestInterface {
  _id: string;
  title: string;
  createdAt: Date;
  __v: number;
  id: string;
}

//  INTEREST RESPONSE TYPE
export interface InterestResponseInterface {
  statusCode: number;
  message: string;
  payload: InterestInterface[];
  error?: any;
}

//  INTEREST STATE TYPE
export type InterestStateInterface = {
  isLoading: boolean;
  error: string | null;
  interests: InterestInterface[];
};

//  INTEREST ACTIONS TYPE
export type InterestAction =
  | {
      type: INTEREST_TYPES.SET_INTEREST_SUCCESSES;
      payload: InterestInterface[];
    }
  | {
      type: INTEREST_TYPES.SET_INTEREST_STARTED;
      payload: null;
    }
  | {
      type: INTEREST_TYPES.SET_INTEREST_ERROR;
      payload: any;
    };
