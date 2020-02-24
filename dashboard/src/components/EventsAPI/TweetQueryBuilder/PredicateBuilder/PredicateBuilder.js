import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Card, Button, IconButton } from "@material-ui/core";
import { Grid, Switch } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import ExpressionBuilder from "../ExpressionBuilder/ExpressionBuilder"
import { setPredicates } from "../../../../actions/filterActions";

const defaultPredicate = {
    checked: false,
    expressions: []
}

class PredicateBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: "panel0",
        }
    }

    addNewPredicate = () => {
        this.props.setPredicates([...this.props.panelData, Object.assign({}, defaultPredicate)]);
    }

    deletePredicate = (index) => () => {
        this.props.setPredicates(this.props.panelData.reduce((acc, cur, i) => {
            if (i !== index) {
                acc.push(cur);
            }
            return acc;
        }, []));
    }

    handlePanelClick = index => (e, expanded) => {
        if (e.target.tagName === "INPUT") {
            // Clicked on AND/OR toggle
            this.props.setPredicates(this.props.panelData.map((data, i) => {
                if (i === index) {
                    data.checked = e.target.checked
                }
                return data;
            }));
        }
        else {
            this.setState({
                expanded: expanded ? `panel${index}` : false
            })
        }

    }

    renderDeleteIcon = (i) => {
        return (
            <Grid item xs={1} className={this.props.classes.predicateDeleteContainer}>
                <IconButton onClick={this.deletePredicate(i)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        )
    }

    renderSwitch = (i, checked) => {
        if (i > 0) {
            return (
                <Grid item xs={11}>
                    AND
                    <Switch
                        checked={checked}
                        value={`checked${i}`}
                    />
                    OR
                </Grid>
            )
        }
    }

    renderExpressionText = (expressions, isExpanded, index) => {
        if (expressions && expressions.length > 0) {
            return (
                <Grid container className={this.props.classes.expressionTextContainer}>
                    {expressions.map(({ checked, selectValue, text }, i) => {
                        return (
                            <React.Fragment key={`expressiontext-${i}`}>
                                <Grid item xs={1}>
                                    {i > 0 ? (checked ? "OR" : "AND") : ""}
                                </Grid>
                                <Grid item xs={11}>{`${selectValue}: ${text}`}</Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
            )
        }
        return (
            <Grid container className={this.props.classes.expressionTextContainer}>
                <Grid item xs={12}>{isExpanded ? "Add tweet constraints below" : "Expand to add tweet constraints"}</Grid>
            </Grid>
        )
    }

    renderPanels = () => {
        return this.props.panelData.map((data, i) => (
            <Grid item xs={12} key={`panelData${i}`}>
                <ExpansionPanel expanded={this.state.expanded === `panel${i}`} onChange={this.handlePanelClick(i)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container>
                            {this.renderSwitch(i, data.checked)}

                            {i > 0 ? this.renderDeleteIcon(i) : <React.Fragment />}
                            <Grid item xs={11}>
                                {this.renderExpressionText(data.expressions, this.state.expanded === `panel${i}`, i)}
                            </Grid>
                            {i === 0 ? this.renderDeleteIcon(i) : <React.Fragment />}

                        </Grid>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <ExpressionBuilder expressionData={this.props.panelData[i].expressions} predicateParentIdx={i} />

                    </ExpansionPanelDetails>
                </ExpansionPanel >
            </Grid >
        ));
    }

    renderAddNewPredicate = () => {
        return (
            <Grid item xs={12}>
                <Card>
                    <Button variant="contained" fullWidth onClick={this.addNewPredicate}>
                        <AddIcon />
                    </Button>
                </Card>
            </Grid>
        )
    }

    render() {
        return (
            <Typography component="div">
                <Grid container justify="center" spacing={8}>
                    {this.renderPanels()}
                    {this.renderAddNewPredicate()}
                </Grid >
            </Typography>
        );
    }
}

PredicateBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    panelData: state.filterReducer.tweetConstraints
});

const mapDispatchToProps = {
    setPredicates,
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PredicateBuilder));