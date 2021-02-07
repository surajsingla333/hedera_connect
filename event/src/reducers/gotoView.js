import { CHANGE_VIEW } from '../types/gotoView'

const initialState = {
    currentView: "",
    tokenToSend: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VIEW:
            return {
                ...state,
                currentView: action.state.newView,
                tokenToSend: action.state.tokenToSend ? action.state.tokenToSend : {}
            };
        default:
            return state;
    }
}