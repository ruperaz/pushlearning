// src / config / index.js
'use strict'

const config = {
  port: 5001,
  secret: 'n"R#x3YVVYu3KH%V',
  databaseUrl: 'mongodb://localhost/flashcard',
  saltRounds: 10,
  deployUrl: '/api'
}

module.exports = config
