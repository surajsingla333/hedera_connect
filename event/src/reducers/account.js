import { SAVE_ACCOUNT } from '../types/account'

const initialState = {
    accountId: "",
    publicKey: "",
    privateKey: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT:
            console.log("IN SAVE_ACCOUNT");
            console.log("PAYLOAD", action);
            console.log("STATE", state);
            return {
                ...state,
                accountId: action.state.accountId,
                publicKey: action.state.publicKey,
                privateKey: action.state.privateKey
            };

        default:
            return state;
    }
}