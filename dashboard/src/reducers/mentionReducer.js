import { FETCH_MENTIONS } from '../actions/types';

const initialState = {
    mentions: [],
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case FETCH_MENTIONS:        
            return {
                ...state,
                mentions: action.payload
            }
        default:
        return state
    }
}