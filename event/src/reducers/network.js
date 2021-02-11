import { CHANGE_NETWORK } from '../types/network'

const initialState = {
    network: `testnet`
};


export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NETWORK:
            console.log("IN CHANGE_NETWORK");
            console.log("CHANGE_NETWORK PAYLOAD", action);
            console.log("CHANGE_NETWORK STATE", state);
            return {
                ...state,
                network: action.state
            };
        default:
            return state;
    }
}