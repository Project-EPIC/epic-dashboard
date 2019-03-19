import { combineReducers } from 'redux';
import postReducer from './postReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
    posts: postReducer,
    eventsReducer: eventsReducer
});

// nameofreducer: reducerObject