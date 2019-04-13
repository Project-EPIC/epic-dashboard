import { NEW_EVENT, FETCH_EVENTS, UPDATED_EVENT, ANNOTATE_TWEET } from '../actions/types';

const initialState = {
    myevents: [],
    newEvent: {},
    errorsNewEvent: {}
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case NEW_EVENT:
            
            if (typeof action.payload !== 'undefined'){
                return {
                    ...state,
                    newEvent: action.payload,
                    myevents: [action.payload,...state.myevents]
                }
            } else {
                return {...state}
            }      
           
        case FETCH_EVENTS:        
            return {
                ...state,
                myevents: action.payload
            }
        case UPDATED_EVENT:
            let events = [...state.myevents];
            events.find((o, i) => {     
                if (o.normalized_name === action.payload.normalized_name) {
                    events[i] = action.payload
                    return true; // stop searching
                }
                return false;
            });
            return {
                ...state,
                myevents: events
            }
        case ANNOTATE_TWEET:
            console.log(`in reducer ANNOTATE_TWEET: ${action.payload}`)
            return {
                ...state,
                annotateEvent: action.payload
            }
        default:
        return state
    }
}