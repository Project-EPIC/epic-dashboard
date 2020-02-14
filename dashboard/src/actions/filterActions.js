import { FILTER_SET, FILTER_RESET, FILTER_ERROR } from './types';
import moment from "moment";

export const setFilter = (newFilter) => dispatch => {
  const cleanedFilter = Object.keys(newFilter).reduce((acc, key) => {
    if (newFilter[key]) {
      // Remove any keys with values that are empty strings or null
      return { ...acc, [key]: newFilter[key] }
    }
    return acc;
  }, {})
  console.log(cleanedFilter)
  // Check if any filter has been applied. If not then do nothing.
  if (Object.keys(cleanedFilter).length > 0) {
    // There is a filter to set
    dispatch({
      type: FILTER_SET,
      payload: cleanedFilter,
    })
  }
  else {
    dispatch({
      type: FILTER_RESET
    })
  }
}

export const clearFilterErrors = () => dispatch => {
  dispatch({
    type: FILTER_ERROR,
    payload: ""
  })
}