// Imports
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../app/Loading'


import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import HelpIcon from '@material-ui/icons/Help';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {fetchCards} from "../card/CardActions";
import CardList from "../card/CardList";
import CardAdd from "../card/CardAdd"
import {fetchCategory} from "./CategoryActions";
import CardAnswer from "../card/CardAnswer";


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
});


class CategoryView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabIndexValue: 0
        }
    }

    onTabChange=(event, newValue)=> {
        this.setState({tabIndexValue: newValue});
    }

    componentDidMount() {
        this.props.fetchCards(this.props.match.params.categoryId);
        this.props.fetchCategory(this.props.match.params.categoryId);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.categoryId !== this.props.match.params.categoryId) {
            const id = nextProps.match.params.categoryId;
            this.props.fetchCards(id);
            this.props.fetchCategory(id);
        }
    }


    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Toolbar>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Typography color="inherit" variant="h5" component="h1">
                                  {this.props.category.details.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button className={classes.button} variant="outlined" color="inherit" size="small">
                                    Web setup
                                </Button>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Help">
                                    <IconButton color="inherit">
                                        <HelpIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Tabs value={this.state.tabIndexValue} onChange={this.onTabChange} textColor="inherit">
                        <Tab textColor="inherit" label="Today Cards"/>
                        <Tab textColor="inherit" label="New Card"/>
                        <Tab textColor="inherit" label="Settings"/>
                    </Tabs>
                </AppBar>

                <section>
                    {this.state.tabIndexValue === 2 &&
                    <section>
                        <h2><span role="img" aria-label="cards">💭</span> cards</h2>
                        <br/>
                        {this.props.cards.loading ? <Loading/> : <CardList cards={this.props.cards.list}/>}
                    </section>
                    }
                    {this.state.tabIndexValue === 1 && <CardAdd>Item Two</CardAdd>}
                    {this.state.tabIndexValue === 0 && (this.props.category.details._id ? <CardAnswer category={this.props.category} /> : <Loading/>)}

                </section>



            </React.Fragment>

        )
    }
}

CategoryView.propTypes = {
    classes: PropTypes.object.isRequired,
    cards: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    fetchCategory: PropTypes.func.isRequired,
    fetchCards: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        cards: state.cards,
        category:state.category
    }
}

export default connect(mapStateToProps, {fetchCards,fetchCategory})(withStyles(styles)(CategoryView))
