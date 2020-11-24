import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL, Paths } from '../../utils';
import { ON_LOGIN, ON_ERROR } from '../types/auth'
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..'
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    console.log("error creando storage", e)
  }
}

export interface UserModel {
  token: String;
  message: String;
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
    const response = await axios.post(`${BASE_URL}${Paths.LOGIN}`, {
      "user": email,
      "password": password,
    }).then(user => {
      dispatch({
        type: ON_LOGIN,
        payload: { token: user.data.token, message: user.data.message }
      });
      storeData(user.data.token)
    }).catch(Error => {
      dispatch({
        type: ON_LOGIN,
        payload: Error,
      });
    })
  };
};
