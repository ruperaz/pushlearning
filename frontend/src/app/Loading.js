// Imports
import React from 'react'
// UI Imports
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = {
    root: {
        position: 'absolute',
    },
};


const Loading = ({classes}) => (
    <CircularProgress className={classes.root}/>
)

export default withStyles(styles)(Loading)
