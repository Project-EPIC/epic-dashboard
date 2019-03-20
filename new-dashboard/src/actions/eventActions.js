import { NEW_EVENT, FETCH_EVENTS } from './types';


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
    console.log(` Hey I am inside createEvent eventData`);         
    fetch('http://34.95.114.189/events', {
        method: 'POST',        
        headers : {
            'content-type' : 'application/json'          
        },
        body: JSON.stringify(eventData)
    }).then(res => res.json())    
    .then(myevent => dispatch({
        type: NEW_EVENT,
        payload: myevent
    })
    );
};

export const modifyEvents = (type, normalized_name) => dispatch => {         
    var status = type === "start" ? "ACTIVE": "NOT_ACTIVE"; 
                
    fetch(`http://34.95.114.189/events/${normalized_name}/${status}`, {
        method: 'PUT',        
        headers : {
            'content-type' : 'application/json'          
        }        
    }).then(res => res.json())    
};
