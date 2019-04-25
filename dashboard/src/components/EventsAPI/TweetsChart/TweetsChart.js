import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from "./styles";
import { connect } from 'react-redux';
import 'react-vis/dist/style.css';
import { FlexibleWidthXYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair, Highlight, LineSeries } from 'react-vis';


import { fetchCounts } from "../../../actions/eventActions";


const initialState = {
  crosshairValue: [],
  selectionStart: null,
  selectionEnd: null

}

class TweetsChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({ crosshairValues: [] });
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX = (value, { index }) => {
    this.setState({ crosshairValues: [value] });
  };

  componentDidMount() {
    this.props.fetchCounts(this.props.annotateEvent);
  }



  render() {
    const timeseries = this.props.counts[this.props.annotateEvent] || [];

    const updateTimePeriod = this.props.updateTimePeriod;
    const transf = timeseries.map(item => {
      return { x: new Date(item.time).getTime(), y: item.count }
    })


    return (
      <div>
      <FlexibleWidthXYPlot onMouseLeave={this._onMouseLeave} height={200} xType="time" >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Date" />
        <YAxis title="Tweet count" />
        <Crosshair
          values={this.state.crosshairValues}
          className={'test-class-name'}
          titleFormat={(d) => ({title: 'Date', value: new Date(d[0].x).toLocaleString()})}
          itemsFormat={(d)=>([{title:"Tweet count", value:d[0].y}])}
        />
        <LineSeries curve="curveBasis" data={transf} onNearestX={this._onNearestX} />
        <Highlight
          color="#829AE3"
          drag
          enableY={false}
          onDragEnd={updateTimePeriod}
        />
      </FlexibleWidthXYPlot>
    
    </div>
    );
  }
}

TweetsChart.propTypes = {
  classes: PropTypes.object.isRequired,
  annotateEvent: PropTypes.string.isRequired,
  updateTimePeriod: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  counts: state.eventsReducer.counts
});



export default connect(mapStateToProps, { fetchCounts: fetchCounts })(withStyles(styles)(TweetsChart));
