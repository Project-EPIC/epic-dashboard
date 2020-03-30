import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Card, Button, IconButton, Chip } from "@material-ui/core";
import { Grid, Switch } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import ExpressionBuilder from "../ExpressionBuilder/ExpressionBuilder"
import { addPredicate, deletePredicate, toggleIsOrPredicate } from "../../../../actions/filterActions";

const defaultPredicate = {
    isOr: false,
    expressions: []
}

class PredicateBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: "panel0",
        }
    }

    handlePanelClick = id => (e, expanded) => {
        if (e.target.tagName === "INPUT") {
            // Clicked on AND/OR toggle
            this.props.toggleIsOrPredicate(id);
        }
        else {
            this.setState({
                expanded: expanded ? `panel${id}` : false
            })
        }

    }

    renderDeleteIcon = (id) => {
        return (
            <Grid item xs={1} className={this.props.classes.predicateDeleteContainer}>
                <IconButton onClick={() => this.props.deletePredicate(id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        )
    }

    renderSwitch = (index, checked) => {
        if (index > 0) {
            return (
                <Grid item xs={11}>
                    AND
                    <Switch
                        checked={checked}
                        color="default"
                        value={`checked${index}`}
                    />
                    OR
                </Grid>
            )
        }
    }

    renderExpressionText = (expressions, isExpanded, index) => {
        if (expressions && expressions.length > 0) {
            return (
                <Grid container className={this.props.classes.expressionTextContainer} spacing={8}>
                    {expressions.map(({ isOr, selectValue, text }, i) => {
                        return (
                            <React.Fragment key={`expressiontext-${i}`}>
                                <Grid item xs={1}>
                                    {i > 0 ? <Chip label={(isOr ? "OR" : "AND")} /> : ""}
                                </Grid>
                                <Grid item xs={11}>
                                    <Chip className={this.props.classes.expressionTextChip} label={`${this.props.textFilter[selectValue][0]}: ${text}`} />
                                </Grid>
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
        return this.props.panelData.map(({ id, isOr, expressions }, index) => (
            <Grid item xs={12} key={`panelData${id}`}>
                <ExpansionPanel expanded={this.state.expanded === `panel${id}`} onChange={this.handlePanelClick(id)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container>
                            {this.renderSwitch(index, isOr)}

                            {index > 0 ? this.renderDeleteIcon(id) : <React.Fragment />}
                            <Grid item xs={11}>
                                {this.renderExpressionText(expressions, this.state.expanded === `panel${id}`, id)}
                            </Grid>
                            {index === 0 ? this.renderDeleteIcon(id) : <React.Fragment />}

                        </Grid>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <ExpressionBuilder expressionData={expressions} predicateParentId={id} textFilter={this.props.textFilter} />

                    </ExpansionPanelDetails>
                </ExpansionPanel >
            </Grid >
        ));
    }

    renderAddNewPredicate = () => {
        return (
            <Grid item xs={12}>
                <Card>
                    <Button variant="contained" fullWidth onClick={() => this.props.addPredicate()}>
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
    textFilter: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    const { predicates, expressions } = state.filterReducer
    const panelData = predicates.allIds.map((predicateId) => {
        return {
            ...predicates.byId[predicateId],
            expressions: predicates.byId[predicateId].expressions.map((expressionId) => expressions.byId[expressionId])
        };
    })

    return {
        panelData
    }
}

const mapDispatchToProps = {
    addPredicate,
    toggleIsOrPredicate,
    deletePredicate,
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PredicateBuilder));