import React, { useReducer, FunctionComponent, useContext } from 'react';

import StoreContext from './types';
import useCombinedReducers from '../libs/useCombineReducer';

import postsReducer, { postInitialState } from './posts/reducer';
import userReducer, { userInitialState } from './user/reducer';
import gridSizeReducer, { gridInitialState } from './grid/reducer';
import postCategoryReducer, { categoryInitialState } from './category/reducer';
import interestReducer, { interestInitialState } from './interest/reducer';
import connectionReducer, {
  connectionInitialState
} from './connection/reducer';

const StoreContext = createContext(null);

const StoreProvider: FunctionComponent = ({ children }) => {
  const [store, dispatch] = useCombinedReducers({
    userState: useReducer(userReducer, userInitialState),
    postState: useReducer(postsReducer, postInitialState),
    grid: useReducer(gridSizeReducer, gridInitialState),
    categoryState: useReducer(postCategoryReducer, categoryInitialState),
    interestState: useReducer(interestReducer, interestInitialState),
    connectionState: useReducer(connectionReducer, connectionInitialState)
  });

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };
