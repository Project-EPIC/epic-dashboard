
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import ListAlerts from "../../ListAlerts/ListAlerts";
import Header from "../../../common-components/Header/Header";


class ListEventsContent extends Component {
  render() {
    const { classes, match, title } = this.props;
    return (
      <div className={classes.Main}>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />

        <main className={classes.mainContent}>
          <div className={classes.contentWrapper}>
            <div>
                <ListAlerts match={match} />
                
            </div>
          </div>
        </main>
      </div>

    );
  }
}

ListEventsContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListEventsContent);
