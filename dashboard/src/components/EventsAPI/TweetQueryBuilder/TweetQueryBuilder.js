import React, { Component } from 'react'
import { Grid, Button, TextField, Typography, Card, CardContent, Select, FormControl, MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import PredicateBuilder from './PredicateBuilder/PredicateBuilder';

class TweetQueryBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const { classes } = this.props;

        return (
            <PredicateBuilder />
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetQueryBuilder));