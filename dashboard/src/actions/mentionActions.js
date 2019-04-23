import { FETCH_MENTIONS } from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';

export const fetchMentions = () => dispatch => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch('http://localhost:8080/mentions/winter', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
            .then(res => res.json())
            .then(mentions => dispatch({
                type: FETCH_MENTIONS,
                payload: mentions,
            }));
    });
};