import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import userReducer from './userReducer';
import annotationReducer from './annotationReducer';
import alertsReducer from './alertsReducer';
import filterReducer from './filterReducer';

export default combineReducers({    
    eventsReducer: eventsReducer,
    userReducer: userReducer,
    annotationReducer: annotationReducer,
    alertsReducer: alertsReducer,
    filterReducer: filterReducer,
});

// nameofreducer: reducerObject