// src / routes / CategoryActions.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
let authMiddleware = require('./middlewares/auth')
let Category = require('../models/category')

// Common Routes
let categoryRoutes = express.Router()

// Categorys (/categories)
categoryRoutes.get('/categories', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    }

    Category.aggregate([
        { $match: {  userId: { $eq: request.user._id } }},
        { "$addFields": { "categoryId": { "$toString": "$_id" }}},
        {
            $lookup:
                {
                    from: "cards",
                    localField: "categoryId",
                    foreignField: "categoryId",
                    as: "cards"
                }
        },
        {
            $addFields: {
                cardsCount: { $size: "$cards" }
            }
        },
        { $project : {
                _id : 1,
                title : 1,
                isActive : 1,
                userId:1,
                createdAt:1,
                cardsCount:1
            }
        },
        {$sort: {createdAt: 1}},

    ]).exec(function (error, documents) {
        if (documents.length > 0) {
            responseData.data = documents
            responseData.success = true
        }
        response.json(responseData)
    })
})

// Category Add (/category/add)
categoryRoutes.post('/category/add', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    }

    if (!isEmpty(request.user)) {
        if (request.body.text != '') {
            let category = {
                title: request.body.title,
                isActive: true,
                userId: request.user._id,
                createdAt: new Date()
            }

            Category.create(category, (error, document) => {
                if (error) {
                    responseData.errors.push({type: 'critical', message: error})
                } else {
                    let categoryId = document._id

                    if (categoryId) {
                        responseData.data.categoryId = categoryId
                        responseData.success = true
                    } else {
                        responseData.errors.push({type: 'default', message: 'Please try again.'})
                    }
                }

                response.json(responseData)
            })
        } else {
            responseData.errors.push({type: 'warning', message: 'Please enter category.'})

            response.json(responseData)
        }
    } else {
        responseData.errors.push({
            type: 'critical',
            message: 'You are not signed in. Please sign in to post a category.'
        })

        response.json(responseData)
    }
})

// Single Categorys (/category/categoryId)
categoryRoutes.get('/category/:categoryId', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    }

    if (request.params.categoryId) {
        Category.find({userId:request.user._id,_id: request.params.categoryId}).exec(function (error, documents) {
            if (documents && documents.length > 0) {
                responseData.data = documents[0]
                responseData.success = true
            }

            response.json(responseData)
        })
    } else {
        response.json(responseData)
    }
})

// Export
module.exports = categoryRoutes
