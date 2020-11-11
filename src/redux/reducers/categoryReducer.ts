import {
  Category,
  CategoryActionTypes,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES,
  ERROR_CATEGORIES
} from "../types/category";

const categoryReducerDefaultState: Category[] = [];

const CategoryReducer = (
  state = categoryReducerDefaultState,
  action: CategoryActionTypes
): Category[] => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    case REMOVE_CATEGORY:
      return state.filter(({ id }) => id !== action.id);
    case EDIT_CATEGORY:
      return state.map(category => {
        if (category.id === action.category.id) {
          return {
            ...category,
            ...action.category
          };
        } else {
          return category;
        }
      });
    case GET_CATEGORIES:
      return action.categories;
    case ERROR_CATEGORIES:
      return [...state, action.message];
    default:
      return state;
  }
};

export { CategoryReducer };