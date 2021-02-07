import { STORE_ACCOUNT } from '../types/storeAccounts'

const initialState = {
    // public: "",
    // private: "",
    // pkh: "",
    // mnemonic: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case STORE_ACCOUNT:
            console.log("IN STORE_ACCOUNT");
            console.log("STORE_ACCOUNT PAYLOAD", action);
            console.log("STORE_ACCOUNT STATE", state);

            let newState;

            newState = {
                ...state,
                privateKey: action.state.privateKey,
                publicKey: action.state.publicKey,
                accountId: action.state.accountId,
            };

            let stored = action.state.DATA

            let id = `ACCOUNT ${stored.listAccountsNames.length + 1}`;

            let data = {
                name: id,
                accountId: newState.accountId,
                publicKey: newState.publicKey,
                privateKey: newState.privateKey,
            }

            stored.listAccountsNames.push(id);
            stored.accounts.push(data);

            localStorage.setItem("DATA", JSON.stringify(stored));

            return newState;

        default:
            return state;
    }
}