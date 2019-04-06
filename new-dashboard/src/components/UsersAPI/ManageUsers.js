import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchUsers, makeAdmin, enableUser, disableUser } from "../../actions/userActions";
import MaterialTable from 'material-table'
import Header from "../common-components/Header/Header";





class ManageUsers extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }
    state = {
        adminUsers: [],
        disabledUsers: [],
        otherUsers: [],
    };

    render() {
        const { classes } = this.props;
        this.adminUsers = this.props.users.filter(user => user.admin && !user.disabled);
        this.disabledUsers = this.props.users.filter(user => user.disabled);
        this.otherUsers = this.props.users.filter(user => !user.disabled && !user.admin);

        return (

            <div className={classes.Main}>
                <Header onDrawerToggle={this.props.onDrawerToggle} title="Manage Users" />

                <main className={classes.mainContent}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <MaterialTable
                                // className={classes.table}
                                columns={[
                                    { title: 'Email', field: 'email' },

                                ]}
                                options={{ search: false, paging: false, actionsColumnIndex:-1 }}
                                data={this.adminUsers}
                                title="Users with access"
                                actions={[
                                    {
                                      icon: 'close',
                                      tooltip: 'Disable user',
                                      onClick: (event, rowData) => {
                                        this.props.disableUser(rowData.uid);
                                      },
                                    }]}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <MaterialTable
                                // className={classes.table}
                                columns={[
                                    { title: 'Email', field: 'email' },

                                ]}
                                options={{ search: false, paging: false, actionsColumnIndex:-1 }}
                                data={this.disabledUsers}
                                title="Disabled users"
                                actions={[
                                    {
                                      icon: 'add',
                                      tooltip: 'Enable user',
                                      onClick: (event, rowData) => {
                                        this.props.enableUser(rowData.uid);
                                      },
                                    }]}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <MaterialTable
                                // className={classes.table}
                                columns={[
                                    { title: 'Email', field: 'email' },

                                ]}
                                options={{ search: false, paging: false, actionsColumnIndex:-1 }}
                                data={this.otherUsers}
                                title="Users without access"
                                actions={[
                                    {
                                      icon: 'add',
                                      tooltip: 'Make user admin',
                                      onClick: (event, rowData) => {
                                        this.props.makeAdmin(rowData.uid);
                                      },
                                    }]}
                            />
                        </Grid>

                    </Grid>
                </main>
            </div>
        );
    }

    
}

ManageUsers.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.userReducer.users
});


export default connect(mapStateToProps, { fetchUsers: fetchUsers, makeAdmin: makeAdmin, disableUser:disableUser, enableUser:enableUser })(withStyles(styles)(ManageUsers));