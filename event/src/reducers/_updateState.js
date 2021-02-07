import { UPDATE_STATE } from '../types/_updateState'

const initialState = {
    update: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATE:
            return {
                ...state,
                update: action.state.update

            };
        default:
            return state;
    }
}