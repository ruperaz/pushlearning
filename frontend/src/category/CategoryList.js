import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Card from "@material-ui/core/Card";
import moment from "moment";
import {Link} from 'react-router-dom'
import CategoryAdd from './CategoryAdd'
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';


const styles = theme => ({
    paper: {
        overflow: 'hidden',
        margin: theme.spacing(4)
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        margin: theme.spacing(1),
    },
    chip: {
        margin: theme.spacing(1),
    },
    cardHeader: {
        backgroundColor: '#f3f3f3'
    }
});


function CategoryList(props) {
    const {classes, categories} = props;

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit"/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search Category by Title..."
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <CategoryAdd/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                {categories.map(({_id, title, cardsCount, createdAt}) => (
                    <Card key={_id} className={classes.card}>
                        <CardHeader className={classes.cardHeader}
                                    action={
                                        <Link to={`/category/${_id}`}>
                                            <IconButton aria-label="Settings">
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </Link>
                                    }
                                    title={
                                        <Link to={`/category/${_id}`}>
                                            {title}
                                        </Link>
                                    }
                                    subheader={moment(createdAt).fromNow()}
                        />

                        <CardActions>
                            <span>Cards Count: <Chip label={cardsCount} className={classes.chip}/></span>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </Paper>
    );
}

CategoryList.propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
};

export default withStyles(styles)(CategoryList);


