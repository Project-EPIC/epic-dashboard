import { FETCH_FILTERED_TWEETS, FILTER_KEYWORD, FILTER_ERROR } from '../actions/types';

const initialState = {    
    keyword: "",
    filteredTweets: [],
    error: "",
};

export default function(state = initialState, action) {
    switch(action.type) {  

        case FETCH_FILTERED_TWEETS:        
            return {
                ...state,
                keyword: action.payload.keyword,
                filteredTweets: action.payload.tweets,               
            }

        // case FILTER_KEYWORD:     
        //     return {
        //         ...state,
        //         error: action.payload
        //     } 

        case FILTER_ERROR:     
            return {
                ...state,
                error: action.payload
            } 
        default:
            return state
    }
}