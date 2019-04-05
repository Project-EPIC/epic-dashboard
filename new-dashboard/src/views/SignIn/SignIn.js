import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { 
  withStyles
} from "@material-ui/core/styles";
import firebase from "firebase";

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignIn(props) {
  const { classes } = props;
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  return (

    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PeopleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          EPIC Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
              Welcome to Project's EPIC Dashboard. This page allows analysts and developers at Project EPIC to manage, analyze and collect data for Project EPIC.
              <br/>
              <br/>
              To access, sign in with your @colorado.edu account through Google. Once that is done, you will need to ask for access to anyone who already has access.
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> firebase.auth().signInWithPopup(googleAuthProvider)}
          >
            Sign in with Google
          </Button>
        
      </Paper>
    </main>

  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);