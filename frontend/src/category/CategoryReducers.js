// Imports
import update from 'immutability-helper'

// App Imports
import {SET_CATEGORIES, FETCH_CATEGORIES_BEGIN, SET_CATEGORY, FETCH_CATEGORY_BEGIN} from './CategoryActions'


export function categories (state = {list: [], error: false, loading: false}, action = {}) {
  switch (action.type) {

    case FETCH_CATEGORIES_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      })

    case SET_CATEGORIES:
      return update(state, {
        $merge: {
          list: action.categories,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}



export function category (state = {details: {}, error: false, loading: false}, action = {}) {
  switch (action.type) {

    case FETCH_CATEGORY_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      })

    case SET_CATEGORY:
      return update(state, {
        $merge: {
          details: action.category,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}

