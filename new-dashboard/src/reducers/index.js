import { combineReducers } from 'redux';
import postReducer from './postReducer';
import eventsReducer from './eventsReducer';
import userReducer from './userReducer';

export default combineReducers({
    posts: postReducer,
    eventsReducer: eventsReducer,
    userReducer: userReducer
});

// nameofreducer: reducerObject