import React, {
  createContext,
  useReducer,
  FunctionComponent,
  useContext
} from 'react';

import postsReducer, { postInitialState } from './posts/reducer';
import userReducer, { userInitialState } from './user/reducer';
import gridSizeReducer, { gridInitialState } from './grid/reducer';
import postCategoryReducer, { categoryInitialState } from './category/reducer';
import useCombinedReducers from '../lib/useCombineReducer';

const StoreContext = createContext(null);

const StoreProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useCombinedReducers({
    userState: useReducer(userReducer, userInitialState),
    postState: useReducer(postsReducer, postInitialState),
    grid: useReducer(gridSizeReducer, gridInitialState),
    categoryState: useReducer(postCategoryReducer, categoryInitialState)
  });

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };
