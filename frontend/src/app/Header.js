import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import {userLogout} from "../user/UserActions";
import {withSnackbar} from "notistack";
import AccountCircle from '@material-ui/icons/AccountCircle';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    }
});

function Header(props) {
    const {classes, onDrawerToggle, userLogout} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }


    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs/>
                        <Grid item>
                            <Typography className={classes.link} component="a" href="#">
                                Go to docs
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Alerts • No alters">
                                <IconButton color="inherit">
                                    <NotificationsIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                <Avatar
                                    className={classes.avatar}
                                    onClick={handleClick}
                                >
                                    <AccountCircle/>
                                </Avatar>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={() => {
                                    userLogout()
                                }}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    );
}

Header.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired
};


export default connect(null, {userLogout})(withStyles(styles)(withSnackbar(Header)))

