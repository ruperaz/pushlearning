// App Imports
import config from '../config'
import authHeader from "../config/authHeader";

export const SET_CARDS = 'SET_CARDS'
export const FETCH_CARDS_BEGIN = 'FETCH_CARDS_BEGIN'
export const SET_CARD = 'SET_CARD'
export const FETCH_CARD_BEGIN = 'FETCH_CARD_BEGIN'
export const SET_NEXT_TODAY_CARD = 'SET_NEXT_TODAY_CARDS'
export const FETCH_NEXT_TODAY_CARD_BEGIN = 'FETCH_NEXT_TODAY_CARD_BEGIN'


export function fetchCards (categoryId) {
    return dispatch => {
        dispatch({
            type: FETCH_CARDS_BEGIN
        })

        return fetch(`${config.url.api}cards/${categoryId}`, authHeader(localStorage.getItem('token'))).then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    dispatch({
                        type: SET_CARDS,
                        cards: (response.data.length > 0) ? response.data : []
                    })
                })
            } else {
                console.log('Looks like the response wasn\'t perfect, got status', response.status)
            }
        }, function (e) {
            console.log('Fetch failed!', e)
        })
    }
}



export function fetchNextTodayCard (categoryId) {
    return dispatch => {
        dispatch({
            type: FETCH_NEXT_TODAY_CARD_BEGIN
        })

        if(categoryId){
            return fetch(`${config.url.api}nexttodaycard/${categoryId}`, authHeader(localStorage.getItem('token'))).then(function (response) {
                if (response.ok) {
                    response.json().then(function (response) {
                        if (response.success) {
                            dispatch({
                                type: SET_NEXT_TODAY_CARD,
                                nextTodayCard: response.data
                            })
                        }
                    })
                } else {
                    console.log('Looks like the response wasn\'t perfect, got status', response.status)
                }
            }, function (e) {
                console.log('Fetch failed!', e)
            })
        }else{
            return fetch(`${config.url.api}nexttodaycard`, authHeader(localStorage.getItem('token'))).then(function (response) {
                if (response.ok) {
                    response.json().then(function (response) {
                        if (response.success) {
                            dispatch({
                                type: SET_NEXT_TODAY_CARD,
                                nextTodayCard: response.data
                            })
                        }
                    })
                } else {
                    console.log('Looks like the response wasn\'t perfect, got status', response.status)
                }
            }, function (e) {
                console.log('Fetch failed!', e)
            })
        }


    }
}

export function postCard (card) {

    return dispatch => {
        return fetch(`${ config.url.api }card/add`, {
            method: 'post',
            body: JSON.stringify(card),
            ...authHeader(localStorage.getItem('token'))
        })
            .then(response => response.json())
    }
}



export function updateCard (card) {

    return dispatch => {
        return fetch(`${ config.url.api }card/update`, {
            method: 'put',
            body: JSON.stringify(card),
            ...authHeader(localStorage.getItem('token'))
        })
            .then(response => response.json())
    }
}
