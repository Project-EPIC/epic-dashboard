import { combineReducers } from 'redux';
import postReducer from './postReducer';
import mockServerReducer from './mockServerReducer';

export default combineReducers({
  posts: postReducer,
  people: mockServerReducer
});
