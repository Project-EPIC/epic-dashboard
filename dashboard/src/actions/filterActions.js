import { FILTER_CONSTRAINT_SET, FILTER_SET, FILTER_RESET, FILTER_CLEAR_SUBMIT, FILTER_RESTORE_PREV_FILTER } from './types';
import { FILTER_PREDICATE_ADD, FILTER_PREDICATE_ISOR, FILTER_PREDICATE_DELETE } from './types';
import { FILTER_EXPRESSION_ADD, FILTER_EXPRESSION_ISOR, FILTER_EXPRESSION_SET, FILTER_EXPRESSION_DELETE } from './types';

export const setFilter = (newFilter, submit) => dispatch => {
  const cleanedFilter = Object.keys(newFilter).reduce((acc, key) => {
    if (newFilter[key]) {
      // Remove any keys with values that are empty strings or null
      return { ...acc, [key]: newFilter[key] }
    }
    
    return acc;
  }, {})

  dispatch({
    type: FILTER_SET,
    payload: { filter: cleanedFilter, submit},
  })
}


export const setConstraint = (newConstraint) => dispatch => {
  dispatch({
    type: FILTER_CONSTRAINT_SET,
    payload: newConstraint,
  })
}

export const addPredicate = () => dispatch => {
  dispatch({
    type: FILTER_PREDICATE_ADD
  })
}

export const toggleIsOrPredicate = (id) => dispatch => {
  dispatch({
    type: FILTER_PREDICATE_ISOR,
    payload: { predicateId: id }
  })
}

export const deletePredicate = (id) => dispatch => {
  dispatch({
    type: FILTER_PREDICATE_DELETE,
    payload: { predicateId: id }
  })
}

export const addExpression = (parentId) => dispatch => {
  dispatch({
    type: FILTER_EXPRESSION_ADD,
    payload: { parentId }
  })
}

export const toggleIsOrExpression = (id) => dispatch => {
  dispatch({
    type: FILTER_EXPRESSION_ISOR,
    payload: { expressionId: id }
  })
}

export const setExpression = (id, expression) => dispatch => {
  dispatch({
    type: FILTER_EXPRESSION_SET,
    payload: { expressionId: id, newExpression: expression }
  })
}

export const deleteExpression = (parentId, id) => dispatch => {
  dispatch({
    type: FILTER_EXPRESSION_DELETE,
    payload: { parentId, expressionId: id }
  })
}

export const clearFilter = (submit=true) => dispatch => {
  dispatch({
    type: FILTER_RESET,
    payload: submit
  })
}

export const clearFilterSubmit = () => dispatch => {
  dispatch({
    type: FILTER_CLEAR_SUBMIT
  });
}

export const restorePrevFilter = () => dispatch => {
  dispatch({
    type: FILTER_RESTORE_PREV_FILTER
  });
}