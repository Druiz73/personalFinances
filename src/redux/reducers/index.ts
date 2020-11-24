import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';
import { CategoryReducer } from './categoryReducer';
import { CurrencyReducer } from './currencyReducer';
import { ClientReducer } from './clientReducer';


const rootReducer = combineReducers({
  userReducer: UserReducer,
  categoryReducer: CategoryReducer,
  CurrencyReducer: CurrencyReducer,
  ClientReducer: ClientReducer
  //some more reducer will come
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
