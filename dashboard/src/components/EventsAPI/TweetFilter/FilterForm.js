import React, { Component } from 'react'
import { Grid, Button, TextField, Typography, Card, CardContent, Select, FormControl, MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { setFilter } from "../../../actions/filterActions";
import { languages } from "./twitterLanguages";
import DateRangePicker from "../../common-components/DateRangePicker/DateRangePicker";
import TweetQueryBuilder from "../TweetQueryBuilder/TweetQueryBuilder";
import moment from 'moment';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate ? moment(props.startDate) : moment(props.startTimestamp),
      endDate: props.endDate ? moment(props.endDate) : moment(props.endTimestamp),
      hashtags: props.hashtags,
      language: props.language || "",
    }
  }

  componentWillUnmount() {
    // User clicked out of the modal so we need to flush this state to redux
    this.fetchFilteredTweets(false);
  }

  onChange = stateName => event => {
    this.setState(
      { [stateName]: stateName === "phrase" ? event.target.value : event.target.value.replace(" ", ",") }
    );
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.fetchFilteredTweets(true);
  }

  fetchFilteredTweets = (submit) => {
    const newFilter = {
      startDate: this.state.startDate.startOf("day").isSame(moment(this.props.startTimestamp).startOf("day")) ? null : this.state.startDate.valueOf(),
      endDate: this.state.endDate.startOf("day").isSame(moment(this.props.endTimestamp).startOf("day")) ? null : this.state.endDate.valueOf(),
      hashtags: this.state.hashtags,
      language: this.state.language
    }
    this.props.setFilter(newFilter, submit);
    this.props.closeForm();
  }

  clearFields = () => {
    this.setState({
      startDate: moment(this.props.startTimestamp),
      endDate: moment(this.props.endTimestamp),
      hashtags: "",
      language: ""
    })
  }

  handleSelect = (e) => {
    this.setState({ language: e.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardContent className={classes.cardContainer}>
          <form onSubmit={this.onFormSubmit} className={classes.cardContainer}>
            <div className={classes.card}>
              <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                Search for tweets with
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} md={12}>
                  <TweetQueryBuilder />
                </Grid>


                <Grid item xs={12} md={12}>

                  {/* 'Any of these hashtags' filter */}
                  <TextField
                    variant="filled"
                    id="any of these hashtags"
                    label="Any of these hashtags"
                    helperText={'Example: "rain,snow" → tweets that do contain either "#rain" or "#snow" (or both)'}
                    className={classes.TextField}
                    onChange={this.onChange("hashtags")}
                    value={this.state.hashtags || ""}
                    fullWidth
                    margin="dense"
                  />

                </Grid>

                {/* Language selector */}
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                    Language
                  </Typography>
                  <FormControl className={classes.languageContainer}>
                    <Select
                      value={this.state.language}
                      onChange={this.handleSelect}
                      displayEmpty
                      inputProps={{
                        name: "language",
                        id: "language-select"
                      }}
                    >
                      {/* https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview */}
                      <MenuItem value="">Any language</MenuItem>
                      {Object.keys(languages).map((key) => {
                        return <MenuItem key={key} value={languages[key]}>{key}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
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
              </Grid>
            </div>
            <Grid item xs={12} md={12} className={classes.buttonContainer}>
              <Grid container justify="flex-end">
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
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.filterReducer.startDate,
  endDate: state.filterReducer.endDate,
  hashtags: state.filterReducer.hashtags,
  language: state.filterReducer.language,
  error: state.filterReducer.error
});

const mapDispatchToProps = { setFilter }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterForm));