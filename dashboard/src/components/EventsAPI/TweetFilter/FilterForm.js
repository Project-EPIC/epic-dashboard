import React, { Component } from 'react'
import { Grid, Button, TextField, Typography, Card, CardContent, Select, FormControl, MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { setFilter } from "../../../actions/filterActions";
import { languages } from "./twitterLanguages";
import DateRangePicker from "../../common-components/DateRangePicker/DateRangePicker";
import moment from 'moment';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(props.startTimestamp),
      endDate: moment(props.endTimestamp),
      allWords: "",
      anyWords: "",
      phrase: "",
      notWords: "",
      hashtags: "",
      language: ""
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
        notWords: this.props.notWords,
        hashtags: this.props.hashtags
      }
    );
  }

  onChange = stateName => event => {
    this.setState(
      { [stateName]: stateName === "phrase" ? event.target.value : event.target.value.replace(" ", ",") }
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
      notWords: "",
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
                  id="all of these words"
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
                  id="exact phrase"
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
                  id="any of these words"
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
                  id="none of these words"
                  label="None of these words"
                  helperText={'Example: "cats,dogs" → tweets that do not contain "cats" and do not contain "dogs"'}
                  className={classes.TextField}
                  onChange={this.onChange("notWords")}
                  value={this.state.notWords}
                  fullWidth
                  margin="dense"
                />

                {/* 'Any of these hashtags' filter */}
                <TextField
                  variant="filled"
                  id="any of these hashtags"
                  label="Any of these hashtags"
                  helperText={'Example: "rain,snow" → tweets that do contain either "#rain" or "#snow" (or both)'}
                  className={classes.TextField}
                  onChange={this.onChange("hashtags")}
                  value={this.state.hashtags}
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
  hashtags: state.filterReducer.hashtags,
  error: state.filterReducer.error
});

const mapDispatchToProps = { setFilter }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterForm));