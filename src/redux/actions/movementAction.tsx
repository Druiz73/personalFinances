import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL, Paths } from '../../utils';
import {
    ERROR_MOVEMENTS,
    ADD_MOVEMENT,
    REMOVE_MOVEMENT,
    EDIT_MOVEMENT,
    GET_MOVEMENTS,
    GETBYID_MOVEMENT
} from '../types/movements';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { nanoid } from 'nanoid/non-secure'


export interface MovementState {
    id: string,
    type: string,
    category: string,
    date: number,
    amount: number,
    currency: string,
    accounts: [],
    transactions: []
}

export interface getMovements {
    type: typeof GET_MOVEMENTS;
    transactions: MovementState[],
    loading: boolean,
    message: string
}

export interface errorMovements {
    type: typeof ERROR_MOVEMENTS;
    payload: any,
    loading: boolean
}

export type movementAction = getMovements | errorMovements;

export const startGetMovement = (): ThunkAction<void, RootState, null, movementAction> => {
    return async function (dispatch: Dispatch<movementAction>) {
        const response = await axios.get<getMovements>(`${BASE_URL}${Paths.MOVEMENTS}`).then((movement) => {
            dispatch({
                type: 'GET_MOVEMENTS',
                transactions: movement.data.transactions,
                loading: true,
                message: ''
            })
        }).catch(error => {
            dispatch({
                type: 'ERROR_MOVEMENTS',
                payload: error,
                loading: false
            })
        })
    };
};