// Imports
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

// UI Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

function CardList ({cards}) {
  const emptyMessage = (
    <p>No cards to show.</p>
  )

  const classes = makeStyles({
    cardContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    card: {
      margin:'5px',
    },
  })();


  const cardsList = (
    cards.map(({_id, question, createdAt}) => (
        <Card key={_id} className={classes.card}>
          <Link to={`/category/${ _id }`}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {question}
              </Typography>
              <Typography  color="textSecondary">
                {moment(createdAt).fromNow()}
              </Typography>
            </CardContent>
          </Link>
        </Card>
    ))
  )

  return (
    <div  className={classes.cardContainer}>
      {cards.length === 0 ? emptyMessage : cardsList}
    </div>
  )
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired
}

export default CardList
