import React, { Component } from 'react'
import { Grid, Button, TextField, Typography, Card, CardContent, Select, FormControl, MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import PredicateBuilder from './PredicateBuilder/PredicateBuilder';

const textFilter = {
    "ALLWORDS": ['All of these words', 'Example: "storm,surge" → tweets that contain both "storm" and "surge"'],
    "ANYWORDS": ['Any of these words', 'Example: "hurricane,flood" → tweets that contain either "hurricane" or "flood" (or both)'],
    "PHRASE": ['This exact phrase', 'Example: "funnel cloud" → tweets that contain this exact phrase "funnel cloud"'],
    "NOTWORDS": ['None of these words', 'Example: "cats,dogs" → tweets that do not contain "cats" and do not contain "dogs"'],
}

class TweetQueryBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const { classes } = this.props;

        return (
            <PredicateBuilder textFilter={textFilter} />
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetQueryBuilder));