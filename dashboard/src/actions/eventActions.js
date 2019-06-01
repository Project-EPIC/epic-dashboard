import { NEW_EVENT, FETCH_EVENTS, UPDATED_EVENT, FETCH_COUNTS} from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';

export const fetchEvents = () => dispatch => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch('https://epicapi.gerard.space/events/', {
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
        throw Error("Not authed")
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
                    console.log("We need to handle this error");
                }

            })
            .then(myevent => dispatch({
                type: NEW_EVENT,
                payload: myevent
            })
            );
    });
};

export const createBigQueryTable = (normalized_name) => dispatch => {
    dispatch({
        type: UPDATED_EVENT,
        payload: {normalized_name:normalized_name, big_query_table:"CREATING"}
    })
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/big_query/${normalized_name}/`, {
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

export const modifyEvents = (status, normalized_name) => dispatch => {
    dispatch({
        type: UPDATED_EVENT,
        payload: {status:status,normalized_name:normalized_name}
    });
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/${normalized_name}/${status}`, {
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

export const fetchEvent = (normalized_name) => dispatch => {
    
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/events/${normalized_name}/`, {
            method: 'GET',
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








