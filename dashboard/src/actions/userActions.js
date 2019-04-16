import { FETCH_USERS, UPDATED_USER } from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';

export const fetchUsers = () => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch('https://epicapi.gerard.space/users/', {
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


export const makeAdmin = (user) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }
    // Dispatch update function sync to update UI
    user.admin=true;
    dispatch({
        type: UPDATED_USER,
        payload: user
    });

    // Do the request and dispatch again in case there's any error.
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/users/${user.uid}/admin`, {
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

export const enableUser = (user) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }

    // Dispatch update function sync to update UI
    user.disabled=false;
    dispatch({
        type: UPDATED_USER,
        payload: user
    });

    // Do the request and dispatch again in case there's any error.
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/users/${user.uid}/enable`, {
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

export const disableUser = (user) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }
    // Dispatch update function sync to update UI
    user.disabled=true;
    dispatch({
        type: UPDATED_USER,
        payload: user
    });

    // Do the request and dispatch again in case there's any error.
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/users/${user.uid}/disable`, {
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