import { SAVE_WALLET } from '../types/storeWallet'

const initialState = {
    hashArray: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_WALLET:
            console.log("IN SAVE_WALLET");
            console.log("PAYLOAD", action);
            console.log("STATE", state);

            let newState = {
                ...state,
                accountId: action.state.accountId,
                publicKey: action.state.publicKey,
                privateKey: action.state.privateKey,
                hashArray: action.state.hashArray,
            };

            let data = {
                passwordHash: newState.hashArray[0],
                salt: newState.hashArray[1],
                listAccountsNames: ['ACCOUNT 1'],
                accounts: [
                    {
                        name: "ACCOUNT 1",
                        accountId: newState.accountId,
                        publicKey: newState.publicKey,
                        privateKey: newState.privateKey,
                    }
                ],
                listTokensSymbols: [],
                tokens: []
            }

            localStorage.setItem("DATA", JSON.stringify(data));

            return newState;

        default:
            return state;
    }
}