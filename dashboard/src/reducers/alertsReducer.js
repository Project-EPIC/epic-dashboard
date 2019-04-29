import { FETCH_ALERTS } from '../actions/types';

const initialState = {
    alerts: []
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case FETCH_ALERTS:
            return {
                ...state,
                alerts: action.payload["@graph"]
            }
           
        default:
        return state
    }
}