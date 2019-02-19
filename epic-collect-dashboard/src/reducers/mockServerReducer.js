import { TESTING_MOCK } from '../actions/types';

const initialState = {
  people: []  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TESTING_MOCK:
      return {
        ...state,
        people: action.payload
      };
    default:
      return state;
  }
}
