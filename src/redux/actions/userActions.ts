import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL } from '../../utils';
import { ON_LOGIN, ON_ERROR } from '../types/auth'
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..'

export interface UserModel {
  userName: string;
  token: string;
}

export interface LoginAction {
  type: typeof ON_LOGIN;
  payload: UserModel;
}

export interface ErrorAction {
  type: typeof ON_ERROR;
  payload: any;
}

export type UserAction = LoginAction | ErrorAction;

// we need to dispatch action
export const onLogin = (email: string, password: string): ThunkAction<void, RootState, null, UserAction> => {
  return async function (dispatch: Dispatch<LoginAction>) {
    const response = await axios.post(`${BASE_URL}/auth/local`, {
      "identifier": email,
      "password": password,
    }).then(user => {
      dispatch({
        type: ON_LOGIN,
        payload: { token: user.data.jwt, userName: user.data.user.username }
      });
    }
    ).catch(Error => {
      dispatch({
        type: ON_LOGIN,
        payload: Error,
      });
    })
  };
};
