import { FETCH_USERS, UPDATED_USER } from './types';


export const fetchUsers = () => dispatch => {      
    fetch('http://34.95.114.189/users/')
    .then(res => res.json())
    .then(users => dispatch({
        type: FETCH_USERS,
        payload: users
    }));    
};


export const updateUser = (uid) => dispatch => {      
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(res => res.json())
    .then(post => dispatch({
        type: UPDATED_USER,
        payload: post
    }));
};