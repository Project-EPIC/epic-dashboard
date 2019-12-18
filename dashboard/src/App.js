import React, { Component } from "react";
import Dashboard from "./views/Dashboard/Dashboard";
import SignIn from "./views/SignIn/SignIn";
import InvalidUser from "./views/InvalidUser/InvalidUser";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import firebase from "firebase";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";


import "typeface-roboto"; // Roboto font required by material-ui
import {
  FirebaseAuthProvider, FirebaseAuthConsumer,
} from "@react-firebase/auth";

class App extends Component {
  render() {
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyAY9UmSoIs2Hz6bFKMRcNeveuHw9n6UUbM",
      authDomain: "crypto-eon-164220.firebaseapp.com",
    }

// look at this for nested routing: https://www.youtube.com/watch?v=sfvrjwVihFY
// better series: https://www.youtube.com/watch?v=rIoflwHFd6ols
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user }) => {

                if (isSignedIn) {
                  const claims = JSON.parse(window.atob(user.toJSON().stsTokenManager.accessToken.split('.')[1]))
                  if (claims.admin) {
                    return <BrowserRouter>
                      <Dashboard />
                    </BrowserRouter>
                  }

                  return <InvalidUser />
                } else {
                  return <SignIn />
                }

              }

              }

            </FirebaseAuthConsumer>
          </FirebaseAuthProvider>
        </Provider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
