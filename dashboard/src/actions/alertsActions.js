import { FETCH_ALERTS } from './types';
import fetch from 'cross-fetch';

export const fetchAlerts = () => dispatch => {
    
        fetch('https://api.weather.gov/alerts/active?status=actual&message_type=alert&region_type=land&urgency=future,expected,immediate', {
            headers: {
                'Accept': `application/ld+json`,
            }
        })
            .then(res => res.json())
            .then(myevents => dispatch({
                type: FETCH_ALERTS,
                payload: myevents
            }))
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });;
    
};