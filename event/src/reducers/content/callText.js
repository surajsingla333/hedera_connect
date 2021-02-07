import { FUNCTION_CALLED, CALL_FUNCTION, RESET_CONTENT_ACTIONS } from '../../types/content/callText'

const initialState = {
    type: '',
    actionFromWeb: false,
    dataFromWeb: {},
    actionToWeb: false,
    dataToWeb: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_CONTENT_ACTIONS:
            return {
                ...state,
                type: '',
                actionFromWeb: false,
                dataFromWeb: {},
                actionToWeb: false,
                dataToWeb: {}
            }

        case CALL_FUNCTION:
            return {
                ...state,
                type: action.state.type,
                actionFromWeb: true,
                actionToWeb: false,
                dataFromWeb: action.state.dataFromWeb
            }

        case FUNCTION_CALLED:
            return {
                ...state,
                actionFromWeb: false,
                actionToWeb: true,
                dataToWeb: action.state.dataToWeb
            }

        default:
            return state;
    }
}