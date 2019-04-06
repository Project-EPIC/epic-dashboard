import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    withStyles
} from "@material-ui/core/styles";
import firebase from "firebase";
import {
    IfFirebaseAuthed,
} from "@react-firebase/auth";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.error.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function InvalidUser(props) {
    const { classes } = props;

    return (

        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    EPIC Dashboard
        </Typography>
                <IfFirebaseAuthed>
                    {({ user }) =>
                        <Typography variant="body1" gutterBottom>
                            Your current account <b>({user.email})</b> is not allowed to access EPIC Dashboard. 
                            <br/>
                            <br/>
                            Contact an admin user to get access to EPIC Dashboard. You will need to log out and log in once that happens so that your credentials get updated.
                            <br/>
                            <br/>
                            If you logged in with the wrong account, log out here and log in with the correct account.
                        </Typography>
                    }
                </IfFirebaseAuthed>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => firebase.auth().signOut()}
                >
                    Log out
          </Button>

            </Paper>
        </main>

    );
}

InvalidUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvalidUser);