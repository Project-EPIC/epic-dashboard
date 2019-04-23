import { NEW_EVENT, FETCH_EVENTS, UPDATED_EVENT, TWEET_ANNOTATION, FETCH_TAGS, FETCH_COUNTS} from './types';
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

export const modifyEvents = (status, normalized_name) => dispatch => {
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

export const updateAnnotation = (tweet, initialTags ,tags, eventName) => dispatch => {       
        var data = {
            'initialTags': initialTags,
            'tags' : tags,
            'tweet' : tweet,
            'tweetId': tweet.id,
            'eventName': eventName
        }
        fetch(`http://localhost:9001/annotate`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',                
            },
            body: JSON.stringify(data)
        })        
        .then(res => res.json())        
        .then(res => dispatch({                        
            type: TWEET_ANNOTATION,
            payload: res
        })
        );
};

export const fetchTags = (tweetId) => dispatch => {    
        fetch('http://localhost:9001/annotate?id='+tweetId, {
            headers: {}
        })
        .then(res => res.json())             
        .then(mytags => dispatch({
            type: FETCH_TAGS,
            payload: mytags
        }))
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;    
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






