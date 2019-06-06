// src / routes / middlewares / auth.js
'use strict'

// Imports
const jwt = require('jsonwebtoken')

const config = require('../../config/index')

// Auth Middleware
let authMiddleware = function (request, response, next) {
    debugger;
  let token = request.body.token || request.query.token || request.headers['x-access-token'] || request.cookies.token

  if (token && token != 'null') {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function (err, decoded) {
          if (err) {
              return response.json({success: false,  data: {}, errors: ['Failed to authenticate token.']});
          } else {
              // if everything is good, save to request for use in other routes
              request.user = decoded;
              next();
          }
      });

  } else {
    request.user = {};
      let responseData = {
          success: false,
          data: {},
          errors: ["No Token Provided."]
      }
      return response.status(403).send(responseData);

  }


}

// Export
module.exports = authMiddleware
