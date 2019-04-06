import { FETCH_USERS, UPDATED_USER } from './types';
import firebase from "firebase";


export const fetchUsers = () => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch('http://34.95.114.189/users/', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
            .then(res => res.json())
            .then(users => dispatch({
                type: FETCH_USERS,
                payload: users,

            }));
    });
};


export const makeAdmin = (uid) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`http://34.95.114.189/users/${uid}/admin`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + idToken
            }
        }).then(res => res.json())
            .then(user => dispatch({
                type: UPDATED_USER,
                payload: user
            }));
    });
};

export const enableUser = (uid) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`http://34.95.114.189/users/${uid}/enable`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + idToken
            }
        }).then(res => res.json())
            .then(user => dispatch({
                type: UPDATED_USER,
                payload: user
            }));
    });
};

export const disableUser = (uid) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`http://34.95.114.189/users/${uid}/disable`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + idToken
            }
        }).then(res => res.json())
            .then(user => dispatch({
                type: UPDATED_USER,
                payload: user
            }));
    });
};