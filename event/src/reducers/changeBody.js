import { CHANGE_BODY } from '../types/changeBody'

const initialState = {
    bodyContent: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BODY:
            console.log("CHANGE_BODY PAYLOAD", action);
            console.log("CHANGE_BODY STATE", state);
            return {
                ...state,
                bodyContent: action.state.bodyContent
            };
        default:
            return state;
    }
}