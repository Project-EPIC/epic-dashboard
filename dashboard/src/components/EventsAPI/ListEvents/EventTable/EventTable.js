import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modifyEvents } from "../../../../actions/eventActions";



class EventTable extends React.Component {


 
  render() {
    const { history, title, data, eventType } = this.props;    

    return   (      
          <MaterialTable
            columns={[
              { title: "Name", field: 'name', },
              { title: 'Description', field: 'description' },
              { title: 'Query', field: 'keywords', render: rowData => rowData.keywords.join(', ') },    
            ]}
            options={{ search: false, paging: false, actionsColumnIndex: -1, pageSize: 20, pageSizeOptions: [10, 20, 30] }}
            data={data}
            title={title}
            onRowClick = {(event, rowData) => {
              history.push(`/events/${eventType}/${rowData.normalized_name}/`)
            }}
            actions={[
              rowData=>({
                  icon: rowData.status === "ACTIVE"? 'pause':'play_arrow',
                  tooltip: rowData.status === "ACTIVE"? 'Stop collection':'Restart collection',
                  onClick: (event, rowData) => {
                    this.props.modifyEvents(rowData.status === "ACTIVE" ? "NOT_ACTIVE" : "ACTIVE", rowData.normalized_name, this.props.eventType)
                  },
              }),
              {
                icon:"search",
                tooltip:"Dashboard, tweets, mentions...",
                onClick: (event, rowData) => {
                  history.push(`/events/${eventType}/${rowData.normalized_name}/`)
                },
              }
            ]
            }
          />
       
    );
  }
}

EventTable.propTypes = {
  title:  PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  eventType: state.eventsReducer.eventType,
});


const mapDispatchToProps = {
  modifyEvents: modifyEvents,
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventTable));