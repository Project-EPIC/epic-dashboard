/*
TODO: 
    Things to consider:
        What happens when you delete all expressions? Should the predicate disappear too? Should it delete when the macro is unselected?
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Switch, Select, Card, CardContent, Button, MenuItem, TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { setExpressions } from "../../../../actions/filterActions";

const TextFilterToHelpText = {
    "All of these words": 'Example: "storm,surge" → tweets that contain both "storm" and "surge"',
    "Any of these words": 'Example: "hurricane,flood" → tweets that contain either "hurricane" or "flood" (or both)',
    "This exact phrase": 'Example: "funnel cloud" → tweets that contain this exact phrase "funnel cloud"',
    "None of these words": 'Example: "cats,dogs" → tweets that do not contain "cats" and do not contain "dogs"',
}

const defaultExpression = {
    checked: true,
    selectValue: "All of these words",
    text: ""
}

class ExpressionBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expressionData: [Object.assign({}, defaultExpression)]
        }
    }

    addNewExpression = () => {
        const newExpressions = [...this.props.expressionData, Object.assign({}, defaultExpression)]
        this.props.setExpressions(newExpressions, this.props.predicateParentIdx);
    }

    deleteExpression = (index) => () => {
        const newExpressions = this.props.expressionData.reduce((acc, cur, i) => {
            if (i !== index) {
                acc.push(cur);
            }
            return acc;
        }, []);
        this.props.setExpressions(newExpressions, this.props.predicateParentIdx);
    }

    handleTextFieldChange = (index, isPhrase) => (e) => {
        const newExpressions = this.props.expressionData.map((data, i) => {
            if (i === index) {
                data.text = isPhrase ? e.target.value : e.target.value.replace(" ", ",");
            }
            return data
        });
        this.props.setExpressions(newExpressions, this.props.predicateParentIdx);
    }

    handleSelect = (index) => (e) => {
        const newExpressions = this.props.expressionData.map((data, i) => {
            if (i === index) {
                data.selectValue = e.target.value;
                data.text = "";
            }
            return data
        });
        this.props.setExpressions(newExpressions, this.props.predicateParentIdx);
    }

    renderSwitch = (index, checked) => {
        if (index > 0) {
            return (
                <Grid item xs={12}>
                    AND
                    <Switch
                        checked={checked}
                        value={`checked${index}`}
                        onClick={(e) => {
                            const newExpressions = this.props.expressionData.map((data, i) => {
                                if (i === index) {
                                    data.checked = e.target.checked;
                                }
                                return data
                            });
                            this.props.setExpressions(newExpressions, this.props.predicateParentIdx);
                        }}
                    />
                    OR
                </Grid>
            )
        }
    }

    renderExpressionList = () => {
        const { classes } = this.props;

        return this.props.expressionData.map((data, i) => (
            <React.Fragment key={`expression-${this.props.predicateParentIdx}-${i}`}>
                <Grid item xs={1}>
                    {/* Can do something fancy to show that this is building a predicate... */}
                </Grid>
                <Grid item xs={11}>
                    {this.renderSwitch(i, data.checked)}

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container alignItems="center" spacing={16} >
                                    <Grid item xs={3}>
                                        <Select
                                            className={classes.textFilterSelect}
                                            value={data.selectValue}
                                            onChange={this.handleSelect(i)}
                                            inputProps={{
                                                name: "expression",
                                                id: `expression-select${i}`
                                            }}
                                            fullWidth
                                        >
                                            {Object.keys(TextFilterToHelpText).map((key) => {
                                                return <MenuItem key={`${key}-${this.props.predicateParentIdx}-${i}`} value={key}>{key}</MenuItem>
                                            })}
                                        </Select>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField
                                            variant="filled"
                                            id={`${data.selectValue}${i}`}
                                            helperText={TextFilterToHelpText[data.selectValue]}
                                            onChange={this.handleTextFieldChange(i, data.selectValue === "This exact phrase")}
                                            value={data.text}
                                            fullWidth
                                            margin="dense"
                                        />
                                    </Grid>

                                    <Grid item xs={1}>
                                        <IconButton key="TESTING" onClick={this.deleteExpression(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid >
            </React.Fragment>
        ))
    }

    renderAddNewExpression = () => {
        return (
            <React.Fragment>
                <Grid item xs={1} />
                <Grid item xs={11}>
                    <Card>
                        <Button variant="contained" fullWidth onClick={this.addNewExpression}>
                            <AddIcon />
                        </Button>
                    </Card>
                </Grid>
            </React.Fragment>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center" spacing={16}>
                {this.renderExpressionList()}
                {this.renderAddNewExpression()}
            </Grid>
        );
    }
}

ExpressionBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {
    setExpressions
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExpressionBuilder));