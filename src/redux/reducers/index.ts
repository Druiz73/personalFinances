import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';
import { CategoryReducer } from './categoryReducer';
import { CurrencyReducer } from './currencyReducer';
import { ClientReducer } from './clientReducer';
import { MovementsReducer } from './movementReducer';


const rootReducer = combineReducers({
  userReducer: UserReducer,
  categoryReducer: CategoryReducer,
  CurrencyReducer: CurrencyReducer,
  ClientReducer: ClientReducer,
  MovementsReducer: MovementsReducer
  //some more reducer will come
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
