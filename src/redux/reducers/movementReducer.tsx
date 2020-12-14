import { movementAction } from '../actions/movementAction';

type Movement = {
    movement: Object;
    id: string,
    type: string,
    category: string,
    date: number,
    amount: number,
    currency: string,
    transactions: movementState[]
};

const initialState = {
    movement: {} as movementState,
    error: undefined,
    id: '',
    type: '',
    category: '',
    date: Date.now(),
    amount: 0,
    currency: '',
    transactions: []
};

interface movementState {
    id: string,
    type: string,
    category: string,
    date: number,
    amount: number,
    currency: string,
}

const MovementsReducer = (state: Movement = initialState, action: movementAction): Movement => {
    switch (action.type) {
        case 'GET_MOVEMENTS':
            return {
                ...state,
                transactions: action.transactions
            };
        default:
            return state;
    }
};

export { MovementsReducer };
