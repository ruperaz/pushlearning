// Imports
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {fetchNextTodayCard, updateCard} from "./CardActions";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {withSnackbar} from "notistack";
import Loading from "../app/Loading";


const styles = theme => ({
    cardContainer: {
        padding: theme.spacing(3),
        margin : theme.spacing(3),
        minHeight: '400px',
    },
    questionContainer: {
        width: '100%',
        backgroundColor: 'whitesmoke',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonContainer: {
        paddingTop: theme.spacing(2)
    },
    wrongBtn:{
        float:'right'
    }

});


class CardAnswer extends Component {


    componentDidMount() {
        if(this.props.category){
            this.props.fetchNextTodayCard(this.props.category.details._id);
        }else{
            this.props.fetchNextTodayCard();
        }

    }


    onClickAnswerBtn = (value) => {
        let card={};
        let message="";
        let variant="";
        if (value) {
            card={_id: this.props.nextTodayCard.details._id , level: this.props.nextTodayCard.details.level + 1};
            message="Card successfully added to Next Level";
            variant="success";
        } else {
            card= {_id: this.props.nextTodayCard.details._id};
            message="Card returned to First-Level";
            variant="warning";
        }

        this.props.updateCard(card).then((response) => {
            if (response.success) {
                this.props.enqueueSnackbar(message, {
                    variant: variant,
                    autoHideDuration: 1500
                });

                if(this.props.category){
                    this.props.fetchNextTodayCard(this.props.category.details._id);
                }else{
                    this.props.fetchNextTodayCard();
                }

            } else {
                this.props.enqueueSnackbar(response.errors[0].message, {variant: 'error'});
            }
        })

    }


    render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.cardContainer}>
                <div className={classes.questionContainer}>
                    {this.props.nextTodayCard.loading ? <Loading/> :
                        <Typography color="inherit" variant="h5" component="h1">
                            {this.props.nextTodayCard.details._id?  this.props.nextTodayCard.details.question : 'No Card'}
                        </Typography>
                    }
                </div>
                <div className={classes.buttonContainer}>
                    <Button className={classes.okBtn} onClick={()=>{this.onClickAnswerBtn(true)}} variant="contained"  color="primary">
                        I Know
                    </Button>
                    <Button className={classes.wrongBtn} onClick={()=>{this.onClickAnswerBtn(false)}} variant="contained"  color="secondary">
                        I Dont Know
                    </Button>
                </div>
            </Card>
        )
    }

}

CardAnswer.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    nextTodayCard: PropTypes.object.isRequired,
    fetchNextTodayCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        nextTodayCard: state.nextTodayCard
    }
}

export default connect(mapStateToProps, {updateCard,fetchNextTodayCard})(withStyles(styles)(withSnackbar(CardAnswer)))
