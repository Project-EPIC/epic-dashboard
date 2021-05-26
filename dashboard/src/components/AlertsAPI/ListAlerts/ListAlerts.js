import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import AlertTable from './AlertTable/AlertTable';
import { fetchAlerts } from '../../../actions/alertsActions';



class ListEvents extends React.Component {

  componentDidMount() {    
    this.props.fetchAlerts();    
  }

 
  render() {
    const rows = this.props.alerts;

    return   (      

      <Grid container spacing={3}>
        
        <Grid item xs={12} >
         <AlertTable title="Active alerts" data={rows}/>
        </Grid>
      </Grid>
    
    );
  }
}

ListEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alertsReducer.alerts,
});

const mapDispatchToProps = {
    fetchAlerts: fetchAlerts, 
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListEvents));