// src / routes / CardActions.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
let authMiddleware = require('./middlewares/auth')
let Card = require('../models/card')

// Common Routes
let cardRoutes = express.Router()

// Cards (/cards)
cardRoutes.get('/cards/:categoryId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  Card.find({userId:request.user._id,categoryId: request.params.categoryId}).sort('-createdAt').exec(function (error, documents) {
    if (documents.length > 0) {
      responseData.data = documents
      responseData.success = true
    }

    response.json(responseData)
  })
})


// NextTodayCard (/nexttodaycard/:categoryId)
cardRoutes.get('/nexttodaycard/:categoryId?', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if(request.params.categoryId ){
      Card.aggregate(
          [
              { $match: { $and: [ { categoryId: {  $eq: request.params.categoryId } }, { userId: { $eq: request.user._id } } ] } },
              {
                  $addFields: {
                      daysInLevel: {$subtract: [{$floor: {$divide: [{$subtract: [new Date(), "$updateAt"]}, 1000 * 60 * 60 * (24 - 3.5)]}}, {$pow: [2, "$level"]}]}
                  }
              },
              {
                  $match: {
                      daysInLevel: {
                          $gte: 0
                      }
                  }
              },
              {$sort: {updateAt: 1}},
              {$limit: 1}
          ]
      ).exec(function (error, documents) {
          if (documents.length > 0) {
              responseData.data = documents[0]
          }
          responseData.success = true
          response.json(responseData)
      })
  } else{
      Card.aggregate(
          [
              { $match: {  userId: { $eq: request.user._id } }},
              {
                  $addFields: {
                      daysInLevel: {$subtract: [{$floor: {$divide: [{$subtract: [new Date(), "$updateAt"]}, 1000 * 60 * 60 * (24 - 3.5)]}}, {$pow: [2, "$level"]}]}
                  }
              },
              {
                  $match: {
                      daysInLevel: {
                          $gte: 0
                      }
                  }
              },
              {$sort: {updateAt: 1}},
              {$limit: 1}
          ]
      ).exec(function (error, documents) {
          if (documents.length > 0) {
              responseData.data = documents[0]
          }
          responseData.success = true
          response.json(responseData)
      })
  }


})


// Card Add (/card/add)
cardRoutes.post('/card/add', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    if (request.body.question != '') {
      let card = {
        question: request.body.question,
        answer: request.body.answer,
        level: 0,
        updateAt: new Date(),
        categoryId: request.body.categoryId,
        isActive: true,
        userId: request.user._id,
        createdAt: new Date()
      }

      Card.create(card, (error, document) => {
        if (error) {
          responseData.errors.push({type: 'critical', message: error})
        } else {
          let cardId = document._id

          if (cardId) {
            responseData.data.cardId = cardId
            responseData.success = true
          } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'})
          }
        }

        response.json(responseData)
      })
    } else {
      responseData.errors.push({type: 'warning', message: 'Please enter card.'})

      response.json(responseData)
    }
  } else {
    responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to post a card.'})

    response.json(responseData)
  }
})

// Single Cards (/card/cardId)
cardRoutes.get('/card/:cardId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.params.cardId) {
    Card.find({userId:request.user._id,_id: request.params.cardId}).exec(function (error, documents) {
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






// Card update (/card/update)
cardRoutes.put('/card/update', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    }

    if (!isEmpty(request.user)) {
        let card = {
            updateAt: new Date()
        }

        if (request.body.question && request.body.question !='') {
            card["question"] = request.body.question;
        }

        if (request.body.answer && request.body.answer !='') {
            card["answer"] = request.body.answer;
        }

        if (request.body.level && request.body.level !='') {
            card["level"] = request.body.level;
        }

        if (request.body.isActive && request.body.isActive !='') {
            card["isActive"] = request.body.isActive;
        }

        if (request.body._id && request.body._id !='') {

            Card.updateOne({_id : request.body._id},{$set: card}, (error, document) => {
                if (error) {
                    responseData.errors.push({type: 'critical', message: error})
                } else {
                    responseData.success = true
                }

                response.json(responseData)
            })
        } else {
            responseData.errors.push({type: 'warning', message: 'Please enter card.'})

            response.json(responseData)
        }
    } else {
        responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to post a card.'})

        response.json(responseData)
    }
})


// Export
module.exports = cardRoutes
