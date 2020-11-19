import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL, Paths } from '../../utils';
import {
    ERROR_CATEGORIES,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    EDIT_CATEGORY,
    GET_CATEGORIES
} from '../types/category';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';


export interface categoryState {
    message: String,
    name: String,
    category: String,
    id: string,
    categories: categoryState[]
}

export interface errorCategory {
    type: typeof ERROR_CATEGORIES;
    payload: any,
    loading: boolean
}

export interface addCategory {
    type: typeof ADD_CATEGORY;
    payload: categoryState,
    loading: boolean
}

export interface removeCategory {
    type: typeof REMOVE_CATEGORY;
    payload: any,
    loading: boolean
}

export interface editCategory {
    type: typeof EDIT_CATEGORY;
    payload: categoryState,
    loading: boolean
}

export interface getCategories {
    type: typeof GET_CATEGORIES;
    payload: categoryState[],
    loading: boolean
}

export type categoryAction = addCategory | errorCategory | getCategories | editCategory | removeCategory


export const startAddCategory = async (category: Object) => {
    return async (dispatch: Dispatch<categoryAction>) => {
        try {
            const response = await axios.post(`${BASE_URL}categories`, category)
            if (!response) {
                dispatch({
                    type: 'ERROR_CATEGORIES',
                    payload: response,
                    loading: true
                });
            } else {
                dispatch({
                    type: 'ADD_CATEGORY',
                    payload: response.data,
                    loading: true
                });
                startGetCategory();
            }
        } catch (error) {
            dispatch({
                type: 'ERROR_CATEGORIES',
                payload: error,
                loading: true
            });
        }
    }
}

export const startRemoveCategory = async (id: string) => {
    return async (dispatch: Dispatch<removeCategory>) => {
        const response = await axios.post<categoryState>(`${BASE_URL}${Paths.DELETE_CATEGORY}`)
        dispatch({
            type: 'REMOVE_CATEGORY',
            payload: response,
            loading: true
        })
    };
};

export const startEditCategory = async (id: string) => {
    return async (dispatch: Dispatch<editCategory>) => {
        const response = await axios.post<categoryState>(`${BASE_URL}${Paths.UPDATE_CATEGORY}/${id}`)
        dispatch({
            type: 'EDIT_CATEGORY',
            payload: response.data,
            loading: true
        })
    };
};

export const startGetCategory = (): ThunkAction<void, RootState, null, categoryAction> => {
    return async function (dispatch: Dispatch<categoryAction>) {
        const response = await axios.get<categoryState>(`${BASE_URL}${Paths.CATEGORIES}`).then((categories) => {
            dispatch({
                type: 'GET_CATEGORIES',
                payload: categories.data.categories,
                loading: true
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