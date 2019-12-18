import { FETCH_FILTERED_TWEETS, FILTER_KEYWORD, FILTER_ERROR } from './types';
import firebase from "firebase";
import fetch from 'cross-fetch';
// import axios from 'axios';

export const fetchFilteredTweets = (newFilter) => dispatch => {
    if (firebase.auth().currentUser == null) {
        throw Error("Not authed")
    }
    console.log(newFilter)
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        // fetch(`https://epicapi.gerard.space/tweets/${newFilter.eventName}/?page=1&count=15`, {
        fetch(`http://localhost:8080/filtering/${newFilter.eventName}?keywords=${newFilter.keyword}&dateStart=${newFilter.dateStart}&dateEnd=${newFilter.dateEnd}&page=1&count=15`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${idToken}`
            }
          }
        )
          .then(res => res.json())
          .then(result =>
            dispatch({
              type: FETCH_FILTERED_TWEETS,
              payload: { keyword: newFilter.keyword, tweets: result.tweets }
            })
          );
    });

    // axios({
    //         method: 'get',
    //         url: `http://localhost:8080/filtering/${newFilter.eventName}/${newFilter.keyword}/?page=1&count=15`,
    //         withCredentials: true,
    //         crossdomain: true,
    //     headers: {
    //         "Content-Type": 'application/json',
    //         "Cache-Control": "no-cache",
    //     }
    //     }).then(function (response) {
    //     console.log("Header With Authentication :" + response);
    //     })
    //     .catch(function (error) {
    //     console.log(error);
    //     });
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