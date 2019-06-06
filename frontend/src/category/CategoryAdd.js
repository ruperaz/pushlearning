// Imports
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {fetchCategories, postCategory} from "./CategoryActions";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import {withSnackbar} from "notistack";


const styles = theme => ({

    addUser: {
        marginRight: theme.spacing(1),
    },
    dialogContent:{
        minWidth:'360px'
    }
});


class CategoryAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            name:''
        }
    }

    handleClickOpen =()=> {
        this.setState({open: true})
    }

    handleSubmit=()=> {

        let input = {};
        input.title = this.state.name;

        if (input.title !== '' ) {
            this.setState({isLoading: true})

            this.props.postCategory(input).then((response) => {
                if (response.success) {
                    this.props.enqueueSnackbar('Category successfully added', {
                        variant: 'success',
                        autoHideDuration: 1500
                    });

                    this.props.fetchCategories().then(()=>{
                        this.setState({open: false})
                    });

                } else {
                    this.props.enqueueSnackbar(response.errors[0].message, {variant: 'error'});
                }
            })
        } else {
            this.props.enqueueSnackbar('Please enter Category Name.', {variant: 'warning'});
        }
    }


    handleClose=()=> {
        this.setState({open: false})
    }


    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <Button variant="contained" color="primary" className={classes.addUser}
                        onClick={this.handleClickOpen}>
                    New Category
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" >New Category</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText>
                           Enter New Category Name:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Category Name"
                            type="text"
                            fullWidth
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={ this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        )
    }

}

CategoryAdd.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    postCategory: PropTypes.func.isRequired,
}



export default connect(null, {fetchCategories ,postCategory})(withStyles(styles)(withSnackbar(CategoryAdd)))
