// App Imports
import config from '../config'
import authHeader from "../config/authHeader";

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN'

export const SET_CATEGORY = 'SET_CATEGORY'
export const FETCH_CATEGORY_BEGIN = 'FETCH_CATEGORY_BEGIN'


export function fetchCategories() {
    return dispatch => {
        dispatch({
            type: FETCH_CATEGORIES_BEGIN
        })

        return fetch(`${config.url.api}categories`,authHeader).then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    if (response.data.length > 0) {
                        dispatch({
                            type: SET_CATEGORIES,
                            categories: response.data
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


export function fetchCategory(categoryId) {
    return dispatch => {
        dispatch({
            type: FETCH_CATEGORY_BEGIN
        })

        return fetch(`${config.url.api}category/${categoryId}` ,authHeader).then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    if (response.success) {
                        dispatch({
                            type: SET_CATEGORY,
                            category: response.data
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


export function postCategory (category) {

    return dispatch => {
        return fetch(`${ config.url.api }category/add`, {
            method: 'post',
            body: JSON.stringify(category),
            ...authHeader
        })
            .then(response => response.json())
    }
}
