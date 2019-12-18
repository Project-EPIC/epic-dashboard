import React, { Component } from 'react'
// import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { InlineDatePicker } from "material-ui-pickers";
import { connect } from 'react-redux';
// import Fab from '@material-ui/core/Fab';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
// import { Paper } from '@material-ui/core';
import { fetchFilteredTweets, clearFilterErrors } from "../../../actions/filterActions";
import DateRangePicker from "../../common-components/DateRangePicker/DateRangePicker";
import moment from 'moment';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRangeStart: moment(props.startTimestamp).startOf("day"),
      dateRangeEnd: moment(props.endTimestamp).startOf("day"),
      andKeywords: "",
      orKeywords: "",
      exactPhrase: "",
      excludeKeywords: "",
      waiting: false
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.clearFilterErrors();
    this.setState(
      { keyword: this.props.keyword }
    );
  }

  onChange = keyword => event => {
    this.setState(
      { [keyword]: event.target.value }
    );
  }

  fetchFilteredTweets = (e) => {
    e.preventDefault()

    // Check if any filter has been applied. If not then do nothing.
    const {andKeywords, orKeywords, exactPhrase, excludeKeywords, dateRangeStart, dateRangeEnd} = this.state;
    const isDateRangeChange = !dateRangeStart.isSame(moment(this.props.startTimestamp).startOf("day")) || !dateRangeEnd.isSame(moment(this.props.endTimestamp).startOf("day"))
    if (andKeywords || orKeywords || exactPhrase || excludeKeywords || isDateRangeChange) {
        const newFilter = {
          eventName: this.props.eventId,
          andKeywords,
          orKeywords,
          exactPhrase,
          excludeKeywords,
        }

        if (isDateRangeChange) {
          newFilter.dateRangeStart = dateRangeStart
          newFilter.dateRangeEnd = dateRangeEnd
        }
        console.log(newFilter)

        // this.props.fetchFilteredTweets(newFilter)
        // this.setState({
        //   waiting:true,
        // })
    }
  }

  resetFields = () => {
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
                    onChange={this.onChange("andKeywords")}
                    value={this.state.andKeywords}
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
                    onChange={this.onChange("exactPhrase")}
                    value={this.state.exactPhrase}
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
                    onChange={this.onChange("orKeywords")}
                    value={this.state.orKeywords}
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
                    onChange={this.onChange("excludeKeywords")}
                    value={this.state.excludeKeywords}
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
  keyword: state.filterReducer.keyword,
  error: state.filterReducer.error,
});

export default connect(mapStateToProps, { fetchFilteredTweets:fetchFilteredTweets, clearFilterErrors:clearFilterErrors })(withStyles(styles)(FilterForm));