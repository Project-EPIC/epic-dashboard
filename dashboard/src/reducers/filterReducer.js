import { FILTER_SET, FILTER_RESET, FILTER_CLEAR_SUBMIT, FILTER_RESTORE_PREV_FILTER, FILTER_CONSTRAINT_PREDICATE_SET, FILTER_CONSTRAINT_EXPRESSION_SET } from '../actions/types';


const initialState = {
    prevFilter: {},
    filterSet: false,
    submit: false,
    tweetConstraints: [{
        checked: true,
        expressions: []
    }],
    startDate: null,
    endDate: null,
    hashtags: "",
    language: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FILTER_SET:
            const newState = Object.keys(state).reduce((acc, key) => {
                // Check if any fields were cleared (but not all)... If they were update accordingly
                acc[key] = state[key] === action.payload[key] ? state[key] : action.payload[key];
                return acc
            }, {})

            return {
                ...newState,
                prevFilter: {
                    tweetConstraints: state.tweetConstraints,
                    startDate: state.startDate,
                    endDate: state.endDate,
                    hashtags: state.hashtags,
                    language: state.language
                },
                submit: true,
                filterSet: true
            }

        case FILTER_CONSTRAINT_PREDICATE_SET:
            return {
                ...state,
                tweetConstraints: action.payload
            }

        case FILTER_CONSTRAINT_EXPRESSION_SET:
            return {
                ...state,
                tweetConstraints: state.tweetConstraints.map((cur, i) => {
                    if (i === action.predicateParentIdx) {
                        cur.expressions = action.payload;
                    }
                    return cur
                }, [])
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