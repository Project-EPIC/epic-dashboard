import React, { Component } from 'react'
// import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from 'react-redux';
// import Fab from '@material-ui/core/Fab';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { fetchFilteredTweets, clearFilterErrors } from "../../../actions/filterActions";

class FilterForm extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      keywordError: "",
      waiting: false
    }
    // this.resetFields = this.resetFields.bind(this)
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
      { keyword: event.target.value }
    );
  }

  fetchFilteredTweets = (e) => {
    e.preventDefault()

    if (this.state.keyword.length===0) {
      this.setState(
        {
            keywordError: this.state.keyword.length === 0 ? "Required field!" : "",
        }
      );
      return;
    }
    const newFilter = {
      eventName: this.props.eventId,
      keyword: this.state.keyword,
    }
    this.props.fetchFilteredTweets(newFilter)
    this.setState({
      waiting:true,
    })
  }

  resetFields() {
    this.setState({
      keyword: "",
      keywordError: "",
      waiting:false,
    })
    this.props.clearFilterErrors();
  }

  render() {
    const { classes } = this.props;
    // const keyword = this.props.keyword;

    return (
      <div>
        {/* <Paper>       */}
        {/* <Grid container spacing={12} alignContent="flex-start"> */}
        {/* <Grid item  xs={12}> */}

        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={this.fetchFilteredTweets}>
              <Typography color="textPrimary" gutterBottom>
                Add keywords to filter tweet set
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} md={12}>
                  <TextField
                    autoFocus
                    required
                    id="keyword"
                    label="keyword"
                    placeholder={this.state.keywordError}
                    helperText={
                      this.state.keywordError !== ""
                        ? this.state.keywordError
                        : "Enter keywords to filter tweets. Must not be empty."
                    }
                    className={classes.TextField}
                    onChange={this.onChange("keyword")}
                    value={this.state.keyword}
                    error={this.state.keywordError !== ""}
                    fullWidth
                    margin="dense"
                  />
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

        {/* </Paper> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  keyword: state.filterReducer.keyword,
  error: state.filterReducer.error,
});

export default connect(mapStateToProps, { fetchFilteredTweets:fetchFilteredTweets, clearFilterErrors:clearFilterErrors })(withStyles(styles)(FilterForm));