import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Header from "../common-components/Header/Header";
import Content from "./Content/Content";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});


class TweetAnnotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "annotate-tweet"
    }
}

  onTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  headerTabs = () => {
    console.log(`headerTabs() called: ${this.state.tabValue}`);
    return (
      <Tabs value={this.state.tabValue} onChange={this.onTabChange} textColor="inherit">                         
        <Tab textColor="inherit" label="Annotate Tweet" value="annotate-tweet" />                                    
      </Tabs>  
    )
  }


  render() {
    const title = "Tweet Annotation";
    const { classes } = this.props;
    console.log('tweet anno api tabvalue is: ' + this.state.tabValue);
    return (      
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} renderTabs={this.headerTabs}/>
        <div className={classes.Main}>              
          <main className={classes.mainContent}>
            <Content tabValue={this.state.tabValue}/> 
          </main>
        </div>
      </div>
    );
  }
}

export default TweetAnnotation;
