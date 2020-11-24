import { currencyState, currencyAction } from '../actions/currencyAction'

type Currency = {
    currency: currencyState;
    message: string,
    id: string,
    abreviature: string,
    currencies: currenciesState[],
    loading: Boolean,
    name: string
};

const initialState = {
    currency: {} as currencyState,
    message: '',
    id: '',
    currencies: [],
    loading: false,
    name: '',
    abreviature: ''
};

interface currenciesState {
    name: string,
    abreviature: string,
    id: string
}


const CurrencyReducer = (state: Currency = initialState, action: currencyAction): Currency => {
    switch (action.type) {
        case "ADD_CURRENCY":
            const newCurrency = { name: action.name, id: action.id, abreviature: action.abreviature };
            const updatedCurrencies = [...state.currencies, newCurrency];
            return {
                ...state,
                loading: true,
                message: action.payload.message,
                currencies: updatedCurrencies
            };
        case "REMOVE_CURRENCY":
            const filteredCurrencies = state.currencies.filter(Currency => Currency.id !== action.id);
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                currencies: filteredCurrencies
            };
        // case "EDIT_Currency":
        //   return {
        //     ...state,
        //     loading: false,
        //     Currency: action.payload.Currency,
        //     message: action.payload.message
        //   };
        case "GET_CURRENCIES":
            return {
                ...state,
                loading: false,
                currencies: action.payload,
                message: action.message
            };
        case "ERROR_CURRENCIES":
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
};

export { CurrencyReducer };
