import { FILTER_SET, FILTER_RESET, FILTER_CLEAR_SUBMIT, FILTER_RESTORE_PREV_FILTER } from '../actions/types';

const initialState = {
    prevFilter: {},
    filterSet: false,
    submit: false,
    startDate: null,
    endDate: null,
    allWords: "",
    anyWords: "",
    phrase: "",
    notWords: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FILTER_SET:
            return {
                ...state,
                ...action.payload,
                prevFilter: {
                    startDate: state.startDate,
                    endDate: state.endDate,
                    allWords: state.allWords,
                    anyWords: state.anyWords,
                    phrase: state.phrase,
                    notWords: state.notWords,
                },
                submit: true,
                filterSet: true
            }

        case FILTER_RESET:
            return {
                ...initialState,
            }

        case FILTER_CLEAR_SUBMIT:
            return {
                ...state,
                submit: false,
            }

        case FILTER_RESTORE_PREV_FILTER:
            return {
                ...state,
                ...state.prevFilter
            }
        default:
            return state
    }
}