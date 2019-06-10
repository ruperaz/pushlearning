// src / routes / index.js
'use strict'

// Imports


const config = require('../config/index')
const express = require('express')

let authMiddleware = require('./middlewares/auth')

// Common Routes
let commonRoutes = express.Router()

// Root
commonRoutes.get(config.deployUrl + '/', authMiddleware, (request, response) => {
  let responseData = {
    success: false,

    errors: {}
  }

  response.json(responseData)
})

// Export
// noinspection JSUnresolvedVariable
module.exports = commonRoutes
