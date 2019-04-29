import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modifyEvents } from "../../../../actions/eventActions";



class EventTable extends React.Component {


 
  render() {
    const { history, title, data } = this.props;    

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
              history.push(`/events/${rowData.normalized_name}/`)
            }}
            actions={[
              rowData=>({
                  icon: rowData.status === "ACTIVE"? 'pause':'play_arrow',
                  tooltip: rowData.status === "ACTIVE"? 'Stop collection':'Restart collection',
                  onClick: (event, rowData) => {
                    this.props.modifyEvents(rowData.status === "ACTIVE" ? "NOT_ACTIVE" : "ACTIVE",rowData.normalized_name)
                  },
              }),
              {
                icon:"search",
                tooltip:"Explore in BigQuery",
                onClick: (event, rowData) => {
                  window.open(rowData.big_query_table_url, "_blank");
                },
              },
              {
                icon:"list",
                tooltip:"Event details",
                onClick: (event, rowData) => {
                  history.push(`/events/${rowData.normalized_name}/`)
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

const mapDispatchToProps = {
  modifyEvents: modifyEvents,
}


export default connect(null, mapDispatchToProps)(withRouter(EventTable));