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

export const fetchTags = (tweetId,eventName) => dispatch => {    
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        fetch(`https://epicapi.gerard.space/annotation/?tweetID=${tweetId}&eventName=${eventName}`, {            
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })
            .then(res => res.json())
            .then(myevents => dispatch({
                type: FETCH_TAGS,
                payload: myevents
            }))
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });;
    });
};

export const addTag = (tag, tweet, eventName) => dispatch => {            
    const tweetId  = tweet.id_str    
    var myJSONString = JSON.stringify(tweet);
    // NOTE: This is wrong according to mem this is not how JSONs should be sent but if you send a json it fails 
    var myEscapedJSONString = myJSONString.replace(/\\n/g, "\\n")
                                      .replace(/\\'/g, "\\'")
                                      .replace(/\\"/g, '\\"')
                                      .replace(/\\&/g, "\\&")
                                      .replace(/\\r/g, "\\r")
                                      .replace(/\\t/g, "\\t")
                                      .replace(/\\b/g, "\\b")
                                      .replace(/\\f/g, "\\f");
    var mybody = {
        "tag": tag,
        "tweet": myEscapedJSONString,
        "tweetId": tweetId,
        "eventName": eventName
    }
        
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {        
        fetch(`https://epicapi.gerard.space/annotation/`, {            
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(mybody)
        })        
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;
    });
};

export const deleteTag = (tag, tweetId,eventName) => dispatch => {    
    console.log(`in deleteTag: ${tag} ${tweetId}, ${eventName}`)
    
    var mybody = {
        "tag": tag,        
        "tweetId": tweetId,
        "eventName": eventName
    }

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {        
        fetch(`https://epicapi.gerard.space/annotation/`, {            
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(mybody)
        })
        .then(res => res.json())
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;
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








