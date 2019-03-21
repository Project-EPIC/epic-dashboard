import { NEW_EVENT, FETCH_EVENTS, UPDATED_EVENT } from './types';


export const fetchEvents = () => dispatch => {      
    fetch('http://34.95.114.189/events/')
    .then(res => res.json())
    .then(myevents => dispatch({
        type: FETCH_EVENTS,
        payload: myevents
    }))
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });;    
};

export const createEvent = (eventData) => dispatch => {          
    fetch('http://34.95.114.189/events', {
        method: 'POST',        
        headers : {
            'content-type' : 'application/json'          
        },
        body: JSON.stringify(eventData)
    })
    .then(res => {
        if (res.ok){
            return res.json()
        } else{
            console.log("We need to handle this error");
        }
        
    })    
    .then(myevent => dispatch({
        type: NEW_EVENT,
        payload: myevent
    })
    );
};

export const modifyEvents = (status, normalized_name) => dispatch => {         
    fetch(`http://34.95.114.189/events/${normalized_name}/${status}`, {
        method: 'PUT',        
        headers : {
            'content-type' : 'application/json'          
        }        
    }).then(res => res.json())
    .then(updatedEvent => dispatch({
        type: UPDATED_EVENT,
        payload: updatedEvent
    })
    );
        
};
