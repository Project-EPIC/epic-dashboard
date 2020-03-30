import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Switch, Select, Card, CardContent, Button, MenuItem, TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { addExpression, toggleIsOrExpression, setExpression, deleteExpression } from "../../../../actions/filterActions";

class ExpressionBuilder extends Component {
    handleTextFieldChange = (expression, isPhrase) => (e) => {
        const newText = isPhrase ? e.target.value : e.target.value.replace(" ", ",");
        this.props.setExpression(expression.id, { ...expression, text: newText })
    }

    handleSelect = (expression) => (e) => {
        this.props.setExpression(expression.id, { ...expression, selectValue: e.target.value, text: "" })
    }

    renderSwitch = (index, id, checked) => {
        if (index > 0) {
            return (
                <Grid item xs={12}>
                    AND
                    <Switch
                        checked={checked}
                        color="default"
                        value={`checked${index}`}
                        onClick={() => this.props.toggleIsOrExpression(id)}
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
                    {this.renderSwitch(i, data.id, data.isOr)}

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container alignItems="center" spacing={16} >
                                    <Grid item xs={3}>
                                        <Select
                                            value={data.selectValue}
                                            onChange={this.handleSelect(data)}
                                            inputProps={{
                                                name: "expression",
                                                id: `expression-select${i}`
                                            }}
                                            fullWidth
                                        >
                                            {Object.keys(this.props.textFilter).map((key) => {
                                                return <MenuItem key={`${key}-${this.props.predicateParentIdx}-${i}`} value={key}>{this.props.textFilter[key][0]}</MenuItem>
                                            })}
                                        </Select>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField
                                            variant="filled"
                                            id={`${data.selectValue}${i}`}
                                            helperText={this.props.textFilter[data.selectValue][1]}
                                            onChange={this.handleTextFieldChange(data, data.selectValue === "PHRASE")}
                                            value={data.text}
                                            fullWidth
                                            margin="dense"
                                        />
                                    </Grid>

                                    <Grid item xs={1}>
                                        <IconButton key={`expression-delete-${i}`} onClick={() => this.props.deleteExpression(this.props.predicateParentId, data.id)}>
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
                        <Button variant="contained" fullWidth onClick={() => this.props.addExpression(this.props.predicateParentId)}>
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
    textFilter: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {
    addExpression,
    toggleIsOrExpression,
    setExpression,
    deleteExpression
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExpressionBuilder));