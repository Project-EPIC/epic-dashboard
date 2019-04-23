import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from "./styles";
import { connect } from 'react-redux';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import { fetchCounts } from "../../../../actions/eventActions";


const initialState = {
  startRange: null,
  endRange:null,
  timeseries: [
  ]
}

class TweetsChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }


  componentDidMount() {
    this.props.fetchCounts(this.props.annotateEvent);
  }
  

  render() {
    const { classes } = this.props;
    
    const data = {
      xFormat: '%Y-%m-%dT%H:%M:%S%Z',
      json: this.props.counts[this.props.annotateEvent] || [],
      keys: {
        x: 'time',
        value: ['count']
      },
      types: {
        count: 'area'
      }

    }

    
    const axis = {
      x: {
        show: true,
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d %H:%M'
        }
      },
      y: {
        show: true,
      },
      
    }

    const regions=[];
    if (this.state.startRange!=null && this.state.endRange!=null) {
      regions.push({axis:'x', start:this.state.startRange, end:this.state.endRange})
    }
   



    return (

      <C3Chart data={data} axis={axis} legend={{ show: false }} className={classes.chart} regions={regions} />
    );
  }
}

TweetsChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  counts: state.eventsReducer.counts
});



export default connect(mapStateToProps, { fetchCounts: fetchCounts })(withStyles(styles)(TweetsChart));
