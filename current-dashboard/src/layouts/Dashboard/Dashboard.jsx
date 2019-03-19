import React, { Component } from "react";
import Sidebar from "components/creative-tim-components/Sidebar/Sidebar";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "components/creative-tim-components/Header/Header";
import dashboardRoutes from "routes/dashboard.jsx";

class Dashboard extends Component {
   _populateSideBarRoutes = () => {
    return (
      dashboardRoutes.map((prop, key) => {                
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return (
          <Route path={prop.path} component={prop.component} key={key} />
        );
      })
    );
  }

  render() {
    return (
      <div className="wrapper">        
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {this._populateSideBarRoutes()}
          </Switch>          
        </div>
      </div>
    );
  }
}

export default Dashboard;
