import { ADD_ANNOTATION, DELETE_ANNOTATION, FETCH_ANNOTATIONS } from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';


export const fetchTags = (tweetId, eventName) => dispatch => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
        fetch(`https://epicapi.gerard.space/annotations/${eventName}/${tweetId}/`, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })
            .then(res => res.json())
            .then(tags => dispatch({
                type: FETCH_ANNOTATIONS,
                payload: tags,
                tweet_id: tweetId,
                event_name: eventName
            }))
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });;
    });
};

export const fetchTagsByEvent = (eventName) => dispatch => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
        fetch(`https://epicapi.gerard.space/annotations/${eventName}/`, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })
            .then(res => res.json())
            .then(tags => dispatch({
                type: FETCH_ANNOTATIONS,
                payload: tags,
                event_name: eventName
            }))
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });;
    });
};


export const addAnnotation = (tag, tweet, eventName) => dispatch => {
    const tweetId = tweet.id_str
    var annotation = {
        "tag": tag,
        "tweet": JSON.stringify(tweet),
        "tweet_id": tweetId,
        "event_name": eventName
    }
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
        fetch(`https://epicapi.gerard.space/annotations/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(annotation)
        })
        .then(res => res.json())
        .then(resAnnotation => dispatch({
            type: ADD_ANNOTATION,
            payload: resAnnotation
        }))
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;
    });
};

export const deleteTag = (tag, tweetId, eventName) => dispatch => {
    var annotation = {
        tag: tag,
        tweet_id: tweetId,
        event_name: eventName
    }

    dispatch({
        type: DELETE_ANNOTATION,
        ...annotation
    });
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
        fetch(`https://epicapi.gerard.space/annotations/${eventName}/${tweetId}/${tag}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
           
        })
       
        .then(resp => dispatch({
                type: DELETE_ANNOTATION,
                ...annotation
        }))
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;
    });
};

