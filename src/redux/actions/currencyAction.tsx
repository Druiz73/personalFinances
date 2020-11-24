import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL, Paths } from '../../utils';
import {
    ERROR_CURRENCIES,
    ADD_CURRENCY,
    REMOVE_CURRENCY,
    EDIT_CURRENCY,
    GET_CURRENCIES,
    GETBYID_CURRENCY
} from '../types/currency';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { nanoid } from 'nanoid/non-secure'



export interface currencyState {
    message: string,
    name: string,
    abreviature: string,
    id: string,
    currencies: [],
}

export interface errorCurrencies {
    type: typeof ERROR_CURRENCIES;
    payload: any,
    loading: boolean
}

export interface addCurrency {
    type: typeof ADD_CURRENCY;
    payload: any,
    name: string,
    id: string,
    message: string,
    abreviature: string
}

export interface removeCurrency {
    type: typeof REMOVE_CURRENCY;
    payload: any,
    loading: boolean,
    id: string
}

export interface editCurrency {
    type: typeof EDIT_CURRENCY;
    currency: {
        name: string,
        id: string,
        abreviature: string
    },
    loading: boolean,
    message: string
}

export interface getCurrencies {
    type: typeof GET_CURRENCIES;
    payload: currencyState[],
    loading: boolean,
    message: string
}

export interface getCurrencyById {
    type: typeof GETBYID_CURRENCY;
    currency: {
        name: string,
        id: string,
        abreviature: string
    }
    loading: boolean,
    message: string
}

export type currencyAction = addCurrency | errorCurrencies | getCurrencies | editCurrency | removeCurrency | getCurrencyById


export const startAddCurrency = (name: string, abreviature: string): ThunkAction<void, RootState, null, currencyAction> => {
    let id = nanoid();

    return async (dispatch: Dispatch<currencyAction>) => {
        const response = await axios.post<addCurrency>(`${BASE_URL}${Paths.CREATE_CURRENCY}`, { name: name, id: id, abreviature: abreviature })
            .then(response => {
                dispatch({
                    type: 'ADD_CURRENCY',
                    payload: response.data,
                    message: response.data.message,
                    abreviature: abreviature,
                    name: name,
                    id: id
                });
                startGetCurrency();
            }).catch((error) => {
                dispatch({
                    type: 'ERROR_CURRENCIES',
                    payload: error,
                    loading: true,
                });
            })
    }
}

export const startRemoveCurrency = (id: string): ThunkAction<void, RootState, null, currencyAction> => {
    return async (dispatch: Dispatch<currencyAction>) => {
        const response = await axios.post<removeCurrency>(`${BASE_URL}${Paths.DELETE_CURRENCY}`, { id: parseInt(id) })
            .then(response => {
                dispatch({
                    type: 'REMOVE_CURRENCY',
                    payload: response.data,
                    id: id,
                    loading: true
                })
            }).catch(error => {
                dispatch({
                    type: 'ERROR_CURRENCIES',
                    payload: error,
                    loading: true
                })
            })
    };
};

export const startEditCurrency = (id: string, name: string, abreviature: string): ThunkAction<void, RootState, null, currencyAction> => {
    return async function (dispatch: Dispatch<currencyAction>) {
        const response = await axios.put<editCurrency>(`${BASE_URL}${Paths.UPDATE_CURRENCY}`)
            .then(currency => {
                dispatch({
                    type: 'EDIT_CURRENCY',
                    loading: true,
                    currency: { id: id, name: name, abreviature: abreviature },
                    message: currency.data.message
                })
                startGetCurrency()
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_CURRENCIES',
                    payload: error,
                    loading: false
                })
            })

    };
};

export const startGetCurrency = (): ThunkAction<void, RootState, null, currencyAction> => {
    return async function (dispatch: Dispatch<currencyAction>) {
        const response = await axios.get<currencyState>(`${BASE_URL}${Paths.CURRENCIES}`).then((currency) => {
            dispatch({
                type: 'GET_CURRENCIES',
                payload: currency.data.currencies,
                loading: true,
                message: ''
            })
        }).catch(error => {
            dispatch({
                type: 'ERROR_CURRENCIES',
                payload: error,
                loading: false
            })
        })

    };
};


export const getCurrencyById = (id: string, name: string, abreviature: string): ThunkAction<void, RootState, null, currencyAction> => {
    return async function (dispatch: Dispatch<getCurrencyById>) {
        dispatch({
            type: 'GETBYID_CURRENCY',
            currency: {
                name: name,
                id: id,
                abreviature: abreviature
            },
            loading: true,
            message: ''
        })
    }
}