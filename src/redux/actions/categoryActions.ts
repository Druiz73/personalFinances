import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL, Paths } from '../../utils';
import {
    ERROR_CATEGORIES,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    EDIT_CATEGORY,
    GET_CATEGORIES,
    GETBYID_CATEGORY
} from '../types/category';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { nanoid } from 'nanoid/non-secure'


export interface categoryState {
    message: string,
    name: string,
    category: string,
    id: string,
    categories: []
}

export interface errorCategory {
    type: typeof ERROR_CATEGORIES;
    payload: any,
    loading: boolean
}

export interface addCategory {
    type: typeof ADD_CATEGORY;
    payload: any,
    name: string,
    id: string,
    message: string
}

export interface removeCategory {
    type: typeof REMOVE_CATEGORY;
    payload: any,
    loading: boolean,
    id: string
}

export interface editCategory {
    type: typeof EDIT_CATEGORY;
    category: {
        name: string,
        id: string,
    },
    loading: boolean
}

export interface getCategories {
    type: typeof GET_CATEGORIES;
    payload: categoryState[],
    loading: boolean,
    message: string
}

export interface getCategoryById {
    type: typeof GETBYID_CATEGORY;
    category: {
        name: string,
        id: string,
    }
    loading: boolean,
    message: string
}

export type categoryAction = addCategory | errorCategory | getCategories | editCategory | removeCategory | getCategoryById


export const startAddCategory = (category: string): ThunkAction<void, RootState, null, categoryAction> => {
    let id = nanoid();

    return async (dispatch: Dispatch<categoryAction>) => {
        const response = await axios.post<addCategory>(`${BASE_URL}${Paths.CREATE_CATEGORY}`, { name: category, id: id })
            .then(response => {
                dispatch({
                    type: 'ADD_CATEGORY',
                    payload: response.data,
                    message: response.data.message,
                    name: category,
                    id: id
                });
                startGetCategory();
            }).catch((error) => {
                dispatch({
                    type: 'ERROR_CATEGORIES',
                    payload: error,
                    loading: true,
                });
            })
    }
}

export const startRemoveCategory = (id: string): ThunkAction<void, RootState, null, categoryAction> => {
    return async (dispatch: Dispatch<categoryAction>) => {
        const response = await axios.post<removeCategory>(`${BASE_URL}${Paths.DELETE_CATEGORY}`, { id: parseInt(id) })
            .then(response => {
                dispatch({
                    type: 'REMOVE_CATEGORY',
                    payload: response.data,
                    id: id,
                    loading: true
                })
            }).catch(error => {
                dispatch({
                    type: 'ERROR_CATEGORIES',
                    payload: error,
                    loading: true
                })
            })
    };
};

export const startEditCategory = (id: string, name: string): ThunkAction<void, RootState, null, categoryAction> => {
    return async function (dispatch: Dispatch<categoryAction>) {
        const response = await axios.put<editCategory>(`${BASE_URL}${Paths.UPDATE_CATEGORY}`)
            .then(data => {
                dispatch({
                    type: 'EDIT_CATEGORY',
                    loading: true,
                    category: { id: id, name: name }
                })
                startGetCategory()
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_CATEGORIES',
                    payload: error,
                    loading: false
                })
            })

    };
};


export const startGetCategory = (): ThunkAction<void, RootState, null, categoryAction> => {
    return async function (dispatch: Dispatch<categoryAction>) {
        const response = await axios.get<categoryState>(`${BASE_URL}${Paths.CATEGORIES}`).then((categories) => {
            dispatch({
                type: 'GET_CATEGORIES',
                payload: categories.data.categories,
                loading: true,
                message: categories.data.message
            })
        }).catch(error => {
            dispatch({
                type: 'ERROR_CATEGORIES',
                payload: error,
                loading: false
            })
        })

    };
};

export const getCategoryById = (id: string, name: string): ThunkAction<void, RootState, null, categoryAction> => {
    return async function (dispatch: Dispatch<getCategoryById>) {
        dispatch({
            type: 'GETBYID_CATEGORY',
            category: {
                name: name,
                id: id,
            },
            loading: true,
            message: ''
        })
    }
}