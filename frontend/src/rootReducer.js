// Imports
import {combineReducers} from 'redux'
// App Imports
import user from './user/UserReducers'
import {card, cards, nextTodayCard} from './card/CardReducers'
import {categories, category} from './category/CategoryReducers'

export default combineReducers({
    user,
    cards,
    card,
    nextTodayCard,
    categories,
    category
})
