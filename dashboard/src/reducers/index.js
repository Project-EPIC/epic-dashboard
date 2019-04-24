import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import userReducer from './userReducer';


export default combineReducers({    
    eventsReducer: eventsReducer,
    userReducer: userReducer,
});

// nameofreducer: reducerObject