/*
 **************************************************************
 ******************* CONNECTION TYPES ************************
 **************************************************************
 */

// CONNECTION ACTION TYPES
export enum CONNECTION_TYPES {
  NO_CONNECTION = 'NO_CONNECTION',
  YES_CONNECTION = 'YES_CONNECTION'
}

// CONNECTION TYPES
export type connectionStateInterface = {
  isConnected: boolean;
};

export type ConnectionAction =
  | { type: CONNECTION_TYPES.NO_CONNECTION }
  | { type: CONNECTION_TYPES.YES_CONNECTION };
