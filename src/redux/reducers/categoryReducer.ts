import { categoryAction, categoryState } from '../actions/categoryActions'

type Category = {
  category: Object;
  message: string,
  id: string,
  categories: categoriesState[],
  loading: Boolean,
  name: string
};

const initialState = {
  category: { name: '', id: '' } as categoriesState,
  message: '',
  id: '',
  categories: [],
  loading: false,
  name: ''
};

interface categoriesState {
  name: string,
  id: string
}


const CategoryReducer = (state: Category = initialState, action: categoryAction): Category => {
  switch (action.type) {
    case "ADD_CATEGORY":
      const newCat = { name: action.name, id: action.id };
      const updatedCategories = [...state.categories, newCat];
      return {
        ...state,
        loading: true,
        message: action.payload.message,
        categories: updatedCategories
      };
    case "REMOVE_CATEGORY":
      const filteredCategories = state.categories.filter(category => category.id !== action.id);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        categories: filteredCategories
      };
    case "EDIT_CATEGORY":
      state.categories.map((value, index) => {
        if (action.category.id === value.id) {
          state.categories.splice(index, 1, action.category)
        }
      })
      return {
        ...state,
        loading: true,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        loading: false,
        categories: action.payload,
        message: action.message
      };
    case "ERROR_CATEGORIES":
      return {
        ...state,
        message: action.payload
      };
    case "GETBYID_CATEGORY":
      return {
        ...state,
        category: {
          ...action.category
        },
        loading: false
      };
    default:
      return state;
  }
};

export { CategoryReducer };
