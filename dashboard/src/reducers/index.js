import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import userReducer from './userReducer';
import alertsReducer from './alertsReducer';


export default combineReducers({    
    eventsReducer: eventsReducer,
    userReducer: userReducer,
    alertsReducer: alertsReducer,
});

// nameofreducer: reducerObject