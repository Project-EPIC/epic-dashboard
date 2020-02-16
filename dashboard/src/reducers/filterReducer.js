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
    hashtags: "",
    language: ""
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
                    hashtags: state.hashtags,
                    language: state.language
                },
                submit: true,
                filterSet: true
            }

        case FILTER_RESET:
            return {
                ...initialState,
                submit: true,
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