// Imports
import update from 'immutability-helper'

// App Imports
import {
  SET_CARDS,
  FETCH_CARDS_BEGIN,
  SET_CARD,
  FETCH_CARD_BEGIN,
  SET_NEXT_TODAY_CARD,
  FETCH_NEXT_TODAY_CARD_BEGIN
} from './CardActions'



export function nextTodayCard (state = {details: {}, error: false, loading: false}, action = {}) {
  switch (action.type) {
    case FETCH_NEXT_TODAY_CARD_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      })

    case SET_NEXT_TODAY_CARD:
      return update(state, {
        $merge: {
          details: action.nextTodayCard,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}


export function cards (state = {list: [], error: false, loading: false}, action = {}) {
  switch (action.type) {

    case FETCH_CARDS_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      })

    case SET_CARDS:
      return update(state, {
        $merge: {
          list: action.cards,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}

export function card (state = {details: {}, error: false, loading: false}, action = {}) {
  switch (action.type) {
    case FETCH_CARD_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      })

    case SET_CARD:
      return update(state, {
        $merge: {
          details: action.card,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}
