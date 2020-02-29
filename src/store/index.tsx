import React, {
  createContext,
  useReducer,
  FunctionComponent,
  useContext
} from 'react';

import useCombinedReducers from '../utils/useCombinedReducers';

import postsReducer, { postInitialState } from './posts/reducer';
import userReducer, { userInitialState } from './user/reducer';

const StoreContext = createContext(null);

const StoreProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useCombinedReducers({
    user: useReducer(userReducer, userInitialState),
    posts: useReducer(postsReducer, postInitialState)
  });

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };
