import { categoryAction, categoryState } from '../actions/categoryActions'


type Category = {
  category: categoryState;
  message: String,
  id: String,
  categories: categoryState[],
  loading: Boolean
};

const initialState = {
  category: {} as categoryState,
  message: '',
  id: '',
  categories: [],
  loading: false
};


const CategoryReducer = (state: Category = initialState, action: categoryAction): Category => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        loading: true
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        loading: false,
        message: action.payload
      };
    // case "EDIT_CATEGORY":
    //   return {
    //     ...state,
    //     loading: false,
    //     category: action.payload.category,
    //     message: action.payload.message
    //   };
    case "GET_CATEGORIES":
      return {
        ...state,
        loading: false,
        categories: action.payload
      };
    case "ERROR_CATEGORIES":
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export { CategoryReducer };
