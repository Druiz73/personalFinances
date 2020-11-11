export interface Category {
  id: string;
  category: string;
  message:string;
}

// action strings
export const ADD_CATEGORY = "ADD_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ERROR_CATEGORIES = "ERROR_CATEGORIES";

export interface GetCategoryAction {
type: typeof GET_CATEGORIES;
categories: Category[];
}
export interface ErrorCategoryAction {
  type: typeof ERROR_CATEGORIES;
  message: Category;
  }

export interface EditCategoryAction {
type: typeof EDIT_CATEGORY;
category: Category;
}

export interface RemoveCategoryAction {
type: typeof REMOVE_CATEGORY;
id: string;
}

export interface AddCategoryAction {
type: typeof ADD_CATEGORY;
category: Category;
}

export type CategoryActionTypes =
| GetCategoryAction
| EditCategoryAction
| RemoveCategoryAction
| AddCategoryAction
| ErrorCategoryAction

