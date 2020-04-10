import { createContext } from 'react';

// all reducers on store
import { postInitialState } from './posts/reducer';
import { userInitialState } from './user/reducer';
import { gridInitialState } from './grid/reducer';
import { categoryInitialState } from './category/reducer';
import { interestInitialState } from './interest/reducer';
import { connectionInitialState } from './connection/reducer';

// all reducers initial state interface
import { UserInitialState } from './user/types';
import { ScreenGridStateInterface } from './grid/types';
import { PostInitialState } from './posts/types';
import { CategoryInitialState } from './category/types';
import { InterestInitialState } from './interest/types';
import { ConnectionStateInterface } from './connection/types';

// We define our type for the context properties right here
interface ContextProps {
  store: {
    userState: UserInitialState;
    postState: PostInitialState;
    categoryState: CategoryInitialState;
    interestState: InterestInitialState;
    grid: ScreenGridStateInterface;
    connectionState: ConnectionStateInterface;
  };
  dispatch?: any;
}

const StoreContext = createContext<ContextProps>({
  store: {
    userState: userInitialState,
    postState: postInitialState,
    categoryState: categoryInitialState,
    interestState: interestInitialState,
    grid: gridInitialState,
    connectionState: connectionInitialState
  }
});

export default StoreContext;
