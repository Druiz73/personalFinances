import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL } from '../../utils';
import {
    Category,
    CategoryActionTypes,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    EDIT_CATEGORY,
    GET_CATEGORIES,
    ERROR_CATEGORIES
} from "../types/category";

export const errorCategory = (message: Category): CategoryActionTypes => ({
    type: ERROR_CATEGORIES,
    message
});

export const addCategory = (category: Category): CategoryActionTypes => ({
    type: ADD_CATEGORY,
    category
});

export const removeCategory = (id: string): CategoryActionTypes => ({
    type: REMOVE_CATEGORY,
    id
});

export const editCategory = (category: Category): CategoryActionTypes => ({
    type: EDIT_CATEGORY,
    category
});

export const getCategories = (categories: Category[]): CategoryActionTypes => ({
    type: GET_CATEGORIES,
    categories
});

export const startAddCategory = async (category: Category) => {
    return async (dispatch: Dispatch<CategoryActionTypes>) => {
        try {
            const response = await axios.post<Category>(`${BASE_URL}mock-login`, category)
            if (!response) {
                dispatch({
                    type: 'ERROR_CATEGORIES',
                    message: response
                });
            } else {
                dispatch({
                    type: 'ADD_CATEGORY',
                    category: response.data
                });
            }
        } catch (error) {
            dispatch({
                type: 'ERROR_CATEGORIES',
                message: error
            });
        }
    }

}




export const startRemoveCategory = (id: string) => {
    return (dispatch: Dispatch<CategoryActionTypes>, getState: () => CategoryActionTypes) => {
        dispatch(removeCategory(id));
    };
};

export const startEditCategory = (category: Category) => {
    return (dispatch: Dispatch<CategoryActionTypes>, getState: () => CategoryActionTypes) => {
        dispatch(editCategory(category));
    };
};

export const startSetExpenses = (categories: Category[]) => {
    return (dispatch: Dispatch<CategoryActionTypes>, getState: () => CategoryActionTypes) => {
        dispatch(getCategories(categories));
    };
};