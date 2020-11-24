import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL, Paths } from '../../utils';
import {
    ERROR_CLIENTS,
    ADD_CLIENT,
    REMOVE_CLIENT,
    EDIT_CLIENT,
    GET_CLIENTS,
    GETBYID_CLIENTS
} from '../types/client';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { nanoid } from 'nanoid/non-secure'


export interface ClientState {
    message: string,
    name: string,
    id: string,
    email: string,
    date_of_birth: number,
    clients: []
}

export interface errorClient {
    type: typeof ERROR_CLIENTS;
    payload: any,
    loading: boolean
}

export interface addClient {
    type: typeof ADD_CLIENT;
    payload: any,
    name: string,
    id: string,
    message: string,
    email: string,
    date_of_birth: number
}

export interface removeClient {
    type: typeof REMOVE_CLIENT;
    payload: any,
    loading: boolean,
    id: string
}

export interface editClient {
    type: typeof EDIT_CLIENT;
    payload: any,
    loading: boolean,
    client: {
        name: string,
        email: string,
        id: string,
        date_of_birth: number,
    }
}

export interface getClients {
    type: typeof GET_CLIENTS;
    payload: ClientState[],
    loading: boolean,
    message: string
}


export interface getClientsById {
    type: typeof GETBYID_CLIENTS;
    client: {
        name: string,
        email: string,
        id: string,
        date_of_birth: number,
    }
    loading: boolean,
    message: string
}

export type ClientAction = addClient | errorClient | getClients | editClient | removeClient | getClientsById


export const startAddClient = (client: string, email: string, date_of_birth: number): ThunkAction<void, RootState, null, ClientAction> => {
    let id = nanoid();

    return async (dispatch: Dispatch<ClientAction>) => {
        const response = await axios.post<addClient>(`${BASE_URL}${Paths.CREATE_CLIENT}`, { name: client, email: email, date_of_birth: date_of_birth, id: id })
            .then(response => {
                dispatch({
                    type: 'ADD_CLIENT',
                    payload: response.data,
                    message: response.data.message,
                    name: client,
                    id: id,
                    email: email,
                    date_of_birth: date_of_birth
                });
                startGetClient();
            }).catch((error) => {
                dispatch({
                    type: 'ERROR_CLIENTS',
                    payload: error,
                    loading: true,
                });
            })
    }
}

export const startRemoveClient = (id: string): ThunkAction<void, RootState, null, ClientAction> => {
    return async (dispatch: Dispatch<ClientAction>) => {
        const response = await axios.delete<removeClient>(`${BASE_URL}${Paths.DELETE_CLIENT}`)
            .then(response => {
                dispatch({
                    type: 'REMOVE_CLIENT',
                    payload: response,
                    id: id,
                    loading: true
                })
            }).catch(error => {
                dispatch({
                    type: 'ERROR_CLIENTS',
                    payload: error,
                    loading: true
                })
            })
    };
};

export const startEditClient = (id: string, name: string, email: string, date: number): ThunkAction<void, RootState, null, ClientAction> => {
    return async function (dispatch: Dispatch<ClientAction>) {
        const response = await axios.put<editClient>(`${BASE_URL}${Paths.UPDATE_CLIENT}`)
            .then(data => {
                dispatch({
                    type: 'EDIT_CLIENT',
                    payload: data.data,
                    loading: true,
                    client: { id: id, name: name, email: email, date_of_birth: date }
                })
                startGetClient()
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_CLIENTS',
                    payload: error,
                    loading: false
                })
            })

    };
};

export const startGetClient = (): ThunkAction<void, RootState, null, ClientAction> => {
    return async function (dispatch: Dispatch<ClientAction>) {
        const response = await axios.get<ClientState>(`${BASE_URL}${Paths.CLIENTS}`).then((client) => {
            dispatch({
                type: 'GET_CLIENTS',
                payload: client.data.clients,
                loading: true,
                message: ''
            })
        }).catch(error => {
            dispatch({
                type: 'ERROR_CLIENTS',
                payload: error,
                loading: false
            })
        })

    };
};


export const getClientById = (name: string, email: string, id: string, date_of_birth: number): ThunkAction<void, RootState, null, ClientAction> => {
    return async function (dispatch: Dispatch<getClientsById>) {
        dispatch({
            type: 'GETBYID_CLIENTS',
            client: {
                name: name,
                email: email,
                id: id,
                date_of_birth: date_of_birth,
            },
            loading: true,
            message: ''
        })
    }
}