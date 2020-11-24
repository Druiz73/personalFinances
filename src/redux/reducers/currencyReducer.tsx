import {  currencyAction } from '../actions/currencyAction'

type Currency = {
    currency: Object;
    message: string,
    id: string,
    abreviature: string,
    currencies: currenciesState[],
    loading: Boolean,
    name: string
};

const initialState = {
    currency: { name: '', id: '', abreviature: '' } as currenciesState,
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
        case "EDIT_CURRENCY":
            state.currencies.map((value, index) => {
                if (action.currency.id === value.id) {
                    state.currencies.splice(index, 1, action.currency)
                }
            })
            return {
                ...state,
                loading: true,
            };
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
        case "GETBYID_CURRENCY":
            return {
                ...state,
                currency: {
                    ...action.currency
                },
                loading: false
            };
        default:
            return state;
    }
};

export { CurrencyReducer };
