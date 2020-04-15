import { NEW_EVENT, FETCH_EVENTS, UPDATED_EVENT, FETCH_COUNTS, EVENT_CREATION_ERROR, SET_EVENT_TYPE } from '../actions/types';

const initialState = {
    events: [],
    eventType: "keywords",
    counts: {},
    error: "",
};

export default function(state = initialState, action) {
    switch(action.type) {  
        case EVENT_CREATION_ERROR:     
            return {
                ...state,
                error: action.payload
            } 
        case NEW_EVENT:
            return {
                ...state,
                events: [action.payload,...state.events]
            }
           
        case FETCH_EVENTS:        
            return {
                ...state,
                events: action.payload
            }
        case UPDATED_EVENT:
            let events = [...state.events];
            let result = events.find((o, i) => {     
                if (o.normalized_name === action.payload.normalized_name) {
                    events[i] = {...events[i],...action.payload}
                    return true; // stop searching
                }
                return false;
            });
            // If not found, add it!
            if (result===undefined) {
                events=[action.payload,...events]
            }
            return {
                ...state,
                events: events
            }
        case FETCH_COUNTS:
            return {
                ...state,
                counts: {
                    ...state.counts,
                    [action.payload.meta.event_name] :action.payload.tweets
                },
            }
        case SET_EVENT_TYPE:
            return {
                ...state,
                eventType: action.payload
            }

        default:
        return state
    }
}