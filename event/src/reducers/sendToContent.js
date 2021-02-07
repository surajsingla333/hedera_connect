import { SEND_TO_CONTENT } from '../types/sendToContent'
import { ACCESS_TO_CLIENT } from '../types/sendToContent'

const initialState = {
    currentAccountId: "",
    currentAccountName: "",
    accessToClient: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_TO_CONTENT:
            return {
                ...state,
                currentAccountId: action.state.accountId,
                currentAccountName: action.state.accountName,
            };
        case ACCESS_TO_CLIENT:
            return {
                ...state,
                accessToClient: action.state.accessToClient
            }
        default:
            return state;
    }
}