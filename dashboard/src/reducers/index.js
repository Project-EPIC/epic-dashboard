import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import userReducer from './userReducer';
import mentionReducer from './mentionReducer';


export default combineReducers({    
    eventsReducer: eventsReducer,
    userReducer: userReducer,
    mentionReducer: mentionReducer
});

// nameofreducer: reducerObject