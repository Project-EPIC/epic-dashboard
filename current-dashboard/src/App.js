import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import indexRoutes from "routes/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import store from './store';




class App extends Component {
    render() {
        return (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        {indexRoutes.map((prop, key) => {
          // let myprop = JSON.stringify(prop);
          // Here key is refering to the index. It starts from 0. Since theres just 1 element it will be zero.
          // prop is referring to the entire JSON object in routes/index.js      
          return <Route to={prop.path} component={prop.component} key={key} />;        
        })}
      </Switch>
    </HashRouter>
  </Provider>
  )
}
}

export default App;