import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';
import { CategoryReducer } from './categoryReducer';

  const rootReducer = combineReducers({
    userReducer: UserReducer,
    categoryReducer: CategoryReducer
    //some more reducer will come
  });

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
