// Imports
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Loading from "../app/Loading"
import {withSnackbar} from "notistack";
import {fetchCards, postCard} from "./CardActions";
import Card from "@material-ui/core/Card";


const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    cardContainer: {
        padding: theme.spacing(2, 4)
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class CardAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            question: '',
            answer: '',
            isLoading: false
        }
    }

    onSubmit(event) {
        event.preventDefault()

        if (!this.props.category.details._id) {
            this.props.enqueueSnackbar("category not selected", {variant: 'error'});
            return;
        }

        let input = {};
        input.question = this.state.question;
        input.answer = this.state.answer;
        input.categoryId = this.props.category.details._id;

        if (input.question !== '' && input.answer !== '') {
            this.setState({isLoading: true})

            this.props.postCard(input).then((response) => {
                this.setState({isLoading: false})
                if (response.success) {
                    this.props.enqueueSnackbar('Card successfully added', {
                        variant: 'success',
                        autoHideDuration: 1500
                    });


                    this.props.fetchCards(input.categoryId);

                    // reset
                    setTimeout(() => {
                        this.setState({question: '', answer: ''});
                        input = {};
                    }, 500)
                } else {
                    this.props.enqueueSnackbar(response.errors[0].message, {variant: 'error'});
                }
            })
        } else {
            this.props.enqueueSnackbar('Please enter your question and answer.', {variant: 'warning'});
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.cardContainer}>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit.bind(this)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows="4"
                            required
                            fullWidth
                            id="question"
                            label="question"
                            name="question"
                            autoComplete="question"
                            autoFocus
                            value={this.state.question}
                            onChange={this.onChange.bind(this)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows="4"
                            required
                            fullWidth
                            name="answer"
                            label="answer"
                            type="answer"
                            id="answer"
                            autoComplete="current-answer"
                            value={this.state.answer}
                            onChange={this.onChange.bind(this)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                </div>

                {this.state.isLoading ? <Loading/> : ''}
            </Card>
        );
    }
}


CardAdd.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    postCard: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    fetchCards: PropTypes.func.isRequired
}


function mapStateToProps(state) {
    return {
        category: state.category
    }
}

export default connect(mapStateToProps, {postCard, fetchCards})(withStyles(styles)(withSnackbar(CardAdd)))

