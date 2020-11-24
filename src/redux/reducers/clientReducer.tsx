import { ClientState, ClientAction } from '../actions/clientAction'

type client = {
    client: Object;
    message: string,
    id: string,
    email: string,
    clients: clientsState[],
    loading: Boolean,
    name: string,
    date_of_birth: number
};

const initialState = {
    client: {
        name: "",
        email: "",
        id: "",
        date_of_birth: Date.now(),
    } as clientsState,
    message: '',
    id: '',
    clients: [],
    loading: false,
    name: '',
    email: '',
    date_of_birth: Date.now()
};

interface clientsState {
    name: string,
    email: string,
    id: string,
    date_of_birth: number
}


const ClientReducer = (state: client = initialState, action: ClientAction): client => {
    switch (action.type) {
        case "ADD_CLIENT":
            const newclient = { name: action.name, id: action.id, email: action.email, date_of_birth: action.date_of_birth };
            const updatedClients = [...state.clients, newclient];
            return {
                ...state,
                loading: true,
                message: action.payload.message,
                clients: updatedClients
            };
        case "REMOVE_CLIENT":
            const filteredClients = state.clients.filter(client => client.id !== action.id);
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                clients: filteredClients
            };
        case "EDIT_CLIENT":

            for (let clave in state.clients) {
                console.log(clave)
            }
            return {
                ...state,
                loading: true,
                clients: [ action.client],
                message: action.payload.message
            };
        case "GET_CLIENTS":
            return {
                ...state,
                loading: false,
                clients: action.payload,
                message: action.message
            };
        case "ERROR_CLIENTS":
            return {
                ...state,
                message: action.payload
            };
        case "GETBYID_CLIENTS":
            return {
                ...state,
                client: {
                    ...action.client
                },
                loading: false
            }
        default:
            return state;
    }
};

export { ClientReducer };
