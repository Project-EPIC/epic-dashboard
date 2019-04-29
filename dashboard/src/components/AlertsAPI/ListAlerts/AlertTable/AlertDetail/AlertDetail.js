import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';



class AlertDetail extends React.Component {



    render() {
        const { data, classes } = this.props;

        return (


            <Grid container spacing={24} className={classes.container}>
                <Grid item md={6} xs={12}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Area
                    </Typography>
                    <Typography variant="body2">
                        {data.areaDesc}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Sender name
                    </Typography>
                    <Typography variant="body2">
                        <a rel="noopener noreferrer" href={`mailto:${data.sender}`} target="_blank">{data.senderName}</a>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Description
                    </Typography>
                    <Typography variant="body2">
                        {data.description}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Instructions
                    </Typography>
                    <Typography variant="body2">
                        {data.instruction}
                    </Typography>
                </Grid>

            </Grid>

        );
    }
}

AlertDetail.propTypes = {
    data: PropTypes.array.isRequired,
};


export default connect(null, null)(withStyles(styles)(AlertDetail));