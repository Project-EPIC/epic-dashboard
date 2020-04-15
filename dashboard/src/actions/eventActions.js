import { NEW_EVENT, FETCH_EVENTS, UPDATED_EVENT, FETCH_COUNTS, EVENT_CREATION_ERROR, SET_EVENT_TYPE } from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';

export const fetchEvents = (eventType="keywords") => dispatch => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/?eventType=${eventType}`, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })
            .then(res => res.json())
            .then(myevents => dispatch({
                type: FETCH_EVENTS,
                payload: myevents
            }))
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });;
    });
};

export const createEvent = (eventData) => dispatch => {
    if (firebase.auth().currentUser == null) {
        dispatch({
            type: EVENT_CREATION_ERROR,
            payload: "Authorization error. Log out and log back in please."
        })
    }
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch('https://epicapi.gerard.space/events/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(eventData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    if (res.status === 409) {
                        dispatch({
                            type: EVENT_CREATION_ERROR,
                            payload: "Event name already in use, please change event name"
                        })
                    } else {
                        dispatch({
                            type: EVENT_CREATION_ERROR,
                            payload: "Backend error, please wait a minute and retry again."
                        })
                    }
                }

            }).then(event => {
                
                if (event !== undefined){
                    dispatch({
                        type:NEW_EVENT,
                        payload: event,
                    })
                }
            })
    });
};

export const clearErrors = () => dispatch => {
    dispatch({
        type: EVENT_CREATION_ERROR,
        payload: ""
    })
}

export const createBigQueryTable = (normalized_name, eventType="keywords") => dispatch => {
    dispatch({
        type: UPDATED_EVENT,
        payload: {normalized_name:normalized_name, big_query_table:"CREATING"}
    })
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/big_query/${normalized_name}/?eventType=${eventType}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        }).then(res => res.json())
            .then(updatedEvent => dispatch({
                type: UPDATED_EVENT,
                payload: updatedEvent
            })
        ).catch(e => dispatch({
            type: UPDATED_EVENT,
            payload: {normalized_name:normalized_name, big_query_table:""}
        }))
    });
}

export const modifyEvents = (status, normalized_name, eventType="keywords") => dispatch => {
    dispatch({
        type: UPDATED_EVENT,
        payload: {status:status,normalized_name:normalized_name}
    });
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/${normalized_name}/${status}?eventType=${eventType}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        }).then(res => res.json())
            .then(updatedEvent => dispatch({
                type: UPDATED_EVENT,
                payload: updatedEvent
            })
        );
    });

};

export const fetchEvent = (normalized_name, eventType="keywords") => dispatch => {
    
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/${normalized_name}/?eventType=${eventType}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        }).then(res => res.json())
            .then(updatedEvent => dispatch({
                type: UPDATED_EVENT,
                payload: {
                    eventType,
                    event: updatedEvent,
                }
            })
        );
    });

};



export const fetchCounts=(eventId)=>dispatch => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
    fetch(`https://epicapi.gerard.space/tweets/${eventId}/counts`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
        })
        .then(res => res.json())  
        .then(counts => dispatch({
            type: FETCH_COUNTS,
            payload: counts
        }))
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });    
    });
}


export const setEventType = (eventType) => dispatch => {
    dispatch({
        type: SET_EVENT_TYPE,
        payload: eventType
    })
}








