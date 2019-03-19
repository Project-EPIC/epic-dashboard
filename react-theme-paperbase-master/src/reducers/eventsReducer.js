import { NEW_EVENT, FETCH_EVENTS } from '../actions/types';

const initialState = {
    myevents: [],
    newEvent: {}
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case NEW_EVENT:          
        return {
            ...state,
            newEvent: action.payload
        }
        case FETCH_EVENTS:        
        return {
            ...state,
            myevents: action.payload
        }
        default:
        return state
    }
}