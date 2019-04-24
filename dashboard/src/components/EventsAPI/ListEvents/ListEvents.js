import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import { withRouter } from 'react-router-dom'
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvents, modifyEvents } from "../../../actions/eventActions";



class ListEvents extends React.Component {

  componentDidMount() {    
    this.props.fetchEvents();    
  }

 
  render() {
    const { history } = this.props;    
    const rows = this.props.events;
    const activeEvents = rows.filter(e => e.status==="ACTIVE");
    const failedEvents = rows.filter(e => e.status==="FAILED");
    

    return   (      

      <Grid container spacing={24}>
        {activeEvents.length >0 ?
        <Grid item xs={12} >
          <MaterialTable
            // className={classes.table}
            columns={[
              { title: "Name", field: 'name', },
              
              { title: 'Description', field: 'description' },
              { title: 'Query', field: 'keywords', render: rowData => rowData.keywords.join(', ') },    
            ]}
            options={{ search: false, paging: false, actionsColumnIndex: -1, pageSize: 20, pageSizeOptions: [10, 20, 30] }}
            data={activeEvents}
            title={`Active events`}
            actions={[
              {
                  icon: 'pause',
                  tooltip: 'Stop collection',
                  onClick: (event, rowData) => {
                    this.props.modifyEvents(rowData.status === "ACTIVE" ? "NOT_ACTIVE" : "ACTIVE",rowData.normalized_name)

                  },
              },
              {
                icon:"keyboard_arrow_right",
                tooltip:"Event details",
                onClick: (event, rowData) => {
                  history.push(`/events/${rowData.normalized_name}/`)
                },
              }
            ]
            }
          />
        </Grid>
        :
        null}
        {failedEvents.length >0 ?
        <Grid item xs={12} >
          <MaterialTable
            // className={classes.table}
            columns={[
              { title: "Name", field: 'name', },
              
              { title: 'Description', field: 'description' },
              { title: 'Query', field: 'keywords', render: rowData => rowData.keywords.join(', ') },    
            ]}
            options={{ search: false, paging: false, actionsColumnIndex: -1, pageSize: 20, pageSizeOptions: [10, 20, 30] }}
            data={failedEvents}
            title={`Active events`}
            actions={[
              {
                  icon: 'pause',
                  tooltip: 'Stop collection',
                  onClick: (event, rowData) => {
                    this.props.modifyEvents(rowData.status === "ACTIVE" ? "NOT_ACTIVE" : "ACTIVE",rowData.normalized_name)

                  },
              },
              {
                icon:"keyboard_arrow_right",
                tooltip:"Event details",
                onClick: (event, rowData) => {
                  history.push(`/events/${rowData.normalized_name}/`)
                },
              }
            ]
            }
          />
        </Grid>
        :
        null}
        <Grid item xs={12} >
          <MaterialTable
            // className={classes.table}
            columns={[
              { title: "Name", field: 'name', },
              { title: 'Description', field: 'description' },
              { title: 'Query', field: 'keywords', render: rowData => rowData.keywords.join(', ') }, 
            ]}
            options={{ search: false, paging: true, actionsColumnIndex: -1, pageSize: 10, pageSizeOptions: [10, 20, 30] }}
            data={rows.filter(e => e.status!=="ACTIVE")}
            title={`Finished events`}
            actions={[
              {
                  icon: "play_arrow",
                  tooltip: "Restart collection",
                  onClick: (event, rowData) => {
                    this.props.modifyEvents(rowData.status === "ACTIVE" ? "NOT_ACTIVE" : "ACTIVE",rowData.normalized_name)

                  },
              },
              {
                icon:"keyboard_arrow_right",
                tooltip:"Event details",
                onClick: (event, rowData) => {
                  history.push(`/events/${rowData.normalized_name}/`)
                },
              }
            ]
            }
          />
        </Grid>
      </Grid>
    
    );
  }
}

ListEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
});

const mapDispatchToProps = {
  fetchEvents: fetchEvents, 
  modifyEvents: modifyEvents,
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(ListEvents)));