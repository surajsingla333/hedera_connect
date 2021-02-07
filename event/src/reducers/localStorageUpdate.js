import { ADD_NEW_TOKEN } from '../types/localStorageUpdate'

const initialState = {
    DATA: JSON.parse(localStorage.getItem("DATA"))
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_TOKEN:
            console.log("ADD_NEW_TOKEN ACTION", action)

            let stored = action.state.DATA

            let newToken = {
                tokenId: action.state.tokenId,
                tokenName: action.state.tokenName,
                tokenSymbol: action.state.tokenSymbol,
            };

            stored.listTokensSymbols.push(newToken.tokenSymbol);
            stored.tokens.push(newToken);

            localStorage.setItem("DATA", JSON.stringify(stored));

            return {
                ...state
            };
        default:
            return state;
    }
}