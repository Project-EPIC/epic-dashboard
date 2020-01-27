// TODO: Check to see if cache is working
// TODO: Check this out https://cloud.google.com/bigquery/docs/best-practices-performance-overview
import React, { Component } from 'react'
// import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { fetchFilteredTweets, clearFilterErrors } from "../../../actions/filterActions";
import DateRangePicker from "../../common-components/DateRangePicker/DateRangePicker";
import moment from 'moment';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRangeStart: moment(props.startTimestamp).startOf("day"),
      dateRangeEnd: moment(props.endTimestamp).startOf("day"),
      allWords: "",
      anyWords: "",
      phrase: "",
      notWords: "",
      waiting: false
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.clearFilterErrors();
    this.setState(
      {
        dateRangeStart: this.props.dateRangeStart || moment(this.props.startTimestamp).startOf("day"),
        dateRangeEnd: this.props.dateRangeEnd || moment(this.props.endTimestamp).startOf("day"),
        allWords: this.props.allWords,
        anyWords: this.props.anyWords,
        phrase: this.props.phrase,
        notWords: this.props.notWords
      }
    );
  }

  onChange = stateName => event => {
    this.setState(
      { [stateName]: event.target.value }
    );
  }

  fetchFilteredTweets = (e) => {
    e.preventDefault()

    // Check if any filter has been applied. If not then do nothing.
    const {allWords, anyWords, phrase, notWords, dateRangeStart, dateRangeEnd} = this.state;
    const isDateRangeChange = !dateRangeStart.isSame(moment(this.props.startTimestamp).startOf("day")) || !dateRangeEnd.isSame(moment(this.props.endTimestamp).startOf("day"))
    if (allWords || anyWords || phrase || notWords || isDateRangeChange) {
        const newFilter = {
          eventName: this.props.eventId,
          allWords,
          anyWords,
          phrase,
          notWords,
        }

        if (isDateRangeChange) {
          newFilter.dateRangeStart = dateRangeStart
          newFilter.dateRangeEnd = dateRangeEnd
        }
        console.log(newFilter)

        this.props.fetchFilteredTweets(newFilter)
        this.setState({
          waiting:true,
        })
    }
  }

  resetFields = () => {
    // TODO: Update this
    this.setState({
      keyword: "",
      keywordError: "",
      dateStart: moment(this.props.startTimestamp).startOf("day"), // TODO: Fix cancel not resetting the date field
      dateEnd: moment(this.props.endTimestamp).startOf("day"),
      waiting:false,
    })
    this.props.clearFilterErrors();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={this.fetchFilteredTweets}>
              <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                Filter by word(s)
              </Typography>
              <Grid container spacing={24}>

                <Grid item xs={12} md={12}>
                  {/* 'All of these words' filter */}
                  <TextField
                    variant="filled"
                    id="keyword"
                    label="All of these words"
                    helperText={'Example: storm,surge → contains both "storm" and "surge"'}
                    className={classes.TextField}
                    onChange={this.onChange("allWords")}
                    value={this.state.allWords}
                    fullWidth
                    margin="dense"
                  />

                  {/* 'This exact phrase' filter */}
                  <TextField
                    variant="filled"
                    id="keyword"
                    label="This exact phrase"
                    helperText={'Example: funnel cloud → contains the exact phrase "funnel cloud"'}
                    className={classes.TextField}
                    onChange={this.onChange("phrase")}
                    value={this.state.phrase}
                    fullWidth
                    margin="dense"
                  />

                  {/* 'Any of these words' filter */}
                  <TextField
                    variant="filled"
                    id="keyword"
                    label="Any of these words"
                    helperText={'Example: hurricane,flood → contains either "hurricane" or "flood" (or both)'}
                    className={classes.TextField}
                    onChange={this.onChange("anyWords")}
                    value={this.state.anyWords}
                    fullWidth
                    margin="dense"
                  />

                  {/* 'None of these words' filter */}
                  <TextField
                    variant="filled"
                    id="keyword"
                    label="None of these words"
                    helperText={'Example: cats,dogs → does not contain "cats" and does not contain "dogs"'}
                    className={classes.TextField}
                    onChange={this.onChange("notWords")}
                    value={this.state.notWords}
                    fullWidth
                    margin="dense"
                  />
                </Grid>

                {/* Date range picker */}
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                    Filter date range
                  </Typography>
                  <div className={classes.dateContainer}>
                    <DateRangePicker
                      dateStart={moment(this.props.startTimestamp).startOf("day")}
                      dateEnd={moment(this.props.endTimestamp).startOf("day")}
                      dateRangeStart={this.state.dateRangeStart}
                      dateRangeEnd={this.state.dateRangeEnd}
                      setDateRangeStart={(dateRangeStart) => this.setState({dateRangeStart})}
                      setDateRangeEnd={(dateRangeEnd) => this.setState({dateRangeEnd})}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={12}>
                  {/* <Button onClick={this.toggleOpen(false)} color="default">Cancel</Button> */}
                  <Button type="submit" variant="contained" color="primary">
                    Apply Filter
                  </Button>
                  <Button
                    disabled={this.state.waiting}
                    onClick={this.resetFields}
                    color="default"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dateRangeStart: state.filterReducer.dateRangeStart,
  dateRangeEnd: state.filterReducer.dateRangeEnd,
  allWords: state.filterReducer.allWords,
  anyWords: state.filterReducer.anyWords,
  phrase: state.filterReducer.phrase,
  notWords: state.filterReducer.notWords,
  error: state.filterReducer.error,
});

export default connect(mapStateToProps, { fetchFilteredTweets:fetchFilteredTweets, clearFilterErrors:clearFilterErrors })(withStyles(styles)(FilterForm));