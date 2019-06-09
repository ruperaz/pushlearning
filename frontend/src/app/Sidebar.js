import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategories} from "../category/CategoryActions";


const styles = theme => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
});

class Sidebar extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const {classes, staticContext, fetchCategories, ...other} = this.props;
        return (
            <Drawer variant="permanent" {...other}>
                <List disablePadding>
                    <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                        PushLearning
                    </ListItem>
                    <ListItem
                        className={clsx(
                            classes.item,
                            classes.itemCategory,
                            (this.props.location.pathname === '/') ? classes.itemActiveItem : ''
                        )}
                        component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.itemPrimary,
                            }}
                        >
                            Dashboard
                        </ListItemText>
                    </ListItem>

                    <React.Fragment>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                Flash Cards
                            </ListItemText>
                        </ListItem>
                        {this.props.categories.list.map(({_id: id, title}) => (
                            <ListItem
                                button
                                dense
                                key={id}
                                className={clsx(
                                    classes.item,
                                    classes.itemActionable,
                                    (this.props.location.pathname === '/category/' + id) ? classes.itemActiveItem : ''
                                )}
                                component={Link} to={'/category/' + id}
                            >
                                <ListItemIcon><DnsRoundedIcon/></ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary
                                    }}
                                >
                                    {title}
                                </ListItemText>
                            </ListItem>
                        ))}
                        <Divider className={classes.divider}/>
                    </React.Fragment>

                </List>
            </Drawer>
        );
    }
}


Sidebar.propTypes = {
    categories: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

function categoriesState(state) {
    return {
        categories: state.categories
    }
}

export default connect(categoriesState, {fetchCategories})(withStyles(styles)(withRouter(Sidebar)))
