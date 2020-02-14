import { FILTER_SET, FILTER_RESET, FILTER_ERROR } from '../actions/types';

const initialState = {
    filterSet: false,
    startDate: null,
    endDate: null,
    allWords: "",
    anyWords: "",
    phrase: "",
    notWords: "",
    waiting: false,
    error: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FILTER_SET:
            return {
                ...state,
                ...action.payload,
                filterSet: true,
                error: ""
            }

        case FILTER_RESET:
            return {
                ...initialState,
            }

        case FILTER_ERROR:
            return {
                ...state,
                filterSet: false,
                error: action.payload
            }
        default:
            return state
    }
}