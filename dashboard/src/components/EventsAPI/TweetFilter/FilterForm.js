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
import { setFilter } from "../../../actions/filterActions";
import DateRangePicker from "../../common-components/DateRangePicker/DateRangePicker";
import moment from 'moment';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(props.startTimestamp),
      dateRangeEnd: moment(props.endTimestamp),
      allWords: "",
      anyWords: "",
      phrase: "",
      notWords: "",
    }
  }

  componentDidMount() {
    this.setState(
      {
        startDate: this.props.startDate || moment(this.props.startTimestamp),
        endDate: this.props.endDate || moment(this.props.endTimestamp),
        allWords: this.props.allWords,
        anyWords: this.props.anyWords,
        phrase: this.props.phrase,
        notWords: this.props.notWords
      }
    );
  }

  onChange = stateName => event => {
    this.setState(
      { [stateName]: stateName == "phrase" ? event.target.value : event.target.value.replace(" ", ",") }
    );
  }

  fetchFilteredTweets = (e) => {
    e.preventDefault()

    const newFilter = {
      ...this.state,
      startDate: this.state.startDate.startOf("day").isSame(moment(this.props.startTimestamp).startOf("day")) ? null : this.state.startDate.valueOf(),
      endDate: this.state.endDate.startOf("day").isSame(moment(this.props.endTimestamp).startOf("day")) ? null : this.state.endDate.valueOf(),
    }
    this.props.setFilter(newFilter);
    this.props.closeForm();
  }

  clearFields = () => {
    this.setState({
      startDate: moment(this.props.startTimestamp),
      endDate: moment(this.props.endTimestamp),
      allWords: "",
      anyWords: "",
      phrase: "",
      notWords: ""
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={this.fetchFilteredTweets}>
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              Search for tweets with
              </Typography>
            <Grid container spacing={24}>

              <Grid item xs={12} md={12}>
                {/* 'All of these words' filter */}
                <TextField
                  variant="filled"
                  id="keyword"
                  label="All of these words"
                  helperText={'Example: "storm,surge" → tweets that contain both "storm" and "surge"'}
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
                  helperText={'Example: "funnel cloud" → tweets that contain this exact phrase "funnel cloud"'}
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
                  helperText={'Example: "hurricane,flood" → tweets that contain either "hurricane" or "flood" (or both)'}
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
                  helperText={'Example: "cats,dogs" → tweets that do not contain "cats" and do not contain "dogs"'}
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
                  Created between
                  </Typography>
                <div className={classes.dateContainer}>
                  <DateRangePicker
                    dateStart={moment(this.props.startTimestamp)}
                    dateEnd={moment(this.props.endTimestamp)}
                    dateRangeStart={this.state.startDate}
                    dateRangeEnd={this.state.endDate}
                    setStartDate={(startDate) => this.setState({ startDate })}
                    setEndDate={(endDate) => this.setState({ endDate })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} md={12}>
                <Grid container spacing={24} justify="flex-end">
                  <Grid item>
                    <Button
                      onClick={this.clearFields}
                      color="default"
                    >
                      Clear
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ margin: "0 0 0 7px" }}
                    >
                      Apply Filter
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.filterReducer.startDate,
  endDate: state.filterReducer.endDate,
  allWords: state.filterReducer.allWords,
  anyWords: state.filterReducer.anyWords,
  phrase: state.filterReducer.phrase,
  notWords: state.filterReducer.notWords,
  error: state.filterReducer.error,
});

const mapDispatchToProps = { setFilter }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterForm));