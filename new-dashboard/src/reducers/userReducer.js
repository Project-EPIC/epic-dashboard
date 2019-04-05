import { FETCH_USERS, UPDATED_USER } from '../actions/types';

const initialState = {
    users: [],
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case FETCH_USERS:        
            return {
                ...state,
                users: action.payload
            }
        case UPDATED_USER:
            let users = [...state.users];
            users.find((o, i) => {     
                if (o.uid === action.payload.uid) {
                    users[i] = action.payload
                    return true; // stop searching
                }
                return false;
            });
            return {
                ...state,
                users: users
            }
        default:
        return state
    }
}