import { ADD_ANNOTATION, DELETE_ANNOTATION, FETCH_ANNOTATIONS_EVENT, FETCH_ANNOTATIONS_TWEET } from '../actions/types';

const initialState = {
    annotations: []
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case FETCH_ANNOTATIONS_TWEET:
            return {
                ...state,
                annotations: [...state.annotations.filter(item => item.tweet_id !== action.tweet_id || item.event_name !== action.event_name), ...action.payload]
            }
        case FETCH_ANNOTATIONS_EVENT:
            return {
                ...state,
                annotations: [...state.annotations.filter(item => item.event_name !== action.event_name), ...action.payload]
            }
        case ADD_ANNOTATION:
            return {
                ...state,
                annotations: [...state.annotations, action.payload]
            }

        case DELETE_ANNOTATION:
        
            return {
                ...state,
                annotations: [...state.annotations.filter(item=>(item.tweet_id !== action.tweet_id || item.event_name !== action.event_name || action.tag !== item.tag))]
            }
           
        default:
            return state
    }
}