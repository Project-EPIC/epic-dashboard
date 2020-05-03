import { FILTER_CONSTRAINT_SET, FILTER_SET, FILTER_RESET, FILTER_CLEAR_SUBMIT, FILTER_RESTORE_PREV_FILTER } from '../actions/types';
import { FILTER_PREDICATE_ADD, FILTER_PREDICATE_ISOR, FILTER_PREDICATE_DELETE } from '../actions/types';
import { FILTER_EXPRESSION_ADD, FILTER_EXPRESSION_ISOR, FILTER_EXPRESSION_SET, FILTER_EXPRESSION_DELETE } from '../actions/types';

const defaultPredicate = {
    isOr: false,
    expressions: []
}

const defaultExpression = {
    isOr: true,
    selectValue: "ALLWORDS",
    text: ""
}

const initialState = {
    prevFilter: {},
    filterSet: false,
    submit: false,
    predicates: {
        byId: {
            0: {
                id: 0,
                ...defaultPredicate
            }
        },
        allIds: [0] // Keeps track of order (important for AND/OR logic)
    },
    expressions: {
        byId: {},
        allIds: [] // Keeps track of order (important for AND/OR logic)
    },
    startDate: null,
    endDate: null,
    hashtags: "",
    language: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FILTER_SET: {
            const { filter, submit } = action.payload;

            const keys = ["startDate", "endDate", "hashtags", "language"]
            const newState = keys.reduce((acc, key) => {
                // Check if any fields were cleared (but not all)... If they were update accordingly
                acc[key] = state[key] === filter[key] ? state[key] : filter[key];
                return acc
            }, {})

            return {
                ...state,
                ...newState,
                submit,
                prevFilter: {
                    predicates: state.predicates,
                    expressions: state.expressions,
                    startDate: state.startDate,
                    endDate: state.endDate,
                    hashtags: state.hashtags,
                    language: state.language
                },
                filterSet: (Object.keys(filter).length && ("hashtags" in filter || "language" in filter)) || (state.predicates.allIds.length > 0 && state.expressions.allIds.length) || state.startDate || state.endDate
            }
        }

        case FILTER_CONSTRAINT_SET: {
            const newState = Object.keys(state).reduce((acc, key) => {
                if (key in action.payload) {
                    acc[key] = action.payload[key]
                }
                else {
                    acc[key] = state[key]
                }
                return acc
            }, {})
            return newState

        }

        case FILTER_PREDICATE_ADD: {
            const predicatesLen = state.predicates.allIds.length

            // Just increment from the last largest id... Thought about reaching js number overflow,
            // but queries shouldn't be that long... Might want to add a limit to guarentee this
            const newId = predicatesLen > 0 ? state.predicates.allIds[predicatesLen - 1] + 1 : 0

            return {
                ...state,
                predicates: {
                    byId: { ...state.predicates.byId, [newId]: Object.assign({ id: newId }, defaultPredicate) },
                    allIds: state.predicates.allIds.concat(newId)
                }
            }
        }

        case FILTER_PREDICATE_ISOR: {
            const { predicateId } = action.payload
            const newPredicate = { ...state.predicates.byId[predicateId], isOr: !state.predicates.byId[predicateId].isOr }
            return {
                ...state,
                predicates: {
                    byId: { ...state.predicates.byId, [predicateId]: newPredicate },
                    allIds: state.predicates.allIds
                }
            }
        }

        case FILTER_PREDICATE_DELETE: {
            const { predicateId } = action.payload
            const delExpressionIds = new Set(state.predicates.byId[predicateId].expressions)
            return {
                ...state,
                predicates: state.predicates.allIds.reduce((acc, key) => {
                    if (key != predicateId) {
                        acc.byId[key] = state.predicates.byId[key]
                        acc.allIds.push(key)
                    }
                    return acc;
                }, { byId: {}, allIds: [] }),
                expressions: state.expressions.allIds.reduce((acc, key) => {
                    if (!delExpressionIds.has(key)) {
                        acc.byId[key] = state.expressions.byId[key]
                        acc.allIds.push(key)
                    }
                    return acc
                }, { byId: {}, allIds: [] })
            }
        }

        case FILTER_EXPRESSION_ADD: {
            const { parentId } = action.payload
            const expressionsLen = state.expressions.allIds.length

            // Just increment from the last largest id... Thought about reaching js number overflow,
            // but queries shouldn't be that long... Might want to add a limit to guarentee this
            const newId = expressionsLen > 0 ? state.expressions.allIds[expressionsLen - 1] + 1 : 0

            const newPredicate = { ...state.predicates.byId[parentId], expressions: state.predicates.byId[parentId].expressions.concat(newId) }
            return {
                ...state,
                predicates: {
                    byId: { ...state.predicates.byId, [parentId]: newPredicate },
                    allIds: state.predicates.allIds
                },
                expressions: {
                    byId: { ...state.expressions.byId, [newId]: Object.assign({ id: newId }, defaultExpression) },
                    allIds: [...state.expressions.allIds, newId]
                }
            }
        }

        case FILTER_EXPRESSION_ISOR: {
            const { expressionId } = action.payload
            const newExpression = { ...state.expressions.byId[expressionId], isOr: !state.expressions.byId[expressionId].isOr }

            return {
                ...state,
                expressions: {
                    byId: { ...state.expressions.byId, [expressionId]: newExpression },
                    allIds: state.expressions.allIds
                }
            }
        }

        case FILTER_EXPRESSION_SET: {
            const { expressionId, newExpression } = action.payload

            return {
                ...state,
                expressions: {
                    byId: { ...state.expressions.byId, [expressionId]: { ...newExpression } },
                    allIds: state.expressions.allIds
                }
            }
        }

        case FILTER_EXPRESSION_DELETE: {
            const { parentId, expressionId } = action.payload

            const newPredicate = {
                ...state.predicates.byId[parentId],
                expressions: state.predicates.byId[parentId].expressions.filter((expressionKey) => expressionKey != expressionId)
            }

            return {
                ...state,
                predicates: {
                    byId: { ...state.predicates.byId, [parentId]: newPredicate },
                    allIds: state.predicates.allIds
                },
                expressions: state.expressions.allIds.reduce((acc, key) => {
                    if (key != expressionId) {
                        acc.byId[key] = state.expressions.byId[key]
                        acc.allIds.push(key)
                    }
                    return acc
                }, { byId: {}, allIds: [] })
            }
        }

        case FILTER_RESET: {
            return {
                ...initialState,
                submit: action.payload,
            }
        }

        case FILTER_CLEAR_SUBMIT: {
            return {
                ...state,
                submit: false,
            }
        }

        case FILTER_RESTORE_PREV_FILTER: {
            return {
                ...state,
                ...state.prevFilter
            }
        }

        default:
            return state
    }
}