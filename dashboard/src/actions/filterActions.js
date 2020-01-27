import { FETCH_FILTERED_TWEETS, FILTER_KEYWORD, FILTER_ERROR } from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';

export const fetchFilteredTweets = (newFilter) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
      const queryParams = Object.keys(newFilter).reduce((acc, key) => {
        if (!newFilter[key] || key === "eventName") {
          return acc;
        }

        if (acc.length > 0) {
          return `${acc}&${key}=${newFilter[key].replace(' ', '+')}`;
        }
        else {
          return `${key}=${newFilter[key].replace(' ', '+')}`;
        }
      }, "");

      fetch(`http://localhost:8080/filtering/${newFilter.eventName}?${queryParams}&page=1&count=10`, // TODO: Are page and count configurable?
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${idToken}`
            }
          }
        )
          .then(res => res.json())
          .then(result =>
            {
              console.log("DONE")
              return dispatch({
              type: FETCH_FILTERED_TWEETS,
              payload: { keyword: newFilter.keyword, tweets: result.tweets }
            })}
          );
    });
}

// export const fetchFilterKeyword = (keyword = "") => ({
//     type: FILTER_KEYWORD,
//     payload: keyword
//   });

export const clearFilterErrors = () => dispatch => {
    dispatch({
        type: FILTER_ERROR,
        payload: ""
    })
}