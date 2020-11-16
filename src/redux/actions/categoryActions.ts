import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL } from '../../utils';


export interface categoryState {
    message: String,
    category: String,
    id: String,
    categories: categoryState[]
}

export interface errorCategory {
    readonly type: 'ERROR_CATEGORIES';
    payload: any,
    loading: boolean
}

export interface addCategory {
    readonly type: 'ADD_CATEGORY';
    payload: categoryState,
    loading: boolean
}

export interface removeCategory {
    readonly type: 'REMOVE_CATEGORY';
    payload: any,
    loading: boolean
}

export interface editCategory {
    readonly type: 'EDIT_CATEGORY';
    payload: categoryState,
    loading: boolean
}

export interface getCategories {
    readonly type: 'GET_CATEGORIES';
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
        const response = await axios.post<categoryState>(`${BASE_URL}categories/${id}`)
        dispatch({
            type: 'REMOVE_CATEGORY',
            payload: response,
            loading: true
        })
    };
};

export const startEditCategory = async (id: string) => {
    return async (dispatch: Dispatch<editCategory>) => {
        const response = await axios.post<categoryState>(`${BASE_URL}categories/${id}`)
        dispatch({
            type: 'EDIT_CATEGORY',
            payload: response.data,
            loading: true
        })
    };
};

export const startGetCategory = async () => {
    return async (dispatch: Dispatch<getCategories>) => {
        const response = await axios.post<categoryState[]>(`${BASE_URL}categories`)
        dispatch({
            type: 'GET_CATEGORIES',
            payload: response.data,
            loading: true
        })
    };
};